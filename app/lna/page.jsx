import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import { getProductsByCategory, generateSlug } from '@/lib/airtable'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'
export const revalidate = 3600

export const metadata = {
  title: 'Low & No Alcohol',
  description:
    'Kombucha, kefir, shrubs, de-alcoholised wine, botanical waters, and more. Evaluated for ingredient transparency, fermentation integrity, and honest labelling.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/lna' },
}

const PILLARS = [
  {
    color: GREEN,
    label: 'Good',
    title: 'Made with intention',
    criteria: [
      'Fermented products: live cultures present and stated, not heat-killed after fermentation',
      'De-alcoholised wine: full varietal and vintage transparency, not just brand',
      'Botanical drinks: named botanicals with proportions or at least a clear hierarchy',
    ],
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Ingredients worth drinking',
    criteria: [
      'No artificial sweeteners used to compensate for reduced alcohol — sugar alternatives stated clearly',
      'Organic certification for key ingredients where pesticide load is a concern',
      'Short ingredient list; flavour from real sources, not from "natural flavours" catch-alls',
    ],
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'Dignity for everyone in the chain',
    criteria: [
      'Tea, fruit, and botanical ingredient sourcing disclosed — not an afterthought',
      'De-alcoholised wine: grape origin and winery relationship transparent',
      'Small producers fairly compensated; no greenwashing on wellness claims',
    ],
  },
  {
    color: GRAY,
    label: 'True',
    title: 'Honest about what it is',
    criteria: [
      'Total sugars per serving stated clearly — sugar content varies significantly across the category',
      'Kombucha: alcohol content disclosed (fermentation produces trace alcohol)',
      'Health and wellness claims accompanied by specific, verifiable information',
    ],
  },
]

export default async function LNAPage() {
  const products = await getProductsByCategory('lna')

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <section style={{ padding: '80px 60px 60px', maxWidth: 760 }}>
        <Pill bg={GREEN} style={{ marginBottom: 28 }}>Low &amp; No Alcohol</Pill>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 52, lineHeight: 1.15, marginBottom: 24, marginTop: 20 }}>
          Low &amp; no alcohol — what the label<br />
          <strong style={{ fontWeight: 600 }}>tells you about what's in the bottle.</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          We evaluated low and no-alcohol drinks against the Good Food Standard, looking at production method, ingredient transparency, and label accuracy across fermented drinks, de-alcoholised wines, and botanical beverages.
        </p>
      </section>

      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              What you should know
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Fermented, de-alcoholised, botanical —<br />
              <strong style={{ fontWeight: 600 }}>they are three different things.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The LNA category covers very different products under the same banner. Fermented drinks (kombucha, kefir, jun, water kefir) are produced by live microbial cultures — fermentation is the point, not a step to be reversed. De-alcoholised wine and beer start as alcoholic products and have alcohol removed, usually by heat or vacuum processes that also affect flavour. Botanical waters and "spirit alternatives" are never-alcoholic drinks — often sparkling water with botanicals and sometimes adaptogens added.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Live cultures are what make fermented drinks distinctive. Pasteurisation, used to extend shelf life, deactivates them. Producers that keep their product raw typically say so on the label: "raw," "unpasteurised," or "live cultures" indicates the cultures are present in the bottle. Pasteurised versions are produced differently and will not carry those claims.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Sugar per serving varies significantly across LNA products. A bottle of kombucha can contain as much sugar as a soft drink — fermentation converts some sugar, and commercial versions are often adjusted for palatability. "No added sugar" claims refer specifically to refined sugars added during production and do not reflect total sugars from fermentation. The nutrition panel shows total sugars per serving, which is the most complete reference.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              De-alcoholised wine deserves more credit than it gets. The best producers approach removal with care — cold spinning and vacuum techniques that preserve flavour better than earlier heat-based methods. Full varietal and vintage disclosure is the baseline to look for. A de-alcoholised wine from a named estate is a different product from a generic blended base with alcohol removed.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check on any bottle
              </p>
              {[
                { n: '01', title: 'Production method', body: 'Fermented, de-alcoholised, or never-alcoholic. For fermented: is it live or pasteurised? For de-alcoholised: what removal method — cold-spin and vacuum preserve more flavour than heat. For botanicals: are they named?' },
                { n: '02', title: 'Sugar per serving', body: 'Look at the actual nutrition panel, not the marketing. Many LNA products are high in sugar — sometimes more than the alcoholic version they\'re designed to replace. Total sugars per 100ml is the comparison point.' },
                { n: '03', title: 'Live cultures stated?', body: 'For kombucha, kefir, jun, and water kefir: "raw," "unpasteurised," or "live cultures" means the product still contains the microorganisms that make it what it is. Without this language, it\'s a flavoured drink that was once fermented.' },
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
          The <strong style={{ fontWeight: 600 }}>Good Food Standard</strong> applied to low &amp; no alcohol
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
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 }}>The Directory</p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30 }}>
              Low &amp; No Alcohol<br /><strong style={{ fontWeight: 600 }}>in the index</strong>
            </h2>
          </div>
          <Link href="/suggest" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', borderBottom: `1px solid #ddd`, paddingBottom: 2, whiteSpace: 'nowrap' }}>
            Suggest a product →
          </Link>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#999', marginBottom: 48, maxWidth: 600 }}>
          Listed alphabetically. Products here have been evaluated against the GFA Standard using publicly available information. We look at what producers share — we don't rank between products.
        </p>
        {products.length === 0 ? <EmptyState /> : <ProductList products={products} />}
      </section>

      <footer style={{ borderTop: `1px solid ${MID}`, padding: '28px 60px' }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#999', letterSpacing: '0.03em', lineHeight: 1.7, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${MID}` }}>
          Good Food Ambassador was started by food professionals who believe eaters deserve access to clear, independent information about the food they buy.
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
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 17, fontWeight: 600, margin: 0 }}>
                <Link href={`/lna/${generateSlug(product.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>{product.name}</Link>
              </h3>
              {product.producer && <span style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#aaa', fontWeight: 500 }}>{product.producer}</span>}
            </div>
            {product.origin && <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#bbb', marginBottom: 12 }}>{product.origin}</p>}
            {product.description && <p style={{ fontSize: 14, lineHeight: 1.75, color: '#777', maxWidth: 560 }}>{product.description}</p>}
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
