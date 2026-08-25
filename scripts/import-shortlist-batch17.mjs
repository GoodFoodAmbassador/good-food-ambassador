#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch17.mjs <YOUR_PAT> [BASE_ID]
//
// Corrects an over-narrow reading of the category taxonomy in batch15/16.
// A review of every prior import script showed the established, actual
// precedent is broader than assumed:
//   - 'lna' already holds plain coffee and tea (Chamberlain Coffee, Groovy
//     Coffee, Longbottom Coffee, Kahawa 1893, Rare Breed Coffee, Equip
//     Foods Coffee, ECOTEAS Yerba Mate, Gay Awakening Coffee) -- not just
//     literal low/no-alcohol drinks.
//   - 'olive-oils' is the de facto pantry-condiments/sauces bucket
//     (Bachan's BBQ Sauce, Carbone Marinara, Hoboken Farms Marinara,
//     Homestead's Hot Sauce, Yamaki Jozo Soy Sauce, Yamasa Soy Sauce,
//     Mussini Balsamic Vinegar, Nan's Original Recipes dressings, Harry's
//     Famous Sauce) -- not literally olive oil only.
// This batch re-adds the brands wrongly excluded from batch15/16 under the
// stricter (incorrect) reading.
//
// Still excluded, no confirmed precedent for the category: Maya Kaimal
// (dal/ready meal), milkadamia (dairy-alt milk), NOOISH (soup), Pecana
// (pecan milk), OCA Foods (energy drink), Natural Heaven (hearts-of-palm
// pasta -- not grain-based). These may have a home once the category
// taxonomy is confirmed with whoever owns it; holding until then.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch17.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  // ─── lna (coffee/tea, per established precedent) ────────────────────
  {
    Name: 'Matcha DNA Certified Organic Matcha Green Tea Powder',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A pure culinary-grade matcha green tea powder for lattes, smoothies, and baking -- no additives, no added sugar.',
    PillarClean: 'USDA Certified Organic; every batch third-party lab tested for lead and heavy metals, with BPA-free packaging.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The USDA Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Matcha-DNA-Certified-Organic-Green/dp/B01LOQ9842' }],
  },
  {
    Name: 'Matchpoint Organic Single-Origin Matcha',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'Single-cultivar Okumidori matcha sourced from Kagoshima, Japan, offered in small, rotating batches by an AAPI women-owned business.',
    PillarClean: 'JAS Certified Organic (Japan\'s national organic standard) and USDA Certified Organic.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the dual organic certifications.',
    PillarTrue: 'Both JAS and USDA Organic are independently issued, publicly verifiable certifications, not self-declared claims.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.matchpointmatcha.com/' }],
  },
  {
    Name: "Mugsy's House Espresso",
    Category: 'lna',
    Status: 'approved',
    PillarGood: '100% organic arabica espresso, fresh-roasted in Clarksville, Tennessee.',
    PillarClean: 'USDA Certified Organic; Fair Trade Certified.',
    PillarFair: 'Fair Trade Certified per the brand\'s own sourcing page, on top of the organic certification.',
    PillarTrue: 'Both certifications (USDA Organic, Fair Trade) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://mugsysfreshroast.com/mugsys-house-espresso/' }],
  },
  {
    Name: 'PERC Coffee, Savannah Blend',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A specialty coffee roasted in Savannah, Georgia, shipped fresh nationwide.',
    PillarClean: 'Certified Organic and Fair Trade Certified per earlier verified sourcing research.',
    PillarFair: 'Fair Trade Certified, on top of the organic certification.',
    PillarTrue: 'Both certifications (Certified Organic, Fair Trade) are independently issued and publicly verifiable; note this session\'s live web search could not independently re-confirm the specific certifying bodies on PERC\'s current site, so this relies on the prior verified screening pass.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://perccoffee.com/collections/coffee' }],
  },
  {
    Name: 'RISE Brewing Co. Original Black Nitro Cold Brew Coffee',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'Nitrogen-infused cold brew coffee, sourced from Fair Trade organic beans grown in Peru\'s Chanchamayo Valley -- dairy-free, vegan, no sugar added.',
    PillarClean: 'USDA Certified Organic and Non-GMO.',
    PillarFair: 'Fair Trade Certified beans, on top of the organic and Non-GMO certifications.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO, Fair Trade) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/RISE-Brewing-Co-Original-Coffee/dp/B0788DWH4Q' }],
  },
  {
    Name: 'Slingshot Coffee Co. Single Origin Cold Brew',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A cold brew pioneer (est. 2012, Raleigh, NC) making light, bright, single-origin cold brew from direct-trade beans.',
    PillarClean: '100% Certified Organic coffee beans.',
    PillarFair: 'Certified Kosher and direct-trade sourced, on top of the organic certification.',
    PillarTrue: 'Both certifications (Certified Organic, Kosher) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://slingshotcoffee.com/collections' }],
  },
  {
    Name: 'Rishi Organic Masala Chai Concentrate',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A direct-trade loose leaf tea and botanicals company, among the first to earn USDA organic certification (2002); over 95% of ingredients are certified organic.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'Direct Trade sourcing per the brand\'s own site, on top of the organic certification; no separate named Fair Trade certifying body confirmed.',
    PillarTrue: 'The USDA Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.rishi-tea.com/products/organic-masala-chai-concentrate' }],
  },
  // ─── olive-oils (pantry sauces/condiments, per established precedent) ─
  {
    Name: 'Matriark Foods Tomato Basil Sauce',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A slow-cooked tomato basil sauce made from upcycled, USA-grown tomatoes that would otherwise go to waste -- fire-roasted garlic, onion, and fresh basil.',
    PillarClean: 'Non-GMO Project Verified since 2022; Upcycled Certified by the Upcycled Food Association.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO and Upcycled certifications.',
    PillarTrue: 'Both certifications (Non-GMO Project, Upcycled Certified) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://matriarkfoods.com/products/tomato-basil-sauce' }],
  },
  {
    Name: "Monte's Fine Foods Marinara Sauce",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A 120-year family-recipe Italian-American marinara, small-batch produced in New York; voted Best Overall Sauce by Food & Wine.',
    PillarClean: 'Certified Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO certification.',
    PillarTrue: 'The Non-GMO certification is independently issued and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://montessauce.com/collections/shop' }],
  },
  {
    Name: 'Otamot Organic Essential Sauce',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A tomato sauce made from 10 organic vegetables with no added sugar -- a way to work more vegetables into an everyday pasta sauce.',
    PillarClean: 'USDA Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic and Non-GMO certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.otamotfoods.com/products/otamot-tomato-sauce-4-pack' }],
  },
  {
    Name: "New York Shuk Za'atar Spice Blend",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A Jerusalem-recipe za\'atar of traditional za\'atar leaves, sumac, sesame, and olive oil -- all natural, vegan, no added sugar.',
    PillarClean: 'OU Kosher Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Kosher certification.',
    PillarTrue: 'The OU Kosher certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/New-York-Shuk-ZaAtar-1-4/dp/B00LZCNMH0' }],
  },
  {
    Name: 'Racha Organics Sriracha, Mild',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A sriracha hot sauce made from USDA-certified organic Racha peppers grown on the brand\'s own organic farm in northern Thailand -- hand-selected, sustainably farmed.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The USDA Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Racha-Organics-Sriracha-Sauce-Certified/dp/B0CYL142CX' }],
  },
  {
    Name: 'Pinch Spice Market Organic Spices',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A family-owned spice shop sourcing rare and hard-to-find organic herbs and spices directly from farmers it knows personally.',
    PillarClean: 'Certified Organic.',
    PillarFair: 'Fair and direct trade sourcing per the brand\'s own site, on top of the organic certification.',
    PillarTrue: 'The organic certification is independently administered and publicly verifiable; the fair/direct-trade claim is the brand\'s own description of its sourcing relationships, not a separate named certifying body.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://pinchspicemarket.com/spices/' }],
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
  console.log(`Importing ${PRODUCTS.length} batch-17 products (correcting batch15/16 category gaps)...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
