#!/usr/bin/env node
// Usage: node scripts/import-pug-batch3.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 3: PUG priority-candidate screening, live buy-link verification, and
// four-pillar copy for 10 approved brands (of 11 shortlisted -- Noshi was
// dropped after live verification found its certified-organic condiment line
// (ketchup/ranch/chick'n dip) discontinued; its only current live product
// is an uncertified "frosting" line that doesn't carry the organic/kosher
// claim that justified the shortlist).
//
// Correction flagged during verification: Pastabilities was originally
// researched as "USDA Organic, Kosher, Vegan, Non-GMO." Live product pages
// show the actual retail packaging says "All-Natural" (not USDA Organic) --
// only Kosher Certified is a verified third-party certification. Imported
// on the strength of that one certification, consistent with GFA's
// single-certification threshold (same bar as MSC, B Corp, etc.), with the
// correction disclosed in PillarTrue.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-pug-batch3.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: "Marianne's Regenerative Organic Certified Avocado Oil",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: "100% pure avocado oil with a neutral flavor and a 500°F smoke point, made for high-heat cooking, frying, sautéing, and baking. Made by Marianne's Harvest, part of the Adams Group, a family-run Northern California ingredients company rooted in agriculture since 1920.",
    PillarClean: "Regenerative Organic Certified® (administered by the Regenerative Organic Alliance) and USDA Organic certified, plus Seed Oil Free Certified. Third-party tested for purity -- one of only two brands to test 100% pure avocado oil in a UC Davis avocado oil study, and a Clean Label Project Purity Award winner.",
    PillarFair: "Sourced from regenerative avocado groves that prioritize soil health, biodiversity, and farmer livelihoods under the Regenerative Organic Certified standard, which includes a social-fairness pillar for farmers and workers.",
    PillarTrue: "Regenerative Organic Certified and USDA Organic are both independently administered, audited certifications -- not self-declared marketing claims. This is the first refined ROC avocado oil available on store shelves, launched nationwide in December 2025.",
    BuyLinks: [{ label: 'Order on Amazon', url: 'https://www.amazon.com/Mariannes-Regenerative-Organic-Certified-Avocado/dp/B0GT7JJP8J' }],
  },
  {
    Name: "Nan's Original Recipes Sweet Sea Salt Vinaigrette",
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: "Organic, seed-oil-free vinaigrette and marinade crafted with organic extra virgin olive oil, celery seed, and a touch of sweetness. Family-founded and made in small batches, inspired by family matriarch Nan's recipes.",
    PillarClean: "Certified Kosher, USDA Organic, Non-GMO Project Verified, and Certified Vegan. Free of the top 8 allergens, with no artificial preservatives, colors, or flavors.",
    PillarFair: "Family-owned small business making dressings in small batches from a home recipe.",
    PillarTrue: "Four independent certifications stack on one bottle -- USDA Organic, Kosher, Non-GMO Project Verified, and Certified Vegan -- comfortably clearing GFA's single-certification bar.",
    BuyLinks: [{ label: 'Order direct', url: 'https://nansfoods.com/products/sweet-sea-salt-vinaigrette' }],
  },
  {
    Name: "Mary's Gone Cheezee Crackers, Cheddar",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: "Plant-based, cheddar-flavor cracker made as a vegan alternative to conventional cheese crackers, baked in the company's own dedicated bakery.",
    PillarClean: "USDA Organic and WFCF Organic certified, plus Non-GMO, Kosher, and Gluten-Free. Manufactured in Mary's own organic, gluten-free, vegan, nut-free, and kosher facility.",
    PillarFair: "Family-run company operating its own dedicated bakery rather than a co-packer.",
    PillarTrue: "Certified organic by two separate, independently administered bodies (USDA and WFCF) plus Non-GMO -- a strong certification stack for a snack cracker.",
    BuyLinks: [{ label: 'Order on Amazon', url: 'https://www.amazon.com/dp/B0DPF35SKJ' }],
  },
  {
    Name: "Michele's Granola Original",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: "Handmade, small-batch granola made with whole grain oats, almonds, coconut, and pure vanilla extract, baked fresh at Michele's bakery in Timonium, Maryland.",
    PillarClean: "Non-GMO Project Verified, SQF (Safe Quality Food) certified, and NSF P543 Vegan certified -- Michele's Granola was the first-ever brand to receive NSF's Vegan certification.",
    PillarFair: "Donates 1% of all sales to nonprofits with a food-focused mission. The bakery is powered by 100% wind power certified by Green-e, purchases carbon offsets from a regional landfill project, and composts 100% of its food waste.",
    PillarTrue: "Three independently administered certifications (Non-GMO Project, SQF, NSF Vegan) plus a quantified, food-focused give-back -- clears both the certification bar and the specific-cause bar this batch's rejects (Nantucket Crisps, Mixiboy) fell short of.",
    BuyLinks: [{ label: 'Order on Amazon', url: 'https://www.amazon.com/dp/B07815QT5T' }],
  },
  {
    Name: 'milkadamia Organic Artisan Macadamia Milk',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: "Shelf-stable macadamia milk made with just four ingredients -- no gums, fillers, added flavors, or oils. Smooth and creamy, suited to coffee, cereal, and baking.",
    PillarClean: "USDA Organic certified.",
    PillarFair: "Sourced from raw, never-roasted macadamias grown on regenerative family farms in Australia that use no irrigation.",
    PillarTrue: "USDA Organic is the independently administered certification qualifying this product; shelf-stable format means it fits Snacks & Pantry the same way MALK's oat milk does, rather than the perishable-dairy category that sank the earlier Boss Cow rejection.",
    BuyLinks: [{ label: 'Order direct', url: 'https://www.milkadamia.com/products/milkadamia-organic-artisan-macadamia-milk-32oz-pack-of-6' }],
  },
  {
    Name: 'Olyra Fig Bars Bundle',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: "Breakfast fig bars made with organic ancient Greek grains, offering up to 50% less sugar than leading breakfast bars. Rooted in over 100 years of Greek milling heritage.",
    PillarClean: "USDA Certified Organic.",
    PillarFair: "Purchases support rePurpose Global, which removes plastic waste from landfills.",
    PillarTrue: "USDA Organic is the qualifying independent certification. The give-back is real and disclosed, but it's an environmental (plastic-waste) cause rather than a food-security or agricultural one -- noted here plainly rather than framed as more than it is.",
    BuyLinks: [{ label: 'Order direct', url: 'https://olyrafoods.com/' }],
  },
  {
    Name: 'Partake Foods Soft Baked Chocolate Chip Cookies',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: "Allergy-friendly soft-baked cookies founded by a mom seeking a FOMO-free treat for her daughter with food allergies. Baked in a dedicated facility free of the top 9 allergens.",
    PillarClean: "Certified B Corporation with an 87.1 B Impact Score (verified by B Lab), Certified Gluten-Free, Non-GMO Project Verified, and Certified Vegan.",
    PillarFair: "Donates 1% of revenue to organizations fighting food insecurity in the United States.",
    PillarTrue: "B Corp status is independently audited by B Lab rather than self-declared, and the give-back names a specific, quantified, food-relevant cause -- one of the strongest certification-plus-give-back combinations in this batch.",
    BuyLinks: [{ label: 'Order on Amazon', url: 'https://www.amazon.com/dp/B08HRPM9L6' }],
  },
  {
    Name: 'Matchpoint Matcha: Okumidori',
    Category: 'lna',
    Status: 'approved',
    PillarGood: "Single-cultivar, single-origin matcha sourced from Kagoshima, Japan, with tasting notes of pistachio, snow pea, and sweet cream. Grown the traditional way, without chemicals, and harvested annually in small batches.",
    PillarClean: "JAS Certified Organic (Japan's official organic certification standard) and USDA Organic certified.",
    PillarFair: "Direct trade with family-owned tencha farms, purchased directly and in small batches to support multi-generational tea farms that are otherwise squeezed by low bulk-market prices as matcha's popularity has grown.",
    PillarTrue: "JAS and USDA Organic are both independently administered certifications, and the direct-trade claim names a specific sourcing relationship rather than a vague 'supports farmers' line. Fits Low & No Alcohol the same way yerba mate already does on this list.",
    BuyLinks: [{ label: 'Order direct', url: 'https://www.matchpointmatcha.com/shop/p/organic-okumidori-matcha' }],
  },
  {
    Name: 'Nice Cans Sardines with Rosemary and Fennel',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: "Wild-caught sardines hand-packed in Portugal by José Gourmet using traditional techniques, finished with premium organic olive oil and herbs. Founded by chef Charlotte Langley.",
    PillarClean: "Marine Stewardship Council (MSC) certified sustainable seafood; organic olive oil used where applicable.",
    PillarFair: "Partners directly with small, independent fisheries and canneries under a transparent, revenue-sharing model. Founder is MSC's Canadian Chef Ambassador.",
    PillarTrue: "MSC certification is independently audited by the Marine Stewardship Council -- the seafood-category equivalent of Fair Trade or B Corp, not a self-declared sustainability claim.",
    BuyLinks: [{ label: 'Order direct', url: 'https://justnicecans.com/products/sardines-with-rosemary-and-fennel' }],
  },
  {
    Name: "Pastabilities Dinosaur Pasta",
    Category: 'grains',
    Status: 'approved',
    PillarGood: "Fun dinosaur-shaped wheat pasta made for kids, family size, made in the USA in Nashville, TN.",
    PillarClean: "Kosher Certified. Ingredients are stated as non-GMO and all-natural on packaging.",
    PillarFair: "Small business, made in the USA.",
    PillarTrue: "Correction from initial research: this line was originally logged as USDA Organic, Kosher, Vegan, and Non-GMO. Live verification of the retail packaging found it labeled 'All-Natural,' not USDA Organic -- only Kosher Certified is a verified, independently administered certification. Imported on the strength of that one certification, the same bar applied to single-certification approvals elsewhere on this list (MSC, B Corp).",
    BuyLinks: [{ label: 'Order on Amazon', url: 'https://www.amazon.com/Pastabilities-Fun-Shaped-Pasta-Kids/dp/B0DY9JNFMC' }],
  },
]

async function createBatch(records) {
  const res  = await fetch(URL, { method: 'POST', headers: HEADERS, body: JSON.stringify({ records }) })
  const data = await res.json()
  if (data.error) throw new Error(JSON.stringify(data.error))
  return data.records
}

async function main() {
  console.log('\n🥫  GFA PUG Import — Batch 3 (10 approved brands)\n')

  const recordBodies = PRODUCTS.map(r => ({
    fields: { ...r, BuyLinks: JSON.stringify(r.BuyLinks) },
  }))

  for (let i = 0; i < recordBodies.length; i += 10) {
    const created = await createBatch(recordBodies.slice(i, i + 10))
    for (const r of created) console.log(`   ✅  imported: ${r.fields.Name}`)
    if (i + 10 < recordBodies.length) await new Promise(r => setTimeout(r, 250))
  }

  console.log('\n🎉  Done. Refresh the site (may take up to a minute — ISR cache) to see changes.\n')
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1) })
