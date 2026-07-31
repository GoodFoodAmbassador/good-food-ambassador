// Deletes exactly the record IDs listed in duplicates-report.json
// (produced by find-duplicates.mjs) — nothing is recomputed here, so this
// only touches what was already reviewed in chat.
//
// Usage: node scripts/delete-duplicates.mjs YOUR_API_KEY [duplicates-report.json]

import { readFileSync } from 'fs'

const [,, apiKey, reportPath = 'duplicates-report.json'] = process.argv
if (!apiKey) { console.error('Usage: node scripts/delete-duplicates.mjs YOUR_API_KEY [duplicates-report.json]'); process.exit(1) }

const BASE_ID = 'appcBDopFuYbSTdRy'
const TABLE   = 'Products'
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`

const report = JSON.parse(readFileSync(reportPath, 'utf8'))
const ids = [...(report.blankRecordIds || []), ...(report.deleteRecordIds || [])]

console.log(`About to delete ${ids.length} records (${report.blankRecordIds.length} blank + ${report.deleteRecordIds.length} duplicates).`)

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
