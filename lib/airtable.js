// ── GFA Airtable Integration ──────────────────────────────────────────────────
//
// Required env vars (add to .env.local):
//   AIRTABLE_API_KEY     Personal Access Token from airtable.com/create/tokens
//   AIRTABLE_BASE_ID     From the base URL: airtable.com/{BASE_ID}/...
//   AIRTABLE_TABLE_NAME  Name of your products table (default: "Products")
//
// Airtable table schema — create these exact field names:
//   Name          Short text      Product name                       (required)
//   Producer      Short text      Brand or producer name
//   Category      Single select   olive-oils | grains | legumes | snacks | lna | seafood
//   Origin        Short text      e.g. "Tuscany, Italy"
//   Description   Long text       Brief description shown on site
//   BuyLinks      Long text       JSON array: [{"label":"Producer direct","url":"https://..."}]
//   PillarGood    Long text       Evaluator notes — Good pillar
//   PillarClean   Long text       Evaluator notes — Clean pillar
//   PillarFair    Long text       Evaluator notes — Fair pillar
//   PillarTrue    Long text       Evaluator notes — True pillar
//   Status        Single select   pending | approved | rejected
//   SubmittedBy   Short text      Name or contact of submitter
//   EvaluatorNotes Long text      Internal review notes (not shown on site)

const BASE_URL = 'https://api.airtable.com/v0'

function config() {
  return {
    apiKey: process.env.AIRTABLE_API_KEY,
    baseId: process.env.AIRTABLE_BASE_ID,
    table:  process.env.AIRTABLE_TABLE_NAME || 'Products',
  }
}

function authHeaders() {
  const { apiKey } = config()
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Fetch all approved products for a category.
 * Results are sorted alphabetically by Name.
 * Page revalidates every hour (Next.js ISR).
 */
export async function getProductsByCategory(category) {
  const { apiKey, baseId, table } = config()

  if (!apiKey || !baseId) {
    console.warn('[airtable] AIRTABLE_API_KEY or AIRTABLE_BASE_ID not set — returning empty list')
    return []
  }

  const formula = encodeURIComponent(`AND({Category}='${category}',{Status}='approved')`)
  const fields  = ['Name','Producer','Origin','Description','BuyLinks','PillarGood','PillarClean','PillarFair','PillarTrue']
  const fieldParams = fields.map(f => `fields[]=${encodeURIComponent(f)}`).join('&')
  const url = `${BASE_URL}/${baseId}/${encodeURIComponent(table)}?filterByFormula=${formula}&${fieldParams}&sort[0][field]=Name&sort[0][direction]=asc`

  const res = await fetch(url, {
    headers: authHeaders(),
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('[airtable] fetch error:', res.status, await res.text())
    return []
  }

  const data = await res.json()
  return (data.records || []).map(r => ({
    id:          r.id,
    name:        r.fields.Name        || '',
    producer:    r.fields.Producer    || '',
    origin:      r.fields.Origin      || '',
    description: r.fields.Description || '',
    buyLinks:    parseBuyLinks(r.fields.BuyLinks),
    pillars: {
      good:  r.fields.PillarGood  || '',
      clean: r.fields.PillarClean || '',
      fair:  r.fields.PillarFair  || '',
      true:  r.fields.PillarTrue  || '',
    },
  }))
}

/**
 * Submit a product suggestion.
 * Creates a record with Status = "pending" — won't appear on site until approved.
 */
export async function submitSuggestion({ name, producer, origin, category, description, buyLinks, submittedBy }) {
  const { apiKey, baseId, table } = config()

  if (!apiKey || !baseId) {
    throw new Error('Airtable is not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID.')
  }

  const res = await fetch(`${BASE_URL}/${baseId}/${encodeURIComponent(table)}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      records: [{
        fields: {
          Name:        name,
          Producer:    producer    || '',
          Origin:      origin      || '',
          Category:    category,
          Description: description || '',
          BuyLinks:    JSON.stringify(buyLinks || []),
          SubmittedBy: submittedBy || 'anonymous',
          Status:      'pending',
        },
      }],
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Airtable submission failed (${res.status}): ${body}`)
  }

  return await res.json()
}

/**
 * Generate a URL-safe slug from a product name.
 * e.g. "Castillo de Cañena Arbequina" → "castillo-de-canena-arbequina"
 */
export function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // strip accents
    .replace(/[^a-z0-9]+/g, '-')       // non-alphanumeric → dash
    .replace(/^-|-$/g, '')             // trim leading/trailing dashes
}

/**
 * Fetch a single approved product by category and slug.
 * Returns null if not found.
 */
export async function getProductBySlug(category, slug) {
  const products = await getProductsByCategory(category)
  return products.find(p => generateSlug(p.name) === slug) ?? null
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseBuyLinks(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch {
    if (typeof raw === 'string' && raw.startsWith('http')) {
      return [{ label: 'Buy', url: raw }]
    }
    return []
  }
}
