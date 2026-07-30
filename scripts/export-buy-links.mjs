// Export all approved products with their buy links to a CSV for manual review
// Usage: node scripts/export-buy-links.mjs YOUR_API_KEY
// Output: buy-links-audit.csv in the project root

import { writeFileSync } from 'fs'

const [,, apiKey] = process.argv
if (!apiKey) {
  console.error('Usage: node scripts/export-buy-links.mjs YOUR_API_KEY')
  process.exit(1)
}

const BASE_ID   = 'appcBDopFuYbSTdRy'
const TABLE     = 'Products'
const BASE_URL  = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`
const HEADERS   = { Authorization: `Bearer ${apiKey}` }

async function fetchAll() {
  const records = []
  let offset = ''
  do {
    const url = BASE_URL + `?pageSize=100${offset ? '&offset=' + offset : ''}`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) { console.error('Airtable error:', res.status, await res.text()); process.exit(1) }
    const data = await res.json()
    records.push(...data.records)
    offset = data.offset || ''
  } while (offset)
  return records
}

function parseBuyLinks(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return raw.startsWith('http') ? [{ label: 'Buy', url: raw }] : []
  }
}

const records = await fetchAll()
const approved = records.filter(r => r.fields.Status === 'approved')

console.log(`Found ${approved.length} approved products`)

// Build CSV rows — one row per product, with up to 4 buy links
const rows = [
  ['RecordID', 'Category', 'Name', 'Producer', 'Link1_Label', 'Link1_URL', 'Link2_Label', 'Link2_URL', 'Link3_Label', 'Link3_URL', 'Link4_Label', 'Link4_URL']
]

for (const r of approved) {
  const f = r.fields
  const links = parseBuyLinks(f.BuyLinks)
  const row = [
    r.id,
    f.Category || '',
    f.Name || '',
    f.Producer || '',
  ]
  for (let i = 0; i < 4; i++) {
    row.push(links[i]?.label || '')
    row.push(links[i]?.url   || '')
  }
  rows.push(row)
}

// Sort by Category then Name
rows.slice(1).sort((a, b) => (a[1] + a[2]).localeCompare(b[1] + b[2]))
const sorted = [rows[0], ...rows.slice(1).sort((a, b) => (a[1] + a[2]).localeCompare(b[1] + b[2]))]

const csv = sorted.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
writeFileSync('buy-links-audit.csv', csv, 'utf8')
console.log('\n✅ Written to buy-links-audit.csv')
console.log('   Open it in Excel or Google Sheets, correct the URLs, then run:')
console.log('   node scripts/import-buy-links.mjs YOUR_API_KEY buy-links-audit.csv')
