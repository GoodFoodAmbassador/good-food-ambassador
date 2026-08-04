#!/usr/bin/env node
// Usage: node scripts/import-pug-batch5.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 5 (final): the last 10 PUG priority candidates (rows 102-111),
// closing out the full 110-brand priority queue. 3 of 10 cleared the
// certification-only bar and are imported below:
//
// - VEGOBEARS Santa Monica Organic Gummies: USDA Certified Organic, badge
//   confirmed directly on the brand's own site (vegobears.com), live
//   purchase confirmed at the actual storefront domain, getvegobears.com.
// - Victory Dance Foods Garden Granola, Carrot Turmeric: Certified
//   Gluten-Free by GFCO.org (named certifying body) plus verified 1% for
//   the Planet membership -- the brand's own site states "our giving is
//   certified and audited."
// - ZORA Pecan + Cherry chocolate bar: quantified give-back -- every bar
//   funds one day of schooling for a girl in rural Ghana through ZORA's own
//   Women's Economic Empowerment Program.
//
// 2 held for further verification (not imported): VYBE Snacks (organic
// claim only from third-party listings; brand's own site down with a DNS
// error) and ZAZ (organic claim corroborated by a third-party packaging
// photo but no certifying body named on the brand's own product page yet).
//
// 5 rejected: Tidbits/TiDBiTS Candy, Toodaloo (discontinued), Ya Albi, YAX,
// Zac's Sweet Shop -- see research/pug_priority110.csv for reasons.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-pug-batch5.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'VEGOBEARS Santa Monica Organic Gummies',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Vegan fruit gummy bears in a banana, pineapple, and strawberry blend, made with real fruit and vegetable juice for color instead of artificial dyes.',
    PillarClean: 'USDA Certified Organic (badge displayed directly on the brand\'s own site). Ingredients: organic tapioca syrup, organic cane sugar, water, pectin, citric acid, organic flavors, sodium citrate, organic fruit and vegetable juice.',
    PillarFair: 'No specific labor or trade certification found for this product.',
    PillarTrue: 'The brand calls itself "the only organic, vegan & clean ingredient gummy bear" -- a marketing claim we can\'t verify against every competitor, but the USDA Organic certification itself is confirmed and displayed on the brand\'s own site.',
    BuyLinks: [{ label: 'Order direct', url: 'https://getvegobears.com/products/santa-monica' }],
  },
  {
    Name: 'Victory Dance Foods Garden Granola, Carrot Turmeric',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A "juiced granola" blending whole organic carrots, turmeric, ginger, pineapple, and mango with gluten-free oats, ancient grains, and slivered almonds -- the whole plant, not just the juice.',
    PillarClean: 'Certified Gluten-Free by GFCO.org (Gluten-Free Certification Organization), a named independent certifying body.',
    PillarFair: 'Verified member of 1% for the Planet -- the brand\'s own site states "our giving is certified and audited for real, verified impact," donating 1% of revenue to vetted environmental causes every year.',
    PillarTrue: 'Both certifications (GFCO gluten-free and 1% for the Planet) are stated and verifiable directly on the brand\'s own product page -- no unverified claims needed here. The many organic-labeled ingredients are not covered by a single brand-wide organic certification, so we\'re not claiming that.',
    BuyLinks: [{ label: 'Order direct', url: 'https://victorydancefoods.com/shop/p/garden-granola-carrot-turmeric-8oz' }],
  },
  {
    Name: 'ZORA Pecan + Cherry Chocolate Bar',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Single-origin, bean-to-bar dark chocolate from Suhum, Ghana, blended with dried cherries and roasted pecans -- only 5 ingredients, no dairy or soy.',
    PillarClean: 'No independent organic or fair-trade certification found; the cocoa is labeled organic on the ingredient panel but not backed by a named certifying body.',
    PillarFair: "Every bar sold funds one day of schooling for a girl in rural Ghana through ZORA's own Women's Economic Empowerment Program -- a specific, quantified commitment tied directly to the cocoa-growing region the beans come from (Suhum, Ghana, ABOCFA Cooperative).",
    PillarTrue: "The give-back is self-administered by ZORA rather than run through a third-party certifier like 1% for the Planet, so we're crediting the specificity and quantification of the claim (one school day per bar) rather than an independent audit.",
    BuyLinks: [{ label: 'Order direct', url: 'https://zorachocolate.com/shop/chocolate/pecan-cherry/' }],
  },
]

async function createBatch(records) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      records: records.map(r => ({ fields: { ...r, BuyLinks: JSON.stringify(r.BuyLinks) } })),
    }),
  })
  const json = await res.json()
  if (!res.ok) { console.error('Error:', JSON.stringify(json, null, 2)); process.exit(1) }
  return json.records
}

async function main() {
  console.log(`Importing ${PRODUCTS.length} final-batch products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
