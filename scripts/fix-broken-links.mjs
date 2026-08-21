#!/usr/bin/env node
// Fixes BuyLinks URLs confirmed broken (real slug changes on the merchant's
// own site) by scripts/verify-links.mjs. Matches products by Name, replaces
// the stale URL inside the BuyLinks JSON with the confirmed-live URL.
// Dry-run by default -- pass --apply to actually write to Airtable.
//
// Usage: node scripts/fix-broken-links.mjs <YOUR_PAT> [--apply] [BASE_ID]

const args = process.argv.slice(2)
const API_KEY = args.find(a => !a.startsWith('--'))
const APPLY = args.includes('--apply')
const BASE_ID = args.filter(a => !a.startsWith('--') && a !== API_KEY)[0] || 'appcBDopFuYbSTdRy'

if (!API_KEY) { console.error('Usage: node scripts/fix-broken-links.mjs <PAT> [--apply]'); process.exit(1) }

const TABLE = 'Products'
const URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

function normalize(name) {
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// name (as it appears in Airtable) -> { match: substring to find in the stored
// URL, newUrl: confirmed-live replacement }
const FIXES = [
  { name: 'Cassoulet (Tarbais) Bean', match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/cassoulet-tarbais-bean-2' },
  { name: 'Hidatsa Red Bean',          match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/red-hidatsa-bean' },
  { name: 'Yellow Eye Bean',           match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/yellow-eye-beans' },
  { name: 'Good Mother Stallard Bean', match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/good-mother-stallard-beans' },
  { name: 'Marcella Bean',             match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/marcella' },
  // Taimo: presale-page slug retired, brand renamed the product; old URL
  // 301-redirects fine today but pointing at the canonical slug is safer
  // long-term than depending on a redirect staying in place.
  { name: 'Taimo',                     match: 'taimolive.com',   newUrl: 'https://taimolive.com/products/lebanese-heirloom-olive-oil' },
]

async function fetchAll() {
  let records = []
  let offset = ''
  do {
    const url = `${URL}?pageSize=100${offset ? `&offset=${offset}` : ''}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } })
    if (!res.ok) { console.error('Airtable error:', res.status, await res.text()); process.exit(1) }
    const data = await res.json()
    records.push(...data.records)
    offset = data.offset || ''
  } while (offset)
  return records
}

async function main() {
  console.log(APPLY ? 'APPLY MODE -- will write to Airtable\n' : 'DRY RUN -- pass --apply to write changes\n')
  console.log('Fetching all products from Airtable...\n')
  const records = await fetchAll()

  const byNorm = new Map()
  for (const r of records) {
    const name = (r.fields.Name || '').trim()
    if (!name) continue
    byNorm.set(normalize(name), r)
  }

  for (const fix of FIXES) {
    const rec = byNorm.get(normalize(fix.name))
    if (!rec) {
      console.log(`✗ NOT FOUND: "${fix.name}" -- no matching product in Airtable, skipping`)
      continue
    }
    const raw = rec.fields.BuyLinks
    if (!raw) {
      console.log(`✗ NO BuyLinks: "${fix.name}" (${rec.id})`)
      continue
    }
    let links
    try { links = JSON.parse(raw) } catch {
      console.log(`✗ MALFORMED BuyLinks: "${fix.name}" (${rec.id})`)
      continue
    }
    let changed = false
    for (const l of links) {
      if (l.url && l.url.includes(fix.match)) {
        console.log(`${APPLY ? '✓' : '→'} "${fix.name}" (${rec.id})`)
        console.log(`    old: ${l.url}`)
        console.log(`    new: ${fix.newUrl}`)
        l.url = fix.newUrl
        changed = true
      }
    }
    if (!changed) {
      console.log(`- "${fix.name}" (${rec.id}) -- no link matched "${fix.match}", nothing to change`)
      continue
    }
    if (APPLY) {
      const res = await fetch(`${URL}/${rec.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({ fields: { BuyLinks: JSON.stringify(links) } }),
      })
      if (!res.ok) console.error(`  ✗ write failed:`, await res.text())
    }
    console.log()
  }

  if (!APPLY) console.log('\nDry run complete. Re-run with --apply to write these changes to Airtable.')
}

main()
