#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch14.mjs <YOUR_PAT> [BASE_ID]
//
// Re-verification pass on brands previously flagged as unconfirmed.
// Sharper, brand-specific searches confirmed named third-party
// certifications for these 5: FitJoy, Jackson's Honest, House of Yes
// Foods, Earth & Star, Baja Vida.
//
// Still NOT cleared (kept flagged, not imported):
//  - Globowl: uses 90%+ organic ingredients, which is below the 95%
//    threshold required to legally bear the USDA Organic seal -- does not
//    qualify as certified organic.
//  - GOOD GOOD: "Non-GMO Verified" is the brand's own collection label on
//    its site, not confirmed as third-party Non-GMO Project Verified.
//  - Dr. Smood: confirmed 100% USDA Organic + Kosher, but operates as a
//    café/juice-bar chain with no packaged retail SKU or buy link -- not a
//    fit for the catalog format even though the certification is real.
//  - Drizzi / Drizzilicious: name collision between two different products
//    (a sauce brand and a rice-cake/popcorn brand) made verification
//    unreliable; the sauce brand specifically has no confirmed active
//    GFCO certification.
//  - Dumpling Daughter: no organic or other named certification confirmed
//    for the brand itself (a similarly-named competitor, Wan Ja Shan, is
//    the one that's actually organic certified).
//  - AL's: no matching non-alcoholic spirit brand found under BeVeg's
//    certified list.
//  - Beckon: non-GMO ingredients claimed but no Non-GMO Project Verified
//    or USDA Organic seal confirmed.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch14.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'FitJoy Grain Free Crackers, Classic',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A grain-free, gluten-free cracker free from the top 8 allergens -- made without grains, gluten, dairy, nuts, or soy.',
    PillarClean: 'Non-GMO Project Verified and Certified Gluten-Free.',
    PillarFair: 'OU Kosher Certified.',
    PillarTrue: 'All three certifications (Non-GMO Project, Gluten-Free, OU Kosher) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/FitJoy-Grain-Crackers-Classic-Flavor/dp/B0GSZ4QFBB' }],
  },
  {
    Name: "Jackson's Honest Potato Chips, Sea Salt",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Potato chips hand kettle-fried in organic coconut oil -- made with the finest organic potatoes, no seed oils.',
    PillarClean: 'USDA Certified Organic by QAI and Non-GMO Project Verified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'Both certifications (USDA Organic via QAI, Non-GMO Project) are independently issued and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://us.amazon.com/dp/B00I4UXSCK/ref=dp_cerb_1' }],
  },
  {
    Name: 'House of Yes Protein Super Bar',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: "A kids' protein bar with 6g protein, 6g fiber, and real vegetables built in -- a substantial snacking alternative to candy bars.",
    PillarClean: 'OU Kosher Certified by the Kashruth Division of the Orthodox Union.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Kosher certification.',
    PillarTrue: 'The OU Kosher certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.houseofyesfoods.com/' }],
  },
  {
    Name: 'Earth & Star Organic Dark Chocolate with Adaptogen Mushroom Extracts, Variety Pack',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Dark chocolate bars blended with 2,000mg of adaptogenic mushroom extracts (lion\'s mane, chaga, reishi, cordyceps) -- vegan, only 80 calories and 2g sugar per bar.',
    PillarClean: 'Certified Organic; free of dairy, soy, emulsifiers, and gluten.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certification.',
    PillarTrue: 'The Certified Organic designation is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Earth-Star-Chocolate-Adaptogen-Mushroom/dp/B09D2XF6SY' }],
  },
  {
    Name: 'Baja Vida Organic Dried Mangos',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: '100% pure Mexican mangos, dried with no added sugar and no preservatives -- naturally sweet and low fat.',
    PillarClean: 'USDA Certified Organic, unsulfured, and Non-GMO.',
    PillarFair: 'Kosher Certified.',
    PillarTrue: 'All three certifications (USDA Organic, Non-GMO, Kosher) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://bajavida.com/dried-mangos/' }],
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
  console.log(`Importing ${PRODUCTS.length} re-verified batch-14 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
