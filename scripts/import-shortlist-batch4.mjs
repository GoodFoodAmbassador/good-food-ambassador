#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch4.mjs <YOUR_PAT> [BASE_ID]
//
// Global brand shortlist review -- batch 4, the final batch. Olive Oils &
// Condiments (6 brands) plus Seafood (1 brand) -- closes out all 21
// originally-selected shortlist candidates across the four categories
// reviewed this pass.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch4.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: "Auntie Rana's Smoked Chili Oil",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A Southeast Asian-style smoked chili oil condiment, part of a line rooted in the founder\'s childhood in Bangladesh (chili oil, achaar, mayo, jam).',
    PillarClean: 'No independent organic or B Corp certification found for this product.',
    PillarFair: 'The brand states it donates 5% of sales to wildlife rescue and conservation work in Southeast Asia, the U.S., and Canada -- a specific, named percentage commitment. We could not independently confirm the exact recipient organizations from third-party sources, so we\'re crediting the quantified giving commitment rather than asserting specific partner names.',
    PillarTrue: 'The 5% commitment is a specific, quantified figure stated directly by the brand, not a vague "gives back" claim -- though it remains a self-reported figure without third-party audit.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://auntieranas.com/products/smoked-chili-oil' }],
  },
  {
    Name: "Harry's Famous Sauce, Lemon Pepper Dill",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A citrus-forward pasta sauce made with US-grown tomatoes, lemon juice, and dill; gluten-free and plant-based.',
    PillarClean: 'Non-GMO Project Verified and Gluten-Free Certified. Additionally Upcycled Certified for its use of upcycled liquid mirepoix (carrots, celery, onions) via a collaboration with Matriark Foods -- an independently audited certification for food-waste-reduction ingredients.',
    PillarFair: 'Women-owned, WBENC certified. The brand states it donates 50% of net profits to partner organizations fighting hunger.',
    PillarTrue: 'Three independently issued certifications (Non-GMO Project, Gluten-Free, Upcycled Certified) plus WBENC status back this product; the 50%-of-net-profits hunger commitment is a specific figure, though self-reported rather than third-party audited.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://us.amazon.com/Harrys-Famous-Gluten-Free-Plant-Based-Keto-Friendly/dp/B0FTHZXSF3' }],
  },
  {
    Name: "Marianne's Harvest Regenerative Organic Certified Avocado Oil",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A single-ingredient, cold-pressed avocado oil grown in Northern California, positioned around lab-verified purity rather than marketing claims alone.',
    PillarClean: 'Regenerative Organic Certified (ROC) and USDA Certified Organic -- the first refined avocado oil to carry ROC certification. Also Seed Oil Free Certified.',
    PillarFair: 'No specific farm-level labor certification found beyond the ROC standard, which does include social fairness criteria for workers as part of its audit.',
    PillarTrue: 'All three certifications (ROC, USDA Organic, Seed Oil Free Certified) are independently administered and audited, not self-declared.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://mariannesharvest.com/product/regenerative-organic-certified-avocado-oil/' }],
  },
  {
    Name: "Nan's Original Recipes Organic Dressing",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'Seed-oil-free organic salad dressings and marinades, free of artificial flavors and preservatives, based on family recipes.',
    PillarClean: 'Certified Kosher, USDA Organic, Non-GMO Project Verified, and Certified Vegan -- four independent certifications on one product line.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the four product-level certifications.',
    PillarTrue: 'All four certifications are independently issued and verifiable, well past the single-certification bar this catalog requires.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://nansfoods.com/' }],
  },
  {
    Name: 'Racha Organics Mild Sriracha',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'Sriracha hot sauce made with Racha chili peppers grown exclusively on the brand\'s own estate farm in northern Thailand -- low-sugar, no artificial ingredients.',
    PillarClean: 'USDA Certified Organic; Non-GMO; gluten-free.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the USDA Organic certification, though single-estate sourcing gives full traceability to one named farm.',
    PillarTrue: 'The USDA Organic certification is independently issued and verifiable; single-estate origin is directly traceable rather than a blended, unverifiable "sourced from Thailand" claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Racha-Organics-Sriracha-Sauce-Certified/dp/B0CYL142CX' }],
  },
  {
    Name: "Taïm Olive Single-Estate Extra Virgin Olive Oil",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'Single-estate extra virgin olive oil hand-harvested from centuries-old olive trees (some nearly 1,000 years old) at Abou Ghaida Farms in Lebanon\'s Taïm Valley, family-run for five generations.',
    PillarClean: 'No independent organic or other product certification found for this specific oil.',
    PillarFair: 'The brand donates a portion of profits to SEAL, a named 501(c)(3) nonprofit (founded 1997) that funds community-led economic development projects for underserved communities across Lebanon -- a real, checkable organization rather than a vague giving claim.',
    PillarTrue: 'SEAL is an independently registered 501(c)(3) nonprofit, verifiable outside of Taïm Olive\'s own marketing -- though the specific portion of profits donated is not independently audited.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://taimolive.com/products/pre-sale-fall-2024-heirloom-olive-oil' }],
  },
  {
    Name: 'Nice Cans Sardines in Tomatoes and Peppers',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Wild-caught sardine conservas in organic tomatoes and peppers, high in protein and omega-3s, canned in Portugal.',
    PillarClean: 'Marine Stewardship Council (MSC) Certified -- an independently administered, audited sustainable-fishery certification, the seafood-category equivalent of Fair Trade or B Corp. Organic ingredients used where possible.',
    PillarFair: 'Direct partnership with named small fisheries and canneries in Portugal; founder Charlotte Langley serves as the MSC\'s Canadian Chef Ambassador.',
    PillarTrue: 'The MSC certification is independently issued and publicly verifiable through MSC\'s own registry, not a self-declared sustainability claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://justnicecans.com/products/sardines-in-tomatoes-and-peppers' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-4 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
