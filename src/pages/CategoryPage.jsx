import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { C, F, CATEGORY_COLOR, CATEGORY_TEXT_COLOR } from '../theme'
import Pill from '../components/Pill'
import { deriveAllPillarScores, filterProducts, sortProducts, searchProducts } from '../utils/gfa'

// Dynamic imports — add each category's data files here as they are populated
const CATEGORY_DATA = {
  'oils-condiments': () => Promise.all([
    import('../data/categories/oils-condiments.json'),
    import('../data/products/oils-condiments.json'),
  ]),
  'grains-noodles': () => Promise.all([
    import('../data/categories/grains-noodles.json'),
    import('../data/products/grains-noodles.json'),
  ]),
  'legumes-pulses': () => Promise.all([
    import('../data/categories/legumes-pulses.json'),
    import('../data/products/legumes-pulses.json'),
  ]),
  'snacks-pantry': () => Promise.all([
    import('../data/categories/snacks-pantry.json'),
    import('../data/products/snacks-pantry.json'),
  ]),
  'low-no-alcohol': () => Promise.all([
    import('../data/categories/low-no-alcohol.json'),
    import('../data/products/low-no-alcohol.json'),
  ]),
  'seafood': () => Promise.all([
    import('../data/categories/seafood.json'),
    import('../data/products/seafood.json'),
  ]),
}

const SCORE_LABEL = { '✓': 'Full', '~': 'Partial', '—': 'Missing' }
const SCORE_COLOR = { '✓': C.green, '~': C.yellow, '—': '#ccc' }

