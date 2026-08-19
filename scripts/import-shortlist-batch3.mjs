#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch3.mjs <YOUR_PAT> [BASE_ID]
//
// Global brand shortlist review -- batch 3 of the 21 newly-selected brands
// (Low & No Alcohol category, final batch). 6 of 8 candidates imported below.
//
// 2 dropped from the original 8:
// - FedUp Foods: Certified B Corp, Certified Organic, Fair Trade Certified --
//   clears the certification bar, but operates as a B2B private-label
//   manufacturer with no direct consumer product or buy link of its own.
//   Not a catalog-appropriate entry without a specific retail product.
// - Guayaki: the company has rebranded as Yerba Madre (see PR Newswire,
//   "Guayakí Yerba Mate Rebrands as Yerba Madre," 2025) -- same company,
//   same certifications, new name. Keeping both would duplicate one brand
//   under two names, so only Yerba Madre (the current name) is imported.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch3.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Brew Dr. Kombucha Organic Superberry',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A raw, brewed kombucha made from organic whole tea leaves, dried herbs, roots, and fruits -- fermented rather than flavored after the fact.',
    PillarClean: 'Certified B Corporation and USDA Certified Organic; the first national kombucha company to be both carbon neutral and B Corp certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the B Corp assessment, which evaluates supply-chain and worker-impact practices at the company level.',
    PillarTrue: 'Both certifications (B Corp, USDA Organic) are independently issued and verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.brewdrkombucha.com/' }],
  },
  {
    Name: 'Mother Kombucha The Trop Organic',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A fruit-forward, live-cultured kombucha brewed with regeneratively farmed teas.',
    PillarClean: 'Certified B Corporation; certified organic and vegan.',
    PillarFair: 'WBENC Certified Women\'s Business Enterprise -- a named, independently verified certification of majority women ownership.',
    PillarTrue: 'The B Corp, organic, and WBENC certifications are all independently issued, not self-reported claims.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://us.amazon.com/Mother-Kombucha-Trop-Organic-Ounce/dp/B07QC7MS7Q' }],
  },
  {
    Name: 'Yerba Madre Organic Traditional Loose Leaf Yerba Mate',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'Shade-grown, hand-harvested yerba mate from the Atlantic Forest region of Argentina, Brazil, and Paraguay -- formerly sold under the Guayaki name, now rebranded as Yerba Madre.',
    PillarClean: 'Certified B Corporation and registered Social Purpose Corporation. USDA Certified Organic. The first yerba mate to reach Regenerative Organic Certified Gold status.',
    PillarFair: 'Fair for Life certified -- the first yerba mate in the world to hold this certification. Sourced through direct partnerships with 255 family farmers and Indigenous communities.',
    PillarTrue: 'Multiple independently issued certifications (B Corp, USDA Organic, Regenerative Organic Certified Gold, Fair for Life) back this brand, one of the most heavily certified in this category.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://yerbamadre.com/products/yerba-madre-traditional-loose-leaf' }],
  },
  {
    Name: 'ECOTEAS Organic Yerba Mate, Unsmoked',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'Air-dried (rather than wood-smoked) yerba mate, aged a minimum of nine months for a smoother flavor, sourced from a four-generation family farm in Misiones, Argentina.',
    PillarClean: 'USDA Certified Organic; Non-GMO; certified kosher.',
    PillarFair: 'Fair Trade Certified. Fair trade proceeds are documented as having funded specific infrastructure, school construction, and healthcare-access projects in the sourcing region.',
    PillarTrue: 'Both the USDA Organic and Fair Trade certifications are independently issued; the community-project claims are tied to specific, named outcomes rather than a vague "giving back" statement.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://yerbamate.com/products/organic-yerba-mate-100-tea-bags-ws' }],
  },
  {
    Name: 'Kraus Organic Yerba Mate',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A small, family-run yerba mate producer from Misiones, Argentina, using hot-air drying instead of smoke for a lighter, cleaner-tasting mate.',
    PillarClean: 'USDA Certified Organic and OIA (Organización Internacional Agropecuaria) certified -- Argentina\'s leading organic certifying body.',
    PillarFair: 'Fair Trade certified.',
    PillarTrue: 'All three certifications (USDA Organic, OIA, Fair Trade) are independently issued and displayed on the brand\'s own site.',
    BuyLinks: [{ label: 'Buy from The Argentino', url: 'https://theargentino.com/products/kraus-organic-yerba-mate-500g' }],
  },
  {
    Name: 'Noughty Alcohol-Free Sparkling Chardonnay (Thomson & Scott)',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A dealcoholized sparkling wine made from 100% organic Chardonnay grapes grown in southern Spain, fermented traditionally then vacuum-distilled to remove alcohol while retaining aroma.',
    PillarClean: 'Certified organic; the parent company, Thomson & Scott, is a Certified B Corporation.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification and the company-level B Corp assessment.',
    PillarTrue: 'Both the organic certification and the B Corp status are independently issued and verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://us.noughtyaf.com/products/noughty-alcohol-free-sparkling-wine' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-3 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
