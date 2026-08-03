#!/usr/bin/env node
// Usage: node scripts/fix-links-batch5.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 5: Olive Oils — DEAD + WRONG BRAND buy-link fixes (24 products),
// from the buy-link audit. Most of these were real, respected European
// producers whose GFA-listed domain was simply wrong (missing a word,
// wrong TLD, hyphenation, etc.) or who don't sell direct-to-consumer at
// all and are only available through specialty importers — in which case
// a verified specialty retailer page (oliveoillovers.com, mtckitchen.com)
// is used instead, labeled "Find it" rather than "Order direct".

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/fix-links-batch5.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const LINK_UPDATES = [
  // Arvum (real brand, no direct-to-consumer site — via Olive Oil Lovers)
  { Name: 'Arvum Vinagre Gran Reserva',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/arvum-vinagre-gran-reserva' }] },
  { Name: 'Arvum Vinagre Reserva al Moscatel',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/arvum-vinagre-reserva-al-moscatel' }] },
  { Name: 'Arvum Vinagre Reserva al Pedro Ximenez',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/arvum-vinagre-reserva-al-pedro-ximenez' }] },

  // Casa del Agua
  { Name: 'Casa del Agua Vinagre de Jerez Reserva',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/casa-del-agua-vinagre-de-jerez-reserva' }] },

  // Entelia (Crete, Greece)
  { Name: 'Entelia Novello',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/entelia' }] },
  { Name: 'Entelia Private Reserve PDO Kolymvari',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/entelia-private-reserve' }] },

  // Frantoi Cutrera (real site was frantoicutrera.it, no hyphen — original had a stray hyphen)
  { Name: 'Frantoi Cutrera Primo Double Organic PDO Monte Iblei',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/frantoi-cutrera-primo-double-pdo-monte-iblei-organic' }] },

  // Frantoio Bonamini (real site is oliobonamini.com, not bonamini.it)
  { Name: 'Frantoio Bonamini IGP Balsamic Vinegar of Modena Gold Label',
    BuyLinks: [{ label: 'Order direct', url: 'https://oliobonamini.com/en/product/balsamic-vinegar-of-modena-i-g-p-gold-label/' }] },
  { Name: 'Frantoio Bonamini IGP Balsamic Vinegar of Modena Purple Label',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/frantoio-bonamini-pgi-balsamic-vinegar-of-modena-purple-label' }] },

  // Iannotta
  { Name: 'Iannotta Organic Garlic Flavored EVOO',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/iannotta-organic-crushed-garlic' }] },

  // Olio Guglielmi (real site is olioguglielmi.it, not guglielmi.it)
  { Name: 'Olio Guglielmi Crushed Chili Pepper EVOO',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/guglielmi-crushed-chili-pepper' }] },

  // Quattrociocchi
  { Name: 'Quattrociocchi Garlic Organic Infused EVOO',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/olio-quattrociocchi-garlic' }] },
  { Name: 'Quattrociocchi Olivastro Organic',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/quattrociocchi-olivastro' }] },
  { Name: 'Quattrociocchi Peperoncino Organic Infused EVOO',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/quattrociocchi-peperoncino' }] },
  { Name: 'Quattrociocchi Rosemary Organic Infused EVOO',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/quattrociocchi-rosemary' }] },
  { Name: 'Quattrociocchi Superbo Organic',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/quattrociocchi-superbo' }] },

  // Rincón de la Subbética (real producer site, direct order)
  { Name: 'Rincón de la Subbética',
    BuyLinks: [{ label: 'Order direct', url: 'https://almazarasdelasubbetica.com/en/products/rincon-de-la-subbetica/' }] },

  // Terre Francescane (real site is terrefrancescane.com, not .it)
  { Name: 'Terre Francescane Black Truffle Infused EVOO',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/terre-francescane-black-truffle' }] },
  { Name: 'Terre Francescane Lemon Infused EVOO',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/terre-francescane-limone' }] },
  { Name: 'Terre Francescane Peperoncino Infused EVOO',
    BuyLinks: [{ label: 'Find it', url: 'https://oliveoillovers.com/products/terre-francescane-peperoncino' }] },

  // WRONG BRAND fixes
  { Name: 'Kishibori Premium Shoyu',
    BuyLinks: [{ label: 'Find it', url: 'https://mtckitchen.com/products/kishibori-shoyu-premium-pure-artisan-soy-sauce-unadulterated-no-preservatives-24-3-fl-oz-720ml-1' }] },
  { Name: 'Mussini PGI Balsamic Vinegar of Modena 4 Gold Medals',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.mussini.it/en/product-category/balsamic-vinegar-of-modena/' }] },
  { Name: 'Mussini PGI Balsamic Vinegar of Modena 5 Gold Medals',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.mussini.it/en/product/acetaia-5-medaglie-balsamic-vinegar-of-modena/' }] },
  { Name: 'Mussini Saba Cooked Grape Must Condiment',
    BuyLinks: [{ label: 'Order direct', url: 'https://www.mussini.it/en/product/saba-sweet-and-sour-condiment/' }] },
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
  console.log('\n🔗  GFA Buy-Link Fix — Batch 5 (Olive Oils: dead + wrong-brand links)\n')
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
