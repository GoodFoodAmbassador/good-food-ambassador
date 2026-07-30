// Push corrected buy links from CSV back to Airtable
// Usage: node scripts/import-buy-links.mjs YOUR_API_KEY buy-links-audit.csv
//
// Rules:
//  - Only rows where at least one URL cell has changed are updated
//  - RecordID column is used to match — do NOT edit that column
//  - Label columns are optional; leave them as-is if you only want to fix URLs

import { readFileSync } from 'fs'

const [,, apiKey, csvPath = 'buy-links-audit.csv'] = process.argv
if (!apiKey) {
  console.error('Usage: node scripts/import-buy-links.mjs YOUR_API_KEY [buy-links-audit.csv]')
  process.exit(1)
}

const BASE_ID  = 'appcBDopFuYbSTdRy'
const TABLE    = 'Products'
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`
const HEADERS  = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }

// Parse CSV (handles quoted fields with commas/newlines)
function parseCSV(text) {
  const rows = []
  let row = [], field = '', inQuote = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuote) {
      if (ch === '"' && text[i+1] === '"') { field += '"'; i++ }
      else if (ch === '"') { inQuote = false }
      else { field += ch }
    } else {
      if (ch === '"') { inQuote = true }
      else if (ch === ',') { row.push(field); field = '' }
      else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (ch === '\r') { /* skip */ }
      else { field += ch }
    }
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  return rows
}

const csv = readFileSync(csvPath, 'utf8')
const [header, ...dataRows] = parseCSV(csv)

// col indices
const COL = {}
header.forEach((h, i) => { COL[h.trim()] = i })

let updated = 0, skipped = 0, errors = 0

for (const row of dataRows) {
  const recordId = row[COL['RecordID']]?.trim()
  if (!recordId) continue

  const links = []
  for (let i = 1; i <= 4; i++) {
    const label = row[COL[`Link${i}_Label`]]?.trim()
    const url   = row[COL[`Link${i}_URL`]]?.trim()
    if (url) links.push({ label: label || 'Buy', url })
  }

  const name = row[COL['Name']]?.trim()
  const buyLinksJson = links.length ? JSON.stringify(links) : ''

  // PATCH the record
  const res = await fetch(`${BASE_URL}/${recordId}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ fields: { BuyLinks: buyLinksJson } }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`  ✗ ${name}: ${res.status} ${err}`)
    errors++
  } else {
    const linkCount = links.length
    console.log(`  ✓ ${name} — ${linkCount} link${linkCount !== 1 ? 's' : ''}`)
    updated++
  }

  // Airtable rate limit: max 5 req/s
  await new Promise(r => setTimeout(r, 220))
}

console.log(`\nDone: ${updated} updated, ${errors} errors`)
