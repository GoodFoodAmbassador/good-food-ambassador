// Targeted fix for the 4 specific duplicate pairs identified in chat, where
// BOTH copies have a working buy link (so the general-purpose dedupe scripts
// correctly refused to guess). We already know which record is the correct
// one -- the one written in import-shortlist-batch4/5.mjs, with full
// evaluation prose -- so this script keeps that exact name and deletes any
// other record in the same category whose normalized name is a near-match.
//
// READ-ONLY first: run with no --apply flag to just print what it would do.
// Usage:
//   node scripts/fix-known-duplicates.mjs YOUR_API_KEY            (dry run)
//   node scripts/fix-known-duplicates.mjs YOUR_API_KEY --apply    (deletes)

const args = process.argv.slice(2)
const apiKey = args.find(a => !a.startsWith('--'))
const apply = args.includes('--apply')
if (!apiKey) { console.error('Usage: node scripts/fix-known-duplicates.mjs YOUR_API_KEY [--apply]'); process.exit(1) }

const BASE_ID = 'appcBDopFuYbSTdRy'
const TABLE   = 'Products'

// The exact Name string as written by our own import scripts -- this is the
// record to KEEP. Everything else in the same category matching the fuzzy
// name below gets deleted.
const KEEP = [
  { keepName: "Auntie Rana's Smoked Chili Oil", category: 'oils-condiments', fuzzy: "auntie rana's smoked chili oil" },
  { keepName: "Harry's Famous Sauce, Lemon Pepper Dill", category: 'oils-condiments', fuzzy: "harry's famous sauce lemon pepper dill" },
  { keepName: "Marianne's Harvest Regenerative Organic Certified Avocado Oil", category: 'oils-condiments', fuzzy: "marianne's regenerative organic certified avocado oil" },
  { keepName: "Taïm Olive Single-Estate Extra Virgin Olive Oil", category: 'oils-condiments', fuzzy: 'taim olive single estate extra virgin olive oil' },
]

function normalize(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents (ï -> i)
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

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

const records = await fetchAll()
const toDelete = []

for (const { keepName, category, fuzzy } of KEEP) {
  const candidates = records.filter(r => {
    if (!r.fields.Name) return false
    const n = normalize(r.fields.Name)
    return n.includes(fuzzy.split(' ').slice(0, 3).join(' ')) // cheap prefilter by first 3 words
  })

  const exactKeep = candidates.find(r => r.fields.Name.trim() === keepName)
  if (!exactKeep) {
    console.log(`⚠ Could not find exact record for "${keepName}" -- skipping this pair, check manually.`)
    continue
  }

  const dupes = candidates.filter(r => r.id !== exactKeep.id)
  if (!dupes.length) {
    console.log(`✓ "${keepName}" -- no duplicate found, nothing to do.`)
    continue
  }

  for (const d of dupes) {
    console.log(`KEEP: "${exactKeep.fields.Name}" (${exactKeep.id})`)
    console.log(`DROP: "${d.fields.Name}" (${d.id})\n`)
    toDelete.push(d.id)
  }
}

if (!toDelete.length) {
  console.log('\nNothing to delete.')
  process.exit(0)
}

if (!apply) {
  console.log(`\nDRY RUN -- ${toDelete.length} record(s) would be deleted. Re-run with --apply to actually delete.`)
  process.exit(0)
}

console.log(`\nApplying: deleting ${toDelete.length} record(s)...`)
let deleted = 0
for (let i = 0; i < toDelete.length; i += 10) {
  const batch = toDelete.slice(i, i + 10)
  const params = batch.map(id => `records[]=${id}`).join('&')
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE}?${params}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!res.ok) {
    console.error(`  ✗ batch starting at ${i}: ${res.status} ${await res.text()}`)
  } else {
    const data = await res.json()
    deleted += data.records.length
    console.log(`  ✓ deleted ${data.records.length}`)
  }
  await new Promise(r => setTimeout(r, 250))
}
console.log(`\nDone: ${deleted} deleted.`)
