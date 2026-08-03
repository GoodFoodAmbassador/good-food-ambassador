#!/usr/bin/env node
// Usage: node scripts/fix-links-batch2.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 2: LNA (Low & No Alcohol) buy-link fixes, from the buy-link audit.
// All 5 previously-dead links replaced with real, browser-verified URLs.
// No removals needed in this batch — every product had a genuine,
// purchasable page once the correct domain was found.
//
// Note: BREZ's own site (drinkbrez.com) is dead/unreachable (confirmed by
// direct browser navigation, not just search-result text) — linked instead
// to a verified specialty retailer that stocks the exact product.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/fix-links-batch2.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const LINK_UPDATES = [
  { Name: 'BREZ Flow Functional Mushroom Drink',
    BuyLinks: [{ label: 'Find it', url: 'https://proofnomore.com/products/brez-flow-non-alcoholic-functional-mushroom-drink-12oz' }] },
  { Name: 'KIT NA Brewing On Your Mark Blonde',
    BuyLinks: [{ label: 'Order direct', url: 'https://kit-na.com/shop.html' }] },
  { Name: 'Momentum Brewery Hazy IPA',
    BuyLinks: [{ label: 'Order direct', url: 'https://momentumbrew.com/products/non-alcoholic-hazy-ipa' }] },
  { Name: 'NON NON3 Toasted Cinnamon & Yuzu',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.non.world/products/toasted-cinnamon-yuzu' }] },
  { Name: 'Woodland Farms Ruby Sour Ale',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.wfbrewery.com/products/ruby-non-alcoholic-sour' }] },
]

async function getAllRecordIds() {
  const map = {}
  let offset = null
  do {
    const res  = await fetch(`${URL}?fields[]=Name${offset ? `&offset=${offset}` : ''}`, { headers: HEADERS })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    for (const r of data.records) map[r.fields.Name] = r.id
    offset = data.offset
  } while (offset)
  return map
}

async function patchBatch(records) {
  const res  = await fetch(URL, { method: 'PATCH', headers: HEADERS, body: JSON.stringify({ records }) })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.records
}

async function main() {
  console.log('\n🔗  GFA Buy-Link Fix — Batch 2 (LNA)\n')
  const idByName = await getAllRecordIds()
  console.log(`   ${Object.keys(idByName).length} existing records found\n`)

  const patches = LINK_UPDATES
    .filter(u => { if (!idByName[u.Name]) { console.log(`   ⚠  Not found, skipping: ${u.Name}`); return false }; return true })
    .map(u => ({ id: idByName[u.Name], fields: { BuyLinks: JSON.stringify(u.BuyLinks) } }))

  for (let i = 0; i < patches.length; i += 10) {
    const updated = await patchBatch(patches.slice(i, i + 10))
    for (const r of updated) console.log(`   ✅  link fixed: ${r.fields.Name}`)
    if (i + 10 < patches.length) await new Promise(r => setTimeout(r, 250))
  }

  console.log('\n🎉  Done. Refresh the site (may take up to a minute — ISR cache) to see changes.\n')
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1) })
