#!/usr/bin/env node
// Read-only link-integrity check on the live Airtable Products table.
// For every product, parses BuyLinks and actually requests each URL to
// confirm it resolves (not just that it's well-formed JSON/starts with
// http -- that's already covered by verify-catalog.mjs). Flags:
//   - non-2xx/3xx final status (dead links, 404s, etc.)
//   - request errors (DNS failure, timeout, connection refused)
//   - redirect chains that end in an error
//
// Usage: node scripts/verify-links.mjs <YOUR_PAT> [BASE_ID]

const [,, API_KEY, BASE_ID = 'appcBDopFuYbSTdRy'] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/verify-links.mjs <PAT>'); process.exit(1) }

const TABLE = 'Products'
const CONCURRENCY = 8
const TIMEOUT_MS = 15000

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

function parseLinks(r) {
  const raw = r.fields.BuyLinks
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(l => l && l.url)
  } catch {
    return []
  }
}

async function checkUrl(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    // Try HEAD first (cheaper); some sites don't support it, fall back to GET.
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GFA-LinkChecker/1.0)' },
    })
    if (res.status === 405 || res.status === 403 || res.status >= 500) {
      // Some servers block HEAD or bot-like requests; retry with GET.
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GFA-LinkChecker/1.0)' },
      })
    }
    return { ok: res.ok, status: res.status, finalUrl: res.url }
  } catch (err) {
    return { ok: false, status: null, error: err.message || String(err) }
  } finally {
    clearTimeout(timer)
  }
}

async function runPool(items, worker, concurrency) {
  const results = new Array(items.length)
  let next = 0
  async function runner() {
    while (next < items.length) {
      const i = next++
      results[i] = await worker(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, runner))
  return results
}

async function main() {
  console.log('Fetching all products from Airtable...\n')
  const records = await fetchAll()
  console.log(`Total records: ${records.length}\n`)

  const jobs = []
  for (const r of records) {
    const name = (r.fields.Name || '(no name)').trim()
    for (const link of parseLinks(r)) {
      jobs.push({ id: r.id, name, label: link.label || '(no label)', url: link.url })
    }
  }
  console.log(`Total links to check: ${jobs.length}\n`)

  let checked = 0
  const results = await runPool(jobs, async (job) => {
    const result = await checkUrl(job.url)
    checked++
    if (checked % 25 === 0 || checked === jobs.length) {
      process.stdout.write(`  checked ${checked}/${jobs.length}\r`)
    }
    return { ...job, ...result }
  }, CONCURRENCY)
  console.log('\n')

  const broken = results.filter(r => !r.ok)
  const redirected = results.filter(r => r.ok && r.finalUrl && r.finalUrl !== r.url)

  console.log(`=== BROKEN LINKS (${broken.length}) ===`)
  if (!broken.length) {
    console.log('None found.\n')
  } else {
    for (const b of broken) {
      const reason = b.error ? `ERROR: ${b.error}` : `HTTP ${b.status}`
      console.log(`  "${b.name}" (${b.id})`)
      console.log(`    label: ${b.label}`)
      console.log(`    url:   ${b.url}`)
      console.log(`    -->    ${reason}`)
      console.log()
    }
  }

  console.log(`=== REDIRECTED LINKS (${redirected.length}) ===`)
  if (!redirected.length) {
    console.log('None found (all links resolve directly).\n')
  } else {
    for (const r of redirected) {
      console.log(`  "${r.name}" (${r.id})`)
      console.log(`    ${r.url}`)
      console.log(`    --> ${r.finalUrl}`)
      console.log()
    }
  }

  console.log('=== SUMMARY ===')
  console.log(`  Total products:      ${records.length}`)
  console.log(`  Total links checked: ${jobs.length}`)
  console.log(`  Broken links:        ${broken.length}`)
  console.log(`  Redirected links:    ${redirected.length}`)
  console.log(`  Healthy links:       ${jobs.length - broken.length}`)
}

main()