export default function CategoryPage() {
  const { categoryId } = useParams()
  const [tab, setTab] = useState('browse')
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)

  // Browse controls
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [filters, setFilters] = useState({ good: 'all', clean: 'all', fair: 'all', true: 'all' })

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    setLoading(true)
    const loader = CATEGORY_DATA[categoryId]
    if (!loader) { setLoading(false); return }
    loader().then(([catMod, prodMod]) => {
      setCategory(catMod.default)
      setProducts(prodMod.default || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [categoryId])

  // Scroll to top on tab change
  useEffect(() => { window.scrollTo({ top: 0 }) }, [tab])

  const color = CATEGORY_COLOR[categoryId] || C.gray
  const textColor = CATEGORY_TEXT_COLOR[categoryId]

  if (loading) return (
    <div style={{ padding: '80px 60px', fontFamily: F.heading, color: '#aaa', fontSize: 14 }}>
      Loading…
    </div>
  )

  if (!category) return (
    <div style={{ padding: '80px 60px' }}>
      <Link to="/index" style={{ fontFamily: F.heading, fontSize: 13, color: C.ink }}>← Back to Index</Link>
      <p style={{ marginTop: 24, fontFamily: F.heading, color: '#999' }}>Category not found.</p>
    </div>
  )

  // Apply filters, search, sort
  const displayed = sortProducts(
    searchProducts(filterProducts(products, filters), search),
    sort
  )

  const evaluatedCount = products.filter(p => p.status === 'evaluated').length

  return (
    <div style={{ background: C.white, color: C.ink, minHeight: 'calc(100vh - 64px)' }}>

      {/* ── SUB-NAV ── */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 100,
        background: C.white, borderBottom: `1px solid ${C.mid}`,
        display: 'flex', alignItems: 'center', gap: 0,
        padding: mobile ? '0 12px' : '0 60px',
        overflowX: 'auto',
      }}>
        <Link to="/index" style={{
          fontFamily: F.heading, fontSize: 11, fontWeight: 500,
          color: '#aaa', textDecoration: 'none',
          padding: '0 12px 0 0', letterSpacing: '0.04em', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          ← Index
        </Link>
        <Pill bg={color} color={textColor}>{category.name}</Pill>
        <div style={{ display: 'flex', marginLeft: mobile ? 12 : 32 }}>
          {[['browse', 'Product Index'], ['learn', 'Category Guide']].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              fontFamily: F.heading, fontSize: 12,
              fontWeight: tab === key ? 600 : 400,
              color: tab === key ? C.ink : '#999',
              background: 'none', border: 'none',
              borderBottom: tab === key ? `2px solid ${color}` : '2px solid transparent',
              padding: mobile ? '16px 12px' : '16px 20px',
              cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap',
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── BROWSE TAB ── */}
      {tab === 'browse' && (
        <div style={{ padding: mobile ? '32px 20px 80px' : '48px 60px 120px' }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontFamily: F.heading, fontWeight: 300, fontSize: mobile ? 26 : 34, marginBottom: 8 }}>
              <strong style={{ fontWeight: 600 }}>{category.name}</strong>
            </h1>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.6, maxWidth: 520, marginBottom: 4 }}>
              {category.tagline}
            </p>
            <p style={{ fontFamily: F.heading, fontSize: 11, color: '#aaa', letterSpacing: '0.06em' }}>
              {evaluatedCount} product{evaluatedCount !== 1 ? 's' : ''} evaluated
            </p>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            alignItems: 'center', marginBottom: 32,
            paddingBottom: 24, borderBottom: `1px solid ${C.mid}`,
          }}>
            {/* Search */}
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              style={{
                fontFamily: F.body, fontSize: 14,
                border: `1px solid ${C.mid}`, borderRadius: 2,
                padding: '9px 14px', outline: 'none', color: C.ink,
                minWidth: 200, flexShrink: 0,
              }}
            />

            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                fontFamily: F.heading, fontSize: 12,
                border: `1px solid ${C.mid}`, borderRadius: 2,
                padding: '9px 14px', cursor: 'pointer', color: C.ink,
                background: C.white, outline: 'none',
              }}
            >
              <option value="newest">Newest first</option>
              <option value="name">Name A–Z</option>
              <option value="producer">Producer A–Z</option>
            </select>
          </div>

          {/* GFA Filter chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            <span style={{ fontFamily: F.heading, fontSize: 11, color: '#aaa', alignSelf: 'center', letterSpacing: '0.06em' }}>
              FILTER:
            </span>
            {['good', 'clean', 'fair', 'true'].map(pillar => (
              <button
                key={pillar}
                onClick={() => setFilters(f => ({
                  ...f,
                  [pillar]: f[pillar] === 'all' ? 'full' : f[pillar] === 'full' ? 'partial' : 'all'
                }))}
                style={{
                  fontFamily: F.heading, fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  border: `1.5px solid ${filters[pillar] !== 'all' ? C.ink : C.mid}`,
                  background: filters[pillar] !== 'all' ? C.ink : C.white,
                  color: filters[pillar] !== 'all' ? C.white : '#aaa',
                  padding: '5px 12px', borderRadius: 2, cursor: 'pointer',
                }}
              >
                {pillar} {filters[pillar] === 'full' ? '✓' : filters[pillar] === 'partial' ? '~' : ''}
              </button>
            ))}
            {Object.values(filters).some(v => v !== 'all') && (
              <button
                onClick={() => setFilters({ good: 'all', clean: 'all', fair: 'all', true: 'all' })}
                style={{
                  fontFamily: F.heading, fontSize: 10, letterSpacing: '0.06em',
                  background: 'none', border: 'none', color: '#aaa',
                  cursor: 'pointer', textDecoration: 'underline',
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Product grid */}
          {displayed.length === 0 ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <p style={{ fontFamily: F.heading, fontSize: 14, color: '#aaa' }}>
                {products.length === 0
                  ? 'Evaluations for this category are coming soon.'
                  : 'No products match your filters.'}
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
              gap: 2,
            }}>
              {displayed.map(product => (
                <ProductCard key={product.id} product={product} categoryId={categoryId} mobile={mobile} />
              ))}
            </div>
          )}

          {/* Notify signup */}
          <NotifySignup category={category.name} mobile={mobile} />
        </div>
      )}

      {/* ── LEARN TAB ── */}
      {tab === 'learn' && (
        <div style={{ maxWidth: 720, margin: '0 auto', padding: mobile ? '40px 20px 80px' : '64px 40px 120px' }}>
          <LearnContent category={category} />
        </div>
      )}
    </div>
  )
}

