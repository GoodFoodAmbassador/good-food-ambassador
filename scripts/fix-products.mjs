// Usage: node scripts/fix-products.mjs YOUR_API_KEY
// 1. Adds missing buy links to 5 Vital Choice seafood products
// 2. Moves 4 Timeless lentils from category "grains" → "legumes"

const [,, apiKey] = process.argv
if (!apiKey) { console.error('Usage: node scripts/fix-products.mjs YOUR_API_KEY'); process.exit(1) }

const BASE_ID = 'appcBDopFuYbSTdRy'
const TABLE   = 'Products'
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`
const HEADERS  = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }

// ── Changes to apply ─────────────────────────────────────────────────────────

const BUY_LINK_FIXES = {
  'Vital Choice Wild Alaskan Spot Prawns': [
    { label: 'Vital Choice', url: 'https://www.vitalchoice.com/v/shellfish/shrimp-spot-prawns/FSP102' }
  ],
  'Vital Choice Wild Dungeness Crab Meat': [
    { label: 'Vital Choice', url: 'https://www.vitalchoice.com/v/shellfish/crab/FDC201' }
  ],
  'Vital Choice Wild Pacific Albacore Tuna': [
    { label: 'Vital Choice', url: 'https://www.vitalchoice.com/products/wild-pacific-albacore-tuna-small-troll-caught' }
  ],
  'Vital Choice Wild Pink Salmon (Canned)': [
    { label: 'Vital Choice', url: 'https://www.vitalchoice.com/v/canned-pouched/canned-pouched-salmon/CSP106' }
  ],
  'Vital Choice Wild Sockeye Salmon Roe (Ikura)': [
    { label: 'Vital Choice', url: 'https://www.vitalchoice.com/v/wild-salmon/ikura-wild-salmon-caviar/FSE501' }
  ],
}

const CATEGORY_FIXES = new Set([
  'Timeless Black Beluga Lentils',
  'Timeless Crimson Lentils',
  'Timeless French Green Lentils',
  'Timeless Pardina Lentils',
])

// ── Fetch all records ─────────────────────────────────────────────────────────

async function fetchAll() {
  let records = []
  let offset = ''
  do {
    const url = `${BASE_URL}?pageSize=100${offset ? `&offset=${offset}` : ''}`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) { console.error('Fetch error:', res.status, await res.text()); process.exit(1) }
    const data = await res.json()
    records.push(...data.records)
    offset = data.offset || ''
  } while (offset)
  return records
}

// ── Batch update (max 10 records per request) ─────────────────────────────────

async function batchUpdate(updates) {
  for (let i = 0; i < updates.length; i += 10) {
    const chunk = updates.slice(i, i + 10)
    const res = await fetch(BASE_URL, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({ records: chunk }),
    })
    if (!res.ok) { console.error('Update error:', res.status, await res.text()); process.exit(1) }
    const data = await res.json()
    for (const r of data.records) {
      console.log(`  ✓ Updated: ${r.fields.Name}`)
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

const all = await fetchAll()
console.log(`Fetched ${all.length} records\n`)

const updates = []

for (const r of all) {
  const name = r.fields.Name || ''
  const fields = {}

  // Fix missing buy links
  if (BUY_LINK_FIXES[name]) {
    fields.BuyLinks = JSON.stringify(BUY_LINK_FIXES[name])
    console.log(`→ Adding buy link: ${name}`)
  }

  // Fix miscategorised lentils
  if (CATEGORY_FIXES.has(name) && r.fields.Category === 'grains') {
    fields.Category = 'legumes'
    console.log(`→ Recategorising to legumes: ${name}`)
  }

  if (Object.keys(fields).length > 0) {
    updates.push({ id: r.id, fields })
  }
}

if (updates.length === 0) {
  console.log('Nothing to update — all products already correct.')
  process.exit(0)
}

console.log(`\nApplying ${updates.length} update(s)...\n`)
await batchUpdate(updates)

console.log('\nDone. Triggering ISR revalidation...')
const rev = await fetch('https://www.goodfoodambassador.com/api/revalidate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ paths: ['/grains', '/legumes', '/seafood'] }),
})
console.log(`Revalidation: ${rev.status} ${rev.ok ? '✓' : '✗'}`)
