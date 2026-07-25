#!/usr/bin/env node
// ── GFA Airtable Import Script ────────────────────────────────────────────────
// Reads products-draft.json and creates pending records in Airtable.
// Existing records with the same Name are SKIPPED (no duplicates).
//
// Usage:
//   node scripts/import-to-airtable.js
//
// Requires .env.local with:
//   AIRTABLE_API_KEY=...
//   AIRTABLE_BASE_ID=...
//   AIRTABLE_TABLE_NAME=Products (optional, defaults to Products)

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// ── Load credentials (CLI args take priority over .env.local) ────────────────
//
//   Option A — pass as arguments:
//     node scripts/import-to-airtable.js <API_KEY> <BASE_ID>
//
//   Option B — .env.local in project root (if it exists):
//     AIRTABLE_API_KEY=pat_xxx
//     AIRTABLE_BASE_ID=appXXX

const __dir = dirname(fileURLToPath(import.meta.url))

// Try to load .env.local (silently skip if missing)
try {
  const env = readFileSync(join(__dir, '..', '.env.local'), 'utf8')
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
} catch { /* .env.local not present — that's fine */ }

// CLI args override everything
const [,, cliKey, cliBase] = process.argv
const API_KEY  = cliKey  || process.env.AIRTABLE_API_KEY
const BASE_ID  = cliBase || process.env.AIRTABLE_BASE_ID
const TABLE    = process.env.AIRTABLE_TABLE_NAME || 'Products'
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`
const HEADERS  = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' }

if (!API_KEY || !BASE_ID) {
  console.error('❌  AIRTABLE_API_KEY or AIRTABLE_BASE_ID missing from .env.local')
  process.exit(1)
}

// ── Load draft products ───────────────────────────────────────────────────────

const drafts = JSON.parse(readFileSync(join(__dir, 'products-draft.json'), 'utf8'))

// ── Fetch existing product names (to avoid duplicates) ───────────────────────

async function getExistingNames() {
  const names = new Set()
  let offset = null
  do {
    const url = BASE_URL + `?fields[]=Name${offset ? `&offset=${offset}` : ''}`
    const res  = await fetch(url, { headers: HEADERS })
    const data = await res.json()
    if (data.error) throw new Error(JSON.stringify(data.error))
    for (const r of data.records || []) names.add(r.fields.Name)
    offset = data.offset
  } while (offset)
  return names
}

// ── Create a batch of records (Airtable max 10 per request) ──────────────────

async function createBatch(records) {
  const res  = await fetch(BASE_URL, {
    method:  'POST',
    headers: HEADERS,
    body:    JSON.stringify({ records: records.map(f => ({ fields: f })) }),
  })
  const data = await res.json()
  if (data.error) throw new Error(JSON.stringify(data.error))
  return data.records
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🫒  GFA Airtable Import`)
  console.log(`   Table : ${TABLE}`)
  console.log(`   Base  : ${BASE_ID}\n`)

  const existing = await getExistingNames()
  console.log(`   ${existing.size} existing records found\n`)

  const toCreate = drafts.filter(d => !existing.has(d.Name))
  const skipped  = drafts.length - toCreate.length

  if (skipped > 0) {
    console.log(`   ⏭️  Skipping ${skipped} already-existing products`)
  }
  if (toCreate.length === 0) {
    console.log(`   ✅  Nothing to create — all products already in Airtable.`)
    return
  }

  console.log(`   📝  Creating ${toCreate.length} pending records...\n`)

  // Airtable allows max 10 per request
  for (let i = 0; i < toCreate.length; i += 10) {
    const batch   = toCreate.slice(i, i + 10)
    const created = await createBatch(batch)
    for (const r of created) {
      console.log(`   ✅  ${r.fields.Name}`)
    }
    if (i + 10 < toCreate.length) await new Promise(r => setTimeout(r, 250)) // rate limit
  }

  console.log(`\n🎉  Done. Open Airtable to review, edit, and approve.\n`)
}

main().catch(err => {
  console.error('❌ ', err.message)
  process.exit(1)
})
