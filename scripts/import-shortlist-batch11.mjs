#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch11.mjs <YOUR_PAT> [BASE_ID]
//
// Sixth batch of PUG candidate-queue shortlist conversions. 10 brands with
// clear flagship products and working buy links. Certification research
// already logged in research/pug_candidate_queue.csv. (House of Yes and
// Jackson's were skipped this round -- name collisions with unrelated
// products/brands made direct verification unreliable; left flagged for
// re-check with a narrower search.)

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch11.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Hebel & Co Double Chocolate Halva',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A tahini-based halva made with real chunks of dark chocolate -- the only premium halva handcrafted in the United States, made in Los Angeles.',
    PillarClean: 'USDA Certified Organic, Certified Gluten-Free, Kosher, and Certified Vegan.',
    PillarFair: 'The dark chocolate used is fair trade sourced, per the brand\'s own ingredient listing.',
    PillarTrue: 'The four certifications (USDA Organic, Gluten-Free, Kosher, Vegan) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Hebel-Co-Organic-Double-Chocolate/dp/B08Z5PSVZJ' }],
  },
  {
    Name: 'Heilala Vanilla with Seeds',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A gourmet vanilla syrup made with real vanilla bean seeds, for baking and desserts.',
    PillarClean: 'Sustainably and ethically sourced, per the brand\'s own site.',
    PillarFair: 'Certified B Corporation -- the world\'s first vanilla company to earn the certification; grown in partnership with a Tongan farming community as a cyclone-recovery project, with a vertically integrated supply chain built for farmer transparency and fair returns.',
    PillarTrue: 'The B Corp certification is independently administered by B Lab and publicly verifiable in B Lab\'s directory.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Gourmet-Vanilla-Seeds-Sustainably-Hand-Picked/dp/B09KMGGSS5' }],
  },
  {
    Name: 'Heraclea Early Harvest Extra Virgin Olive Oil',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A polyphenol-rich, first cold-pressed extra virgin olive oil, family-farmed and produced on Mount Latmos in Turkey.',
    PillarClean: 'Made from PDO-certified Memecik olives (Protected Designation of Origin) and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the PDO designation, which ties the product to a named family-farm origin.',
    PillarTrue: 'The PDO certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Heraclea-Organic-Pressed-Polyphenols-Authentic/dp/B0C578VZR5' }],
  },
  {
    Name: 'Hoboken Farms Marinara Sauce, Basil',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A family-owned pasta sauce made with whole tomatoes and pure olive oil, no sugar added -- Wall Street Journal blind-taste-test winner.',
    PillarClean: 'Non-GMO Project Verified and Certified Gluten-Free.',
    PillarFair: 'Kosher Certified.',
    PillarTrue: 'All three certifications (Non-GMO Project, Gluten-Free, Kosher) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Hoboken-Farms-Marinara-Sauce-Certified/dp/B09ZYSQ4FH' }],
  },
  {
    Name: 'Hola Mija Organic Beef Tallow Tortilla Chips',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Tortilla chips cooked in beef tallow instead of seed oils, made with ingredients sourced from Southern California.',
    PillarClean: 'Certified Organic and Non-GMO, per the brand\'s own site.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The organic certification is independently administered, though sourced from the brand\'s own site rather than a major retailer listing -- worth a quick label check to confirm the certifying body.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://holamijachips.com/products/organic-beef-tallow-tortilla-chips' }],
  },
  {
    Name: "Homestead's Datil Pepper Hot Sauce",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A medium-heat hot sauce made with datil peppers, farm-fresh and all-natural, with a sweet and tangy flavor.',
    PillarClean: 'Kosher Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Kosher certification.',
    PillarTrue: 'The Kosher certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Homesteads-All-Natural-Perfect-Seafood-Bottles/dp/B0DMFSZPR6' }],
  },
  {
    Name: 'Hope & Sesame Organic Sesame Milk, Unsweetened Original',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A shelf-stable, non-dairy milk made from sesame -- the world\'s only Upcycled Certified plant milk, using the nutrient-dense pulp left over from pressing sesame oil.',
    PillarClean: 'USDA Certified Organic, Non-GMO, and Certified Gluten-Free.',
    PillarFair: 'OU Kosher Certified and Upcycled Certified -- turning what would otherwise be food-industry waste into the product\'s main ingredient.',
    PillarTrue: 'All four certifications (USDA Organic, Gluten-Free, Kosher, Upcycled) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Hope-Sesame-Organic-Unsweetened-Original/dp/B07HBC8DXZ' }],
  },
  {
    Name: 'Humble Potato Chips, The Original',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Potato chips cooked skin-on with organic Ontario-grown potatoes, packaged in Canada\'s first fully compostable bag.',
    PillarClean: 'Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The organic certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Humble-Potato-Chips-Co-Original/dp/B0BZTFW2SZ' }],
  },
  {
    Name: 'iMind Brain Food Snack Bar, Original',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A nut-free snack bar formulated with brain-supporting ingredients like bacopa, lutein, omega 3-6, and choline.',
    PillarClean: 'USDA Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://us.amazon.com/iMind-Brain-Food-Snack-Bar/dp/B0F1ZBVF3J' }],
  },
  {
    Name: 'Joolies Organic Whole Medjool Dates',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Fresh medjool dates handpicked and grown in the Coachella Valley of Southern California -- no added sugar.',
    PillarClean: 'USDA Certified Organic and glyphosate residue free.',
    PillarFair: 'Kosher and Halal Certified.',
    PillarTrue: 'All three certifications (USDA Organic, Kosher, Halal) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Joolies-Organic-Medjool-California-Occasion/dp/B0844SVYWJ' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-11 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
