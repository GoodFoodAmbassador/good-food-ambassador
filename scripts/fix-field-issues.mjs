#!/usr/bin/env node
// Fills in missing PillarGood/PillarClean text for the 2 records flagged
// by verify-catalog.mjs: "Tastefully Olive" and "Castillo de Canena
// Arbequina" -- both pre-existing olive oil records from an earlier import
// pass that were missing evaluation prose.
//
// Usage: node scripts/fix-field-issues.mjs <YOUR_PAT> [BASE_ID]

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/fix-field-issues.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

const UPDATES = [
  {
    id: 'recEyTrcJfKgWagQD', // "Tastefully Olive"
    fields: {
      PillarGood: 'An early-harvest, polyphenol-rich Greek extra virgin olive oil sourced from a trusted family grove in Laconica, Greece -- a women-owned, family-run business.',
      PillarClean: 'Organic, per the brand\'s own site; sourced from farmers who follow sustainable practices.',
    },
  },
  {
    id: 'reciMDP47rNfznC2d', // "Castillo de Canena Arbequina "
    fields: {
      PillarGood: 'An early-harvest, high-polyphenol Arbequina extra virgin olive oil from a single family estate in the Guadalquivir Valley, Jaén, Spain, producing oil since 1780.',
      PillarClean: 'Organic certified; the estate is also pursuing Biodynamic certification, including composting its own fertilizer and installing beehives to enrich the vegetal cover.',
    },
  },
]

async function main() {
  for (const u of UPDATES) {
    const res = await fetch(`${URL}/${u.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({ fields: u.fields }),
    })
    const json = await res.json()
    if (!res.ok) {
      console.error(`✗ ${u.id}:`, JSON.stringify(json, null, 2))
    } else {
      console.log(`✓ Updated "${json.fields.Name}" (${u.id})`)
    }
  }
}

main()
