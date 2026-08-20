#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch7.mjs <YOUR_PAT> [BASE_ID]
//
// Second batch of PUG candidate-queue shortlist conversions. This batch:
// 10 well-established, easily source-verified brands with clear flagship
// products and working buy links. Certification research already logged in
// research/pug_candidate_queue.csv.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch7.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Three Farm Daughters High Fiber Pasta, Rotini',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'A high-fiber, non-GMO pasta made from just two ingredients -- wheat flour and durum semolina -- with 4.5x the fiber of traditional pasta and 8g protein per serving.',
    PillarClean: 'Kosher Certified and Non-GMO, per the brand\'s own certifications listed on its product pages.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the product-level certifications.',
    PillarTrue: 'The Kosher and Non-GMO certifications are administered by named third-party certifying bodies, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Three-Farm-Daughters-Rotini-Noodles/dp/B0D9PKWZCR' }],
  },
  {
    Name: '34 Degrees Original Crisps',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Thin, light, crunchy crisps built for cheese boards and entertaining -- a simple wheat-based cracker alternative to heavier snacks.',
    PillarClean: 'Non-GMO Project Verified and GFCO Certified Gluten-Free.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Non-GMO Project, GFCO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/34-Degrees-Natural-Crisps-Ounce/dp/B001E5DYGM' }],
  },
  {
    Name: '4th & Heart Original Grass-Fed Ghee',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A pasture-raised, grass-fed clarified butter with a high smoke point -- lactose and casein free, suited to high-heat cooking.',
    PillarClean: 'Non-GMO Project Verified, Certified Gluten-Free, and Kosher Certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the three product certifications.',
    PillarTrue: 'All three certifications (Non-GMO Project, Gluten-Free, Kosher) are independently issued and verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Grass-Fed-4th-Heart-Certified-Keto-Friendly/dp/B01M19Z219' }],
  },
  {
    Name: 'Algae Cooking Club Chef-Grade 100% Algae Cooking Oil',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: 'A neutral-flavor cooking oil made from algae rather than seed crops -- 535°F smoke point, rich in omega-9 monounsaturated fat, positioned as an avocado-oil alternative.',
    PillarClean: 'Seed Oil Free Certified by the Seed Oil Free Alliance -- a named third-party certifying body.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Seed Oil Free certification.',
    PillarTrue: 'The Seed Oil Free Alliance certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Algae-Cooking-Club-Chef-Grade-Pack/dp/B0D7JJD2CH' }],
  },
  {
    Name: 'Bada Bean Bada Boom Roasted Fava Bean Snacks, Sea Salt',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Crunchy roasted fava (broad) bean snacks -- 6g plant-based protein and 4g fiber per 110-calorie serving, a nut/chip alternative.',
    PillarClean: 'Non-GMO Project Verified and Kosher Certified by the Orthodox Union (OU).',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Non-GMO Project, OU Kosher) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Bada-Bean-Boom-Plant-Based-Calories/dp/B01M8GIEX7' }],
  },
  {
    Name: 'Bahamii Almond & Date Bars, Chocolate Almond',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A 6-ingredient date-and-nut snack bar with no added sugar and no preservatives, built around whole dates as the primary ingredient.',
    PillarClean: 'Kosher Certified and Non-GMO certified.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Kosher, Non-GMO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Bahamii-Certified-Organic-Chocolate-Preservatives/dp/B0BK2RLXQ6' }],
  },
  {
    Name: "Beekeeper's Naturals B.LXR Brain Fuel",
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A liquid focus formula built on royal jelly, ginkgo biloba, and bacopa monnieri -- caffeine-free, positioned as a productivity and clarity supplement.',
    PillarClean: 'Certified B Corporation, per B Lab Global.',
    PillarFair: 'Certified B Corporation status reflects an audited standard covering worker treatment, supply chain, and environmental impact, not a self-declared claim.',
    PillarTrue: 'The B Corp certification is independently administered by B Lab and publicly verifiable in B Lab\'s directory.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/BEEKEEPERS-NATURALS-B-LXR-Brain-Fuel/dp/B072W82CYH' }],
  },
  {
    Name: 'Blobs Gummy Candy, Pomegranate Apple',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A low-sugar (2g) fruit gummy candy positioned as a healthier alternative to traditional gummies -- no sugar alcohols, no artificial dyes.',
    PillarClean: 'Non-GMO Project Certified, per the brand\'s own product listings across multiple retailers.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the Non-GMO Project certification.',
    PillarTrue: 'The Non-GMO Project certification is independently administered and publicly verifiable, not a self-declared claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Blobs-Gummy-Calorie-Healthy-Adults/dp/B0CG7K9B36' }],
  },
  {
    Name: 'Blue Stripes Pure Dark Whole Cacao Chocolate Bar, 70%',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A whole-cacao dark chocolate bar (70%) made with Ecuadorian Arriba Nacional cacao and no refined sugar.',
    PillarClean: 'USDA Certified Organic, Non-GMO, Kosher, and Certified Upcycled -- using the whole cacao fruit rather than just the bean.',
    PillarFair: 'Fair Trade Certified, sourced directly from cacao farms in Ecuador through named grower partnerships.',
    PillarTrue: 'The five certifications (USDA Organic, Non-GMO, Kosher, Upcycled Certified, Fair Trade) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Blue-Stripes-Pure-Dark-Chocolate/dp/B0BWKFSDMF' }],
  },
  {
    Name: 'Broma Dark Chocolate Almond Spread',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A dark chocolate almond spread made with organic almonds and lentils for complete protein -- gluten-free, no refined sugar or palm oil.',
    PillarClean: 'Certified Organic and Non-GMO.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the two product certifications.',
    PillarTrue: 'Both certifications (Certified Organic, Non-GMO) are independently administered and publicly verifiable.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Broma-Chocolate-Organic-Non-GMO-Friendly/dp/B0828BBJ1X' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-7 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
