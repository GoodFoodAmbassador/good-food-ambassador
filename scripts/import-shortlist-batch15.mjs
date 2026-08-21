#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch15.mjs <YOUR_PAT> [BASE_ID]
//
// First real product-level import for the PUG candidate-queue "shortlisted"
// backlog (751-row research/pug_candidate_queue.csv). This session's
// research covered 19 brands (Matcha DNA through Nora); only 8 of them
// actually fit the site's category taxonomy -- olive-oils, grains,
// legumes, snacks, lna (low & no alcohol beverages), seafood -- and are
// included below. The other 11 (coffee, tea, sauces, dressings, dal, dairy
// -alternative milk, spice blends, soup) don't have a home in any of the 6
// valid categories and are NOT imported:
//   Matcha DNA (tea), Matchpoint (tea), Matriark Foods (tomato sauce),
//   Maya Kaimal (dal/ready meal), milkadamia (dairy-alt milk),
//   Monte's Fine Foods (pasta sauce), Mugsy (coffee), Nan's Original
//   Recipes (salad dressing), Natural Heaven (hearts-of-palm pasta --
//   not grain-based, doesn't fit "grains"), New York Shuk (spice blend),
//   NOOISH (soup).
// Also excluded: Moonshot -- fully merged/rebranded into Patagonia
// Provisions, which is later in the backlog, so treated as absorbed rather
// than a separate listing.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch15.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: "Michele's Original Granola",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Small-batch granola baked in Timonium, Maryland from whole rolled oats, nuts, and dried fruit -- vegan and gluten-free.',
    PillarClean: 'Non-GMO Project Verified; made with organic whole grain oats.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO certification.',
    PillarTrue: 'The Non-GMO Project Verified seal is independently issued and publicly verifiable, confirmed via the Non-GMO Project\'s own press release for this brand.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.michelesgranola.com/products/original' }],
  },
  {
    Name: 'MOSH Chocolate Brownie Crunch Brain Health Protein Bar',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A 12g-protein bar built around a "brain fuel" blend of lion\'s mane, ashwagandha, omega-3s, and collagen -- low sugar, low carb.',
    PillarClean: 'Certified Gluten-Free and Non-GMO; the whey-based line is OU-D Kosher certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Gluten-Free, Non-GMO, and Kosher certifications.',
    PillarTrue: 'All three certifications (Certified Gluten-Free, Non-GMO, OU Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://moshlife.com/products/chocolate-brownie-crunch' }],
  },
  {
    Name: 'Mozaics Organic Popped Veggie & Potato Chips, Sea Salt',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Popped (not fried or baked) veggie chips with visible peas and beans, lightly brushed with organic extra virgin olive oil -- made in a peanut- and tree-nut-free facility.',
    PillarClean: 'Certified Organic, Non-GMO, and Kosher.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic, Non-GMO, and Kosher certifications.',
    PillarTrue: 'All three certifications (Certified Organic, Non-GMO, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/stores/MozaicsChips/page/A1517AEB-9CA8-4238-8246-83EF22ECEC5D' }],
  },
  {
    Name: 'Munk Pack Keto Nut & Seed Bar Variety Pack',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A whole-food, low-sugar nut and seed bar sweetened with allulose instead of artificial sweeteners -- gluten-free and plant-based.',
    PillarClean: 'Non-GMO Project Verified across the full product line.',
    PillarFair: 'OU Kosher Certified by the Orthodox Union, on top of the Non-GMO certification.',
    PillarTrue: 'Both certifications (Non-GMO Project, OU Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://munkpack.com/products/keto-nut-seed-bar-variety-6-pack' }],
  },
  {
    Name: 'Myna Snacks Midnight Mini Snacking Cookies',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Gluten- and dairy-free mini chocolate cookies made in a dedicated gluten-free facility with a flour blend of almond, organic cassava, and organic coconut flour.',
    PillarClean: 'GFCO Certified Gluten-Free.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Gluten-Free certification; the brand markets the line as seed-oil free but that claim is not independently certified.',
    PillarTrue: 'The GFCO Certified Gluten-Free seal is independently issued and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Myna-Snacks-Midnight-Mini-Cookies/dp/B0CTBNQV2N' }],
  },
  {
    Name: 'Nantucket Crisps, Sea Salt',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Small-batch, kettle-style potato chips fried in 100% avocado oil -- thin and crispy, island-inspired flavors.',
    PillarClean: 'Non-GMO, Certified Gluten-Free, and Kosher Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO, Gluten-Free, and Kosher certifications; the brand supports whale conservation per its own site.',
    PillarTrue: 'All three certifications (Non-GMO, Gluten-Free, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://nantucketcrisps.com/collections/shop-all' }],
  },
  {
    Name: 'Neolea Extra Virgin Olive Oil',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A single-origin, early-harvest, high-polyphenol extra virgin olive oil from 100% Koroneiki olives, hand-picked and milled within 4 hours in Laconia, Greece.',
    PillarClean: 'PDO (Protected Designation of Origin) certified under EU Regulation 1151/2012, guaranteeing origin, cultivar, and harvest window; HACCP-certified organic via DIO, Greece.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the PDO and organic certifications.',
    PillarTrue: 'Both certifications (EU PDO, HACCP-organic via DIO) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://neolea.com/en-us/products/extra-virgin-olive-oil-us' }],
  },
  {
    Name: 'Nora Crispy Seaweed Snacks, Original',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Crispy seaweed snacks made from sustainably sourced porphyra seaweed and rice bran oil -- gluten-free and vegan.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO certification; the brand cites sustainable seaweed sourcing on its own site.',
    PillarTrue: 'The Non-GMO Project Verified seal is independently issued and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.norasnacks.com/products/original-crispy-6pk' }],
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
  console.log(`Importing ${PRODUCTS.length} batch-15 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
