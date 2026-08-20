#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch5.mjs <YOUR_PAT> [BASE_ID]
//
// Category expansion pass -- Seafood (4 brands) + Grains & Noodles (4 brands).
// Deliberately sourced away from the US: Norway, Chile/Spain, South Africa,
// Vietnam for seafood; Japan, Italy, Mali, Ethiopia for grains. Every product
// below clears the named-certification bar (no ownership-diversity or
// self-described "organic" claims without a third-party body).

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch5.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  // --- SEAFOOD ---
  {
    Name: 'King Oscar Royal Selection Brisling Sardines',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Small, wild-caught Norwegian brisling sardines, wood-smoked in the traditional style and hand-packed -- a brand purveying Norwegian sardines since 1902.',
    PillarClean: 'MSC (Marine Stewardship Council) certified for this Royal Selection line, plus Non-GMO Project Verified extra virgin olive oil.',
    PillarFair: 'No specific farm/fleet-level labor certification found beyond the MSC standard, which does include chain-of-custody and fishery-management criteria.',
    PillarTrue: 'Both the MSC and Non-GMO Project certifications are independently issued and publicly verifiable through each body\'s own registry, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/King-Oscar-Selection-Sardines-Manzanilla/dp/B07NXD769B' }],
  },
  {
    Name: 'Fishwife ASC-Certified Mussels with Sweet Pepper & Garlic',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Farmed mussels raised in the cold, nutrient-rich open-sea waters of southern Chile, hand-packed in Spain with sweet pepper and garlic.',
    PillarClean: 'ASC (Aquaculture Stewardship Council) Certified -- an independently audited standard for responsible aquaculture, the farmed-seafood equivalent of MSC.',
    PillarFair: 'No specific farm-level labor certification found beyond the ASC standard, which does include worker-welfare criteria in its audit scope.',
    PillarTrue: 'The ASC certification is independently issued and verifiable through ASC\'s own public registry, not a self-declared sustainability claim.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Fishwife-Hand-Packed-ASC-Certified-Sustainable-Responsibly/dp/B0FGKSVQ99' }],
  },
  {
    Name: "I&J Cape Hake",
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Wild-caught Cape Hake from the deep, cold waters off South Africa\'s Atlantic coast -- a pure, low-fat, high-protein whitefish from South Africa\'s largest fishing company.',
    PillarClean: 'MSC (Marine Stewardship Council) certified -- South Africa\'s hake trawl fishery was the first hake fishery in the world to meet the MSC standard, first certified in 2004 and recertified multiple times since.',
    PillarFair: 'No specific farm/fleet-level labor certification found beyond the MSC standard\'s fishery-management and chain-of-custody criteria.',
    PillarTrue: 'The MSC certification is independently issued and covers the entire South African hake trawl fishery, publicly verifiable through MSC\'s registry rather than a single company\'s own claim.',
    BuyLinks: [{ label: 'Brand site', url: 'https://www.ij.co.za/products/deep-water-hake/' }],
  },
  {
    Name: 'Vinh Foods Pangasius Fillet',
    Category: 'seafood',
    Status: 'approved',
    PillarGood: 'Frozen pangasius (basa) fillet from Vietnam\'s Mekong Delta, farmed by Vinh Hoan Corporation -- the country\'s largest pangasius producer.',
    PillarClean: 'ASC (Aquaculture Stewardship Council) certified -- Vinh Hoan\'s Tan Hoa farm was the first pangasius farm in Vietnam to reach ASC certification (2012) -- plus BAP (Best Aquaculture Practices) 4-Star and GlobalGAP certification.',
    PillarFair: 'BAP\'s 4-star rating specifically audits the processing plant, hatchery, feed mill, and farm together, including labor-practice criteria at each stage -- a broader chain-of-custody standard than a single-site certification.',
    PillarTrue: 'ASC, BAP, and GlobalGAP are all independently administered, third-party-audited certifications, publicly listed on each body\'s own registry.',
    BuyLinks: [{ label: 'Brand site', url: 'http://vinhfoods.com/' }],
  },
  // --- GRAINS & NOODLES ---
  {
    Name: 'Muso From Japan Organic 100% Buckwheat Soba Noodles',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Traditional Japanese soba noodles made from 100% buckwheat, dried slowly at low temperature (never fried) by a manufacturer producing soba since 1934.',
    PillarClean: 'USDA Certified Organic and certified organic by Ecocert SA -- two independently issued organic certifications on one product.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic certifications.',
    PillarTrue: 'Both certifying bodies (USDA, Ecocert) are independent and their certifications are publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Muso-Japan-Organic-Japanese-Buckwheat/dp/B07MPCYF81' }],
  },
  {
    Name: "Rustichella d'Abruzzo Organic Senatore Cappelli Orecchiette",
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Heritage Senatore Cappelli durum wheat pasta from Abruzzo, Italy -- an older, lower-yield wheat variety prized for its sweet, malty flavor over modern high-yield durum.',
    PillarClean: 'Certified organic by CCPB (Consorzio per il Controllo dei Prodotti Biologici), a named Italian organic control body -- not a self-applied "organic" label.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the CCPB organic certification.',
    PillarTrue: 'CCPB is an independently accredited, third-party organic certifying body recognized across the EU, publicly verifiable outside the brand\'s own marketing.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Rustichella-Organic-Orecchiette-Pasta-8-8/dp/B0058DMIOU' }],
  },
  {
    Name: 'Aduna Organic Fonio Super-Grain',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Fonio, one of Africa\'s oldest cultivated grains, gluten-free and among the fastest-cooking whole grains in the world -- sourced from southern Mali.',
    PillarClean: 'Certified organic by the Soil Association (UK\'s leading organic certifying body) and USDA Organic. Aduna is also a Certified B Corporation.',
    PillarFair: 'Sourced directly from a network of over 320 women farmers in southern Mali, named and specific rather than a vague "supports local farmers" claim; the B Corp certification independently assesses supply-chain and worker-impact practices.',
    PillarTrue: 'Three independently issued certifications (Soil Association, USDA Organic, B Corp) back this product -- an unusually well-documented chain for a West African staple grain.',
    BuyLinks: [{ label: 'Buy on Amazon', url: 'https://www.amazon.com/Aduna-Organic-Super-Grain-Gluten-Free-African/dp/B095DLRPWC' }],
  },
  {
    Name: 'Green Star Organic Milling Brown Teff Flour',
    Category: 'grains',
    Status: 'approved',
    PillarGood: 'Whole brown teff flour, milled with the bran intact -- teff is a tiny ancient grain native to Ethiopia, the base grain of injera and a complete source of plant protein and iron.',
    PillarClean: 'USDA Certified Organic and Non-GMO Project Verified; also produced to Kosher and food-safety certification standards.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the organic and Non-GMO certifications.',
    PillarTrue: 'Both certifications (USDA Organic, Non-GMO Project Verified) are independently issued and publicly verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy on Walmart', url: 'https://www.walmart.com/ip/Teff-Flour-Brown-25-lbs/8292218598' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-5 products (Seafood + Grains expansion)...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
