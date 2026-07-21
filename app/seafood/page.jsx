import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import { getProductsByCategory } from '@/lib/airtable'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'

export const metadata = {
  title: 'Seafood',
  description:
    'Fish, shellfish, canned and cured seafood from coastal producers and small-boat fisheries. Evaluated for traceability, fishing method, and chain-of-custody transparency.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/seafood' },
}

const PILLARS = [
  {
    color: GREEN,
    label: 'Good',
    title: 'Quality worth eating',
    criteria: [
      'Species accurately named — not just "white fish," "tuna," or "prawns"',
      'For canned: single species per tin, packed in quality oil or water, no fillers',
      'Texture, flavour, and freshness appropriate to the species and preparation',
    ],
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Origin and method you can verify',
    criteria: [
      'Catch area stated (FAO zone or named fishery) for wild; farm location for aquaculture',
      'Fishing or farming method disclosed — pole-and-line, longline, net type, or farm system',
      'MSC, ASC, or equivalent third-party certification where available',
    ],
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'Dignity for everyone in the chain',
    criteria: [
      'No use of forced or underpaid labour — seafood supply chains have a documented problem here',
      'Small-boat and artisan fishers fairly compensated in the supply chain',
      'IUU (illegal, unreported, unregulated) fishing traceable and excluded',
    ],
  },
  {
    color: GRAY,
    label: 'True',
    title: 'Says what it caught',
    criteria: [
      'Species substitution is common in seafood — "red snapper" and "sea bass" are frequently mislabelled',
      'Wild-caught claims verified by independent certification or chain-of-custody documentation',
      'Aquaculture: farming inputs (feed, antibiotics, chemicals) disclosed where possible',
    ],
  },
]

