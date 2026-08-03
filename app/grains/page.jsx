import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import { getProductsByCategory, generateSlug } from '@/lib/airtable'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY, YELLOW } from '@/lib/tokens'
export const revalidate = 3600

export const metadata = {
  title: 'Grains & Noodles',
  description:
    'Pasta, rice, soba, udon, couscous, millet, quinoa. Staple foods from every tradition, evaluated for origin, variety, and production method.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/grains' },
}

const PILLARS = [
  {
    color: GREEN,
    label: 'Good',
    title: 'Quality you can taste',
    criteria: [
      'Grain variety stated — durum, emmer, Koshihikari, buckwheat percentage',
      'For pasta: bronze-die extrusion and slow drying preserve texture and flavour',
'Ingredient list reflects what the product is — grain, water, salt for noodles; grain alone for dried pasta and rice',
    ],
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Origin you can verify',
    criteria: [
      'Country or region of origin for the grain itself — distinct from where it was packaged',
      'Organic certification where pesticide load is a real concern — wheat and rice among the most treated crops',
      'GI certification for protected varieties: basmati, Jasmine rice, Parmigiano-registered flours, Japanese short-grain',
    ],
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'Dignity for everyone in the chain',
    criteria: [
      'Producers transparent about grain sourcing and milling relationships',
      'Fair pricing to farmers — particularly for heritage and ancient grain varieties',
      'Land treated as a long-term resource, not mined for yield',
    ],
  },
  {
    color: GRAY,
    label: 'True',
    title: 'Honest from field to packet',
    criteria: [
      '"Artisan" and "traditional" carry more meaning when accompanied by a stated production method',
      'Soba labelled with actual buckwheat percentage — Japan\'s legal minimum to use the name is 30%; "nihachi" (80%) and "juwari" (100%) signal higher quality',
      'Rice variety stated — generic grade descriptors like "premium" or "select" carry no standardised definition',
    ],
  },
]

