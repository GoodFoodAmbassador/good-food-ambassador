// READ-ONLY. Makes zero changes to Airtable — only reports what it finds.
// Usage: node scripts/find-near-duplicates.mjs YOUR_API_KEY
//
// Catches the class of duplicate that find-duplicates.mjs misses: products
// with SLIGHTLY different names (extra word, comma, "Organic" vs not) that
// are really the same item, e.g.
//   "Harry's Famous Sauce Lemon Pepper Dill"
//   "Harry's Famous Sauce, Lemon Pepper Dill"
//
// Normalizes each name (lowercase, strip punctuation, drop filler words),
// then flags any pair of DIFFERENT normalized names that are still >= 85%
// similar (Levenshtein-based) AND have significant word overlap. Nothing is
// deleted here — output is printed + written to near-duplicates-report.json
// for review before running delete-near-duplicates.mjs.

import { writeFileSync } from 'fs'

const [,, apiKey] = process.argv
if (!apiKey) { console.error('Usage: node scripts/find-near-duplicates.mjs YOUR_API_KEY'); process.exit(1) }

const BASE_ID = 'appcBDopFuYbSTdRy'
const TABLE   = 'Products'

async function fetchAll() {
  let records = []
  let offset = ''
  do {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}?pageSize=100${offset ? `&offset=${offset}` : ''}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } })
    if (!res.ok) { console.error('Airtable error:', res.status, await res.text()); process.exit(1) }
    const data = await res.json()
    records.push(...data.records)
    offset = data.offset || ''
  } while (offset)
  return records
}

function hasLinks(r) {
  const raw = r.fields.BuyLinks
  if (!raw || raw === '[]') return false
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0
  } catch {
    return raw.startsWith('http')
  }
}

const FILLER = new Set(['organic', 'the', 'a', 'an', 'and', 'with', 'in', 'of'])

function normalize(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')   // strip punctuation
    .split(/\s+/)
    .filter(w => w && !FILLER.has(w))
    .join(' ')
    .trim()
}

function levenshtein(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n]
}

function similarity(a, b) {
  if (!a.length && !b.length) return 1
  const dist = levenshtein(a, b)
  return 1 - dist / Math.max(a.length, b.length)
}

function wordOverlap(a, b) {
  const wa = new Set(a.split(' '))
  const wb = new Set(b.split(' '))
  const shared = [...wa].filter(w => wb.has(w)).length
  return shared / Math.max(wa.size, wb.size)
}

const records = await fetchAll()
  .then(recs => recs.filter(r => r.fields.Name && r.fields.Name.trim()))

const items = records.map(r => ({
  id: r.id,
  name: r.fields.Name.trim(),
  norm: normalize(r.fields.Name.trim()),
  category: r.fields.Category || '(none)',
  hasLinks: hasLinks(r),
  createdTime: r.createdTime,
}))

const pairs = []
const seen = new Set()

for (let i = 0; i < items.length; i++) {
  for (let j = i + 1; j < items.length; j++) {
    const a = items[i], b = items[j]
    if (a.norm === b.norm) continue // exact-normalized matches are handled by find-duplicates.mjs
    if (a.category !== b.category) continue // different category = not a duplicate
    const sim = similarity(a.norm, b.norm)
    const overlap = wordOverlap(a.norm, b.norm)
    if (sim >= 0.85 || overlap >= 0.7) {
      const key = [a.id, b.id].sort().join('|')
      if (seen.has(key)) continue
      seen.add(key)
      pairs.push({ a, b, similarity: Math.round(sim * 100), wordOverlap: Math.round(overlap * 100) })
    }
  }
}

console.log(`Total products scanned: ${items.length}`)
console.log(`Near-duplicate pairs found: ${pairs.length}\n`)

const recommendations = []

for (const { a, b, similarity: sim, wordOverlap: ov } of pairs) {
  console.log(`--- "${a.name}"  <->  "${b.name}"  (similarity ${sim}%, word overlap ${ov}%) ---`)
  console.log(`  A: ${a.id} | category: ${a.category} | links: ${a.hasLinks ? 'YES' : 'no'} | created: ${a.createdTime}`)
  console.log(`  B: ${b.id} | category: ${b.category} | links: ${b.hasLinks ? 'YES' : 'no'} | created: ${b.createdTime}`)

  let keep = null, drop = null, reason = ''
  if (a.hasLinks && !b.hasLinks) { keep = a; drop = b; reason = 'B has no buy links' }
  else if (b.hasLinks && !a.hasLinks) { keep = b; drop = a; reason = 'A has no buy links' }
  else {
    // Both or neither have links — keep the more recently created (assumed to be
    // the fuller, evaluation-backed entry from the latest import pass).
    keep = a.createdTime > b.createdTime ? a : b
    drop = keep === a ? b : a
    reason = 'both have (or lack) links — kept the more recently created record; VERIFY before deleting'
  }
  console.log(`  -> recommend KEEP ${keep.id} ("${keep.name}"), DROP ${drop.id} ("${drop.name}") — ${reason}\n`)

  recommendations.push({
    keepId: keep.id, keepName: keep.name,
    dropId: drop.id, dropName: drop.name,
    reason,
    confident: reason !== 'both have (or lack) links — kept the more recently created record; VERIFY before deleting',
  })
}

writeFileSync('near-duplicates-report.json', JSON.stringify({ pairs: recommendations }, null, 2))
console.log(`Written to near-duplicates-report.json — nothing was deleted or changed.`)
console.log(`Review the "confident" flag on each entry before running delete-near-duplicates.mjs.`)
