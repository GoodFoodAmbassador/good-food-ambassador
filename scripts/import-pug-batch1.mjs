#!/usr/bin/env node
// Usage: node scripts/import-pug-batch1.mjs <YOUR_PAT> [BASE_ID]
//
// Pop Up Grocer sourcing project — Batch 1 (12 approved brands).
// Posts new GFA products with Status = approved, all four pillar fields,
// and a live-browser-verified BuyLinks entry for each.
//
// Skipped from the original 13-brand shortlist approval:
//   - Evo Hemp: the specific signal (regenerative hemp protein BARS + 40 Acre
//     Cooperative partnership) is for a product line that no longer appears
//     on evohemp.com/collections/all — only hemp hearts/protein powder/CBD
//     softgels remain, none of which carry the same shortlisted signal. Not
//     imported; flagged for Giovanni rather than force-fit to a weaker product.
//   - Brightland: already live on the site as "Brightland Alive EVOO"
//     (see fix-links-batch6.mjs). Re-adding would create a duplicate; skipped.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-pug-batch1.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [

  { Name: 'Brass Roots Sacha Inchi Seed Variety Pack',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Roasted sacha inchi seeds (\"Incan peanut\"), sourced from Thailand, Laos, and South America. 8g protein per 1oz serving — 50% more than almonds. 2g fiber. Free of the top 9 allergens, including peanuts and tree nuts; school-safe.",
    PillarClean: "Whole, organically grown roasted seeds. Simple ingredient lists across flavors (salted, sweet crunch, sweet heat, Cajun, spicy) with no artificial flavors or fillers declared.",
    PillarFair:  "Founder Aaron Gailmor pays fair-trade wages directly to named sacha inchi farmer partners in Thailand and Laos, including a documented relationship with farmer Chan, who reinvests profits into a K-12 school. Brass Roots (New Orleans) also runs youth nutrition and entrepreneurship education programs locally.",
    PillarTrue:  "\"Fair-trade wages\" here is a founder-disclosed, named farmer relationship rather than a third-party Fair Trade USA or Fairtrade International certification — a direct claim, not an independently audited one. Sacha inchi (Plukenetia volubilis) is botanically a seed, not a peanut or tree nut, which is consistent with the allergen-free claim.",
    BuyLinks: [{ label: 'Order direct', url: 'https://brassrootsfood.com/products/sacha-inchi-seed-snack-variety-sample-5-pack' }] },

  { Name: 'Cactus Crunch Nopal Tortilla Chips',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Tortilla chips made from nopal (prickly pear cactus) flour blended with corn, spinach, and flaxseed. Light, airy crunch. Gluten-free and vegan.",
    PillarClean: "Ingredients disclosed: nopal flour, corn, spinach, flaxseed, sea salt. No artificial flavors declared. Gluten-free, vegan-friendly.",
    PillarFair:  "Cactus Foods holds a verified 1% for the Planet membership and states a partnership with Water.org, directing a portion of sales toward clean-water-access programs.",
    PillarTrue:  "1% for the Planet is an independently audited membership requiring documented annual giving of at least 1% of revenue — a verifiable, third-party-administered commitment. The Water.org partnership is stated on the brand's own site; the exact per-bag contribution formula isn't independently disclosed and should be read as a company claim rather than an audited figure.",
    BuyLinks: [{ label: 'Order direct', url: 'https://cactus-foods.com/products/the-combo-bundle' }] },

  { Name: 'Chocxo Dark Chocolate Coconut, Almond & Sea Salt Snaps',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "85% cacao dark chocolate snaps with shredded coconut, diced almonds, and sea salt. 2g sugar per serving. USDA Organic.",
    PillarClean: "USDA Organic certified. Brand states additional Non-GMO Project Verified, Certified Gluten-Free, Kosher, and Certified Plastic Neutral status — a stacked, multi-certification profile.",
    PillarFair:  "No named cacao-origin farmer partnership, B Corp, or Fair Trade cacao certification is disclosed on current product pages; sourcing is described generally as sustainably-sourced cocoa.",
    PillarTrue:  "USDA Organic, Non-GMO Project, Certified Gluten-Free, Kosher, and Plastic Neutral are each independently administered, auditable certifications. \"Sustainably-sourced cocoa\" is a general description, not a specific fair-trade or Rainforest Alliance cacao certification, and shouldn't be read as one. Online ordering is seasonally paused (per the brand, resuming October 1) due to hot-weather shipping restrictions on chocolate — a common, disclosed practice, not a discontinued product; in-store purchase remains available via the brand's store locator.",
    BuyLinks: [{ label: 'Order direct', url: 'https://chocxo.com/products/dark-chocolate-chocxo-snaps-almond-sea-salt' }] },

  { Name: 'Dirtbag Bar Organic Whole-Food Energy Bar',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Whole-food energy bar of organic dates, whole grain oats, nuts/seeds, and 100% dark chocolate. No ultra-processed additives, added sugars, syrups, seed oils, or protein concentrates. Vegan and gluten-free.",
    PillarClean: "Certified organic ingredients (dates, oats, dark chocolate chips, cacao powder, sunflower seeds, coconut) disclosed on label. Himalayan salt. No preservatives or artificial additives declared.",
    PillarFair:  "Jackson Hole, WY-based. Dual verified membership: 1% for the Planet and 1% for Mental Health.",
    PillarTrue:  "Both 1% for the Planet and 1% for Mental Health are third-party-administered membership programs with public member directories and audited giving requirements — verifiable commitments, not self-declared claims. \"Zero gunk\" and \"certified organic\" positioning is consistent with the disclosed ingredient list.",
    BuyLinks: [{ label: 'Order direct', url: 'https://www.dirtbagbar.com/products/dirtbag-bar-box' }] },

  { Name: 'edggies veggies Kale Sprinkles',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Dehydrated, ready-to-eat kale sprinkle designed to add a vegetable serving to any dish. USDA Organic. Naturally vegan, gluten-free, and preservative-free.",
    PillarClean: "Certified organic by CCOF (California Certified Organic Farmers), a USDA-accredited certifying body. Non-GMO. Nutritional analysis performed by an ISO 17025-accredited laboratory per brand disclosure.",
    PillarFair:  "Small, founder-driven brand; no additional fair-trade, cooperative, or B Corp certification disclosed. Mission centers on making vegetable consumption easier for busy households rather than a supply-chain equity claim.",
    PillarTrue:  "CCOF certification is independently administered and USDA-accredited, substantiating the organic claim beyond a self-declaration. Nutrient content (vitamin K, C, calcium) reflects concentrated dehydrated kale at a small (5g) serving size — a meaningful boost, but not a substitute for whole-vegetable servings.",
    BuyLinks: [{ label: 'Order direct', url: 'https://www.edggies.com/products/kale' }] },

  { Name: 'Figa Foods Pure Cupuaçu Bar',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "63% cupuaçu (\"chocolate's Brazilian cousin\") bar made with only three ingredients. Gluten-free, vegan, caffeine-free.",
    PillarClean: "Minimal, three-ingredient formulation built around cupuaçu. Regeneratively farmed sourcing stated on the product page.",
    PillarFair:  "Figa Foods partners directly with regenerative agroforestry farms in the Brazilian Amazon, upcycling cupuaçu seeds that would otherwise be a byproduct of pulp harvesting, and states this supports biodiversity and soil health.",
    PillarTrue:  "Cupuaçu (Theobroma grandiflorum) is a botanical relative of cacao (Theobroma cacao) but a distinct species with a different polyphenol and flavor profile — \"chocolate's Brazilian cousin\" is an accurate lay description, not an equivalence claim. \"Regeneratively farmed\" and \"agroforestry\" are brand-stated; no third-party regenerative certification body (e.g. Regenerative Organic Certified) is cited on the product page reviewed.",
    BuyLinks: [{ label: 'Order direct', url: 'https://figafoods.com/products/pure' }] },

  { Name: 'Figure Ate Foods Naturally Fermented Persimmon Vinegar',
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Naturally fermented vinegar made from California-grown persimmons — a milder, sweeter alternative to apple cider vinegar for cooking, marinades, and dressings.",
    PillarClean: "California persimmon sourcing disclosed. Naturally fermented, not synthetic acetic acid. Organic and regenerative-agriculture sourcing stated by the brand.",
    PillarFair:  "Figure Ate Foods is wholly owned by White Buffalo Land Trust, a 501(c)(3) nonprofit — every purchase directly funds the nonprofit's soil-health research and rancher training programs, a structurally different ownership model from a typical for-profit brand.",
    PillarTrue:  "Nonprofit ownership (White Buffalo Land Trust) is independently verifiable via the organization's 501(c)(3) status and public filings — a structural fact, not a marketing claim. Wellness claims (heart/digestive/liver/skin support) reflect traditional use and general antioxidant content in fermented fruit vinegars; they are not FDA-evaluated or disease-specific claims, and none are made on the label. Note: earlier research briefly misidentified this brand as a hummus product due to a mix-up with a similarly-themed but separate hummus brand — corrected here to the brand's actual persimmon vinegar and biltong line.",
    BuyLinks: [{ label: 'Order direct', url: 'https://figureatefoods.com/products/persimmon-vinegar' }] },

  { Name: 'Bake Away Los Angeles Lemon Poppyseed Cake Mix',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Cake mix flavored with fresh lemon and poppyseed, part of a city-inspired flavor line (Los Angeles, New York, Seattle). No added colors, non-GMO, no artificial flavors.",
    PillarClean: "Label discloses no added colors, non-GMO ingredients, and no artificial flavors. Full ingredient and allergen breakdown available on the product page.",
    PillarFair:  "Bake Away states an ongoing partnership with No Kid Hungry, donating a portion of sales — a named, checkable nonprofit relationship, though no specific percentage is disclosed on the consumer product page.",
    PillarTrue:  "The No Kid Hungry partnership is a named, verifiable nonprofit relationship, but the donation mechanism (percentage or fixed amount) isn't disclosed on the product page reviewed — a weaker, less quantifiable claim than an audited percentage-of-sales program (e.g. 1% for the Planet), and should be read as a general cause partnership.",
    BuyLinks: [{ label: 'Order direct', url: 'https://bakeaway.com/products/los-angeles-lemon-poppyseed' }] },

  { Name: 'DEFI Dark Chocolate Crispy Superfood Bite',
    Category: 'snacks', Status: 'approved',
    PillarGood:  "Protein bite built on sprouted organic buckwheat (a lesser-known Ukrainian-origin superfood) combined with single-origin chocolate (38% cacao milk from Peru, 70% cacao dark from Ecuador/Dominican Republic) and a dual whey-casein protein blend. 25-26g protein per bag.",
    PillarClean: "Gluten-free, Non-GMO. Made with real cane sugar rather than artificial sweeteners. No fillers or vague \"natural flavor\" listings per the brand's own ingredient comparison.",
    PillarFair:  "Founder Tatyana Jones commits 1% of gross sales — not net profit — to women-owned businesses, a structural choice the brand states was made specifically so giving starts immediately, even pre-profitability.",
    PillarTrue:  "\"1% of gross sales\" is a stronger, more immediate commitment than a typical percentage-of-profit pledge, since gross-sales giving is unaffected by company profitability — a meaningful, checkable structural distinction, though it's a company-stated policy rather than a third-party-audited membership program like 1% for the Planet. Cacao origin claims (Peru milk / Ecuador & DR dark) are specific and stated on-page.",
    BuyLinks: [{ label: 'Order direct', url: 'https://www.defisnacks.com/products/defi-chocolate-crispy-superfood-bite' }] },

  { Name: "Auntie Rana's Smoked Chili Oil",
    Category: 'olive-oils', Status: 'approved',
    PillarGood:  "Southeast Asian-style condiment made from sun-dried red chilis, Himalayan salt, and sunflower oil, gently smoked for a layered, smoky heat. Intended for drizzling, dipping, and marinating.",
    PillarClean: "Ingredients disclosed: dried chilis, Himalayan salt, sunflower oil. No artificial ingredients or preservatives stated. Produced in FDA-approved facilities, Hudson Valley, NY.",
    PillarFair:  "Auntie Rana's donates 5% of profits to wildlife conservation, naming partners Wildlife SOS (India) and Wildlife Alliance (Cambodia) — a founder-driven commitment tied to the founder's childhood in Bangladesh.",
    PillarTrue:  "The 5%-to-wildlife commitment and named partner organizations are checkable against those organizations' own partner disclosures, though this is a company-stated percentage rather than a third-party-audited giving membership. Note: this brand was initially miscategorized in early research as a hummus/legume product due to a mix-up with a similarly-themed but separate hummus brand — Auntie Rana's is in fact a Southeast Asian condiments line (chili oil, garlic mayo, mango achaar, spiced jam), corrected here to Olive Oils & Condiments.",
    BuyLinks: [{ label: 'Order direct', url: 'https://auntieranas.com/products/smoked-chili-oil' }] },

  { Name: 'Felicia Buckwheat Mezzi Rigatoni',
    Category: 'grains', Status: 'approved',
    PillarGood:  "Gluten-free pasta made from 100% whole-grain buckwheat. USDA Organic. 12g protein per serving, high in magnesium. Produced by Andriani S.p.A., Italy's largest dried gluten-free and legume pasta manufacturer.",
    PillarClean: "USDA Organic certified (sustainability feature independently verified on the retail listing). Single ingredient: buckwheat. No declared additives.",
    PillarFair:  "Parent company Andriani S.p.A. is a certified B Corp, verified by B Lab, with a stated vertically integrated supply chain of 500+ contracted farmers across roughly 8,500 hectares in Italy.",
    PillarTrue:  "Andriani S.p.A.'s B Corp certification is independently verifiable via B Lab's public directory. Felicia is Andriani's consumer-facing pasta brand — this shortlist separately lists \"Andriani S.p.A.\" itself under Grains & Noodles for the same B Corp signal; both entries trace to one certification, not two independent ones. Purchased via the brand's official \"Felicia Pasta\" storefront on Amazon, since felicia.us does not offer direct-to-consumer checkout.",
    BuyLinks: [{ label: 'Find it', url: 'https://www.amazon.com/dp/B0FHVZ56MG' }] },

  { Name: 'All The Bitter Old Fashioned Aromatic Bitters',
    Category: 'lna', Status: 'approved',
    PillarGood:  "Non-alcoholic (0.0% ABV) aromatic bitters, handmade in small batches from 15 organic botanicals including cinnamon, clove, allspice, ginger, dandelion root, gentian root, and cinchona bark. Built for Old Fashioneds, Manhattans, or alcohol-free cocktails and sodas.",
    PillarClean: "Organic or wild-harvested botanicals, each marked on the ingredient list. Vegan, gluten-free. No added sugar; sweetness comes from the vegetable glycerin base.",
    PillarFair:  "All The Bitter (Chico, CA) is a 1% for the Planet member and additionally states support for substance-recovery programs — a dual cause commitment relevant to the non-alcoholic and recovery communities.",
    PillarTrue:  "1% for the Planet membership is independently audited and publicly listed. The substance-recovery giving commitment is brand-stated but not verified here against a named third-party recovery organization, and should be read as a company commitment pending independent confirmation. \"0.0% ABV\" is an accurate, verifiable claim distinct from \"non-alcoholic,\" which under US labeling convention may permit up to 0.5% ABV.",
    BuyLinks: [{ label: 'Order direct', url: 'https://allthebitter.com/products/old-fashioned-aromatic-bitters' }] },
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
  console.log('\n🌿  GFA Product Import — Pop Up Grocer Batch 1 (12 products)\n')
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
