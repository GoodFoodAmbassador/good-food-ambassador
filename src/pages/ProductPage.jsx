import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { C, F, CATEGORY_COLOR, CATEGORY_TEXT_COLOR } from '../theme'
import Pill from '../components/Pill'
import { deriveAllPillarScores } from '../utils/gfa'

const PRODUCT_DATA = {
  'oils-condiments': () => import('../data/products/oils-condiments.json'),
  'grains-noodles':  () => import('../data/products/grains-noodles.json'),
  'legumes-pulses':  () => import('../data/products/legumes-pulses.json'),
  'snacks-pantry':   () => import('../data/products/snacks-pantry.json'),
  'low-no-alcohol':  () => import('../data/products/low-no-alcohol.json'),
  'seafood':         () => import('../data/products/seafood.json'),
}

const SCORE_COLOR  = { '✓': C.green, '~': C.yellow, '—': '#ccc' }
const PILLAR_LABEL = { good: 'GOOD', clean: 'CLEAN', fair: 'FAIR', true: 'TRUE' }
const PILLAR_COLOR = { good: C.green, clean: C.cyan, fair: C.orange, true: C.gray }

const CRITERIA_LABELS = {
  good:  { ingredients: 'Ingredient and nutritional honesty', quality: 'Quality and food safety' },
  clean: { traceability: 'Traceable from origin', packaging: 'Packaging that tells the truth' },
  fair:  { workers: 'Workers treated with dignity', land: 'Land and resources used responsibly' },
  true:  { cultural_roots: 'Cultural roots honoured, evolution welcomed' },
}

export default function ProductPage() {
  const { categoryId, productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    setLoading(true)
    const loader = PRODUCT_DATA[categoryId]
    if (!loader) { setLoading(false); return }
    loader().then(mod => {
      const found = (mod.default || []).find(p => p.id === productId)
      setProduct(found || null)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [categoryId, productId])

  const color = CATEGORY_COLOR[categoryId] || C.gray
  const textColor = CATEGORY_TEXT_COLOR[categoryId]

  if (loading) return (
    <div style={{ padding: '80px 60px', fontFamily: F.heading, color: '#aaa', fontSize: 14 }}>Loading…</div>
  )

  if (!product) return (
    <div style={{ padding: '80px 60px' }}>
      <Link to={`/index/${categoryId}`} style={{ fontFamily: F.heading, fontSize: 13, color: C.ink }}>
        ← Back to category
      </Link>
      <p style={{ marginTop: 24, fontFamily: F.heading, color: '#999' }}>Product not found.</p>
    </div>
  )

  const { product: info, gfa, buy, meta } = product
  const pillarScores = deriveAllPillarScores(gfa)

  return (
    <div style={{ background: C.white, color: C.ink, minHeight: 'calc(100vh - 64px)' }}>

      {/* Breadcrumb */}
      <div style={{
        padding: mobile ? '20px 20px 0' : '24px 60px 0',
        display: 'flex', gap: 8, alignItems: 'center',
        fontFamily: F.heading, fontSize: 11, color: '#aaa', letterSpacing: '0.04em',
      }}>
        <Link to="/index" style={{ color: '#aaa', textDecoration: 'none' }}>Index</Link>
        <span>›</span>
        <Link to={`/index/${categoryId}`} style={{ color: '#aaa', textDecoration: 'none' }}>{categoryId.replace(/-/g, ' ')}</Link>
        <span>›</span>
        <span style={{ color: C.ink }}>{info.name}</span>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: mobile ? '32px 20px 80px' : '48px 60px 120px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <Pill bg={color} color={textColor}>{categoryId.replace(/-/g, ' ')}</Pill>
          <h1 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: mobile ? 26 : 34, margin: '16px 0 8px', lineHeight: 1.2 }}>
            {info.name}
          </h1>
          <p style={{ fontFamily: F.heading, fontSize: 13, color: '#aaa', letterSpacing: '0.04em', marginBottom: 16 }}>
            {info.producer}
            {info.origin?.region ? ` · ${info.origin.region}` : ''}
            {info.origin?.country ? `, ${info.origin.country}` : ''}
            {info.harvest_date ? ` · ${info.harvest_date}` : ''}
          </p>
          {info.certifications?.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {info.certifications.map(cert => (
                <span key={cert} style={{
                  fontFamily: F.heading, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                  border: `1px solid ${C.mid}`, padding: '3px 8px', borderRadius: 2, color: '#888',
                }}>
                  {cert}
                </span>
              ))}
            </div>
          )}
          {info.description && (
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', maxWidth: 560 }}>
              {info.description}
            </p>
          )}
        </div>

        {/* GFA Pillar summary */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2, marginBottom: 48,
        }}>
          {Object.entries(pillarScores).map(([pillar, score]) => (
            <div key={pillar} style={{
              background: C.light, padding: '20px 16px', textAlign: 'center',
            }}>
              <div style={{
                fontSize: 22, marginBottom: 6,
                color: SCORE_COLOR[score],
              }}>
                {score}
              </div>
              <div style={{
                fontFamily: F.heading, fontSize: 10, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: PILLAR_COLOR[pillar],
              }}>
                {PILLAR_LABEL[pillar]}
              </div>
            </div>
          ))}
        </div>

        {/* Buy links */}
        {buy?.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 16, marginBottom: 16 }}>
              Where to buy
            </h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {buy.map((b, i) => (
                <div key={i}>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: F.heading, fontSize: 12, fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: C.white, background: C.ink,
                      padding: '12px 24px', borderRadius: 2,
                      textDecoration: 'none', display: 'inline-block',
                    }}
                  >
                    {b.vendor} →
                  </a>
                  {b.affiliate && (
                    <div style={{ fontFamily: F.heading, fontSize: 9, color: '#bbb', marginTop: 4, letterSpacing: '0.04em' }}>
                      affiliate link
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed GFA evaluation */}
        <div>
          <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 16, marginBottom: 24 }}>
            Full evaluation
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Object.entries(PILLAR_LABEL).map(([pillar, pillarLabel]) => {
              const pillarData = gfa[pillar]
              if (!pillarData?.criteria) return null
              return Object.entries(CRITERIA_LABELS[pillar] || {}).map(([criterionKey, criterionLabel]) => {
                const criterion = pillarData.criteria[criterionKey]
                if (!criterion) return null
                return (
                  <div key={`${pillar}-${criterionKey}`} style={{ background: C.light, padding: '24px 28px' }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                      <Pill bg={PILLAR_COLOR[pillar]}>{pillarLabel}</Pill>
                      <span style={{ fontFamily: F.heading, fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
                        {criterionLabel}
                      </span>
                      <span style={{
                        marginLeft: 'auto', flexShrink: 0,
                        fontFamily: F.mono, fontSize: 18, color: SCORE_COLOR[criterion.score],
                      }}>
                        {criterion.score}
                      </span>
                    </div>
                    {criterion.note && (
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#555', margin: 0 }}>
                        {criterion.note}
                      </p>
                    )}
                  </div>
                )
              })
            })}
          </div>
        </div>

        {/* Evaluation meta */}
        {meta && (
          <div style={{
            marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.mid}`,
            fontFamily: F.heading, fontSize: 11, color: '#bbb', letterSpacing: '0.04em',
          }}>
            Evaluated {meta.date_evaluated} · {meta.evaluator_role || 'GFA'}
          </div>
        )}

      </div>
    </div>
  )
}