export default async function SeafoodPage() {
  const products = await getProductsByCategory('seafood')

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <section style={{ padding: '80px 60px 60px', maxWidth: 760 }}>
        <Pill bg={CYAN} style={{ marginBottom: 28 }}>Seafood</Pill>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 52, lineHeight: 1.15, marginBottom: 24, marginTop: 20 }}>
          Most seafood has changed hands<br />
          <strong style={{ fontWeight: 600 }}>three times before you see it.</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          Seafood has the most complex supply chains in food. Wild-catch fraud, species substitution, and labour violations are documented and common. Most labels tell you almost nothing about what you're actually buying.
        </p>
      </section>

      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              What you should know
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Wild vs. farmed matters less<br />
              <strong style={{ fontWeight: 600 }}>than how and where.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The wild vs. farmed debate misses the point. A well-managed salmon farm in Norway produces better, more consistent fish than wild-caught salmon from a depleted or poorly managed fishery. Conversely, pole-and-line caught tuna from a certified small-boat fishery is significantly better for ocean health than longline trawling regardless of whether the tuna is "wild." The meaningful questions are: where, how, and under what management.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Species fraud in seafood is extensively documented. Studies across multiple countries have found that between 20–40% of seafood sold in restaurants and retail is mislabelled — cheaper species substituted for expensive ones. "Red snapper" and "sea bass" are among the most commonly faked. MSC certification with chain-of-custody traceability is the most reliable defence.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Canned seafood is underrated as a category. A tin of well-sourced, pole-and-line tuna in good olive oil from a traceable fishery is a genuinely excellent product — but it looks identical on the outside to a tin of commodity tuna. The difference is in the small print: species (yellowfin vs. skipjack), catch method, origin, and what it's packed in.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              Labour conditions in seafood supply chains — particularly in Thai and Southeast Asian processing — are a well-documented human rights issue. Third-party labour audits and certifications like the Marine Stewardship Council's Chain of Custody standard include some labour requirements, but coverage is incomplete. Supporting transparent, short supply chains is the most practical mitigation.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check on any seafood
              </p>
              {[
                { n: '01', title: 'Species name', body: 'Not "white fish," "prawns," or "tuna." Atlantic salmon vs. Pacific; yellowfin vs. skipjack; tiger prawn vs. vannamei. Species predicts flavour, sustainability status, and fraud risk.' },
                { n: '02', title: 'Catch or farm method', body: 'Pole-and-line, trolled, or FAD-free for tuna. Dredged vs. hand-dived for scallops. Open-net vs. recirculating aquaculture systems. These distinctions matter for quality and ocean impact.' },
                { n: '03', title: 'Third-party certification', body: 'MSC (Marine Stewardship Council) for wild-caught; ASC (Aquaculture Stewardship Council) for farmed. Neither is perfect, but both require independent auditing — which is more than an uncertified label.' },
              ].map(item => (
                <div key={item.n} style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#ccc', minWidth: 24, paddingTop: 2 }}>{item.n}</span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{item.title}</p>
                      <p style={{ fontSize: 13, lineHeight: 1.65, color: '#777' }}>{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px', background: LIGHT }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>How we evaluate</p>
        <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, marginBottom: 40 }}>
          The <strong style={{ fontWeight: 600 }}>Good Food Standard</strong> applied to seafood
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {PILLARS.map(p => (
            <div key={p.label} style={{ background: W, padding: '36px 28px' }}>
              <Pill bg={p.color}>{p.label}</Pill>
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 15, fontWeight: 600, lineHeight: 1.35, margin: '16px 0 16px' }}>{p.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {p.criteria.map((c, i) => (
                  <li key={i} style={{ fontSize: 13, lineHeight: 1.65, color: '#777', marginBottom: 10, paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#ccc' }}>–</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 }}>The Index</p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30 }}>
              Products that passed<br /><strong style={{ fontWeight: 600 }}>evaluation</strong>
            </h2>
          </div>
          <Link href="/suggest" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', borderBottom: `1px solid #ddd`, paddingBottom: 2, whiteSpace: 'nowrap' }}>
            Suggest a product →
          </Link>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#999', marginBottom: 48, maxWidth: 600 }}>
          Listed alphabetically. Being on this list means a product passed evaluation against the GFA Standard for seafood. We don't rank or score — every product here is worth buying.
        </p>
        {products.length === 0 ? <EmptyState /> : <ProductList products={products} />}
      </section>

      <footer style={{ borderTop: `1px solid ${MID}`, padding: '28px 60px' }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#999', letterSpacing: '0.03em', lineHeight: 1.7, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${MID}` }}>
          Good Food Ambassador was started by food professionals who believe the industry owes eaters better information.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            © Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>hello@goodfoodambassador.com</a>
          </p>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>No ads. No sponsored rankings. Independent by design.</p>
        </div>
      </footer>
    </div>
  )
}

function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id} style={{ borderTop: `1px solid ${MID}`, padding: '32px 0', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 17, fontWeight: 600, margin: 0 }}>{product.name}</h3>
              {product.producer && <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#aaa', fontWeight: 500 }}>{product.producer}</span>}
            </div>
            {product.origin && <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#bbb', marginBottom: 12 }}>{product.origin}</p>}
            {product.description && <p style={{ fontSize: 14, lineHeight: 1.75, color: '#777', maxWidth: 560 }}>{product.description}</p>}
          </div>
          {product.buyLinks.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
              {product.buyLinks.map((link, j) => (
                <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: T, textDecoration: 'none', border: `1.5px solid ${MID}`, padding: '8px 16px', borderRadius: 2, textAlign: 'center', whiteSpace: 'nowrap', display: 'block' }}>
                  {link.label || 'Buy'}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
      <div style={{ borderTop: `1px solid ${MID}`, paddingTop: 32 }}>
        <Link href="/suggest" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 13, color: '#aaa', textDecoration: 'none' }}>
          Know a product that belongs here?{' '}<span style={{ borderBottom: '1px solid #ddd', paddingBottom: 1 }}>Suggest it →</span>
        </Link>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{ borderTop: `1px solid ${MID}`, paddingTop: 48, paddingBottom: 32 }}>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: '#aaa', marginBottom: 24 }}>Evaluations are underway. The first products will appear here shortly.</p>
      <Link href="/suggest" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: T, textDecoration: 'none', borderBottom: `1.5px solid ${T}`, paddingBottom: 2 }}>
        Suggest a product for evaluation →
      </Link>
    </div>
  )
}
