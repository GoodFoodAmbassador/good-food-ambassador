#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch9.mjs <YOUR_PAT> [BASE_ID]
//
// Fourth batch of PUG candidate-queue shortlist conversions. 12 brands with
// clear flagship products and working buy links. Certification research
// already logged in research/pug_candidate_queue.csv. (Dr. Smood, Drizzi,
// and Dumpling Daughter were skipped this round -- direct verification did
// not clearly confirm the certification claims logged for them, so they're
// left pending re-check rather than imported on an unverified basis.)

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch9.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Dirtbag Bar Organic Whole Food Energy Bar, Original Chocolate',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A whole-food energy bar built from dates, oats, nuts, and dark chocolate -- no ultra-processed ingredients or added sugars.',
    PillarClean: 'Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Certified Organic, Non-GMO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Dirtbag-Bar-Chocolate-Ultra-Processed-Endurance/dp/B0DXFLLTND' }],
  },
  {
    Name: 'Edggies Organic Kale Sprinkles',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Air-dried, flavor-neutral kale sprinkles designed to blend into eggs, pasta, soups, and smoothies -- an easy way to add greens to any meal.',
    PillarClean: 'USDA Certified Organic by CCOF (California Certified Organic Farmers).',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the CCOF organic certification.',
    PillarTrue: 'The CCOF certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Edggies-Organic-Kale-Sprinkles-Ready/dp/B0DNDLMD12' }],
  },
  {
    Name: "Ella's Flats All Seed Cracker Crisp",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A cracker made entirely of seeds and spices -- pumpkin, sunflower, flax, chia, and sesame -- with no grain flour.',
    PillarClean: 'Certified Gluten-Free and Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Gluten-Free, Non-GMO Project) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Ellas-Cracker-Friendly-Gluten-Non-GMO/dp/B0DTVQ3YWS' }],
  },
  {
    Name: 'Equip Foods Clean Coffee, Nicaragua Medium Roast',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A whole-bean medium roast coffee from Nicaragua, third-party tested and confirmed free of mycotoxins and herbicide residue like glyphosate.',
    PillarClean: 'Certified Organic.',
    PillarFair: 'Fair Trade Certified and Regenerative -- sourced through a direct partnership with small farm cooperatives in Nicaragua.',
    PillarTrue: 'The three certifications (Certified Organic, Fair Trade, Regenerative) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Equip-Certified-Regenerative-Nicaragua-Chocolate/dp/B0DJC2L2CT' }],
  },
  {
    Name: 'Eureka Tortilla Organic Plain Delicious Flour Tortillas',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A small-batch artisanal flour tortilla made with whole grains -- free of palm oil and gums.',
    PillarClean: 'Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Certified Organic, Non-GMO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Eureka-Tortilla-Tortillas-Street-Shells/dp/B0BWNT86CQ' }],
  },
  {
    Name: 'Every Body Eat Gluten-Free Crackers, Variety Pack',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'An allergen-friendly cracker line free from the top 14 allergens plus corn, made in a dedicated allergen-free facility.',
    PillarClean: 'Certified Gluten-Free, Kosher, Non-GMO, and Seed Oil Free Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'All four certifications (Gluten-Free, Kosher, Non-GMO, Seed Oil Free) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Every-Body-Eat-Snack-Variety/dp/B08PCD7TR9' }],
  },
  {
    Name: "Evie's Sweet and Salty Pecans",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Roasted Texas pecan snacks from a woman-owned business sourcing family-farm-grown pecans -- no artificial ingredients.',
    PillarClean: 'USDA Certified Organic pecans (sourced from Rio Grande Organics) and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Evies-Pecans-Gluten-Free-Made-USA/dp/B0FYRBRTCC' }],
  },
  {
    Name: 'Evo Hemp Organic Protein Bar, Cashew Cacao',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A hemp-protein bar featuring all 21 known amino acids and omega-3s, made through a partnership with the 40-Acre Cooperative supporting Black farmers in the hemp industry.',
    PillarClean: 'USDA Certified Organic and Kosher.',
    PillarFair: 'Sourced through a named partnership with the 40-Acre Cooperative, addressing underrepresentation of Black farmers in the hemp industry.',
    PillarTrue: 'Both certifications (USDA Organic, Kosher) are independently issued and publicly verifiable, and the named cooperative partnership adds a traceable supply chain.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Evo-Hemp-Chocolate-Berries-Antioxidants/dp/B01N1U9Q74' }],
  },
  {
    Name: 'EVOLVED Signature Dark Chocolate Bar, 72% Cacao',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A 72% cacao dark chocolate bar made with organic cacao, coconut sugar, and cacao butter -- free of gluten, dairy, peanuts, soy, and cane sugar.',
    PillarClean: 'USDA Certified Organic.',
    PillarFair: 'Rainforest Alliance Certified cacao -- a standard addressing child labor, forced labor, poor working conditions, and low wages on source farms.',
    PillarTrue: 'Both certifications (USDA Organic, Rainforest Alliance) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Eating-Evolved-Organic-Chocolate-Signature/dp/B01MZ650JO' }],
  },
  {
    Name: 'Fabalish Organic Falafel, Zesty Zucchini',
    Category: 'legumes',
    Status: 'approved',
    PillarGood: 'A baked (not fried) chickpea falafel made with zucchini, green peas, parsley, and simple whole-food ingredients -- top-8 allergen free.',
    PillarClean: 'Certified Organic.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The Certified Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Fabalish-Zucchini-Plant-Based-Allergen-Gluten-Free/dp/B093X6VSPZ' }],
  },
  {
    Name: 'Fancypants Baking Co. Keto Low Carb Cookies, Chocolate Chip',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A low-carb keto cookie baked with upcycled oat flour -- made from the dried, milled oat pulp left over from oat-milk production -- in a nut-free facility.',
    PillarClean: 'Non-GMO Project Verified and Kosher-Dairy Certified.',
    PillarFair: 'Upcycled Certified -- an independently audited standard confirming the oat flour is made from food-industry byproduct rather than virgin crop.',
    PillarTrue: 'All three certifications (Non-GMO Project, Kosher-Dairy, Upcycled Certified) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Fancypants-Baking-Snack-Cookies-CHOCOLATE/dp/B0862FF35G' }],
  },
]

// NOTE: Earth & Star was dropped from this batch. The product found
// ("Cacao with Oat Milk and Adaptogens") only carries an ingredient-level
// "organic mushroom extracts" claim on its own listing -- no named
// third-party certifying body confirmed -- so it doesn't clear the GFA
// certification bar on direct verification. Leaving it flagged for
// re-check rather than importing on a weaker basis than the rest of the
// catalog.

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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-9 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
