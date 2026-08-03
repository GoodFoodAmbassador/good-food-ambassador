#!/usr/bin/env node
// Usage: node scripts/fix-links-batch4.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 4: Snacks buy-link fixes, from the buy-link audit.
// 8 of 10 products fixed — homepage-only links tightened to the exact,
// browser-verified product page. 2 products intentionally left untouched
// pending a decision (see NEEDS_DECISION notes below) — not included in
// this script.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/fix-links-batch4.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const LINK_UPDATES = [
  { Name: 'Barnana Organic Plantain Chips',
    BuyLinks: [{ label: 'Order direct', url: 'https://barnana.com/products/organic-plantain-chips-himalayan-pink-salt' }] },
  { Name: 'Fly By Jing Sichuan Chili Crisp',
    BuyLinks: [{ label: 'Order direct', url: 'https://flybyjing.com/products/sichuan-chili-crisp' }] },
  { Name: 'Hu Kitchen Almond Butter Dark Chocolate Bar',
    BuyLinks: [{ label: 'Order direct', url: 'https://hukitchen.com/products/hu-almond-butter-puffed-quinoa' }] },
  { Name: 'Hu Kitchen Simple Dark Chocolate Bar',
    BuyLinks: [{ label: 'Order direct', url: 'https://hukitchen.com/products/hu-simple' }] },
  { Name: "Kate's Real Food Lemon Coconut Bar",
    BuyLinks: [{ label: 'Order direct', url: 'https://katesrealfood.com/products/lemon-coconut' }] },
  { Name: 'LesserEvil Organic Himalayan Pink Salt Popcorn',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.lesserevil.com/products/himalayan-pink-salt-organic-popcorn' }] },
  { Name: 'Siete Grain-Free Tortilla Chips',
    BuyLinks: [{ label: 'Order direct', url: 'https://sietefoods.com/shop/chips-and-snacks/grain-free-tortilla-chips/sea-salt-grain-free-tortilla-chips/?size=5oz' }] },
  { Name: 'Simple Mills Almond Flour Crackers',
    BuyLinks: [{ label: 'Find near you', url: 'https://simplemills.com/Products/Product/Fine-Ground-Sea-Salt-Almond-Flour-Crackers.aspx' }] },
]

// NOT included in this batch — flagged for a decision, see chat:
//   'Navitas Organics Cacao Blueberry Power Snack' — no such combo product
//     exists on navitasorganics.com; only separate "Cacao Goji" and
//     "Blueberry Hemp" Power Snacks are sold.
//   'Primal Kitchen Dark Chocolate Almond Bar' — Primal Kitchen's own site
//     no longer sells any bars at all (dressings/sauces/collagen only now);
//     the bar line appears discontinued at the source.

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
  console.log('\n🔗  GFA Buy-Link Fix — Batch 4 (Snacks)\n')
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
