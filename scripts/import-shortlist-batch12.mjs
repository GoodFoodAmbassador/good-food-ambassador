#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch12.mjs <YOUR_PAT> [BASE_ID]
//
// Seventh batch of PUG candidate-queue shortlist conversions. 12 brands with
// clear flagship products and working buy links. Certification research
// already logged in research/pug_candidate_queue.csv.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch12.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Jovial Einkorn 100% Organic Whole Grain Spaghetti',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A whole-grain pasta made from einkorn, an ancient wheat variety -- not bromated, bleached, or enriched, made in Italy.',
    PillarClean: 'USDA Certified Organic (by QAI) and Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'Both certifications (USDA Organic via QAI, Non-GMO Project) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Jovial-Organic-Spaghetti-12-Ounce-Packages/dp/B0041QEM94' }],
  },
  {
    Name: 'Yamaki Jozo Organic Shoyu (Soy Sauce)',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A traditional Japanese soy sauce brewed from organic soybeans, organic wheat, sea salt, and koji, aged two years in cedar barrels by a nearly 120-year-old brewery.',
    PillarClean: 'Certified organic in Japan, the EU, and the US.',
    PillarFair: 'Kosher Certified.',
    PillarTrue: 'Both certifications (organic across three jurisdictions, Kosher) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://thejapanesepantry.com/products/organic-soy-sauce-1' }],
  },
  {
    Name: 'JustNosh Double Chocolate Chip Collagen Protein Bars',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A collagen protein bar with 15g protein and 10g collagen -- gluten-free, dairy-free, and low FODMAP.',
    PillarClean: 'Seed Oil Free Certified via lab testing that verifies zero seed oil content.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Seed Oil Free certification.',
    PillarTrue: 'The Seed Oil Free Certified designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/JustNosh-Collagen-Protein-Friendly-Certified/dp/B09WCK8P49' }],
  },
  {
    Name: 'Ka-Pop! Popped Chips, Vegan Cheddar',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A whole-grain popped chip made from sorghum, an ancient grain that has never been genetically modified -- gluten, corn, and dairy free.',
    PillarClean: 'Non-GMO Project Verified and Certified Vegan by VeganAction.',
    PillarFair: 'Kosher Certified.',
    PillarTrue: 'All three certifications (Non-GMO Project, VeganAction, Kosher) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Ka-Pop-Popped-Chips-Vegan-Cheddar/dp/B07Q342H5B' }],
  },
  {
    Name: 'Kaizen Low Carb Pasta, Fusilli',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A high-protein, low-carb pasta made from plant-based lupini beans instead of wheat -- no grains or starchy flours.',
    PillarClean: 'GFCO Certified Gluten-Free and Non-GMO.',
    PillarFair: 'Kosher Certified.',
    PillarTrue: 'All three certifications (GFCO, Non-GMO, Kosher) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Kaizen-Low-Carb-Pasta-Fusilli/dp/B0BNW8L1CP' }],
  },
  {
    Name: 'Karma Nuts Sea Salt Cashews',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Whole roasted cashews, never fried in oil -- a simple, whole-food snack.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'Kosher Certified.',
    PillarTrue: 'Both certifications (Non-GMO Project, Kosher) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Karma-Nuts-Roasted-Whole-Cashews/dp/B01N431FCX' }],
  },
  {
    Name: 'Kibo Chickpea Chips, Pico de Gallo',
    Category: 'legumes',
    Status: 'approved',
    PillarGood: 'A chickpea-based chip made with real vegetables -- high in protein and fiber, plant-based.',
    PillarClean: 'Non-GMO Project Verified and Certified Gluten-Free.',
    PillarFair: 'Kosher Certified.',
    PillarTrue: 'All three certifications (Non-GMO Project, Gluten-Free, Kosher) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Kibo-Chickpea-Chips-Plant-Based-Non-GMO/dp/B07WXJ9RJY' }],
  },
  {
    Name: 'Kolkata Chai Signature Masala Chai Mix',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'A premium loose-leaf black tea and spice blend sourced from the Bhubrighat Estate in Assam, India.',
    PillarClean: 'Bio-Organic Certified.',
    PillarFair: 'Fair Trade Certified and UTZ Certified -- two named, independently audited sourcing standards.',
    PillarTrue: 'All three certifications (Bio-Organic, Fair Trade, UTZ) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Kolkata-Chai-Signature-Organic-Premium/dp/B0BCSDBKYT' }],
  },
  {
    Name: 'Kooshy Croutons, Mambo Italiano',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Hearth-baked sourdough croutons made with organic flour and extra virgin olive oil -- no artificial flavors, preservatives, or dyes.',
    PillarClean: 'Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO Project certification.',
    PillarTrue: 'The Non-GMO Project Verified certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Kooshy-Croutons-Italiano-Sourdough-Parmesan/dp/B09PVN8XHW' }],
  },
  {
    Name: 'Like Air Puffcorn, Classic',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A light, airy puffcorn snack made from non-GMO corn meal in a nut-free facility -- no hulls or hard kernels.',
    PillarClean: 'Non-GMO corn, per the brand\'s own product listings (not third-party verified for the Non-GMO claim specifically).',
    PillarFair: 'Kosher Certified by the Orthodox Union.',
    PillarTrue: 'The OU Kosher certification is independently administered and publicly verifiable; the Non-GMO claim here is ingredient-level rather than a certified seal, worth noting as the weaker of the two claims.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Like-Air-Puffcorn-Artificial-Ingredients/dp/B0C2HYG6CB' }],
  },
  {
    Name: 'Little Latke Potato Latke Crisps, The Original',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'The first shelf-stable snack inspired by a traditional potato latke -- a crunchy, resealable-pouch crisp.',
    PillarClean: 'Certified Gluten-Free, per the brand\'s own listing.',
    PillarFair: 'OK Kosher Certified.',
    PillarTrue: 'The OK Kosher certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.littlelatke.com/products/little-latke-crisps' }],
  },
  {
    Name: 'Little Spoon Organic Baby Cereal',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Fresh, organic baby food and cereal delivered direct to families, with recipes developed alongside pediatric nutrition experts.',
    PillarClean: 'USDA Certified Organic and Certified EU Organic.',
    PillarFair: 'Clean Label Project Certified and Certified Pesticide Free -- each batch independently tested for over 500 potential toxins and contaminants, including heavy metals and pesticide residues.',
    PillarTrue: 'All certifications (USDA Organic, EU Organic, Clean Label Project) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.littlespoon.com/products/baby-cereal' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-12 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
