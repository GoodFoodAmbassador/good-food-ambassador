#!/usr/bin/env node
// Usage: node scripts/fix-links-batch3.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 3: Seafood buy-link fixes, from the buy-link audit (21 products).
//   - 14 links fixed with real, browser-verified, product-specific URLs
//     (3 Vital Choice + 11 previously-generic brand links tightened to
//     the exact matching product page)
//   - 7 Vital Choice products set to Status='rejected' (hidden from the
//     live site, not deleted). These are NOT fabricated links like the
//     Grains removals — vitalchoice.com is a real, live site, but every
//     one of these species/products currently shows zero purchasable
//     inventory (their own site banner: "Due to unforeseen circumstances,
//     some items are temporarily unavailable"). Worth re-checking in a
//     few months in case Vital Choice restocks — see REMOVALS below for
//     which ones.
//   - 2 of the fixed links (Bela EVOO Sardines, Wild Planet Pacific
//     Mackerel) point to real, correct, specific product pages that
//     happen to be sold out at the moment — kept rather than removed,
//     since the page itself is genuine and will restock.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/fix-links-batch3.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const LINK_UPDATES = [
  // Vital Choice — real site, correct products, currently in stock
  { Name: 'Vital Choice Wild Sockeye Salmon Fillets',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.vitalchoice.com/v/wild-salmon/sockeye/FRF303' }] },
  { Name: 'Vital Choice Wild Pacific Albacore Tuna',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.vitalchoice.com/v/canned-pouched/canned-pouched-tuna/CTA306' }] },
  { Name: 'Vital Choice Wild Sockeye Salmon Roe (Ikura)',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.vitalchoice.com/v/wild-salmon/ikura-wild-salmon-caviar/FSE501' }] },

  // Bela Brand Seafood
  { Name: 'Bela Lightly Smoked Sardines in Lemon Olive Oil',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.belabrandseafood.com/products/sardines-in-extra-virgin-olive-oil-with-lemon-and-smoke-flavor' }] },
  { Name: 'Bela Sardines in Extra Virgin Olive Oil',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.belabrandseafood.com/products/sardines-in-extra-virgin-olive-oil-with-smoke-flavor' }] },

  // Fishwife
  { Name: 'Fishwife Smoked Atlantic Salmon',
    BuyLinks: [{ label: 'Order direct', url: 'https://eatfishwife.com/products/smoked-atlantic-salmon' }] },

  // Ortiz
  { Name: 'Ortiz Bonito del Norte Tuna in Olive Oil',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.conservasortiz.com/en/canned/white-tuna/in-olive-oil/' }] },
  { Name: 'Ortiz Cantabrian Anchovy Fillets in Olive Oil',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.conservasortiz.com/en/canned/anchovies/in-olive-oil/' }] },

  // Patagonia Provisions
  { Name: 'Patagonia Provisions Anchovies',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.patagonia.com/product/lemon-olive-spanish-white-anchovies/145061.html' }] },
  { Name: 'Patagonia Provisions Mackerel',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.patagonia.com/product/smoked-jack-mackerel/145302.html' }] },
  { Name: 'Patagonia Provisions Wild Pink Salmon',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.patagonia.com/product/canned-smoked-wild-pink-salmon/135201.html' }] },

  // Wild Planet
  { Name: 'Wild Planet Wild Albacore Tuna',
    BuyLinks: [{ label: 'Order direct', url: 'https://wildplanetfoods.com/products/wild-planet-albacore-tuna' }] },
  { Name: 'Wild Planet Wild Pacific Mackerel',
    BuyLinks: [{ label: 'Order direct', url: 'https://wildplanetfoods.com/products/pacific-mackerel' }] },
  { Name: 'Wild Planet Wild Sardines in Extra Virgin Olive Oil',
    BuyLinks: [{ label: 'Order direct', url: 'https://wildplanetfoods.com/products/wild-planet-sardines' }] },
]

// Vital Choice — real company, but zero purchasable inventory anywhere on
// their site for these right now (category pages return "no products
// available in this collection"). Different from a dead/fake link — worth
// re-checking later rather than treating as permanently gone.
const REMOVALS = [
  'Vital Choice Wild King Salmon Fillets',
  'Vital Choice Wild Coho Salmon Fillets',
  'Vital Choice Wild Alaskan Halibut Fillets',
  'Vital Choice Wild Alaskan Sablefish (Black Cod)',
  'Vital Choice Wild Pink Salmon (Canned)',
  'Vital Choice Wild Dungeness Crab Meat',
  'Vital Choice Wild Alaskan Spot Prawns',
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
  console.log('\n🔗  GFA Buy-Link Fix — Batch 3 (Seafood)\n')
  const idByName = await getAllRecordIds()
  console.log(`   ${Object.keys(idByName).length} existing records found\n`)

  const linkPatches = LINK_UPDATES
    .filter(u => { if (!idByName[u.Name]) { console.log(`   ⚠  Not found, skipping: ${u.Name}`); return false }; return true })
    .map(u => ({ id: idByName[u.Name], fields: { BuyLinks: JSON.stringify(u.BuyLinks) } }))

  const removalPatches = REMOVALS
    .filter(name => { if (!idByName[name]) { console.log(`   ⚠  Not found, skipping: ${name}`); return false }; return true })
    .map(name => ({ id: idByName[name], fields: { Status: 'rejected' } }))

  const all = [...linkPatches, ...removalPatches]
  for (let i = 0; i < all.length; i += 10) {
    const updated = await patchBatch(all.slice(i, i + 10))
    for (const r of updated) {
      const tag = r.fields.Status === 'rejected' ? '🗑  removed (out of stock sitewide)' : '✅  link fixed'
      console.log(`   ${tag}: ${r.fields.Name}`)
    }
    if (i + 10 < all.length) await new Promise(r => setTimeout(r, 250))
  }

  console.log('\n🎉  Done. Refresh the site (may take up to a minute — ISR cache) to see changes.\n')
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1) })
