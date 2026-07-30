import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import { getProductsByCategory, generateSlug } from '@/lib/airtable'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'
export const revalidate = 3600

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
      'Olive varieties and grades clearly stated on the label',
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
      'Origin claims verified against certification — country of bottling distinguished from country of production',
      '"First cold press" is a legacy term; under modern centrifugal extraction standards, it carries no additional regulatory meaning beyond the extra virgin grade itself',
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
          Extra virgin olive oil —<br />
          <strong style={{ fontWeight: 600 }}>what the label tells you.</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          We evaluated widely available extra virgin olive oils against the Good Food Standard, looking at harvest date transparency, origin traceability, production method, and labelling accuracy.
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
              How to read<br />
              <strong style={{ fontWeight: 600 }}>an olive oil label.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Olive oil is a fresh product. Its flavour and polyphenol content diminish over time from the point of pressing. The harvest date on the label indicates when the oil was produced — an oil harvested in November 2024 and purchased in mid-2025 is within a reasonable freshness window. A best-before date alone is less informative, as it reflects shelf life from bottling rather than from harvest.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              EU regulations allow olive oil to be bottled in a member state and labelled with that country's name even when the olives were sourced from elsewhere. Protected Designation of Origin (PDO or DOP) certification provides a stronger geographic guarantee: oils carrying that mark must be grown, pressed, and bottled within the designated producing area.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              "First cold press" is a legacy term that carried meaning under older mechanical pressing methods. Under current centrifugal extraction standards, all certified extra virgin olive oil is produced within temperature limits that qualify as cold. The phrase has no regulatory significance under modern standards.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              Independent certification — COOC in California, PDO/DOP in the EU, NAOOA in North America — means a third party has verified the oil meets a defined grade threshold. These certifications vary in scope, but each requires external testing that self-declared labels do not.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check on any bottle
              </p>
              {[
                { n: '01', title: 'Harvest date', body: 'The harvest year — ideally month — indicates when the oil was pressed. Together with the purchase date, it gives a reliable picture of freshness.' },
                { n: '02', title: 'Specific origin', body: 'A named region or estate provides more information than a country of origin alone. EU regulations permit oils from multiple countries to be labelled under a single member state.' },
                { n: '03', title: 'Independent certification', body: 'COOC (California), PDO/DOP (EU), and NAOOA (North America) each require third-party grade verification — a meaningful distinction from uncertified self-declared labels.' },
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
              The Directory
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30 }}>
              Oils &amp; Condiments<br />
              <strong style={{ fontWeight: 600 }}>in the index</strong>
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
          Listed alphabetically. Products here have been evaluated against the GFA Standard using publicly available information. We look at what producers share — we don't rank between products.
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
          Good Food Ambassador was started by food professionals who believe eaters deserve access to clear, independent information about the food they buy.
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
                <Link href={`/olive-oils/${generateSlug(product.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {product.name}
                </Link>
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
                  {link.label || 'Find it'}
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
