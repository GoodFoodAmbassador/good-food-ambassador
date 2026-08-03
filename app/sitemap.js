import { getProductsByCategory, generateSlug } from '@/lib/airtable'

const BASE_URL = 'https://www.goodfoodambassador.com'
const CATEGORIES = ['olive-oils', 'grains', 'legumes', 'snacks', 'lna', 'seafood']

// Note: /standard redirects (301) to /pillars, and /suggest redirects (301) to /join
// (see next.config.js) — only the canonical destination is listed here.
const STATIC_PAGES = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/pillars', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ambassadors', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/join', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap() {
  const now = new Date()

  const staticEntries = STATIC_PAGES.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))

  const categoryEntries = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/${cat}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  const productResults = await Promise.all(
    CATEGORIES.map(async (cat) => {
      try {
        const products = await getProductsByCategory(cat)
        return products.map((p) => ({
          url: `${BASE_URL}/${cat}/${generateSlug(p.name)}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.6,
        }))
      } catch {
        return []
      }
    })
  )

  return [...staticEntries, ...categoryEntries, ...productResults.flat()]
}
