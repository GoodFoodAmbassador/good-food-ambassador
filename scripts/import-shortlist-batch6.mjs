#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch6.mjs <YOUR_PAT> [BASE_ID]
//
// First batch of PUG candidate-queue shortlist conversions (98 brands
// shortlisted so far, converting in waves). This batch: 12 well-established,
// easily source-verified brands with clear flagship products and working
// buy links. Certification research already logged in
// research/pug_candidate_queue.csv.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch6.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: "Bachan's Japanese Barbecue Sauce, The Original",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A Japanese-style barbecue and dipping sauce built on soy, mirin, green onion, garlic, and ginger -- cold-filled rather than heat-processed to preserve flavor.',
    PillarClean: 'Non-GMO Project Verified, no preservatives, BPA-free packaging.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO Project verification.',
    PillarTrue: 'The Non-GMO Project Verified certification is independently issued and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Bachans-Original-Japanese-Sauce-16-5/dp/B07YP13BRB' }],
  },
  {
    Name: 'Banza Chickpea Rotini',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Pasta made primarily from chickpeas instead of wheat -- higher in protein and fiber than traditional durum pasta, with a near-identical bite.',
    PillarClean: 'Non-GMO Project Verified and GFCO Certified Gluten-Free -- two independently issued certifications.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Non-GMO Project, GFCO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Banza-Chickpea-Pasta-Rotini-BANZA/dp/B01K85Z8XA' }],
  },
  {
    Name: 'CHOMPS Original Beef Stick',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A grass-fed and grass-finished beef snack stick with zero added sugar -- keto, paleo, and Whole30-friendly.',
    PillarClean: 'Non-GMO Project Verified across all products, Certified Gluten-Free, and Paleo Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'All three certifications (Non-GMO Project, Gluten-Free, Paleo) are independently issued and verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/CHOMPS-Original-Beef-Stick-1-15/dp/B07L6R17DS' }],
  },
  {
    Name: 'Chosen Foods Organic Avocado Oil',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A single-ingredient, high-smoke-point cooking oil made from 100% pure avocados, suitable for high-heat cooking.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both the USDA Organic and Non-GMO Project certifications are independently issued and verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/CHOSEN-FOODS-Organic-Avocado-33-81/dp/B0DVTFZDH3' }],
  },
  {
    Name: 'Dandies Vegan Marshmallows',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Gelatin-free marshmallows sweetened with tapioca and vegan cane sugar instead of corn syrup -- no artificial flavors or dyes.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO Project verification.',
    PillarTrue: 'The Non-GMO Project Verified certification is independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Dandies-Vegan-Marshmallow-Ounce-Pack/dp/B004UAX2VU' }],
  },
  {
    Name: 'Food Should Taste Good Sweet Potato Tortilla Chips',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Tortilla chips made with sweet potato and a hint of cane sugar, low in sodium and cholesterol-free.',
    PillarClean: 'Certified Gluten-Free, Certified Kosher, and Certified Vegan.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the three product certifications.',
    PillarTrue: 'All three certifications (Gluten-Free, Kosher, Vegan) are independently issued and verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Food-Should-Taste-Good-Tortilla/dp/B00BXX0EBS' }],
  },
  {
    Name: 'Chamberlain Coffee The Original Family Blend',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A medium-roast ground coffee blend with notes of milk chocolate, almond, and black cherry, roasted in California.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'Fair Trade Certified -- sourced through direct partnerships with smallholder coffee farming families.',
    PillarTrue: 'Both certifications (USDA Organic, Fair Trade) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Chamberlain-Coffee-Ground-Blend-Family/dp/B097WL1GPW' }],
  },
  {
    Name: 'Kuli Kuli Organic Moringa Powder',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Pure moringa leaf powder -- a nutrient-dense superfood green, one tablespoon equal to a full serving of leafy greens, for smoothies, tea, and baking.',
    PillarClean: 'USDA Certified Organic and Non-GMO.',
    PillarFair: 'Fair Trade Certified and Certified B Corporation; sourced from certified organic farms in Ghana and India through direct cooperative partnerships, prioritizing African and women-led social enterprises.',
    PillarTrue: 'Four independently issued certifications (USDA Organic, Non-GMO, Fair Trade, B Corp) back this brand -- an unusually well-documented supply chain for a West African/South Asian superfood ingredient.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Kuli-Organic-Moringa-Powder-Ounce/dp/B07FYP5NXK' }],
  },
  {
    Name: 'Just Date Organic Date Syrup',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A one-ingredient natural sweetener made from California medjool dates -- low-glycemic-index alternative to honey, maple, or agave.',
    PillarClean: 'USDA Certified Organic and certified organic by CCOF (California Certified Organic Farmers).',
    PillarFair: 'The company donates 2% of every sale to summer education programs for at-risk pre-diabetic youth -- a specific, named giving commitment.',
    PillarTrue: 'Both the USDA Organic and CCOF certifications are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Just-Date-Syrup-Award-Winning-Low-Glycemic/dp/B091G2FV4W' }],
  },
  {
    Name: 'Kokada Coconut Spread, Original',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A refined-sugar-free coconut spread positioned as a peanut butter/cookie butter alternative, peanut-free and school-safe.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'Ingredients sourced directly from the farmer per brand\'s own site, though no named third-party trade certification found beyond the organic seal.',
    PillarTrue: 'The USDA Organic certification is independently issued and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Kokada-Coconut-Spread-Original-11oz/dp/B0C1HJ31W9' }],
  },
  {
    Name: 'Loisa Organic Sazón Seasoning',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A classic Latin seasoning blend of organic spices and sea salt, with no MSG, artificial coloring, or fillers.',
    PillarClean: 'USDA Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Seasoning-Organic-Preservatives-Artificial-Coloring/dp/B07J6S95G2' }],
  },
  {
    Name: 'Lil Bucks Sprouted Buckwheat Crunch, Original',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Sprouted, dehydrated buckwheat seeds -- a paleo-friendly, gluten-free cereal/granola topper with a crunchy texture and high protein content.',
    PillarClean: 'USDA Certified Organic; the Sprouted Buckwheat Crunch line is Regenerative Organic Certified (ROC) -- the first ROC buckwheat supply chain built in the US.',
    PillarFair: 'Grown on certified regenerative family farms through direct partnerships with American farmers, including regenerative pioneers -- named and traceable rather than a vague sourcing claim.',
    PillarTrue: 'Both the USDA Organic and Regenerative Organic Certified designations are independently issued and publicly verifiable through each body\'s own registry.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Lil-Bucks-Paleo-Cereal-Buckwheat/dp/B083SCVM2T' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-6 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
