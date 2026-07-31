import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'

// ── Pillar config ─────────────────────────────────────────────────────────────

const PILLAR_META = [
  { key: 'good',  label: 'Good',  color: GREEN  },
  { key: 'clean', label: 'Clean', color: CYAN   },
  { key: 'fair',  label: 'Fair',  color: ORANGE },
  { key: 'true',  label: 'True',  color: GRAY   },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductDetailPage({ product, categorySlug, categoryLabel, pillColor }) {
  const hasPillars = PILLAR_META.some(p => product.pillars[p.key])

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <div style={{ maxWidth: 860, padding: '64px 60px 0' }}>
        <Link
          href={`/${categorySlug}`}
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: '#aaa',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 48,
          }}
        >
          ← {categoryLabel}
        </Link>
      </div>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 860, padding: '0 60px 48px' }}>
        <Pill bg={pillColor} style={{ marginBottom: 20 }}>{categoryLabel}</Pill>
        <h1
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 40,
            lineHeight: 1.2,
            marginTop: 16,
            marginBottom: 10,
          }}
        >
          {product.name}
        </h1>
        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'baseline',
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          {product.producer && (
            <span
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: '#555',
              }}
            >
              {product.producer}
            </span>
          )}
          {product.origin && (
            <span
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#bbb',
              }}
            >
              {product.origin}
            </span>
          )}
        </div>
        {product.description && (
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#555', maxWidth: 640 }}>
            {product.description}
          </p>
        )}
      </section>

      {/* ── BUY LINKS ── */}
      {product.buyLinks.length > 0 && (
        <section style={{ borderTop: `1px solid ${MID}`, padding: '32px 60px' }}>
          <p
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#aaa',
              marginBottom: 16,
            }}
          >
            Where to buy
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {product.buyLinks.map((link, i) => (
              <a
                key={i}
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
                  padding: '10px 20px',
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              >
                {link.label || 'Buy'}
              </a>
            ))}
          </div>
          <AffiliateDisclosure style={{ marginTop: 16 }} />
        </section>
      )}

      {/* ── GFA EVALUATION ── */}
      {hasPillars && (
        <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
          <p
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#aaa',
              marginBottom: 12,
            }}
          >
            GFA Evaluation
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 300,
              fontSize: 28,
              marginBottom: 48,
            }}
          >
            How this product scored against the{' '}
            <strong style={{ fontWeight: 600 }}>Good Food Standard</strong>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PILLAR_META.map((p, i) => {
              const text = product.pillars[p.key]
              if (!text) return null
              return (
                <div
                  key={p.key}
                  style={{
                    borderTop: `1px solid ${MID}`,
                    padding: '36px 0',
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: 40,
                    alignItems: 'start',
                  }}
                >
                  <Pill bg={p.color}>{p.label}</Pill>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: '#555', margin: 0 }}>
                    {text}
                  </p>
                </div>
              )
            })}
            <div style={{ borderTop: `1px solid ${MID}` }} />
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${MID}`, padding: '28px 60px', marginTop: 32 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            © Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
          </p>
          <Link
            href={`/${categorySlug}`}
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: T,
              textDecoration: 'none',
              borderBottom: `1.5px solid ${T}`,
              paddingBottom: 2,
            }}
          >
            ← Back to {categoryLabel}
          </Link>
        </div>
      </footer>
    </div>
  )
}
