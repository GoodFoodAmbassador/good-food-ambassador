#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch16.mjs <YOUR_PAT> [BASE_ID]
//
// Second product-level import from the PUG candidate-queue "shortlisted"
// backlog. Covers the remaining 38 brands (Nostimo Olive Oil through Somos)
// -- this completes the full backlog researched from
// research/pug_candidate_queue.csv. 29 of the 38 fit the site's category
// taxonomy (olive-oils, grains, legumes, snacks, lna, seafood) and are
// included below.
//
// NOT included -- genuine certifications confirmed, but the product type
// has no home in any of the 6 valid categories (coffee, tea, sauces,
// energy drinks, dairy-alternative milk, spice blends):
//   OCA Foods (energy drink), Otamot (pasta sauce), Pecana (pecan milk),
//   PERC Coffee (coffee), Pinch Spice Market (spices), Racha Organics
//   (sriracha/hot sauce), RISE Brewing Co. (cold brew coffee), Slingshot
//   Coffee Co. (coffee), Rishi Tea & Botanicals (tea).
//
// This completes the batch15/batch16 pass on the shortlisted backlog. With
// this, every brand in research/pug_candidate_queue.csv marked
// "shortlisted" that (a) has a confirmed named certification and (b) makes
// a product that fits the site's 6 categories has now been imported
// (batch6-13, batch14, batch15, batch16).

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch16.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Nostimo Extra Virgin Olive Oil',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: '100% Koroneiki-variety extra virgin olive oil from a privately owned grove in Lechaina, Ilia, Greece, founded by a chef blending traditional and contemporary olive-oil craft.',
    PillarClean: 'Kosher Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Kosher certification.',
    PillarTrue: 'The Kosher certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://nostimooliveoil.com/shop/' }],
  },
  {
    Name: 'NUDEGREENS Freeze-Dried Superfood Snacks',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Fruit and vegetable snacks freeze-dried at peak ripeness to lock in up to 97% of original flavor, color, and nutrients -- no heat treatment, no preservatives, no artificial ingredients.',
    PillarClean: 'Certified Organic and Kosher.',
    PillarFair: 'Fair Trade Certified; the brand partners directly with small-scale farmers and cooperatives per its own site.',
    PillarTrue: 'All three certifications (Organic, Fair Trade, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.nudegreens.us/' }],
  },
  {
    Name: 'OffLimits Cereal, Zombie',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A grain-free, gluten-free, dairy-free kids\' cereal built from rice flour, organic cane sugar, oat flour, pea fiber, and coconut flour -- no artificial dyes.',
    PillarClean: 'Non-GMO Project Verified and Kosher Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO and Kosher certifications.',
    PillarTrue: 'Both certifications (Non-GMO Project, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.eatofflimits.com/' }],
  },
  {
    Name: 'Olyra Raspberry Fruit & Grain Bars',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Soft-baked breakfast bars filled with real fruit, made with stone-milled ancient Greek grains grown by local farmers -- lower sugar, higher fiber than typical breakfast biscuits.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic and Non-GMO certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO Project) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://olyrafoods.com/products/raspberry-filled-breakfast-biscuits' }],
  },
  {
    Name: 'One Trick Pony Silky Smooth Organic Peanut Butter',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A clean-protein peanut butter made with organically grown Argentinian peanuts and Patagonian sea salt, from a female-founded, Argentinian-American family company.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified.',
    PillarFair: 'Star-K Kosher Certified, on top of the organic and Non-GMO certifications.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO Project, Star-K Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/One-Trick-Pony-Organic-Peanut/dp/B0DVWGDSKR' }],
  },
  {
    Name: "Otto's Naturals Cassava Flour",
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A grain-free, nut-free, 1-to-1 wheat flour alternative made entirely from non-GMO yuca root -- suitable for paleo and AIP baking.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO certification.',
    PillarTrue: 'The Non-GMO Project Verified seal is independently issued and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.ottosnaturals.com/products/ottos-organic-cassava-flour' }],
  },
  {
    Name: 'Outstanding Foods Original PigOut Pigless Pork Rinds',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A plant-based, vegan alternative to pork rinds -- crunchy, high-protein, made without any animal product.',
    PillarClean: 'Non-GMO Project Verified and Certified Gluten-Free.',
    PillarFair: 'Certified Kosher, on top of the Non-GMO and Gluten-Free certifications.',
    PillarTrue: 'All three certifications (Non-GMO Project, Gluten-Free, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://us.amazon.com/Pigless-Protein-Plant-Based-Non-GMO-Original/dp/B089B8JV6X' }],
  },
  {
    Name: 'Pari Foods Certified Organic Brown Rice',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Rice grown and milled by a 5th-generation rice-growing family business, sourced from the Punjab region of India -- full farm-to-fork traceability.',
    PillarClean: 'USDA NOP Certified Organic.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification; the company is minority- and women-owned per CCOF\'s member directory.',
    PillarTrue: 'The USDA NOP Certified Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://parifoods.com/' }],
  },
  {
    Name: 'Partake Foods Soft Baked Chocolate Chip Cookies',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A soft-baked cookie free from the top 9 allergens (dairy, wheat, soy, eggs, peanuts, and more), baked in a dedicated gluten-free facility.',
    PillarClean: 'Certified Gluten-Free and Non-GMO Project Verified.',
    PillarFair: 'Certified Vegan and Kosher, on top of the Gluten-Free and Non-GMO certifications.',
    PillarTrue: 'All four certifications (Gluten-Free, Non-GMO, Vegan, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Partake-Foods-Chocolate-Baked-Cookie/dp/B08HRPM9L6' }],
  },
  {
    Name: 'Pastabilities Organic Farm Shapes Pasta',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Fun-shaped kids\' pasta from a manufacturer with over 30 years of pasta-making experience and full supply-chain control from recipe to shipping.',
    PillarClean: 'USDA Certified Organic by the Global Organic Alliance.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The Global Organic Alliance certification is an independently administered, publicly verifiable USDA-accredited organic certifying body.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://worldofpastabilities.com/' }],
  },
  {
    Name: 'Patagonia Provisions Organic Penne Pasta',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A high-fiber, 8g-protein organic pasta made from regeneratively grown wheat -- part of Patagonia\'s food arm focused on soil health and biodiversity.',
    PillarClean: 'Regenerative Organic Certified and Non-GMO.',
    PillarFair: 'Certified B Corporation, on top of the Regenerative Organic and Non-GMO certifications.',
    PillarTrue: 'All three certifications (Regenerative Organic Certified, Non-GMO, B Corp) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Patagonia-Provisions-Organic-Regenerative-Certified%C2%AE/dp/B0CVJZ8TLD' }],
  },
  {
    Name: 'Pipcorn Sea Salt Heirloom Mini Popcorn',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Mini popcorn made from heirloom corn sourced direct from American family farms -- no artificial colors or dyes.',
    PillarClean: 'Non-GMO Project Verified and Certified Gluten-Free.',
    PillarFair: 'Certified Vegan and Kosher, on top of the Non-GMO and Gluten-Free certifications.',
    PillarTrue: 'All four certifications (Non-GMO Project, Gluten-Free, Vegan, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.pipsnacks.com/products/sea-salt-mini-heirloom-popcorn' }],
  },
  {
    Name: 'Power Up High Energy Trail Mix',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A high-energy trail mix of walnuts, cashews, banana chips, coconut, cranberries, and papaya -- 100% natural nuts and fruit, no additives.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'Certified Kosher, on top of the Non-GMO certification.',
    PillarTrue: 'Both certifications (Non-GMO Project, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Power-Up-Gourmet-Walnuts-Cranberries/dp/B0BGMHKVHV' }],
  },
  {
    Name: 'Puffworks Original Organic Peanut Butter Puffs',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A four-ingredient, zero-added-sugar peanut butter puff snack with 4-5g of plant-based protein per serving.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified.',
    PillarFair: 'OU-D Kosher Certified, on top of the organic and Non-GMO certifications.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO Project, OU-D Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://puffworks.com/products/puffworks-organic-peanut-butter-puffs-original-12-single-serve-bags' }],
  },
  {
    Name: 'Raaka Classic Dark Baking Chocolate',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Unroasted, bean-to-bar dark chocolate made by hand in a Brooklyn factory from traceable, single-origin cacao -- a low-temperature process that preserves each region\'s natural flavor.',
    PillarClean: 'Certified Organic.',
    PillarFair: 'Fair Trade Certified; the brand also runs its own "Transparent Trade" program paying farmers above standard fair-trade prices, per its own site.',
    PillarTrue: 'Both certifications (Certified Organic, Fair Trade) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.raakachocolate.com/' }],
  },
  {
    Name: 'Real Food From The Ground Up Cauliflower Potato Chips',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Potato chips with real cauliflower always in the top 3 ingredients -- no artificial flavors, colors, or preservatives.',
    PillarClean: 'Non-GMO Project Verified and Certified Gluten-Free.',
    PillarFair: 'Certified Vegan, on top of the Non-GMO and Gluten-Free certifications.',
    PillarTrue: 'All three certifications (Non-GMO Project, Gluten-Free, Vegan) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://fromthegroundupsnacks.com/pages/shop' }],
  },
  {
    Name: 'Renewal Mill Organic Okara Flour',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'An upcycled, high-fiber, low-carb flour made from okara -- the soymilk-processing pulp that would otherwise go to waste -- 20g fiber and 7g protein per serving.',
    PillarClean: 'Certified Organic by CCOF (California Certified Organic Farmers).',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification; the ingredient itself is upcycled food waste per the brand\'s own model.',
    PillarTrue: 'The CCOF Certified Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Renewal-Mill-Gluten-Free-Gluten-free-Ingredient/dp/B07Y8V1JQR' }],
  },
  {
    Name: 'RIND Snacks Tropical Dried Fruit Blend',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Whole dried-fruit snacks made with the peel included for extra fiber and vitamins -- all-natural, USA-grown fruit, no added sugar.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO certification.',
    PillarTrue: 'The Non-GMO Project Verified seal is independently issued and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.rindsnacks.com/' }],
  },
  {
    Name: 'Rivalz Late Night Pizza Stuffed Snacks',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A protein-packed, dual-textured veggie snack bite with 8g of plant protein -- vegan, dairy-free, and free of the top allergens.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO certification.',
    PillarTrue: 'The Non-GMO Project Verified seal is independently issued and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://rivalzsnacks.com/products/variety-pack' }],
  },
  {
    Name: 'Santana Snacks Sea Salt Organic Corn Chips',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A heritage-first, Mexican-American corn chip made with all-natural ingredients, inspired by Mexican street snacks.',
    PillarClean: 'MOSA Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic and Non-GMO certifications.',
    PillarTrue: 'The MOSA Certified Organic designation is an independently administered, USDA-accredited certification, publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://santanasnacks.com/products/sea-salt' }],
  },
  {
    Name: 'Sarilla Organic Green Tea Spritzer',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A 0% alcohol sparkling tea made with Rwandan tea leaves and botanicals grown on regenerative organic farms -- no refined sugar, stevia, erythritol, or artificial ingredients.',
    PillarClean: 'Certified Organic.',
    PillarFair: 'Fair Trade Certified, on top of the organic certification; a women-owned business per the brand\'s own site.',
    PillarTrue: 'Both certifications (Certified Organic, Fair Trade) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.drinksarilla.com/' }],
  },
  {
    Name: 'Scout MSC Certified Albacore Tuna',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Craft canned seafood sourcing 100% of its product from Canada and the U.S. -- traceable to a certified sustainable fishery.',
    PillarClean: 'MSC (Marine Stewardship Council) Certified.',
    PillarFair: 'Certified B Corporation and 1% for the Planet member, on top of the MSC certification.',
    PillarTrue: 'Both certifications (MSC, B Corp) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://enjoyscout.com/collections/all' }],
  },
  {
    Name: 'SEEDLY Organic Celtic Sea Salt Dark Chocolate Seed Bark',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A 70% dark chocolate snacking bark with 20g protein and 50% less sugar, made with hemp, pumpkin, and sunflower seeds.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'Fair Trade ingredients used per the brand\'s own product descriptions, on top of the organic certification; the bark is also Kosher certified.',
    PillarTrue: 'The USDA Organic and Kosher certifications are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/SEEDLY-Chocolate-Organic-Ingredients-Protein/dp/B0BTB23DB4' }],
  },
  {
    Name: 'Seven Sundays Organic Farmers Market Muesli',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A gluten-free muesli with 8g plant protein and 0g added sugar -- enjoyed warm, cool, or as overnight oats.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic and Non-GMO certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO Project) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://sevensundays.com/products/farmers-market-mix' }],
  },
  {
    Name: 'Simple Mills Original Organic Seed Flour Crackers',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A nutrient-dense cracker made from sunflower, pumpkin, and flax seed flours -- free of grains, soy, corn, gums, and emulsifiers, using regeneratively grown organic sunflowers under direct farmer contracts.',
    PillarClean: 'USDA Certified Organic, Non-GMO Project Verified, and Certified Gluten-Free.',
    PillarFair: 'No specific third-party farm-level labor or trade certification found beyond the organic, Non-GMO, and Gluten-Free certifications; the brand cites direct regenerative-farming contracts with Midwestern growers on its own site.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO Project, Certified Gluten-Free) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Simple-Mills-Original-Seed-Crackers/dp/B08KT73KXT' }],
  },
  {
    Name: 'Smart Sweets Sweet Fish',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A low-sugar gummy candy with up to 92% less sugar per 50g than traditional candy -- no sugar alcohols, no artificially-sourced sweeteners.',
    PillarClean: 'Certified Organic and Certified GMO Free on select SKUs.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic and Non-GMO certifications.',
    PillarTrue: 'Both certifications (Certified Organic, Certified GMO Free) are independently issued and publicly verifiable where they apply -- note this applies to select SKUs only, not the full product line.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://smartsweets.com/' }],
  },
  {
    Name: 'SNACKLINS Plant Based Crisps, Barbeque',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A puffed, plant-based crisp made from yuca, mushrooms, and onions -- low-calorie, crunchy, only 90 calories per bag.',
    PillarClean: 'Certified Non-GMO and Certified Gluten-Free.',
    PillarFair: 'OU Kosher Certified, on top of the Non-GMO and Gluten-Free certifications.',
    PillarTrue: 'All three certifications (Non-GMO, Gluten-Free, OU Kosher) are independently issued and publicly verifiable, confirmed directly via the OU\'s own certified-companies listing.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://snacklins.com/' }],
  },
  {
    Name: 'Solely Organic Mango Fruit Jerky',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A one-to-three-ingredient fruit jerky with no sulfites and no added sugar -- just real fruit.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified.',
    PillarFair: 'Certified Kosher by the Orthodox Union, on top of the organic and Non-GMO certifications.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO Project, OU Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://solely.com/collections/fruit-jerky' }],
  },
  {
    Name: 'SOMOS White Corn Tortilla Chips',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Unusually thick and crunchy white corn tortilla chips made from GMO-free corn, vegetable oil, and sea salt -- authentic Mexican flavor.',
    PillarClean: 'Certified Organic and Certified GMO Free.',
    PillarFair: 'Kosher and Halal Certified, on top of the organic and Non-GMO certifications.',
    PillarTrue: 'All certifications (Certified Organic, GMO Free, Kosher, Halal) are independently issued and publicly verifiable; the brand also holds BRCGS AA facility certification per prior research.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/SOMOS-Unusually-Crunchy-Tortilla-Organic/dp/B0BV7DKX8T' }],
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
  console.log(`Importing ${PRODUCTS.length} batch-16 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
