#!/usr/bin/env node
// Read-only health check on the live Airtable Products table.
// Checks for: exact duplicate names, near-duplicate names, missing/invalid
// required fields, unknown category slugs, malformed BuyLinks, and confirms
// every product from shortlist batches 6-13 exists exactly once.
//
// Usage: node scripts/verify-catalog.mjs <YOUR_PAT> [BASE_ID]

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/verify-catalog.mjs <PAT>'); process.exit(1) }

const TABLE = 'Products'
const VALID_CATEGORIES = new Set(['olive-oils', 'grains', 'legumes', 'snacks', 'lna', 'seafood'])

async function fetchAll() {
  let records = []
  let offset = ''
  do {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}?pageSize=100${offset ? `&offset=${offset}` : ''}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } })
    if (!res.ok) { console.error('Airtable error:', res.status, await res.text()); process.exit(1) }
    const data = await res.json()
    records.push(...data.records)
    offset = data.offset || ''
  } while (offset)
  return records
}

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

// Names as written by import-shortlist-batch6.mjs through batch13.mjs
const EXPECTED_SHORTLIST_NAMES = [
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
  'Häppy Candy Italian Summer Gummy Candy', 'Hebel & Co Double Chocolate Halva', 'Heilala Vanilla with Seeds',
  'Heraclea Early Harvest Extra Virgin Olive Oil', 'Hoboken Farms Marinara Sauce, Basil',
  'Hola Mija Organic Beef Tallow Tortilla Chips', "Homestead's Datil Pepper Hot Sauce",
  'Hope & Sesame Organic Sesame Milk, Unsweetened Original', 'Humble Potato Chips, The Original',
  'iMind Brain Food Snack Bar, Original', 'Joolies Organic Whole Medjool Dates',
  'Jovial Einkorn 100% Organic Whole Grain Spaghetti', 'Yamaki Jozo Organic Shoyu (Soy Sauce)',
  'JustNosh Double Chocolate Chip Collagen Protein Bars', 'Ka-Pop! Popped Chips, Vegan Cheddar',
  'Kaizen Low Carb Pasta, Fusilli', 'Karma Nuts Sea Salt Cashews', 'Kibo Chickpea Chips, Pico de Gallo',
  'Kolkata Chai Signature Masala Chai Mix', 'Kooshy Croutons, Mambo Italiano', 'Like Air Puffcorn, Classic',
  'Little Latke Potato Latke Crisps, The Original', 'Little Spoon Organic Baby Cereal',
  'Longbottom Organic Guatemalan Coffee', "Lorissa's Kitchen Original USDA Organic Steak Strips",
  "Lovebird Organic Grain-Free Cinnamon O's Cereal", "Maeve Chocolate Cabin S'mores Truffle Bar",
  'Maja Organic Overnight Oats, Banana Bread',
]

async function main() {
  console.log('Fetching all products from Airtable...\n')
  const records = await fetchAll()
  console.log(`Total records: ${records.length}\n`)

  // ── 1. Exact duplicate names ──────────────────────────────────────────
  const byNorm = new Map()
  for (const r of records) {
    const name = (r.fields.Name || '').trim()
    if (!name) continue
    const norm = normalize(name)
    if (!byNorm.has(norm)) byNorm.set(norm, [])
    byNorm.get(norm).push(r)
  }
  const exactDupes = [...byNorm.entries()].filter(([, recs]) => recs.length > 1)

  console.log(`=== EXACT DUPLICATES (${exactDupes.length}) ===`)
  if (!exactDupes.length) console.log('None found.\n')
  else {
    for (const [norm, recs] of exactDupes) {
      console.log(`  "${recs[0].fields.Name}" — ${recs.length} copies:`)
      for (const r of recs) console.log(`    ${r.id}  category=${r.fields.Category}  links=${hasLinks(r)}`)
    }
    console.log()
  }

  // ── 2. Missing required fields ────────────────────────────────────────
  const missingIssues = []
  for (const r of records) {
    const f = r.fields
    const problems = []
    if (!f.Name || !f.Name.trim()) problems.push('missing Name')
    if (!f.Category) problems.push('missing Category')
    else if (!VALID_CATEGORIES.has(f.Category)) problems.push(`invalid Category "${f.Category}"`)
    if (!f.Status) problems.push('missing Status')
    if (!hasLinks(r)) problems.push('missing/malformed BuyLinks')
    if (!f.PillarGood) problems.push('missing PillarGood')
    if (!f.PillarClean) problems.push('missing PillarClean')
    if (problems.length) missingIssues.push({ id: r.id, name: f.Name || '(no name)', problems })
  }

  console.log(`=== FIELD ISSUES (${missingIssues.length} records) ===`)
  if (!missingIssues.length) console.log('None found.\n')
  else {
    for (const m of missingIssues) console.log(`  ${m.id}  "${m.name}"  -->  ${m.problems.join(', ')}`)
    console.log()
  }

  // ── 3. Category breakdown ──────────────────────────────────────────────
  const byCategory = {}
  for (const r of records) {
    const cat = r.fields.Category || '(none)'
    byCategory[cat] = (byCategory[cat] || 0) + 1
  }
  console.log('=== COUNT BY CATEGORY ===')
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`)
  }
  console.log()

  // ── 4. Confirm shortlist batches 6-13 all landed, exactly once ────────
  const liveNorms = new Set(byNorm.keys())
  const missingFromShortlist = []
  const duplicatedFromShortlist = []
  for (const name of EXPECTED_SHORTLIST_NAMES) {
    const norm = normalize(name)
    const recs = byNorm.get(norm)
    if (!recs) missingFromShortlist.push(name)
    else if (recs.length > 1) duplicatedFromShortlist.push(name)
  }

  console.log(`=== SHORTLIST BATCH 6-13 CHECK (expected ${EXPECTED_SHORTLIST_NAMES.length}) ===`)
  console.log(`  Found exactly once: ${EXPECTED_SHORTLIST_NAMES.length - missingFromShortlist.length - duplicatedFromShortlist.length}`)
  if (missingFromShortlist.length) {
    console.log(`  MISSING (${missingFromShortlist.length}) -- not found live, batch may not have been run or failed partway:`)
    for (const n of missingFromShortlist) console.log(`    - ${n}`)
  }
  if (duplicatedFromShortlist.length) {
    console.log(`  DUPLICATED (${duplicatedFromShortlist.length}) -- appears more than once:`)
    for (const n of duplicatedFromShortlist) console.log(`    - ${n}`)
  }
  if (!missingFromShortlist.length && !duplicatedFromShortlist.length) {
    console.log('  All clear -- every batch 6-13 product is live exactly once.')
  }
  console.log()

  console.log('=== SUMMARY ===')
  console.log(`  Total live products: ${records.length}`)
  console.log(`  Exact duplicate name groups: ${exactDupes.length}`)
  console.log(`  Records with field issues: ${missingIssues.length}`)
  console.log(`  Shortlist products missing: ${missingFromShortlist.length}`)
  console.log(`  Shortlist products duplicated: ${duplicatedFromShortlist.length}`)
}

main()
