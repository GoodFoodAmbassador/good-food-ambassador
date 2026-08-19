#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch1.mjs <YOUR_PAT> [BASE_ID]
//
// Global brand shortlist review -- batch 1 of the 21 newly-selected brands
// (Grains & Noodles + Legumes & Pulses categories). 7 of 8 candidates from
// this group are imported below; Palestine Fair Trade Association was
// dropped as a duplicate of Canaan Fair Trade (PFTA is the farmer
// cooperative union behind Canaan's retail products, not a separate
// commercial brand with its own product line).

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch1.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Felicia Organic Chickpea Fusilli (Andriani S.p.A.)',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A gluten-free pasta made from 100% organic chickpeas -- 22g protein and 14g fiber per serving, from a single-ingredient flour rather than a blended gluten-free starch mix.',
    PillarClean: 'Certified B Corporation (Andriani S.p.A., since 2022). Made in Andriani\'s dedicated allergen-free facility in Gravina in Puglia, Italy -- the only Italian pasta plant of its kind, which controls the full milling-to-packaging process on site.',
    PillarFair: 'No specific farm-level labor or trade certification found for the chickpea supply chain.',
    PillarTrue: 'The B Corp certification is independently verified and covers the whole company, not just this product line -- a broader governance and impact standard rather than a single-ingredient claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Felicia-Chickpea-Fusilli-Designed-Chickpeas/dp/B0FPDT3Q65' }],
  },
  {
    Name: 'Lotus Foods Organic Forbidden Rice',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Whole-grain black rice, naturally high in anthocyanin antioxidants, sold under the name "Forbidden Rice" after its historic reservation for Chinese imperial tables.',
    PillarClean: 'Certified B Corporation. USDA Certified Organic.',
    PillarFair: 'Sourced through a multi-country network of small family rice farms (including growers in China\'s Heilongjiang region) that Lotus Foods states are paid organic and Fair Trade premiums; over 25 million pounds imported this way since 1995.',
    PillarTrue: 'Both the B Corp and USDA Organic certifications are independently issued and verifiable; the Fair Trade premium claim is the company\'s own account of its sourcing relationships rather than a single named third-party fair-trade certifier on this specific product.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.lotusfoods.com/collections/forbidden%C2%AE-rice' }],
  },
  {
    Name: 'Alter Eco Royal Heirloom Quinoa',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Pre-rinsed heirloom quinoa (white, red, or black varieties) grown from seed lines native to the Bolivian altiplano.',
    PillarClean: 'Certified B Corporation. USDA Certified Organic.',
    PillarFair: 'Certified Fair for Life -- Fair Trade, a named independent certifying body, covering the Bolivian farming communities that grow the quinoa.',
    PillarTrue: 'All three certifications (B Corp, USDA Organic, Fair for Life) are independently issued and displayed on the product itself, not self-reported claims.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.alterecofoods.com/collections/quinoa' }],
  },
  {
    Name: 'Malys Angkor Phka Rumduol Jasmine Rice',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A fragrant, naturally sweet jasmine rice variety grown in Cambodia; Phka Rumduol under the Malys Angkor mark has been named World\'s Best Rice at the TRT World Rice Conference five times, most recently in 2022.',
    PillarClean: 'Malys Angkor is a certification mark owned and administered by the Cambodia Rice Federation, verifying the rice\'s origin, variety, and quality standards -- not a self-applied brand name.',
    PillarFair: 'No specific farm-level labor or trade certification (e.g. Fair Trade) found beyond the origin/quality certification itself.',
    PillarTrue: 'The Malys Angkor mark is a named, third-party-administered certification tied to verified Cambodian origin -- distinct from an unverifiable "product of Cambodia" marketing claim.',
    BuyLinks: [{ label: 'Buy from Khmer Foods', url: 'https://khmerfoods.com/phka-malis-jasmine-rice.html' }],
  },
  {
    Name: 'Srisangdao Khao Hom Mali Thung Kula Rong-Hai Rice',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Thai jasmine rice (Khao Dawk Mali 105 variety) grown in the Thung Kula Rong-Hai plain of northeast Thailand, prized for its natural aroma and soft texture.',
    PillarClean: 'Grown under Thailand\'s "Khao Hom Mali Thung Kula Rong-Hai" Protected Geographical Indication (PGI) -- the first Thai GI registered in the EU (2013), legally restricting the name to rice grown, harvested, and processed within the designated five-province plain using traditional single-annual-crop methods.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the GI designation.',
    PillarTrue: 'The PGI is a government- and EU-registered geographic certification, independently verifiable and legally protected -- not a self-described origin story.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://srisangdao.com/trade?lang=en' }],
  },
  {
    Name: 'Canaan Fair Trade Crushed Green Freekeh',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Freekeh -- ancient Palestinian green wheat, harvested young, flame-roasted, and sun-dried -- delivering more fiber and protein than most other whole grains.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'Fair Trade Certified, plus ROC Certified (Regenerative Organic Certified). Produced by over 1,700 farmers organized in cooperatives represented by the Palestine Fair Trade Association in the West Bank.',
    PillarTrue: 'Three independently issued certifications (USDA Organic, Fair Trade, ROC) back this product -- an unusually well-documented chain from named farmer cooperatives to shelf.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://canaanpalestine.com/products/freekeh-hearty-wholesome' }],
  },
  {
    Name: 'Ceres Organics Red Split Lentils',
    Category: 'legumes',
    Status: 'approved',
    PillarGood: 'Organic red split lentils -- a wholefood staple pulse, naturally low in fat, high in plant protein and dietary fiber.',
    PillarClean: 'Certified B Corporation (over 40 years operating). Certified organic; BPA-free packaging.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'Both the B Corp and organic certifications are independently issued and displayed on the brand\'s own site.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://ceres.co.nz/products/10645-organic-lentils-red-split-500g' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-1 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
