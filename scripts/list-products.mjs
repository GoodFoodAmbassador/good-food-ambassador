// Usage: node scripts/list-products.mjs YOUR_API_KEY
// Lists all products grouped by category so we can see what needs buy links

const [,, apiKey] = process.argv
if (!apiKey) { console.error('Usage: node scripts/list-products.mjs YOUR_API_KEY'); process.exit(1) }

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

const records = await fetchAll()
const byCategory = {}
for (const r of records) {
  const cat = r.fields.Category || 'uncategorised'
  if (!byCategory[cat]) byCategory[cat] = []
  byCategory[cat].push({
    id: r.id,
    name: r.fields.Name || '(no name)',
    producer: r.fields.Producer || '',
    origin: r.fields.Origin || '',
    status: r.fields.Status || 'none',
    hasBuyLinks: !!r.fields.BuyLinks && r.fields.BuyLinks !== '[]',
    buyLinks: r.fields.BuyLinks || '',
  })
}

for (const [cat, products] of Object.entries(byCategory).sort()) {
  console.log(`\n== ${cat.toUpperCase()} (${products.length}) ==`)
  for (const p of products.sort((a,b) => a.name.localeCompare(b.name))) {
    console.log(`  [${p.status}] ${p.name}${p.producer ? ` — ${p.producer}` : ''}${p.origin ? ` (${p.origin})` : ''} | links: ${p.hasBuyLinks ? 'YES' : 'no'}`)
  }
}
console.log(`\nTotal: ${records.length} products`)