// ── PRODUCT CARD ─────────────────────────────────────────────────────────
function ProductCard({ product, categoryId, mobile }) {
  const { name, producer, origin, type, harvest_date } = product.product
  const scores = deriveAllPillarScores(product.gfa)
  const buyLink = product.buy?.[0]

  return (
    <div style={{
      background: C.light, padding: mobile ? '24px 20px' : '28px 28px',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      {/* Name + producer */}
      <div>
        <Link to={`/index/${categoryId}/${product.id}`} style={{
          fontFamily: F.heading, fontSize: mobile ? 16 : 18, fontWeight: 600,
          color: C.ink, textDecoration: 'none',
        }}>
          {name}
        </Link>
        <div style={{ fontFamily: F.heading, fontSize: 11, color: '#aaa', letterSpacing: '0.06em', marginTop: 4 }}>
          {producer} · {origin?.region ? `${origin.region}, ` : ''}{origin?.country}
          {harvest_date ? ` · ${harvest_date}` : ''}
        </div>
      </div>

      {/* GFA score row */}
      <div style={{ display: 'flex', gap: 8 }}>
        {Object.entries(scores).map(([pillar, score]) => (
          <div key={pillar} style={{
            fontFamily: F.heading, fontSize: 9, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            background: SCORE_COLOR[score], color: score === '~' ? C.ink : C.white,
            padding: '3px 8px', borderRadius: 2,
          }}>
            {pillar} {score}
          </div>
        ))}
      </div>

      {/* Description */}
      {product.product.description && (
        <p style={{ fontSize: 13, lineHeight: 1.6, color: '#666', margin: 0 }}>
          {product.product.description}
        </p>
      )}

      {/* Buy link */}
      {buyLink && (
        <div style={{ marginTop: 4 }}>
          <a
            href={buyLink.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: F.heading, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: C.white, background: C.ink,
              padding: '8px 16px', borderRadius: 2,
              textDecoration: 'none', display: 'inline-block',
            }}
          >
            Buy from {buyLink.vendor} →
          </a>
          {buyLink.affiliate && (
            <span style={{ fontFamily: F.heading, fontSize: 9, color: '#bbb', marginLeft: 8, letterSpacing: '0.04em' }}>
              affiliate link
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// ── LEARN CONTENT ────────────────────────────────────────────────────────
function LearnContent({ category }) {
  const { learn } = category
  if (!learn) return (
    <p style={{ fontFamily: F.heading, color: '#aaa', fontSize: 14 }}>
      Category guide coming soon.
    </p>
  )

  return (
    <div>
      <h1 style={{ fontFamily: F.heading, fontWeight: 300, fontSize: 32, marginBottom: 24, lineHeight: 1.2 }}>
        <strong style={{ fontWeight: 600 }}>{category.name}</strong><br />
        Category Guide
      </h1>

      {learn.how_we_evaluate && (
        <>
          <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 16, marginBottom: 12, marginTop: 40 }}>How we evaluate this category</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', borderLeft: `3px solid ${C.mid}`, paddingLeft: 20 }}>
            {learn.how_we_evaluate}
          </p>
        </>
      )}

      {learn.what_to_look_for?.length > 0 && (
        <>
          <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 16, marginBottom: 12, marginTop: 40 }}>What to look for</h2>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {learn.what_to_look_for.map((item, i) => (
              <li key={i} style={{ fontSize: 15, lineHeight: 1.7, color: '#444' }}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {learn.red_flags?.length > 0 && (
        <>
          <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 16, marginBottom: 12, marginTop: 40, color: C.orange }}>Red flags</h2>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {learn.red_flags.map((item, i) => (
              <li key={i} style={{ fontSize: 15, lineHeight: 1.7, color: '#444' }}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {learn.key_terms?.length > 0 && (
        <>
          <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 16, marginBottom: 16, marginTop: 40 }}>Key terms</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {learn.key_terms.map((item, i) => (
              <div key={i} style={{ background: C.light, padding: '20px 24px' }}>
                <div style={{ fontFamily: F.heading, fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{item.term}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: '#555' }}>{item.definition}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {learn.resources?.length > 0 && (
        <>
          <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 16, marginBottom: 12, marginTop: 40 }}>Further reading</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {learn.resources.map((r, i) => (
              <li key={i}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: F.heading, fontSize: 13, color: C.ink,
                  borderBottom: `1px solid ${C.mid}`, paddingBottom: 1,
                }}>
                  {r.title} →
                </a>
                {r.note && <span style={{ fontSize: 12, color: '#aaa', marginLeft: 8 }}>{r.note}</span>}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

// ── NOTIFY SIGNUP ────────────────────────────────────────────────────────
function NotifySignup({ category, mobile }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    // Opens mailto — replace with form backend in future
    window.location.href = `mailto:hello@goodfoodambassador.com?subject=Notify me — ${category}&body=Email: ${email}`
    setSent(true)
  }

  return (
    <div style={{
      marginTop: 64, padding: '32px 36px',
      background: C.light, borderLeft: `3px solid ${C.mid}`,
    }}>
      <div style={{ fontFamily: F.heading, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
        More products coming to {category}
      </div>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 1.6 }}>
        Get notified when new evaluations are published in this category.
      </p>
      {sent ? (
        <p style={{ fontFamily: F.heading, fontSize: 13, color: C.green }}>✓ Thanks — we'll be in touch.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{
              fontFamily: F.body, fontSize: 14,
              border: `1px solid ${C.mid}`, borderRadius: 2,
              padding: '10px 14px', outline: 'none', color: C.ink,
              minWidth: 220,
            }}
          />
          <button type="submit" style={{
            fontFamily: F.heading, fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: C.ink, color: C.white, border: 'none',
            padding: '10px 20px', borderRadius: 2, cursor: 'pointer',
          }}>
            Notify me
          </button>
        </form>
      )}
    </div>
  )
}
