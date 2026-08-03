#!/usr/bin/env node
// Usage: node scripts/fix-links-batch1.mjs <YOUR_PAT> [BASE_ID]
//
// Batch 1: Grains + Legumes buy-link fixes, from the buy-link audit.
//   - Patches BuyLinks with verified, real, product-specific URLs (8 products)
//   - Sets Status='rejected' for 2 products with no genuine, purchasable link
//     found (this hides them from the live site immediately; it does NOT
//     delete the Airtable record — delete manually in Airtable if you want
//     them gone for good).

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/fix-links-batch1.mjs <PAT>'); process.exit(1) }

const URL     = `https://api.airtable.com/v0/${BASE_ID}/Products`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

// Verified, real, product-specific buy links (replacing dead/fabricated ones)
const LINK_UPDATES = [
  { Name: 'Anson Mills Carolina Gold Rice',
    BuyLinks: [{ label: 'Order direct', url: 'https://ansonmills.com/products/103' }] },
  { Name: 'Anson Mills Farro Piccolo (Einkorn)',
    BuyLinks: [{ label: 'Order direct', url: 'https://ansonmills.com/products/114' }] },
  { Name: 'Anson Mills Stone Cut Oats',
    BuyLinks: [{ label: 'Order direct', url: 'https://ansonmills.com/products/121' }] },
  { Name: 'Timeless Emmer Farro',
    BuyLinks: [{ label: 'Order direct', url: 'https://shop.timelessfood.com/collections/organic-heirloom-grains/products/organic-farro-semi-pearled' }] },
  { Name: 'Timeless Black Beluga Lentils',
    BuyLinks: [{ label: 'Order direct', url: 'https://shop.timelessfood.com/collections/organic-lentils/products/organic-black-beluga-lentils%C2%AE-copy' }] },
  { Name: 'Timeless Crimson Lentils',
    BuyLinks: [{ label: 'Order direct', url: 'https://shop.timelessfood.com/collections/organic-lentils/products/organic-petite-crimson-lentils' }] },
  { Name: 'Timeless French Green Lentils',
    BuyLinks: [{ label: 'Order direct', url: 'https://shop.timelessfood.com/collections/organic-lentils/products/organic-french-style-lentils' }] },
  { Name: 'Timeless Pardina Lentils',
    BuyLinks: [{ label: 'Order direct', url: 'https://shop.timelessfood.com/collections/organic-lentils/products/organic-pardina-lentils' }] },
]

// No genuine, consumer-purchasable link exists — remove from the live site
const REMOVALS = [
  'Anson Mills Antebellum Coarse Grits',       // no matching product exists in Anson Mills' current catalog
  'Anson Mills Rouge de Bordeaux Bread Flour', // real product, but wholesale/chefs-only — not purchasable by a regular customer
]

async function getAllRecordIds() {
  const map = {}
  let offset = null
  do {
    const res  = await fetch(`${URL}?fields[]=Name${offset ? `&offset=${offset}` : ''}`, { headers: HEADERS })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    for (const r of data.records) map[r.fields.Name] = r.id
    offset = data.offset
  } while (offset)
  return map
}

async function patchBatch(records) {
  const res  = await fetch(URL, { method: 'PATCH', headers: HEADERS, body: JSON.stringify({ records }) })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.records
}

async function main() {
  console.log('\n🔗  GFA Buy-Link Fix — Batch 1 (Grains + Legumes)\n')
  const idByName = await getAllRecordIds()
  console.log(`   ${Object.keys(idByName).length} existing records found\n`)

  const linkPatches = LINK_UPDATES
    .filter(u => { if (!idByName[u.Name]) { console.log(`   ⚠  Not found, skipping: ${u.Name}`); return false }; return true })
    .map(u => ({ id: idByName[u.Name], fields: { BuyLinks: JSON.stringify(u.BuyLinks) } }))

  const removalPatches = REMOVALS
    .filter(name => { if (!idByName[name]) { console.log(`   ⚠  Not found, skipping: ${name}`); return false }; return true })
    .map(name => ({ id: idByName[name], fields: { Status: 'rejected' } }))

  const all = [...linkPatches, ...removalPatches]
  for (let i = 0; i < all.length; i += 10) {
    const updated = await patchBatch(all.slice(i, i + 10))
    for (const r of updated) {
      const tag = r.fields.Status === 'rejected' ? '🗑  removed' : '✅  link fixed'
      console.log(`   ${tag}: ${r.fields.Name}`)
    }
    if (i + 10 < all.length) await new Promise(r => setTimeout(r, 250))
  }

  console.log('\n🎉  Done. Refresh the site (may take up to a minute — ISR cache) to see changes.\n')
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1) })
