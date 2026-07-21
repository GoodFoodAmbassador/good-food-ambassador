import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import { getProductsByCategory } from '@/lib/airtable'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'

export const metadata = {
  title: 'Oils & Condiments',
  description:
    'Extra virgin olive oils, cold-pressed single-origins, vinegars, and fermented condiments. Evaluated for traceability, harvest date, and production integrity.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/olive-oils' },
}

// ── GFA Pillars applied to olive oils ────────────────────────────────────────

const PILLARS = [
  {
    color: GREEN,
    label: 'Good',
    title: 'Quality that nourishes',
    criteria: [
      'Harvest date on the label — the single most important number',
      'Fruitiness, bitterness, and pungency all present; no rancid or musty notes',
      'Polyphenol content or early-harvest designation where available',
    ],
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Origin you can verify',
    criteria: [
      'Specific geographic origin — region or estate, not just country',
      'Independent certification: COOC, PDO/DOP, NAOOA, or equivalent',
      'No undisclosed blending of olive varieties or grades',
    ],
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'Dignity for everyone in the chain',
    criteria: [
      'Producer transparent about where olives are grown and pressed',
      'Direct-to-consumer or traceable distribution where possible',
      'Land and water treated with care — not mined for yield',
    ],
  },
  {
    color: GRAY,
    label: 'True',
    title: 'Honest from grove to label',
    criteria: [
      'Olive variety accurately stated when relevant',
      'No "Italian" label for non-Italian olives — origin claims verified',
      'No meaningless phrases ("first cold press") used as quality signals',
    ],
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function OilsPage() {
  const products = await getProductsByCategory('olive-oils')

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      {/* ── HERO ── */}
      <section style={{ padding: '80px 60px 60px', maxWidth: 760 }}>
        <Pill bg={GREEN} style={{ marginBottom: 28 }}>Oils &amp; Condiments</Pill>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 52, lineHeight: 1.15, marginBottom: 24, marginTop: 20 }}>
          Most people have never<br />
          <strong style={{ fontWeight: 600 }}>tasted real olive oil.</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          The category has a fraud problem, a labelling problem, and a freshness problem. We evaluated the oils people actually buy — not to rank them, but to tell you what's in the bottle and what it means.
        </p>
      </section>

      {/* ── SECTION 1: KNOWLEDGE ── */}
      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              What you should know
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              The harvest date is the only number<br />
              <strong style={{ fontWeight: 600 }}>that actually matters.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Olive oil degrades from the moment it's pressed. Unlike wine, it doesn't improve with age — it loses its polyphenols, its flavour, and the health properties that make it worth buying in the first place. A "best before" date tells you nothing useful; it's set by the bottler, often two years after bottling, which could mean three or four years after harvest.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The harvest date tells you when the clock started. An oil harvested in November 2024 and bought in mid-2025 is still fresh. The same oil without a harvest date could be anything.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The second thing most people don't know: the "Italian" label is often misleading. EU law allows oil to be bottled in Italy and sold as Italian even if the olives came from Spain, Tunisia, or Greece. Look for PDO or DOP certification tied to a specific region — not just a country flag.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              And "first cold press"? It's a legacy marketing phrase with no regulatory meaning today. Every certified extra virgin olive oil is cold-extracted. It tells you nothing.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check on any bottle
              </p>
              {[
                { n: '01', title: 'Harvest date', body: "Not \"best before.\" The actual harvest year, ideally month. If it's not there, put it back." },
                { n: '02', title: 'Specific origin', body: 'A region or estate, not just a country. "Packed in Italy" is not an origin.' },
                { n: '03', title: 'Independent certification', body: 'COOC (California), PDO/DOP (EU), NAOOA (North America). Any of these confirm at least a grade floor has been verified by a third party.' },
              ].map(item => (
                <div key={item.n} style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#ccc', minWidth: 24, paddingTop: 2 }}>
                      {item.n}
                    </span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: 13, lineHeight: 1.65, color: '#777' }}>{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: GFA PILLARS FOR OLIVE OILS ── */}
      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px', background: LIGHT }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
          How we evaluate
        </p>
        <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, marginBottom: 40 }}>
          The <strong style={{ fontWeight: 600 }}>Good Food Standard</strong> applied to olive oils
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {PILLARS.map(p => (
            <div key={p.label} style={{ background: W, padding: '36px 28px' }}>
              <Pill bg={p.color}>{p.label}</Pill>
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 15, fontWeight: 600, lineHeight: 1.35, margin: '16px 0 16px' }}>
                {p.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {p.criteria.map((c, i) => (
                  <li key={i} style={{ fontSize: 13, lineHeight: 1.65, color: '#777', marginBottom: 10, paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#ccc' }}>–</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: THE INDEX ── */}
      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 }}>
              The Index
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30 }}>
              Products that passed<br />
              <strong style={{ fontWeight: 600 }}>evaluation</strong>
            </h2>
          </div>
          <Link
            href="/suggest"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', borderBottom: `1px solid #ddd`, paddingBottom: 2, whiteSpace: 'nowrap' }}
          >
            Suggest a product →
          </Link>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#999', marginBottom: 48, maxWidth: 600 }}>
          Listed alphabetically. Being on this list means a product passed evaluation against the GFA Standard for olive oils. We don't rank or score — every product here is worth buying.
        </p>

        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductList products={products} />
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${MID}`, padding: '28px 60px' }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#999', letterSpacing: '0.03em', lineHeight: 1.7, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${MID}` }}>
          Good Food Ambassador was started by food professionals who believe the industry owes eaters better information.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            © Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
          </p>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            No ads. No sponsored rankings. Independent by design.
          </p>
        </div>
      </footer>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProductList({ products }) {
  return (
    <div>
      {products.map((product, i) => (
        <div
          key={product.id}
          style={{
            borderTop: `1px solid ${MID}`,
            padding: '32px 0',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 40,
            alignItems: 'start',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 17, fontWeight: 600, margin: 0 }}>
                {product.name}
              </h3>
              {product.producer && (
                <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#aaa', fontWeight: 500 }}>
                  {product.producer}
                </span>
              )}
            </div>
            {product.origin && (
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#bbb', marginBottom: 12 }}>
                {product.origin}
              </p>
            )}
            {product.description && (
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#777', maxWidth: 560 }}>
                {product.description}
              </p>
            )}
          </div>

          {product.buyLinks.length > 0 && (
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
                  {link.label || 'Buy'}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ borderTop: `1px solid ${MID}`, paddingTop: 32 }}>
        <Link
          href="/suggest"
          style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 13, color: '#aaa', textDecoration: 'none' }}
        >
          Know a product that belongs here?{' '}
          <span style={{ borderBottom: '1px solid #ddd', paddingBottom: 1 }}>Suggest it →</span>
        </Link>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{ borderTop: `1px solid ${MID}`, paddingTop: 48, paddingBottom: 32 }}>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: '#aaa', marginBottom: 24 }}>
        Evaluations are underway. The first products will appear here shortly.
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
  )
}
