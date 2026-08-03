#!/usr/bin/env node
// Usage: node scripts/fix-links-batch6.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 6: Olive Oils — GENERIC buy-link fixes (34 products), from the
// buy-link audit. Every link below was a live brand homepage rather than
// the specific product; each is now tightened to the exact, browser- or
// search-verified product page. A few brands (Citizens of Soil, FIORE)
// curate a rotating selection rather than selling one fixed SKU, so their
// specific shop/collection page is used deliberately rather than a single
// product URL.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/fix-links-batch6.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const LINK_UPDATES = [
  { Name: 'Ayvaco EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.ayvaco.com/products/ayvaco-500-ml-single-variety-extra-virgin-olive-oil' }] },
  { Name: 'Big Tree Farms Organic Coconut Aminos Smoked',
    BuyLinks: [{ label: 'Order direct', url: 'https://bigtreefarms.com/collections/aminos' }] },
  { Name: 'Bono Sicilia PGI EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.bonousainc.com/products/bono-sicilia-pgi-organic-sicilian-extra-virgin-olive-oil/' }] },
  { Name: 'Bragg Organic Liquid Aminos',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.bragg.com/products/liquid-aminos' }] },
  { Name: 'Brightland Alive EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://brightland.co/products/alive' }] },
  { Name: 'California Olive Ranch Classic EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.californiaoliveranch.com/products/100-california-everyday' }] },
  { Name: 'Canaan Fair Trade Organic EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://canaanpalestine.com/products/jenin-olive-oil' }] },
  { Name: 'Castillo de Canena Arbequina',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.castillodecanena.com/en/producto/arbequina-family-reserve/' }] },
  { Name: 'Castillo de Canena Cabernet Sauvignon Vinegar',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.castillodecanena.com/en/producto/red-balsamic-vinegar-cabernet-250-ml/' }] },
  { Name: 'Castillo de Canena Smoked Arbequina',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.castillodecanena.com/en/producto/oak-smoked-castillo-de-canena/' }] },
  { Name: 'Citizens of Soil EVOO',
    BuyLinks: [{ label: 'Shop the collection', url: 'https://www.citizensofsoil.com/collections/shop-olive-oil' }] },
  { Name: 'Clearspring Organic Japanese Tamari',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.clearspring.co.uk/products/organic-japanese-tamari-soya-sauce' }] },
  { Name: 'Cobram Estate Classic EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://shop.cobramestate.com/collections/cobram-estate-extra-virgin-olive-oils' }] },
  { Name: 'Coconut Secret Organic Coconut Aminos',
    BuyLinks: [{ label: 'Order direct', url: 'https://nutiva.com/products/the-original-coconut-aminos' }] },
  { Name: 'Colonna Granverde Lemon EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.marinacolonna.it/prodotto/granverde/' }] },
  { Name: 'Eden Foods Organic Shoyu',
    BuyLinks: [{ label: 'Order direct', url: 'https://store.edenfoods.com/shoyu-soy-sauce-organic-10-fl-oz/' }] },
  { Name: 'Equal Exchange Organic EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://shop.equalexchange.coop/products/organic-olive-oil-500' }] },
  { Name: 'FIORE Artisan Olive Oils',
    BuyLinks: [{ label: 'Shop the collection', url: 'https://www.fioreoliveoils.com/collections/all-products' }] },
  { Name: 'Graza Drizzle',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.graza.co/products/drizzle-glass' }] },
  { Name: 'Graza Sizzle',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.graza.co/products/sizzle' }] },
  { Name: 'Kirkland Signature EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.costco.com/p/-/kirkland-signature-organic-extra-virgin-olive-oil-2-l/100334841' }] },
  { Name: 'Kosterina Original EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.kosterina.com/products/singlebottle' }] },
  { Name: 'Masseria Estate Organic EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://masseriaestate.com/products/masseria-500ml-premium-organic-extra-virgin-olive-oil' }] },
  { Name: 'McEvoy Ranch Organic EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.mcevoyranch.com/products/organic-extra-virgin-olive-oil-1' }] },
  { Name: 'Nobleza del Sur Organic Day',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/nobleza-del-sur-organic-day' }] },
  { Name: 'Ohsawa Organic Nama Shoyu',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.goldminenaturalfoods.com/products/0501-1010' }] },
  { Name: 'Oleoestepa Egregio Organic',
    BuyLinks: [{ label: 'Order direct', url: 'https://tienda.oleoestepa.com/en/evoo-organic-premium-egregio-/54-organic-egregio-500-ml.html' }] },
  { Name: 'Oro del Desierto Organic Coupage',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/oro-del-desierto-coupage' }] },
  { Name: 'Oro del Desierto Organic Picual',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/oro-del-desierto-picual' }] },
  { Name: 'Papa Vince EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://papavince.com/products/family-made-extra-virgin-olive-oil-first-cold-pressed-single-sourced-from-sicily-italy-papa-vince' }] },
  { Name: 'San-J Organic Tamari',
    BuyLinks: [{ label: 'Order direct', url: 'https://san-j.com/product/organic-tamari-gluten-free-soy-sauce/' }] },
  { Name: 'Terra Delyssa Organic EVOO',
    BuyLinks: [{ label: 'Order direct', url: 'https://terradelyssa.com/products/organic-extra-virgin-olive-oil-1' }] },
  { Name: 'Wan Ja Shan Organic Tamari',
    BuyLinks: [{ label: 'Order direct', url: 'https://wanjashan.com/product/organic-tamari-soy-sauce/' }] },
  { Name: 'Yamasa Organic Soy Sauce',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.yamasausa.com/yamasa-products/organic-tamari' }] },
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
  console.log('\n🔗  GFA Buy-Link Fix — Batch 6 (Olive Oils: generic links tightened)\n')
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
