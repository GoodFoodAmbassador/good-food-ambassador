// READ-ONLY. Makes zero changes to Airtable — only reports what it finds.
// Usage: node scripts/find-duplicates.mjs YOUR_API_KEY
//
// Finds:
//   1. Products with the same Name that exist more than once (regardless of
//      category) — the duplicate-import bug. Recommends which record to KEEP
//      (the one with real buy links) and which to DELETE.
//   2. Completely blank records (no Name) — junk rows.
//
// Output: printed report + duplicates-report.json (list of exact record IDs
// recommended for deletion, so nothing has to be re-typed by hand later).

import { writeFileSync } from 'fs'

const [,, apiKey] = process.argv
if (!apiKey) { console.error('Usage: node scripts/find-duplicates.mjs YOUR_API_KEY'); process.exit(1) }

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

const records = await fetchAll()

// --- 1. Blank / junk records ---
const blank = records.filter(r => !r.fields.Name || !r.fields.Name.trim())

// --- 2. Group by normalized Name across ALL categories ---
const groups = {}
for (const r of records) {
  if (!r.fields.Name || !r.fields.Name.trim()) continue
  const key = r.fields.Name.trim().toLowerCase()
  if (!groups[key]) groups[key] = []
  groups[key].push(r)
}

const toDelete = []
const needsReview = []
const clean = []

for (const [name, recs] of Object.entries(groups)) {
  if (recs.length === 1) { clean.push(recs[0]); continue }

  const withLinks = recs.filter(hasLinks)
  const withoutLinks = recs.filter(r => !hasLinks(r))

  if (withLinks.length === 1) {
    // Clear case: keep the one with links, delete the rest.
    const keep = withLinks[0]
    for (const r of recs) {
      if (r.id !== keep.id) {
        toDelete.push({
          id: r.id,
          name: r.fields.Name,
          category: r.fields.Category || '(none)',
          reason: `duplicate of kept record ${keep.id} (category: ${keep.fields.Category}) — this copy has no buy links`,
        })
      }
    }
  } else {
    // Ambiguous: 0 links on all copies, or >1 copy has links. Don't guess.
    needsReview.push({
      name,
      records: recs.map(r => ({
        id: r.id,
        category: r.fields.Category || '(none)',
        hasLinks: hasLinks(r),
        createdTime: r.createdTime,
      })),
    })
  }
}

console.log(`Total records: ${records.length}`)
console.log(`Blank/junk records (no Name): ${blank.length}`)
console.log(`Unique product names: ${Object.keys(groups).length}`)
console.log(`Clean (single record): ${clean.length}`)
console.log(`Duplicate groups resolved automatically: ${toDelete.length} record(s) recommended for deletion`)
console.log(`Duplicate groups needing manual review: ${needsReview.length}`)

if (blank.length) {
  console.log(`\n--- BLANK / JUNK RECORDS ---`)
  for (const r of blank) console.log(`  ${r.id}`)
}

if (toDelete.length) {
  console.log(`\n--- RECOMMENDED FOR DELETION (clear duplicates) ---`)
  for (const d of toDelete) {
    console.log(`  ${d.id} | ${d.name} | category: ${d.category} | ${d.reason}`)
  }
}

if (needsReview.length) {
  console.log(`\n--- NEEDS MANUAL REVIEW (ambiguous — not auto-resolved) ---`)
  for (const g of needsReview) {
    console.log(`  "${g.name}"`)
    for (const r of g.records) {
      console.log(`    ${r.id} | category: ${r.category} | links: ${r.hasLinks ? 'YES' : 'no'} | created: ${r.createdTime}`)
    }
  }
}

writeFileSync('duplicates-report.json', JSON.stringify({
  blankRecordIds: blank.map(r => r.id),
  deleteRecordIds: toDelete.map(d => d.id),
  deleteDetails: toDelete,
  needsReview,
}, null, 2))

console.log(`\nWritten to duplicates-report.json — nothing was deleted or changed.`)
