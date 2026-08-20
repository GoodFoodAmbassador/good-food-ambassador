#!/usr/bin/env node
// Fixes the double-import of shortlist batches 6-10 (57 products got created
// twice, confirmed via verify-catalog.mjs). For each affected product name,
// keeps ONE copy (preferring one with working BuyLinks, then earliest
// created) and deletes the rest.
//
// READ-ONLY by default. Run with no --apply flag to just print what it
// would do.
// Usage:
//   node scripts/dedupe-shortlist-batches.mjs YOUR_API_KEY            (dry run)
//   node scripts/dedupe-shortlist-batches.mjs YOUR_API_KEY --apply    (deletes)

const args = process.argv.slice(2)
const apiKey = args.find(a => !a.startsWith('--'))
const apply = args.includes('--apply')
if (!apiKey) { console.error('Usage: node scripts/dedupe-shortlist-batches.mjs YOUR_API_KEY [--apply]'); process.exit(1) }

const BASE_ID = 'appcBDopFuYbSTdRy'
const TABLE   = 'Products'

function normalize(name) {
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function hasLinks(r) {
  const raw = r.fields.BuyLinks
  if (!raw || raw === '[]') return false
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 && parsed.every(l => l.url && l.url.startsWith('http'))
  } catch {
    return false
  }
}

// Exact names from batches 6-10 (the ones verify-catalog.mjs confirmed as duplicated)
const AFFECTED_NAMES = [
  "Bachan's Japanese Barbecue Sauce, The Original", 'Banza Chickpea Rotini', 'CHOMPS Original Beef Stick',
  'Chosen Foods Organic Avocado Oil', 'Dandies Vegan Marshmallows', 'Food Should Taste Good Sweet Potato Tortilla Chips',
  'Chamberlain Coffee The Original Family Blend', 'Kuli Kuli Organic Moringa Powder', 'Just Date Organic Date Syrup',
  'Kokada Coconut Spread, Original', 'Loisa Organic Sazón Seasoning', 'Lil Bucks Sprouted Buckwheat Crunch, Original',
  'Three Farm Daughters High Fiber Pasta, Rotini', '34 Degrees Original Crisps', '4th & Heart Original Grass-Fed Ghee',
  'Algae Cooking Club Chef-Grade 100% Algae Cooking Oil', 'Bada Bean Bada Boom Roasted Fava Bean Snacks, Sea Salt',
  'Bahamii Almond & Date Bars, Chocolate Almond', "Beekeeper's Naturals B.LXR Brain Fuel", 'Blobs Gummy Candy, Pomegranate Apple',
  'Blue Stripes Pure Dark Whole Cacao Chocolate Bar, 70%', 'Broma Dark Chocolate Almond Spread',
  'Carbone Marinara Pasta Sauce', 'Catalina Crunch Protein Cereal, Cinnamon Toast', 'Chewsy Peppermint Natural Chewing Gum',
  'ChocXO Dark Chocolate Almond Butter Cups', 'Cocomo Coconut Peanut Butter', 'Coracao (CACOCO) Organic Drinking Chocolate',
  'CORE Foods Organic Overnight Oat Bar, Lemon Poppy Seed', 'Craize Sweet Corn Crisps',
  'Cravings by Chrissy Teigen Chocolate Chip Cookie Mix', "Cybele's Free to Eat Chocolate Chip Vegan & Gluten-Free Cookies",
  "D'vash Organic Date Syrup", 'DINO BARS Organic Fruit Bar, Strawberry',
  'Dirtbag Bar Organic Whole Food Energy Bar, Original Chocolate', 'Edggies Organic Kale Sprinkles',
  "Ella's Flats All Seed Cracker Crisp", 'Equip Foods Clean Coffee, Nicaragua Medium Roast',
  'Eureka Tortilla Organic Plain Delicious Flour Tortillas', 'Every Body Eat Gluten-Free Crackers, Variety Pack',
  "Evie's Sweet and Salty Pecans", 'Evo Hemp Organic Protein Bar, Cashew Cacao', 'EVOLVED Signature Dark Chocolate Bar, 72% Cacao',
  'Fabalish Organic Falafel, Zesty Zucchini', 'Fancypants Baking Co. Keto Low Carb Cookies, Chocolate Chip',
  'Fishwife Cantabrian Anchovies', 'Fix & Fogg Smooth Peanut Butter', 'Flock Keto Chicken Skin Chips, Original',
  'Fly By Jing Original Sichuan Chili Crisp', 'For Bitter For Worse Non-Alcoholic Sparkling Botanical Spritz, Variety',
  'Gay Awakening Coffee, Drag Bean', 'Girl Meets Dirt Island Plum Shrub', 'Good Twin Organic Non-Alcoholic Sparkling Blanc',
  'GoodSAM Organic Roasted Macadamia Nuts, Salted', 'Gourmend Organic Unsalted Beef Bone Broth', 'Groovy Coffee Original Ground Roast',
  'Häppy Candy Italian Summer Gummy Candy',
]
const AFFECTED_NORMS = new Set(AFFECTED_NAMES.map(normalize))

