#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch8.mjs <YOUR_PAT> [BASE_ID]
//
// Third batch of PUG candidate-queue shortlist conversions. 12 brands with
// clear flagship products and working buy links. Certification research
// already logged in research/pug_candidate_queue.csv.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch8.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Carbone Marinara Pasta Sauce',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A premium Italian tomato sauce built from whole tomatoes imported from Italy with fresh basil, garlic, and herbs -- recipes from the New York City restaurant Carbone.',
    PillarClean: 'Non-GMO, gluten-free, no added sugar or preservatives, per the brand\'s own product listings.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level Non-GMO claim.',
    PillarTrue: 'The Non-GMO claim is consistent across retailer listings, though not tied to a single named third-party seal on the packaging described here -- worth verifying the actual jar label before treating as a full certification.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Carbone-Marinara-Italian-Tomatoes-Onions/dp/B0916QD9TW' }],
  },
  {
    Name: 'Catalina Crunch Protein Cereal, Cinnamon Toast',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A sugar-free breakfast cereal with 11g of protein per serving, sweetened with stevia and monk fruit instead of added sugar.',
    PillarClean: 'Non-GMO Project Verified and Certified Gluten-Free.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Non-GMO Project, Gluten-Free) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Catalina-Crunch-Cereal-Cinnamon-Toast/dp/B07WD631ZX' }],
  },
  {
    Name: 'Chewsy Peppermint Natural Chewing Gum',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A plastic-free chewing gum made with natural chicle tree base and sweetened entirely with xylitol -- no synthetic gum base or aspartame.',
    PillarClean: 'Certified Vegan and sugar-free/aspartame-free per the brand\'s own third-party-audited claims.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Vegan certification.',
    PillarTrue: 'The Vegan certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Peppermint-Plastic-Free-Sugar-Free-Aspartame-Free-Friendly/dp/B07WF4GLV7' }],
  },
  {
    Name: 'ChocXO Dark Chocolate Almond Butter Cups',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Dark chocolate cups filled with almond butter -- keto-friendly with low sugar and no artificial sweeteners.',
    PillarClean: 'USDA Certified Organic, Certified Gluten-Free, and Kosher.',
    PillarFair: 'Fairtrade ingredients are used across the ChocXO product line, per the brand\'s own certification listing.',
    PillarTrue: 'The four certifications (USDA Organic, Gluten-Free, Kosher, Fairtrade) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/ChocXO-Chocolate-Almond-Certified-Organic/dp/B08LW2LSJ5' }],
  },
  {
    Name: 'Cocomo Coconut Peanut Butter',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A coconut-and-peanut butter spread made with no seed oils -- gluten-free, vegan, and high in protein.',
    PillarClean: 'Certified Organic by Oregon Tilth Certified Organic (OTCO), a named third-party certifying body.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the OTCO organic certification.',
    PillarTrue: 'The OTCO certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Cocomo-Coconut-Organic-Protein-Healthy/dp/B0D7279476' }],
  },
  {
    Name: 'Coracao (CACOCO) Organic Drinking Chocolate',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A vegan drinking chocolate made from single-origin Peruvian cacao -- dairy-free, soy-free, and refined-sugar-free.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'Fair Trade Certified; cacao is sourced from Acopagro, a cooperative of more than 2,000 small organic cacao producers in Peru\'s San Martin region, paid Fair Trade wages or above.',
    PillarTrue: 'Both the USDA Organic and Fair Trade certifications are independently issued and publicly verifiable, and the named cooperative source adds a traceable supply chain.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/stores/CACOCO/page/6F136E0D-A470-4C4F-BFE6-4067DB9DF868' }],
  },
  {
    Name: 'CORE Foods Organic Overnight Oat Bar, Lemon Poppy Seed',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A refrigerated oat bar with live probiotics and prebiotics -- built on organic whole-grain oats, almonds, and lemon oil.',
    PillarClean: 'USDA Certified Organic, Non-GMO Project Verified, Certified Gluten-Free, and Kosher.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'All four certifications (USDA Organic, Non-GMO Project, Gluten-Free, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/CORE-Foods-Probiotics-Prebiotics-Refrigerated/dp/B07PNPY3N8' }],
  },
  {
    Name: 'Craize Sweet Corn Crisps',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Thin, toasted (never fried) corn crisps made from non-GMO sweet corn -- a plant-based cracker alternative.',
    PillarClean: 'Kosher Certified and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Kosher, Non-GMO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Craize-Extra-Crunchy-Toasted-Crisps/dp/B07T32JXR8' }],
  },
  {
    Name: 'Cravings by Chrissy Teigen Chocolate Chip Cookie Mix',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A baking mix for chocolate chip cookies, made without artificial ingredients.',
    PillarClean: 'Non-GMO Project Verified and Kosher Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Non-GMO Project, Kosher) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Cravings-Chrissy-Teigen-6-Piece-Chocolate/dp/B0DBJ6R2M7' }],
  },
  {
    Name: "Cybele's Free to Eat Chocolate Chip Vegan & Gluten-Free Cookies",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Soft-baked, allergen-free cookies made with non-GMO ingredients and no artificial flavors or colors -- baked in a dedicated gluten- and peanut-free facility.',
    PillarClean: 'Certified Gluten-Free and Certified Vegan.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Gluten-Free, Vegan) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Cybeles-Free-Chocolate-Gluten-Cookies/dp/B00MAXW468' }],
  },
  {
    Name: "D'vash Organic Date Syrup",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A one-ingredient sweetener made from 100% organic California dates -- a lower-sugar alternative to honey or maple syrup, rich in potassium and magnesium.',
    PillarClean: 'USDA Certified Organic, Non-GMO, and Kosher.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/ingredient-DVash-Organics-California-Substitute/dp/B06XPMLSPM' }],
  },
  {
    Name: 'DINO BARS Organic Fruit Bar, Strawberry',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A mess-free kids\' fruit bar made from just 10 ingredients -- fruit, oats, hemp hearts, and coconut oil, wrapped in edible paper.',
    PillarClean: 'USDA Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/DINO-BARS-Organic-Coconut-Strawberry/dp/B09RH9F9VP' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-8 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
