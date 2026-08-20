// Deletes only the "dropId" records from near-duplicates-report.json
// (produced by find-near-duplicates.mjs) where confident === true, unless
// --all is passed to also delete the "VERIFY before deleting" ones.
//
// Usage: node scripts/delete-near-duplicates.mjs YOUR_API_KEY [--all] [report-path]

import { readFileSync } from 'fs'

const args = process.argv.slice(2)
const apiKey = args.find(a => !a.startsWith('--'))
const includeAll = args.includes('--all')
const reportPath = args.filter(a => !a.startsWith('--'))[1] || 'near-duplicates-report.json'

if (!apiKey) { console.error('Usage: node scripts/delete-near-duplicates.mjs YOUR_API_KEY [--all] [report-path]'); process.exit(1) }

const BASE_ID = 'appcBDopFuYbSTdRy'
const TABLE   = 'Products'
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`

const report = JSON.parse(readFileSync(reportPath, 'utf8'))
const toDelete = report.pairs.filter(p => p.confident || includeAll)
const skipped  = report.pairs.filter(p => !p.confident && !includeAll)

console.log(`Deleting ${toDelete.length} record(s)${includeAll ? ' (including unconfident pairs, --all passed)' : ''}.`)
if (skipped.length) {
  console.log(`Skipping ${skipped.length} unconfident pair(s) — re-run with --all once you've verified them manually:`)
  for (const p of skipped) console.log(`  KEEP "${p.keepName}" (${p.keepId})  vs  DROP "${p.dropName}" (${p.dropId})`)
}

const ids = toDelete.map(p => p.dropId)
let deleted = 0, errors = 0

for (let i = 0; i < ids.length; i += 10) {
  const batch = ids.slice(i, i + 10)
  const params = batch.map(id => `records[]=${id}`).join('&')
  const res = await fetch(`${BASE_URL}?${params}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!res.ok) {
    console.error(`  ✗ batch starting at ${i}: ${res.status} ${await res.text()}`)
    errors += batch.length
  } else {
    const data = await res.json()
    deleted += data.records.length
    console.log(`  ✓ deleted ${data.records.length} (batch ${i / 10 + 1})`)
  }
  await new Promise(r => setTimeout(r, 250)) // stay under 5 req/s
}

console.log(`\nDone: ${deleted} deleted, ${errors} errors`)
