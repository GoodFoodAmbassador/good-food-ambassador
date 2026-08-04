#!/usr/bin/env node
// Usage: node scripts/import-pug-batch4.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 4: PUG priority-candidate screening, live buy-link verification, and
// four-pillar copy for 8 approved brands (of 11 shortlisted -- 3 dropped
// after live verification):
//
// - Tazzy Candy: dropped -- discontinued/unavailable everywhere checked.
//   Official site (tazzy.co) unreachable; third-party retailers (Misfits
//   Market, Snackmagic) both list it "Out of stock"; Amazon search for
//   Tazzy Candy products returns zero live listings.
//
// - Sweet Deliverance: dropped -- on closer verification, the brand's own
//   site only self-describes its ingredients as organic ("we use organic
//   ingredients wherever we can") without naming a certifying body, and its
//   "2024 Good Food Awards" win is a recognition, not a certification (same
//   standard applied to Oh-Mazing Granola's rejection in Batch 2). No other
//   independently-administered certification found.
//
// - tealish: dropped -- same issue as Sweet Deliverance. The brand's product
//   page and every third-party retailer listing checked (Google Shopping,
//   Art Noise, Instacart, Balderson Village Cheese) repeat "100% organic" /
//   "certified organic" without ever naming a certifying body (no USDA
//   Organic or EU Organic seal found on packaging or site). Doesn't clear
//   GFA's certification-only bar.
//
// Remaining 8 confirmed live and imported below. Two notable nuances flagged
// in PillarTrue: Rare Breed Coffee's own FAQ says "most" (not all) of its
// coffees are certified organic; SEEDLY's finished-bar "organic" claim is
// ingredient-level and self-described, but its dark chocolate is
// specifically Fairtrade-certified, which is what we're crediting.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-pug-batch4.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Racha Organics Hot Sriracha',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: "Small-batch sriracha built around Racha's own exclusive chili pepper, grown on the brand's Northern Thailand farm and fermented with house-distilled organic pineapple vinegar for a sweet-to-fiery finish.",
    PillarClean: 'USDA Certified Organic. Ingredients: organic chili peppers, organic pineapple vinegar, organic cane sugar, organic garlic, water, salt, xanthan gum.',
    PillarFair: "Racha grows its own peppers and garlic on its own farm, giving it direct oversight of growing conditions rather than sourcing through an anonymous supply chain.",
    PillarTrue: "The brand's site also calls its farm \"regenerative,\" but that claim isn't backed by a named third-party certifier like Regenerative Organic Certified -- we're crediting the verified USDA Organic status only.",
    BuyLinks: [{ label: 'Order direct', url: 'https://racha-organics.com/products/gold-hot-sriracha' }],
  },
  {
    Name: 'Taïm Extra Virgin Olive Oil',
    Category: 'olive-oils',
    Status: 'approved',
    PillarGood: "Single-estate extra virgin olive oil cold-extracted within hours of harvest from hand-picked heirloom Souri olives grown in Lebanon's Taïm Valley.",
    PillarClean: "No organic or other food certification is claimed by the brand -- what's verified here is single-estate, heirloom-olive sourcing and same-day cold extraction.",
    PillarFair: "A portion of profits is donated to SEAL, a registered 501(c)(3) nonprofit that funds sustainable economic opportunities for rural Lebanese farmers and land stewards -- a named organization tied directly to the brand's own supply region.",
    PillarTrue: "Taïm doesn't hold or claim an organic certification, so nothing organic is implied here -- the qualifying signal is the specific, named nonprofit partnership, not a certification.",
    BuyLinks: [{ label: 'Order direct', url: 'https://taimolive.com/products/lebanese-heirloom-olive-oil' }],
  },
  {
    Name: 'SEEDLY Vanilla Quinoa Crunch Dark Chocolate Bark',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Dark chocolate seed bark made with hemp, sunflower, and pumpkin seeds plus quinoa crisp and Madagascar vanilla, sweetened with unrefined coconut sugar -- no refined sugar, oils, or preservatives.',
    PillarClean: 'The dark chocolate itself is Fairtrade-certified ("Organic Fairtrade Dark Chocolate" on the ingredient panel). Other ingredients are labeled organic on the pack, but SEEDLY does not display a USDA Organic seal or name a certifying body for the finished bar.',
    PillarFair: 'Fairtrade certification on the cacao means growers were guaranteed a minimum price plus the Fairtrade premium.',
    PillarTrue: "We're crediting SEEDLY for its verified Fairtrade-certified chocolate specifically -- the broader \"organic\" ingredient labeling is a brand claim, not an independently verified certification covering the whole product.",
    BuyLinks: [{ label: 'Order direct', url: 'https://www.eatseedly.com/products/seedly-vanilla-quinoa-crunch-dark-chocolate-bark-3-6-oz' }],
  },
  {
    Name: 'Solely Organic Mango Fruit Jerky',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'One ingredient -- whole organic mango, sliced and dried into a chewy fruit strip, with no added sugar, preservatives, or concentrate.',
    PillarClean: 'USDA Certified Organic (the seal is printed directly on the package).',
    PillarFair: 'No specific labor or trade certification found for this product.',
    PillarTrue: 'Solely markets this as "clean" and "simple," and the claim holds up: one certified-organic ingredient, nothing else added.',
    BuyLinks: [{ label: 'Order direct', url: 'https://solely.com/products/organic-mango-fruit-jerky' }],
  },
  {
    Name: 'Stellar Eats Carrot Cake + Muffin Mix',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Grain-free baking mix made from almond flour, dehydrated carrot, and a sugar blend of organic coconut and date sugar -- no wheat, no refined sugar.',
    PillarClean: 'Certified Gluten-Free, NON-GMO Project Verified, and Certified Kosher.',
    PillarFair: "1% of every purchase is donated to a nonprofit the customer chooses -- a specific, quantified giving program, though the recipient organization varies by buyer rather than being a fixed food or agriculture charity.",
    PillarTrue: "The coconut and date sugars are labeled organic, but Stellar Eats doesn't hold a brand-wide organic certification -- we're crediting the three verified certifications (gluten-free, non-GMO, kosher) plus the quantified 1% giving program.",
    BuyLinks: [{ label: 'Order direct', url: 'https://stellareats.com/en-us/products/carrot-cake-muffin-mix-us' }],
  },
  {
    Name: 'Sweeter Collective Shirley Temple Hard Candy',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Long-lasting hard candy (about 10 minutes per pop) with 3g of sugar and 15 calories, colored with organic beetroot and carrot instead of artificial dyes.',
    PillarClean: 'USDA Certified Organic -- the seal is printed on the package.',
    PillarFair: 'No specific labor or trade certification found for this product.',
    PillarTrue: "A third-party retailer listing also claimed \"kosher-certified,\" but we couldn't confirm that on Sweeter Collective's own site or packaging, so it isn't included here -- the USDA Organic seal on the actual package is what we verified directly.",
    BuyLinks: [{ label: 'Order direct', url: 'https://www.sweetercollective.com/products/shirley-temple' }],
  },
  {
    Name: 'Rare Breed Coffee Single Origin Brazil',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'Single-origin, small-batch roasted coffee (formerly A&E Coffee & Tea) sold directly by the roaster.',
    PillarClean: "Rare Breed's own FAQ states that \"most\" of its coffees are certified organic -- not a blanket claim across its full lineup.",
    PillarFair: 'No specific fair-trade or direct-trade certification found for this SKU.',
    PillarTrue: 'We\'re flagging the "most, not all" wording explicitly, straight from the brand\'s own FAQ, so it\'s clear the organic claim doesn\'t necessarily cover every bag Rare Breed sells.',
    BuyLinks: [{ label: 'Order direct', url: 'https://rarebreedcoffee.com/products/single-origin-brazil' }],
  },
  {
    Name: 'Three Spirit Livener',
    Category: 'lna',
    Status: 'approved',
    PillarGood: 'Non-alcoholic botanical elixir built on guayusa, schisandra berry, and watermelon, designed as a caffeinated, hangover-free alternative to a spirit.',
    PillarClean: 'B Corp Certified and Non-GMO Project Verified. Vegan and gluten-free.',
    PillarFair: 'B Corp certification requires an independently audited assessment of the whole company\'s social and environmental performance, not just this one product.',
    PillarTrue: 'Both certifications (B Corp and Non-GMO) are displayed and verifiable on the brand\'s own product page -- no unverified claims needed here.',
    BuyLinks: [{ label: 'Order direct', url: 'https://us.threespiritdrinks.com/products/livener' }],
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
  console.log(`Importing ${PRODUCTS.length} Batch 4 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