export default async function GrainsPage() {
  const products = await getProductsByCategory('grains')

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <section className="gfa-section" style={{ padding: '80px 60px 60px', maxWidth: 760 }}>
        <Pill bg={YELLOW} color={T} style={{ marginBottom: 28 }}>Grains &amp; Noodles</Pill>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 52, lineHeight: 1.15, marginBottom: 24, marginTop: 20 }}>
          Pasta needs the right wheat. Rice needs the right variety.<br />
          <strong style={{ fontWeight: 600 }}>Both need the right process.</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          Pasta, rice, soba, couscous, millet, quinoa — staple foods from every tradition. The details that most affect how a product cooks and tastes: variety, origin, and production method. Most labels say little. A few say a lot.
        </p>
      </section>

      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div className="gfa-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About grains &amp; noodles
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              The grain variety is the only thing<br />
              <strong style={{ fontWeight: 600 }}>that predicts the result.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Pasta made from high-quality durum wheat holds its texture during cooking. Pasta made from soft wheat turns starchy and collapses. The difference is protein content — not the brand name, not the packaging, not the flag on the front. Grain variety and origin are not always stated on labels, but they're the details that most affect cooking performance.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              For noodles, the gap is wider. In Japan, a product can only be labelled "soba" if it contains at least 30% buckwheat flour, under the Fair Competition Code for fresh noodles — most export markets have no equivalent rule at all. A product sold as soba outside Japan can be 90% wheat flour with a small buckwheat addition for colour and name. Within that 30% floor, quality signals get more specific: "nihachi" soba is 80% buckwheat to 20% wheat, and "juwari" is 100% buckwheat — both meaningful step-ups from the legal minimum.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Production method matters too, particularly for pasta. Bronze-die extrusion creates a rough surface that sauces cling to. Slow drying at low temperature preserves more of the grain's proteins and flavour. Neither appears on most labels — but they account for most of the difference between a cheap packet and a great one.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              Rice variety names carry specific meaning — Jasmine, basmati, and arborio each refer to distinct varieties with different starch profiles and uses. Geographic indication certification (Indian GI for basmati, Thai for jasmine) provides third-party verification of both variety and origin. Without it, variety names are self-declared.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check on any packet
              </p>
              {[
                { n: '01', title: 'Grain variety', body: 'Durum wheat, buckwheat percentage, Koshihikari, Carnaroli — variety determines how the product will cook and taste. A named variety gives you more to work with than a generic term like "wheat" or "rice."' },
                { n: '02', title: 'Origin of the grain', body: 'Where the grain was grown, not where it was packaged. EU regulations allow products to be labelled by their packaging country. Look for explicit grain origin or a GI certification mark.' },
                { n: '03', title: 'Production method', body: 'For pasta: bronze-die and slow-dried are meaningful signals. For soba: Japan requires at least 30% buckwheat to use the name at all — "nihachi" (80%) and "juwari" (100%) are real step-ups worth seeking out. For rice: milling date where available — rice stales faster than most people realise.' },
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

      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px', background: LIGHT }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
          How we evaluate
        </p>
        <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, marginBottom: 40 }}>
          The <strong style={{ fontWeight: 600 }}>Four Pillars</strong> applied to grains &amp; noodles
        </h2>
        <div className="gfa-pillars-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {PILLARS.map(p => (
            <div key={p.label} style={{ background: W, padding: '36px 28px' }}>
              <Pill bg={p.color} color={p.label === 'Good' ? undefined : undefined}>{p.label}</Pill>
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 15, fontWeight: 600, lineHeight: 1.35, margin: '16px 0 16px' }}>{p.title}</h3>
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

      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 }}>The Directory</p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30 }}>
              Grains &amp; Noodles<br /><strong style={{ fontWeight: 600 }}>in the directory</strong>
            </h2>
          </div>
          <Link href="/suggest" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', borderBottom: `1px solid #ddd`, paddingBottom: 2, whiteSpace: 'nowrap' }}>
            Suggest a product →
          </Link>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#999', marginBottom: 48, maxWidth: 600 }}>
          Listed alphabetically. Products here have been evaluated against the Four Pillars using publicly available information. We look at what producers share — we look for the full picture, and we do not rank between products.
        </p>
        <AffiliateDisclosure style={{ marginBottom: 32 }} />
        {products.length === 0 ? <EmptyState /> : <ProductList products={products} />}
      </section>

      <footer className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '28px 60px' }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#999', letterSpacing: '0.03em', lineHeight: 1.7, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${MID}` }}>
          Good Food Ambassador was started by food professionals who believe eaters deserve access to clear, independent information about the food they buy.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            © Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>hello@goodfoodambassador.com</a>
            {' · '}<Link href="/privacy" style={{ color: '#bbb', textDecoration: 'none' }}>Privacy</Link>
            {' · '}<Link href="/terms" style={{ color: '#bbb', textDecoration: 'none' }}>Terms</Link>
          </p>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>Know something worth adding?{' '}
            <a href="/join" style={{ color: T, textDecoration: 'none', borderBottom: '1px solid ' + T, paddingBottom: 1 }}>Join →</a></p>
        </div>
      </footer>
    </div>
  )
}

function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id} className="gfa-product-row" style={{ borderTop: `1px solid ${MID}`, padding: '32px 0', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 17, fontWeight: 600, margin: 0 }}>
                <Link href={`/grains/${generateSlug(product.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>{product.name}</Link>
              </h3>
              {product.producer && <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#aaa', fontWeight: 500 }}>{product.producer}</span>}
            </div>
            {product.origin && <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#bbb', marginBottom: 12 }}>{product.origin}</p>}
            {product.description && <p style={{ fontSize: 14, lineHeight: 1.75, color: '#777', maxWidth: 560, marginBottom: Object.values(product.pillars).some(Boolean) ? 12 : 0 }}>{product.description}</p>}
            {Object.values(product.pillars).some(Boolean) && (
              <Link href={`/grains/${generateSlug(product.name)}`} style={{ display: 'inline-block', fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: T, textDecoration: 'none', borderBottom: `1px solid ${T}`, paddingBottom: 1 }}>
                Read the full evaluation →
              </Link>
            )}
          </div>
          {product.buyLinks.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
              {product.buyLinks.map((link, j) => (
                <a key={j} href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: T, textDecoration: 'none', border: `1.5px solid ${MID}`, padding: '8px 16px', borderRadius: 2, textAlign: 'center', whiteSpace: 'nowrap', display: 'block' }}>
                  {link.label || 'Find it'}
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
