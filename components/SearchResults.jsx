'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Pill from '@/components/Pill'
import { generateSlug, CATEGORIES } from '@/lib/airtable'
import { T, W, LIGHT, MID, GRAY } from '@/lib/tokens'

const CATEGORY_COLOR = {
  'olive-oils': '#77d46c',
  grains: '#ffd110',
  legumes: '#01b3ff',
  snacks: GRAY,
  lna: '#77d46c',
  seafood: '#01b3ff',
}

function matches(product, query) {
  if (!query) return true
  const haystack = [product.name, product.producer, product.origin, product.categoryLabel]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(query.toLowerCase())
}

export default function SearchResults({ initialProducts, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [categoryFilter, setCategoryFilter] = useState('all')

  const results = useMemo(() => {
    return initialProducts.filter(
      (p) => matches(p, query) && (categoryFilter === 'all' || p.category === categoryFilter)
    )
  }, [initialProducts, query, categoryFilter])

  return (
    <div>
      {/* Search input */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product, brand, or origin…"
          aria-label="Search products"
          autoFocus
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '16px 20px',
            fontSize: 17,
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 400,
            color: T,
            border: `1.5px solid ${MID}`,
            borderRadius: 4,
            outline: 'none',
          }}
        />
      </div>

      {/* Category filter chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
        <FilterChip active={categoryFilter === 'all'} onClick={() => setCategoryFilter('all')}>
          All ({initialProducts.length})
        </FilterChip>
        {CATEGORIES.map((c) => {
          const count = initialProducts.filter((p) => p.category === c.slug).length
          if (count === 0) return null
          return (
            <FilterChip key={c.slug} active={categoryFilter === c.slug} onClick={() => setCategoryFilter(c.slug)}>
              {c.label} ({count})
            </FilterChip>
          )
        })}
      </div>

      {/* Results */}
      <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#aaa', letterSpacing: '0.04em', marginBottom: 16 }}>
        {results.length} {results.length === 1 ? 'result' : 'results'}
        {query ? ` for "${query}"` : ''}
      </p>

      {results.length === 0 ? (
        <div style={{ borderTop: `1px solid ${MID}`, paddingTop: 40 }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#aaa', marginBottom: 20 }}>
            No products match that search yet.
          </p>
          <Link
            href="/suggest"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: T,
              textDecoration: 'none',
              borderBottom: `1.5px solid ${T}`,
              paddingBottom: 2,
            }}
          >
            Suggest a product for evaluation →
          </Link>
        </div>
      ) : (
        <div>
          {results.map((product) => (
            <div
              key={`${product.category}-${product.id}`}
              style={{
                borderTop: `1px solid ${MID}`,
                padding: '28px 0',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 40,
                alignItems: 'start',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <Pill bg={CATEGORY_COLOR[product.category] || GRAY}>{product.categoryLabel}</Pill>
                  {product.producer && (
                    <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#aaa', fontWeight: 500 }}>
                      {product.producer}
                    </span>
                  )}
                </div>
                <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 17, fontWeight: 600, margin: '0 0 6px' }}>
                  <Link href={`/${product.category}/${generateSlug(product.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {product.name}
                  </Link>
                </h3>
                {product.origin && (
                  <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#bbb', marginBottom: 10 }}>
                    {product.origin}
                  </p>
                )}
                <Link
                  href={`/${product.category}/${generateSlug(product.name)}`}
                  style={{ display: 'inline-block', fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: T, textDecoration: 'none', borderBottom: `1px solid ${T}`, paddingBottom: 1 }}
                >
                  Read the full evaluation →
                </Link>
              </div>
              {product.buyLinks?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
                  {product.buyLinks.map((link, j) => (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: T,
                        textDecoration: 'none',
                        border: `1.5px solid ${MID}`,
                        padding: '8px 16px',
                        borderRadius: 2,
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        display: 'block',
                      }}
                    >
                      {link.label || 'Find it'}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.03em',
        color: active ? W : T,
        background: active ? T : LIGHT,
        border: 'none',
        borderRadius: 20,
        padding: '8px 16px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}
