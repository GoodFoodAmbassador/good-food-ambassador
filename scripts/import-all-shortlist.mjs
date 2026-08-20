#!/usr/bin/env node
// Runs shortlist import batches 6 through 10 in sequence, using one PAT.
// Usage: node scripts/import-all-shortlist.mjs <YOUR_PAT> [BASE_ID]

import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const [,, API_KEY, BASE_ID] = process.argv
if (!API_KEY) { console.error('Usage: node scripts/import-all-shortlist.mjs <PAT>'); process.exit(1) }

const dir = path.dirname(fileURLToPath(import.meta.url))
const batches = [6, 7, 8, 9, 10]

for (const b of batches) {
  const script = path.join(dir, `import-shortlist-batch${b}.mjs`)
  console.log(`\n=== Running batch ${b} ===`)
  const args = [script, API_KEY, ...(BASE_ID ? [BASE_ID] : [])]
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error(`\nBatch ${b} failed (exit code ${result.status}). Stopping.`)
    process.exit(result.status || 1)
  }
}

console.log('\nAll batches complete.')
