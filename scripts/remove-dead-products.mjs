#!/usr/bin/env node
// Removes products confirmed by scripts/verify-links.mjs (plus manual
// re-checks) to have a genuinely dead BuyLink -- domain returns no
// response at all, checked twice with two different tools -- with no live
// replacement found.
//
// Dry-run by default -- pass --apply to actually delete from Airtable.
//
// Usage: node scripts/remove-dead-products.mjs <YOUR_PAT> [--apply] [BASE_ID]

const args = process.argv.slice(2)
const API_KEY = args.find(a => !a.startsWith('--'))
const APPLY = args.includes('--apply')
const BASE_ID = args.filter(a => !a.startsWith('--') && a !== API_KEY)[0] || 'appcBDopFuYbSTdRy'

if (!API_KEY) { console.error('Usage: node scripts/remove-dead-products.mjs <PAT> [--apply]'); process.exit(1) }

const TABLE = 'Products'
const URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`
const HEADERS = { Authorization: `Bearer ${API_KEY}` }

function normalize(name) {
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Names to remove, matched loosely (substring match on normalized name).
const TO_REMOVE = [
  'Gay Awakening Coffee', // gayawakeningcoffee.com returns no response at all
                          // (empty/no page, both www and bare domain) across
                          // two separate checks with two different tools --
                          // no live replacement site found.
]

async function fetchAll() {
  let records = []
  let offset = ''
  do {
    const url = `${URL}?pageSize=100${offset ? `&offset=${offset}` : ''}`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) { console.error('Airtable error:', res.status, await res.text()); process.exit(1) }
    const data = await res.json()
    records.push(...data.records)
    offset = data.offset || ''
  } while (offset)
  return records
}

async function main() {
  console.log(APPLY ? 'APPLY MODE -- will delete from Airtable\n' : 'DRY RUN -- pass --apply to delete\n')
  const records = await fetchAll()

  for (const target of TO_REMOVE) {
    const norm = normalize(target)
    const matches = records.filter(r => normalize(r.fields.Name || '').includes(norm))
    if (!matches.length) {
      console.log(`✗ NOT FOUND: "${target}" -- no matching product in Airtable`)
      continue
    }
    for (const rec of matches) {
      console.log(`${APPLY ? '✓ DELETING' : '→ would delete'}: "${rec.fields.Name}" (${rec.id})`)
      if (APPLY) {
        const res = await fetch(`${URL}/${rec.id}`, { method: 'DELETE', headers: HEADERS })
        if (!res.ok) console.error(`  ✗ delete failed:`, await res.text())
      }
    }
  }

  if (!APPLY) console.log('\nDry run complete. Re-run with --apply to actually delete.')
}

main()
