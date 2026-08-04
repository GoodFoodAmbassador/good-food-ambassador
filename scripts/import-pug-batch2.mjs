#!/usr/bin/env node
// Usage: node scripts/import-pug-batch2.mjs <YOUR_PAT> [BASE_ID]
//
// Pop Up Grocer sourcing project — Batch 2 (8 approved brands).
// Posts new GFA products with Status = approved, all four pillar fields,
// and a live-browser-verified BuyLinks entry for each.
//
// Skipped from the 9-brand shortlist approval:
//   - iMind Brain Food: out of stock everywhere checked -- both flavors
//     sold out on imindbrainfood.com, and all 3 distinct Amazon ASINs
//     found (B0F94B3KKY, B0F1ZBVF3J, B0F94FSTCJ) show "Currently
//     unavailable. We don't know when or if this item will be back in
//     stock." Not imported; flagged for Giovanni rather than linking a
//     dead product.
//
// Note: Kahawa 1893 Coffee (LNA) and MALK Organics (snacks) were
// initially screened out on category-fit grounds (coffee, oat milk don't
// obviously map to GFA's 6 categories) but were reconsidered on
// live-verification: yerba mate brands already live in the Low & No
// Alcohol sheet establish precedent for non-alcoholic beverages there,
// and MALK's oat milk is shelf-stable (unlike the earlier Boss Cow
// dairy rejection), so it fits Snacks & Pantry as a pantry staple.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-pug-batch2.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [

  { Name: 'Good Twin Sparkling Blanc Non-Alc',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic (<0.50% ABV) sparkling wine made in Italy from real organic Glera grapes -- the same variety used in Prosecco. Bright and crisp with notes of apple, peach, and citrus. Just four ingredients.",
    PillarClean: "Certified organic by Bios Srl, an independent Italian organic certification body -- not a self-declared claim. Vegan. No artificial flavors. Ingredients: organic grape must, sparkling water, natural flavoring.",
    PillarFair:  "Produced by La Cantina Pizzolato in Italy and imported by Good Twin (Santa Maria, CA). No third-party fair-trade or cooperative certification disclosed beyond the organic certification.",
    PillarTrue:  "Bios Srl organic certification is independently administered under EU organic standards, distinct from a marketing claim. <0.50% ABV is within the standard legal range for products labeled non-alcoholic in the US (similar to fruit juice), and this is disclosed rather than implying zero alcohol.",
    BuyLinks: [{ label: 'Order direct', url: 'https://drinkgoodtwin.com/products/good-twin-sparkling-blanc' }] },

  { Name: 'Harken Sweets The Nutty One',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Plant-based candy bar (peanuts, date caramel, nougat, oat milk chocolate-style coating) built around date fruit instead of added sugar. 150 calories per bar with meaningful prebiotic fiber content.",
    PillarClean: "Dairy-free, vegan, plant-based, gluten-free. Made with fair-trade cocoa and non-GMO ingredients, confirmed on the product page. No sugar added -- sweetness comes entirely from dates.",
    PillarFair:  "Founded by Katie after she needed more dietary fiber for a medical condition; built the brand around the date fruit's natural sweetness and fiber content. Fair-trade cocoa sourcing stated on-page.",
    PillarTrue:  "\"Fair-trade cocoa\" is stated directly on the product page as an ingredient-sourcing claim; the specific certifying body (e.g. Fair Trade USA vs. Fairtrade International) is not named on the page and should be confirmed directly with the brand if a specific certification mark is required. Date caramel naturally containing sugars is disclosed as \"no sugar added,\" not \"sugar-free\" -- an accurate, not overstated, claim.",
    BuyLinks: [{ label: 'Order direct', url: 'https://harkensweets.com/products/the-nutty-one' }] },

  { Name: "Harry's Famous Sauce Lemon Pepper Dill",
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Pasta sauce made with US-grown tomatoes, lemon juice, dill, and black pepper. Gluten-free, plant-based, keto-friendly, no sugar added. Nutrition figures independently lab-tested at a pharmaceutical-grade laboratory rather than only self-calculated.",
    PillarClean: "Non-GMO Project Verified and Gluten-Free Certified on select SKUs including this flavor -- both independently audited, third-party certifications, not self-declared claims. Ingredients include upcycled liquid mirepoix (carrots, celery, onions), which is separately Upcycled Certified via a collaboration with Matriark Foods.",
    PillarFair:  "Founded by Harry Hamlin and Chef Renee Guilbault as the debut product of The Open Food Company, a self-described \"open-source food company\" that publishes its full ingredient sourcing and recipes. WBENC-certified women-owned business. Commits 50% of net profits -- not 1%, not \"a portion\" -- to hunger relief; has donated $87k and 25,000 lbs of sauce since September 2024 to four named food banks (LA Regional Food Bank, Project Angel Food, Food Bank for NYC, The Open Door Food Pantry).",
    PillarTrue:  "The 50%-of-net-profits and specific dollar/pound donation figures are stated by the brand with named recipient organizations, which makes the claim independently checkable against those food banks' own records, unlike a vague \"portion of proceeds\" claim. Non-GMO Project Verified, Gluten-Free Certified, and Upcycled Certified are each independently audited third-party certifications; WBENC is a recognized third-party women-business certifier. No unverified regenerative or B Corp claims are made.",
    BuyLinks: [{ label: 'Find it', url: 'https://www.amazon.com/dp/B0FTHZXSF3' }] },

  { Name: 'Joey Nordic Seed Crisps Rosemary & Black Pepper',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Seed crisps made from 7 super seeds including upcycled watermelon seeds, seasoned with rosemary and black pepper. 22g protein and 13g fiber per pouch, a good source of iron. Nut-free and soy-free.",
    PillarClean: "Certified organic and gluten-free. No artificial preservatives or flavors. Made with plants only, no seed oils.",
    PillarFair:  "Founded by Joseph, a food-industry veteran (Kraft, Hershey's, McDonald's), producing in Prince Edward County, Canada. No third-party fair-trade or cooperative certification disclosed beyond the organic certification.",
    PillarTrue:  "\"Certified organic\" is confirmed on the product page rather than only implied by packaging design. Upcycled watermelon seed as a novel protein source is a genuine ingredient-sourcing choice (watermelon seeds are otherwise a discarded byproduct), though no formal Upcycled Certified mark is claimed on this specific product, unlike Harry's Famous Sauce.",
    BuyLinks: [{ label: 'Order direct', url: 'https://joeynordicseedcrisps.com/en-us/products/rosemary-black-pepper' }] },

  { Name: 'kencko Superfood Smoothie Starter Box',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Instant smoothie powders made by flash-freezing and slow-drying real fruits and vegetables, capturing nutrients and fiber in a shelf-stable format. Each serving packs roughly 2.5 cups of produce equivalent. No added sugar.",
    PillarClean: "100% organic, no additives. Compostable packaging and conventional-plastic-free materials, per brand disclosure. Carbon-neutral shipping.",
    PillarFair:  "Certified B Corporation with a B Impact Assessment score of 92.0, independently verified by B Lab -- well above B Lab's certification threshold of 80.",
    PillarTrue:  "B Corp certification via B Lab is a rigorous, independently audited process covering governance, workers, community, environment, and customers -- not a self-administered label. The 92.0 score is publicly listed on B Lab's directory. \"2.5 cups of produce\" refers to the fresh-produce equivalent before freeze-drying, not fresh produce contained in the final shelf-stable product -- an important but accurately implied distinction given the product's stated freeze-drying process.",
    BuyLinks: [{ label: 'Order direct', url: 'https://www.kencko.com/' }] },

  { Name: 'Kittylamb Organic Chocolate Cake Baking Mix',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Organic chocolate cake baking mix made with organic wheat flour, organic and fair-trade (when possible) cocoa powder, and organic and fair-trade vanilla extract. Ingredients individually disclosed by sourcing category on the product page.",
    PillarClean: "Certified organic by MOFGA (Maine Organic Farmers and Gardeners Association), an independent state-level organic certifying body distinct from a brand's own claim. Sourced New England flour, unbleached and unenriched.",
    PillarFair:  "Small Scarborough, Maine business. Fair-trade sourcing stated for cocoa and vanilla \"when possible\" -- an honest qualifier rather than a blanket, unverifiable claim.",
    PillarTrue:  "MOFGA certification is independently administered and is one of the oldest organic certifiers in the US, predating USDA Organic. The \"when possible\" qualifier on fair-trade sourcing is a more accurate, less inflated claim than brands that state fair-trade sourcing without such caveats -- it should be read as partial, not full, fair-trade sourcing across all ingredients.",
    BuyLinks: [{ label: 'Order direct', url: 'https://kittylamb.com/products/the-chocolate-cake-organic-baking-mix' }] },

  { Name: 'Kahawa 1893 Safari Blend Coffee',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Medium-dark roast African coffee blend (Kenya-origin) with tasting notes of caramel and milk chocolate. Small-batch roasted, specialty-grade beans, high-altitude grown for slower, more complex flavor development.",
    PillarClean: "Third-party tested for purity and consistency, per brand disclosure. No artificial flavoring used to mask bitterness -- flavor comes from bean origin and roast profile alone.",
    PillarFair:  "Sources directly from women farmers in Kenya, Rwanda, and Congo, paying more than double the Fair Trade minimum price rather than pursuing formal Fair Trade certification, which the brand states is often financially out of reach for small-scale farmers. Founder Margaret Nyamumbo pledges 25% of company revenue to loans that help women farmers gain financial independence, and the company matches customer tips to farmers dollar-for-dollar. First Black woman-owned coffee brand sold in Trader Joe's.",
    PillarTrue:  "Paying \"double the Fair Trade minimum\" is a direct-trade claim rather than a third-party-certified one -- it is not independently audited the way Fair Trade USA or Fairtrade International certification would be, but it is a specific, checkable pricing claim rather than a vague \"fair wages\" statement. The 25%-of-revenue pledge and dollar-for-dollar tip matching are specific, named mechanisms disclosed by the brand.",
    BuyLinks: [{ label: 'Order direct', url: 'https://kahawa1893.com/products/safari' }] },

  { Name: 'MALK Organic Oat Milk',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Shelf-stable oat milk made from just three ingredients: filtered water, organic gluten-free oats, and Himalayan pink salt. No gums, oils, or fillers -- a notably shorter ingredient list than most shelf-stable plant milks.",
    PillarClean: "USDA Organic certified (95%+ organic material, verified via retail sustainability badge). Non-GMO. Gluten-free, vegan.",
    PillarFair:  "US-based (MALK Organics LLC). No third-party fair-trade or farmer-cooperative certification disclosed; ethical sourcing claims center on ingredient simplicity and organic certification rather than supply-chain equity.",
    PillarTrue:  "\"Shelf stable\" is an accurate processing claim, distinct from refrigerated dairy-alternative products -- verified via both the brand's own product labeling and the retail listing. USDA Organic is independently verified. No regenerative, B Corp, or direct-trade claims are made, so none are being taken at face value beyond what's stated.",
    BuyLinks: [{ label: 'Find it', url: 'https://www.amazon.com/dp/B0CWJBG7TT' }] },
]

async function createBatch(records) {
  const res  = await fetch(URL, {
    method: 'POST', headers: HEADERS,
    body: JSON.stringify({ records: records.map(r => ({
      fields: { ...r, BuyLinks: JSON.stringify(r.BuyLinks) }
    })) })
  })
  const data = await res.json()
  if (data.error) throw new Error(JSON.stringify(data.error))
  return data.records
}

async function main() {
  console.log('\n🌿  GFA Product Import — Pop Up Grocer Batch 2 (8 products)\n')
  console.log(`   Target base: ${BASE_ID}`)
  console.log(`   Products:    ${PRODUCTS.length}\n`)

  let created = 0
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const batch   = PRODUCTS.slice(i, i + 10)
    const results = await createBatch(batch)
    for (const r of results) {
      console.log(`   ✅  [${r.fields.Category}] ${r.fields.Name}`)
      created++
    }
    if (i + 10 < PRODUCTS.length) await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n🎉  Done — ${created} products created.\n`)
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1) })
