#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch13.mjs <YOUR_PAT> [BASE_ID]
//
// Eighth and final batch of this PUG candidate-queue shortlist sweep.
// 5 brands with clear flagship products and working buy links.
// Certification research already logged in research/pug_candidate_queue.csv.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch13.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Longbottom Organic Guatemalan Coffee',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A shade-grown coffee farmed without chemical fertilizers, herbicides, or pesticides, preserving native plant and wildlife habitat -- roasted by one of the first US coffee roasters admitted to the USDA National Organic Program.',
    PillarClean: 'Certified Organic by Oregon Tilth (OTCO).',
    PillarFair: 'Fair Trade USA Certified.',
    PillarTrue: 'Both certifications (Oregon Tilth Organic, Fair Trade USA) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.longbottomcoffee.com/product/organic-guatemalan/25-0330-0-02-BOM-010742.html' }],
  },
  {
    Name: "Lorissa's Kitchen Original USDA Organic Steak Strips",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Smoked beef jerky steak strips made with 100% grass-fed and finished beef, slow-smoked for tenderness -- zero sugar and free from the top 9 allergens.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO Project) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Lorissas-Kitchen-Original-Organic-Strips/dp/B07VMYQ772' }],
  },
  {
    Name: "Lovebird Organic Grain-Free Cinnamon O's Cereal",
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A grain-free cereal made from cassava and coconut flour -- no refined sugar, paleo and keto friendly, tastes like real food.',
    PillarClean: 'USDA Certified Organic and Certified Gluten-Free.',
    PillarFair: 'Made with Fair Trade cassava, coconut, and coconut sugar -- a named, independently certified sourcing standard for the core ingredients.',
    PillarTrue: 'Both certifications (USDA Organic, Fair Trade) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Lovebird-Organic-Grain-Unsweetened-Cereal/dp/B0BD6N7DGW' }],
  },
  {
    Name: 'Maeve Chocolate Cabin S\'mores Truffle Bar',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A women-owned, direct-trade chocolate truffle bar -- 10% of net profits go back to the cacao farmers who supply it.',
    PillarClean: 'Non-GMO ingredients across the core line.',
    PillarFair: 'Rainforest Alliance Certified cocoa used where direct farmer sourcing isn\'t yet available -- a named, independently audited standard addressing labor and environmental conditions.',
    PillarTrue: 'The Rainforest Alliance certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Maeve-Chocolate-Cabin-Smores-Truffle/dp/B0FBLYDNJJ' }],
  },
  {
    Name: 'Maja Organic Overnight Oats, Banana Bread',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A single-serve overnight oats pouch with 20g plant-based protein per serving -- just add water or milk.',
    PillarClean: 'USDA Certified Organic, GFCO Certified Gluten-Free, and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'All three certifications (USDA Organic, GFCO, Non-GMO) are independently issued and publicly verifiable, and Kosher certification is also listed on current packaging.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://us.amazon.com/Maja-Organic-Overnight-Oats-Ingredients/dp/B0CYQH5PQ7' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-13 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
