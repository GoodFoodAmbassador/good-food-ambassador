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

// name (as it appears in Airtable, verified verbatim from the original
// verify-links.mjs report) -> exact-match fixes. Safe because these 5 names
// were pasted directly from the live Airtable Name field.
const NAME_FIXES = [
  { name: 'Cassoulet (Tarbais) Bean', match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/cassoulet-tarbais-bean-2' },
  { name: 'Hidatsa Red Bean',          match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/red-hidatsa-bean' },
  { name: 'Yellow Eye Bean',           match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/yellow-eye-beans' },
  { name: 'Good Mother Stallard Bean', match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/good-mother-stallard-beans' },
  { name: 'Marcella Bean',             match: 'ranchogordo.com', newUrl: 'https://www.ranchogordo.com/products/marcella' },
]

// URL-substring fixes for products whose exact stored Name we don't know
// (not tracked in any local import script -- likely added via an older,
// pre-script workflow). Matches ANY record whose BuyLinks contains this
// substring, regardless of Name, which is safer than guessing the Name.
// Taimo: presale-page slug retired, brand renamed the product; old URL
// 301-redirects fine today but pointing at the canonical slug is safer
// long-term than depending on a redirect staying in place.
const URL_FIXES = [
  { match: 'taimolive.com', newUrl: 'https://taimolive.com/products/lebanese-heirloom-olive-oil' },
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

  async function applyFix(rec, label, urlMatch, newUrl) {
    const raw = rec.fields.BuyLinks
    if (!raw) { console.log(`✗ NO BuyLinks: "${label}" (${rec.id})`); return }
    let links
    try { links = JSON.parse(raw) } catch {
      console.log(`✗ MALFORMED BuyLinks: "${label}" (${rec.id})`); return
    }
    let changed = false
    for (const l of links) {
      if (l.url && l.url.includes(urlMatch)) {
        console.log(`${APPLY ? '✓' : '→'} "${rec.fields.Name}" (${rec.id})`)
        console.log(`    old: ${l.url}`)
        console.log(`    new: ${newUrl}`)
        l.url = newUrl
        changed = true
      }
    }
    if (!changed) {
      console.log(`- "${label}" (${rec.id}) -- no link matched "${urlMatch}", nothing to change`)
      return
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

  for (const fix of NAME_FIXES) {
    const rec = byNorm.get(normalize(fix.name))
    if (!rec) {
      console.log(`✗ NOT FOUND: "${fix.name}" -- no matching product in Airtable, skipping`)
      continue
    }
    await applyFix(rec, fix.name, fix.match, fix.newUrl)
  }

  for (const fix of URL_FIXES) {
    const matches = records.filter(r => {
      try {
        const links = JSON.parse(r.fields.BuyLinks || '[]')
        return links.some(l => l.url && l.url.includes(fix.match))
      } catch { return false }
    })
    if (!matches.length) {
      console.log(`✗ NOT FOUND: no record has a BuyLinks URL containing "${fix.match}"`)
      continue
    }
    if (matches.length > 1) {
      console.log(`⚠ MULTIPLE MATCHES for "${fix.match}" -- review before applying:`)
      matches.forEach(r => console.log(`    ${r.fields.Name} (${r.id})`))
    }
    for (const rec of matches) {
      await applyFix(rec, rec.fields.Name, fix.match, fix.newUrl)
    }
  }

  if (!APPLY) console.log('\nDry run complete. Re-run with --apply to write these changes to Airtable.')
}

main()
