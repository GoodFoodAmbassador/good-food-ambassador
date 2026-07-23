// ── GFA SCORE DERIVATION ──────────────────────────────────────────────────
// Pillar score = worst-performing criterion within that pillar.
// Order of severity: '—' > '~' > '✓'
// This is never set manually — always derived from criteria scores.

const RANK = { '✓': 2, '~': 1, '—': 0 }

export function derivePillarScore(criteriaObj) {
  const scores = Object.values(criteriaObj).map(c => c.score)
  if (scores.length === 0) return '—'
  return scores.reduce((worst, s) => RANK[s] < RANK[worst] ? s : worst, '✓')
}

// Derive all four pillar scores from a product's gfa object
export function deriveAllPillarScores(gfa) {
  return {
    good:  derivePillarScore(gfa.good?.criteria  || {}),
    clean: derivePillarScore(gfa.clean?.criteria || {}),
    fair:  derivePillarScore(gfa.fair?.criteria  || {}),
    true:  derivePillarScore(gfa.true?.criteria  || {}),
  }
}

// Return true if product passes a pillar filter (✓ only, or ✓ and ~)
export function passesFilter(pillarScore, filter) {
  if (filter === 'all') return true
  if (filter === 'full') return pillarScore === '✓'
  if (filter === 'partial') return pillarScore === '✓' || pillarScore === '~'
  return true
}

// Filter a products array by active GFA pillar filters
// filters: { good: 'all'|'full'|'partial', clean: ..., fair: ..., true: ... }
export function filterProducts(products, filters) {
  return products.filter(p => {
    const scores = deriveAllPillarScores(p.gfa)
    return (
      passesFilter(scores.good,  filters.good)  &&
      passesFilter(scores.clean, filters.clean) &&
      passesFilter(scores.fair,  filters.fair)  &&
      passesFilter(scores.true,  filters.true)
    )
  })
}

// Sort products array
// sortBy: 'newest' | 'name' | 'producer'
export function sortProducts(products, sortBy) {
  const copy = [...products]
  if (sortBy === 'newest') {
    return copy.sort((a, b) =>
      new Date(b.meta?.date_evaluated || 0) - new Date(a.meta?.date_evaluated || 0)
    )
  }
  if (sortBy === 'name') {
    return copy.sort((a, b) => a.product.name.localeCompare(b.product.name))
  }
  if (sortBy === 'producer') {
    return copy.sort((a, b) => a.product.producer.localeCompare(b.product.producer))
  }
  return copy
}

// Text search across name, producer, origin
export function searchProducts(products, query) {
  if (!query.trim()) return products
  const q = query.toLowerCase()
  return products.filter(p => {
    const { name, producer, origin } = p.product
    return (
      name?.toLowerCase().includes(q) ||
      producer?.toLowerCase().includes(q) ||
      origin?.country?.toLowerCase().includes(q) ||
      origin?.region?.toLowerCase().includes(q)
    )
  })
}