async function fetchAll() {
  let records = []
  let offset = ''
  do {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}?pageSize=100${offset ? `&offset=${offset}` : ''}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } })
    if (!res.ok) { console.error('Airtable error:', res.status, await res.text()); process.exit(1) }
    const data = await res.json()
    records.push(...data.records)
    offset = data.offset || ''
  } while (offset)
  return records
}

const records = await fetchAll()
const groups = new Map()
for (const r of records) {
  const name = (r.fields.Name || '').trim()
  if (!name) continue
  const norm = normalize(name)
  if (!AFFECTED_NORMS.has(norm)) continue
  if (!groups.has(norm)) groups.set(norm, [])
  groups.get(norm).push(r)
}

const toDelete = []
let unexpectedGroups = 0

for (const [norm, recs] of groups) {
  if (recs.length < 2) { console.log(`⚠ "${recs[0]?.fields.Name}" -- only 1 copy found, expected 2. Skipping.`); continue }
  if (recs.length > 2) { console.log(`⚠ "${recs[0].fields.Name}" -- ${recs.length} copies found (expected 2). Review manually.`); unexpectedGroups++; continue }

  // Prefer keeping the one with working buy links; if tie, keep earliest created.
  const [a, b] = recs
  let keep, drop
  if (hasLinks(a) && !hasLinks(b)) { keep = a; drop = b }
  else if (hasLinks(b) && !hasLinks(a)) { keep = b; drop = a }
  else { [keep, drop] = a.createdTime <= b.createdTime ? [a, b] : [b, a] }

  console.log(`KEEP: "${keep.fields.Name}" (${keep.id}, created ${keep.createdTime})`)
  console.log(`DROP: "${drop.fields.Name}" (${drop.id}, created ${drop.createdTime})\n`)
  toDelete.push(drop.id)
}

console.log(`\n${toDelete.length} duplicate record(s) identified for deletion.`)
if (unexpectedGroups) console.log(`${unexpectedGroups} group(s) had an unexpected count and were skipped -- review manually.`)

if (!toDelete.length) { console.log('Nothing to delete.'); process.exit(0) }

if (!apply) {
  console.log('\nDRY RUN -- re-run with --apply to actually delete.')
  process.exit(0)
}

console.log(`\nApplying: deleting ${toDelete.length} record(s)...`)
let deleted = 0
for (let i = 0; i < toDelete.length; i += 10) {
  const batch = toDelete.slice(i, i + 10)
  const params = batch.map(id => `records[]=${id}`).join('&')
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE}?${params}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  if (!res.ok) {
    console.error(`  ✗ batch starting at ${i}: ${res.status} ${await res.text()}`)
  } else {
    const data = await res.json()
    deleted += data.records.length
    console.log(`  ✓ deleted ${data.records.length}`)
  }
  await new Promise(r => setTimeout(r, 250))
}
console.log(`\nDone: ${deleted} deleted.`)
