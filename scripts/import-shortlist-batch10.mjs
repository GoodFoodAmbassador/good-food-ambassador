#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch10.mjs <YOUR_PAT> [BASE_ID]
//
// Fifth batch of PUG candidate-queue shortlist conversions. 12 brands with
// clear flagship products and working buy links. Certification research
// already logged in research/pug_candidate_queue.csv. (FitJoy, Globowl, and
// GOOD GOOD were skipped this round -- direct verification could not
// confirm a clearly named, independent third-party certification behind
// the claims logged for them; left flagged for re-check.)

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch10.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Fishwife Cantabrian Anchovies',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Wild-caught anchovies hand-packed from Europe\'s only MSC-certified sustainable anchovy fishery in the Cantabrian Sea.',
    PillarClean: 'MSC Certified (Marine Stewardship Council).',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the MSC certification.',
    PillarTrue: 'The MSC certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Fishwife-Cantabrian-MSC-Certified-Sustainable-Hand-Packed/dp/B0CPTDXS7J' }],
  },
  {
    Name: 'Fix & Fogg Smooth Peanut Butter',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A natural peanut butter spread from New Zealand with no added sugar or palm oil.',
    PillarClean: 'Non-GMO, per the brand\'s own product listings.',
    PillarFair: 'Certified B Corporation -- the first New Zealand-owned food manufacturer to earn the certification, reflecting an audited standard on worker treatment and living wages.',
    PillarTrue: 'The B Corp certification is independently administered by B Lab and publicly verifiable in B Lab\'s directory.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://us.amazon.com/Fix-Fogg-Smooth-Peanut-Butter/dp/B073SHX9X9' }],
  },
  {
    Name: 'Flock Keto Chicken Skin Chips, Original',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A high-protein, zero-carb keto snack made from chicken skin that would otherwise go to waste in poultry processing.',
    PillarClean: 'Upcycled Certified by the Upcycled Food Association -- a named third-party standard confirming the ingredient prevents food waste.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Upcycled certification.',
    PillarTrue: 'The Upcycled Certified designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Flock-Chicken-Protein-Gluten-Original/dp/B086WQXFJG' }],
  },
  {
    Name: 'Fly By Jing Original Sichuan Chili Crisp',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A Sichuan chili crisp made with Erjingtiao chili peppers and tribute peppercorns, created by chef Jing Gao.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'Certified B Corporation, reflecting an audited standard on worker treatment, supply chain, and environmental impact.',
    PillarTrue: 'Both certifications (Non-GMO Project, B Corp) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Sauce-Sichuan-Chili-Crisp-Ounce/dp/B0849Q133Y' }],
  },
  {
    Name: 'For Bitter For Worse Non-Alcoholic Sparkling Botanical Spritz, Variety',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A non-alcoholic sparkling cocktail made through a "reverse bootlegging" process using whole certified organic botanicals rather than lab-derived flavors.',
    PillarClean: 'Certified organic raw botanicals, per the brand\'s own site.',
    PillarFair: 'A woman-owned, family-run business built around ethical sourcing.',
    PillarTrue: 'The organic certification on the raw botanicals is independently administered, though tied to the ingredient rather than a single product-wide seal -- worth a quick label check to confirm which certifying body issued it.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Bitter-Worse-Non-Alcoholic-Cocktail-Gluten-Free/dp/B0CG2MGWPB' }],
  },
  {
    Name: 'Gay Awakening Coffee, Drag Bean',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A queer-owned and roasted coffee out of Portland, Oregon.',
    PillarClean: '100% Certified Organic, ODA-approved (Oregon Department of Agriculture).',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The organic certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.gayawakeningcoffee.com/' }],
  },
  {
    Name: 'Girl Meets Dirt Island Plum Shrub',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A drinking vinegar (shrub) hand-cooked in copper pots from single-varietal orchard fruit on Orcas Island, Washington -- for cocktails or sparkling water.',
    PillarClean: 'Made with organic fruit and organic white wine vinegar, per the brand\'s own ingredient listing.',
    PillarFair: 'Organic Fair Trade cane sugar -- a named, independently certified sourcing standard for the sweetener.',
    PillarTrue: 'The Fair Trade certification on the cane sugar is independently administered and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Girl-Meets-Dirt-Shrub-Island/dp/B0891KPTSG' }],
  },
  {
    Name: 'Good Twin Organic Non-Alcoholic Sparkling Blanc',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A dealcoholized, Prosecco-style sparkling wine made with Glera grapes from Italy.',
    PillarClean: 'Certified Organic.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The Certified Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Good-Twin-Sparkling-Non-Alcoholic-Bottles/dp/B0FR7W224N' }],
  },
  {
    Name: 'GoodSAM Organic Roasted Macadamia Nuts, Salted',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Roasted macadamia nuts from regenerative family farms, sold direct-trade.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified.',
    PillarFair: 'Certified B Corporation and direct-trade sourced from regenerative family farms -- a named, traceable relationship rather than a vague sourcing claim.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO Project, B Corp) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/GOODSAM-Organic-Macadamia-friendly-Regenerative/dp/B0957ZXLVZ' }],
  },
  {
    Name: 'Gourmend Organic Unsalted Beef Bone Broth',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A 10-ingredient organic bone broth free of onion and garlic bulbs, designed for people managing digestive sensitivities.',
    PillarClean: 'USDA Certified Organic and Low FODMAP Certified by FODMAP Friendly.',
    PillarFair: 'Certified B Corporation, reflecting an audited standard on worker treatment, supply chain, and environmental impact.',
    PillarTrue: 'All three certifications (USDA Organic, FODMAP Friendly, B Corp) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Organic-Unsalted-16-9oz-Broth-Gourmend/dp/B0B7TPMN6G' }],
  },
  {
    Name: 'Groovy Coffee Original Ground Roast',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A cinnamon-infused Colombian Supremo ground coffee, roasted in Edgewater, New Jersey, from a female-founded, family-run business.',
    PillarClean: 'Certified Kosher.',
    PillarFair: 'The brand is explicit on its own site that it is not certified organic or Fair Trade -- worth noting rather than overstating.',
    PillarTrue: 'The Kosher certification is independently administered and publicly verifiable; the brand\'s own transparency about what it is NOT certified for is a good trust signal.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://groovycoffee.com/products/groovy-coffee' }],
  },
  {
    Name: 'Häppy Candy Italian Summer Gummy Candy',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A low-sugar gummy candy (70% less sugar than traditional candy) made without artificial dyes or alternative sweeteners, free from the top 9 allergens.',
    PillarClean: 'Non-GMO ingredients and Certified Vegan, per the brand\'s own product listings.',
    PillarFair: 'WBENC Certified Women\'s Business Enterprise -- a named, independently audited certification.',
    PillarTrue: 'The WBENC certification is independently administered by the Women\'s Business Enterprise National Council and publicly verifiable in its registry.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/H%C3%A4ppy-Candy-Gluten-Free-Lactose-Free-Plant-Based/dp/B0DLLCTHDZ' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-10 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
