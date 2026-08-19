#!/usr/bin/env node
// Usage: node scripts/import-shortlist-batch2.mjs <YOUR_PAT> [BASE_ID]
//
// Global brand shortlist review -- batch 2 of the 21 newly-selected brands
// (Snacks & Pantry category, chocolate-heavy). All 5 candidates cleared the
// certification-only bar and are imported below.

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-shortlist-batch2.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const PRODUCTS = [
  {
    Name: 'Divine 70% Dark Chocolate Bar',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A 70% dark chocolate bar with a straightforward ingredient list -- Fairtrade cocoa mass, Fairtrade sugar, cocoa butter -- and no artificial additives.',
    PillarClean: 'Fairtrade Certified cocoa and sugar (named certifying body).',
    PillarFair: 'Divine is the only Fairtrade chocolate company co-owned by the cocoa farmers who supply it: the Kuapa Kokoo cooperative in Ghana (over 100,000 farmer members) owns 44% of the company and receives the Fairtrade minimum price, the Fairtrade premium, 2% of turnover for producer support, and a share of distributed profit.',
    PillarTrue: 'The farmer-ownership structure is independently documented (Divine is a UK-registered company with public shareholding records showing Kuapa Kokoo\'s 44% stake), not just a marketing description of a "partnership."',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.divinechocolateusa.com/products/70-dark-chocolate-sharing-bar-3-oz' }],
  },
  {
    Name: 'TCHO Dark Chocolate Bar',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Craft bean-to-bar dark chocolate made by a California chocolate maker that has worked directly with its cacao-growing partners since 2005.',
    PillarClean: 'Certified B Corporation.',
    PillarFair: 'As of 2023, 100% of TCHO products are Fair Trade Certified, with cacao traceable back to its source; TCHO also runs its own direct-sourcing program (TCHO Source) supporting small-scale farmers in South America, the Caribbean, and Africa.',
    PillarTrue: 'Both the B Corp and Fair Trade certifications are independently issued and company-wide, not limited to a single product line.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://tcho.com/' }],
  },
  {
    Name: 'Lake Champlain Fair Trade Signature Dark Chocolate Bar',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'A Vermont-made dark chocolate bar, part of a line the company states is crafted with 100% Fair Trade Certified chocolate.',
    PillarClean: 'Certified B Corporation -- the first Vermont chocolate company to reach B Corp status. Seeks out organic ingredients where possible.',
    PillarFair: 'Fair Trade Certified chocolate throughout the Signature Bar line; 1% of sales from these bars is donated to cacao- and coffee-farming cooperatives in Peru for agroforestry programs.',
    PillarTrue: 'The B Corp and Fair Trade certifications are independently issued; the 1% donation commitment is a specific, named allocation rather than a vague giving-back claim.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://www.lakechamplainchocolates.com/' }],
  },
  {
    Name: 'Original Beans Cru Virunga 70% Dark Chocolate',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Single-origin dark chocolate made from a rare heirloom cacao variety grown near Virunga National Park in the Democratic Republic of Congo, made in small batches direct from bean to bar.',
    PillarClean: 'No blanket organic or B Corp certification found for this specific product; sourcing and environmental practices are self-reported by the company.',
    PillarFair: 'Original Beans is a member of Direct Cacao, a network of bean-to-bar makers who commit to paying farmers significantly above the Fair Trade minimum price -- a named, verifiable trade-practice membership rather than a self-described "partnership."',
    PillarTrue: 'The Direct Cacao membership is publicly listed and verifiable independently of Original Beans\' own marketing; we are not claiming an organic or B Corp certification that hasn\'t been independently confirmed.',
    BuyLinks: [{ label: 'Buy from Bar & Cocoa', url: 'https://barandcocoa.com/products/original-beans-cru-virunga' }],
  },
  {
    Name: 'Quinn Farm-to-Bag Non-GMO Popcorn',
    Category: 'snacks',
    Status: 'approved',
    PillarGood: 'Microwave popcorn made with whole-kernel corn, real butter, and sea salt -- no synthetic "butter flavor" chemicals or perfluorinated bag coatings.',
    PillarClean: 'Certified B Corporation (since November 2023). Non-GMO Project Verified -- Quinn was the first gluten-free pretzel brand to earn this verification and carries it across its snack lines.',
    PillarFair: 'No specific farm-level labor or trade certification found beyond the B Corp assessment, which does evaluate supply-chain and worker-impact practices at the company level.',
    PillarTrue: 'Both certifications (B Corp, Non-GMO Project Verified) are independently issued and verifiable, not self-declared.',
    BuyLinks: [{ label: 'Buy direct', url: 'https://quinnsnacks.com/' }],
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
  console.log(`Importing ${PRODUCTS.length} shortlist batch-2 products...`)
  for (let i = 0; i < PRODUCTS.length; i += 10) {
    const chunk = PRODUCTS.slice(i, i + 10)
    const created = await createBatch(chunk)
    created.forEach(rec => console.log(`  Created: ${rec.fields.Name} (${rec.id})`))
  }
  console.log('Done.')
}

main()
