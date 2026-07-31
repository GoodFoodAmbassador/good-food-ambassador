import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
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
      'Fermented: live cultures present and stated — "raw," "unpasteurised," or "live cultures" on the label',
      'De-alcoholised wine: full varietal and vintage transparency; low-temperature removal preserves aromatic character',
      'Botanical: named botanicals with clear hierarchy — specific herbs, roots, flowers stated',
    ],
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Ingredients worth drinking',
    criteria: [
      'Sweeteners used to compensate for reduced alcohol clearly stated; flavour from real sources',
      'Organic certification for key botanicals and tea ingredients where pesticide load is a concern',
      'Short ingredient list — fruit, botanicals, water, cultures — with real flavour sources',
    ],
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'Dignity for everyone in the chain',
    criteria: [
      'Tea, fruit, and botanical ingredient sourcing disclosed — origin and sourcing relationship named',
      'De-alcoholised wine: grape origin and winery relationship stated, not just the brand',
      'Small producers fairly compensated; wellness claims grounded in transparent, specific information',
    ],
  },
  {
    color: GRAY,
    label: 'True',
    title: 'Honest about what it is',
    criteria: [
      'Total sugars per serving stated clearly — sugar content varies significantly across the category',
      'Kombucha: trace alcohol content disclosed — fermentation always produces some',
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
          Every ritual deserves<br />
          <strong style={{ fontWeight: 600 }}>a great drink.</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          A good no/low drink earns its place on its own terms — through the coherence of its aroma, the balance of its flavours, the weight and texture on the palate, and the desire it creates to take another sip.
        </p>
      </section>

      {/* ── SECTION 1: RICCARDO'S FRAMEWORK ── */}
      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About this category
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              A great No/Low drink —<br />
              <strong style={{ fontWeight: 600 }}>judged on its own terms.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The most important thing to understand about low and no alcohol drinks is that the best of them are not trying to be something else. A well-made kombucha, a de-alcoholised wine from a named estate, a botanical aperitivo built from real ingredients — each has its own identity, its own occasion, its own way of succeeding. The measure is whether it succeeds, not whether it approximates something alcoholic.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              A good No/Low drink delivers on several criteria, each carrying equal weight. First: clarity of intent. Does the product know what it is — a beer, a wine alternative, an aperitif, a spirit substitute? A product that understands its own category tends to be more honestly made. Aromatic quality comes next: definition, intensity, and authenticity in the aroma, with none of the artificial, cooked, or oxidised notes that signal unresolved production challenges.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Then balance: the integration of sweetness, acidity, bitterness, salinity, and spice. The absence of alcohol changes the structural dynamics of a drink significantly, and compensatory sweetness — sugar used to fill the void — is the most common shortcut. Structure and mouthfeel follow: body, texture, carbonation, and palate weight. The two failure modes are thinness and syrupiness, both signs of a drink that has not resolved its own structural challenge.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Complexity and progression are what make a drink worth returning to — something that develops across the palate, reveals layers, and finishes with length and coherence. The desire to take another sip is the most honest test of a finished drink.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              One important distinction: ABV, sugar, calories, ingredients, certifications, and allergens are objective product information. They tell you what is in the bottle. They do not, on their own, tell you whether it is good. Sensory quality is a separate question — answered by tasting.
            </p>
          </div>
          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Common weaknesses in the category
              </p>
              {[
                { n: '01', title: 'Compensatory sweetness', body: 'Sugar used to fill the structural void left by alcohol. The most widespread shortcut. Check the nutrition panel — total sugars per 100ml — not the marketing.' },
                { n: '02', title: 'Artificial or perfumed aromas', body: 'A sign that "natural flavours" are doing the work that real ingredients should. Disconnected acidity or bitterness falls into the same category.' },
                { n: '03', title: 'Thin or watery palate', body: 'A drink that has not resolved its own structure problem. Aggressive carbonation is sometimes used to add perceived body — it is a different thing.' },
                { n: '04', title: 'Short or unpleasant finish', body: 'Length, cleanliness, and the desire to take another sip are the most honest measures of a finished drink.' },
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

      {/* ── SECTION 1b: FERMENTED DRINKS ── */}
      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About fermented drinks
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Live cultures, raw fermentation,<br />
              <strong style={{ fontWeight: 600 }}>and why it matters.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Kombucha, kefir, jun, water kefir — these drinks are made by living microbial communities. The culture is the product. When a kombucha is raw and unpasteurised, it continues to develop in the bottle: the flavour evolves, the carbonation builds, the character deepens. That aliveness is the point.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              A good fermented drink has a recognisable identity: clarity in the aroma, a balance of sweetness and acidity, and a finish that lingers. The sourness feels lively and clean. The carbonation feels natural and integrated. Look for definition, balance, and a genuine finish — the same criteria that apply to any good drink, alcoholic or otherwise.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              The label tells you whether it is still alive. "Raw," "unpasteurised," or "live cultures" means the microbial community is present in the bottle. Heat treatment after fermentation creates a stable shelf product — a different one. One thing worth knowing: fermentation always produces trace amounts of alcohol. A transparent producer states the level.
            </p>
          </div>
          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check
              </p>
              {[
                { n: '01', title: 'Raw or pasteurised', body: '"Raw," "unpasteurised," or "live cultures" means the fermentation is still active in the bottle. The most important distinction in this sub-category.' },
                { n: '02', title: 'Trace alcohol', body: 'Fermentation always produces some alcohol. Look for the disclosure. Typically under 0.5% ABV for kombucha, but it varies and matters.' },
                { n: '03', title: 'Sugar per serving', body: 'Fermented drinks can carry significant residual sugar. The nutrition panel gives the real number — total sugars per 100ml.' },
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

      {/* ── SECTION 1c: DE-ALCOHOLISED WINE ── */}
      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About de-alcoholised wine
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Real wine, carefully made —<br />
              <strong style={{ fontWeight: 600 }}>and what removal actually does.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              De-alcoholised wine starts as real wine. Fermented from real grapes, by real winemakers. The difference is what happens after: the alcohol is removed using one of several techniques, each with different implications for flavour.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The best producers use cold spinning or vacuum distillation — processes that work at low temperatures and preserve the aromatic compounds that make the wine worth drinking. Older heat-based methods lose the aromas along with the alcohol. The technique matters, and a good producer will tell you which one they use.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              What to look for: a named grape variety and a specific vintage. A de-alcoholised Riesling from a named estate is a fundamentally different product from a generic blended base. The transparency of the base wine is the first signal of quality. A good de-alcoholised wine still has structure, minerality, and varietal character — the weight comes from the grape, not from sweeteners added to compensate.
            </p>
          </div>
          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check
              </p>
              {[
                { n: '01', title: 'Removal technique', body: 'Cold spinning or vacuum distillation preserve flavour better than heat-based methods. A producer proud of their process will mention it.' },
                { n: '02', title: 'Varietal and vintage', body: 'Named grape, named origin, named year. Specificity signals a quality base wine — and a producer willing to be held to it.' },
                { n: '03', title: 'Added sugar', body: 'Some producers add sugar back to compensate for mouthfeel lost when alcohol is removed. The nutrition panel shows total sugars per 100ml.' },
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

      {/* ── SECTION 1d: BOTANICAL DRINKS ── */}
      <section style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About botanical drinks
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Before cocktails,<br />
              <strong style={{ fontWeight: 600 }}>there were potions.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Long before the first cocktail, herbalists and foragers were turning bark, root, grass, and water into drinks that tasted extraordinary and did something real for the body. That spirit — curious, experimental, generous — is alive in the best botanical waters, aperitivos, and shrubs made today.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              A good botanical drink has a clear identity: you can taste what it is made from. Named botanicals — specific herbs, roots, flowers — tell you what you are drinking. A hierarchy of ingredients is more informative than a vague "botanical blend." The best in this category stand on their own as an occasion: an aperitivo hour with a well-made botanical drink carries the same ritual and pleasure as one with alcohol — with full presence and a genuinely interesting glass.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              Shrubs — drinking vinegars made from fruit, sugar, and vinegar — deserve more attention. Tart, complex, and versatile, they have centuries of history as a way to preserve fruit and make something genuinely interesting to drink.
            </p>
          </div>
          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check
              </p>
              {[
                { n: '01', title: 'Named botanicals', body: 'Specific herbs, roots, and flowers listed on the label. "Natural flavours" or "botanical blend" without detail is a less informative product.' },
                { n: '02', title: 'Sweetener check', body: 'Many botanical drinks are high in sugar or use alternative sweeteners to keep calories down. Both are worth knowing before buying.' },
                { n: '03', title: 'The occasion', body: 'A product that knows what it is — aperitivo, digestivo, morning ritual — tends to be made more carefully. Gastronomic relevance is part of quality.' },
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
          The <strong style={{ fontWeight: 600 }}>Four Pillars</strong> applied to low &amp; no alcohol drinks
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
              Low &amp; No Alcohol<br /><strong style={{ fontWeight: 600 }}>in the directory</strong>
            </h2>
          </div>
          <Link href="/join" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', borderBottom: `1px solid #ddd`, paddingBottom: 2, whiteSpace: 'nowrap' }}>
            Suggest a product →
          </Link>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#999', marginBottom: 48, maxWidth: 600 }}>
          Listed alphabetically. Products here have been evaluated against the Four Pillars using publicly available information. We look at what producers share — we look for the full picture, and we rank no product above another.
        </p>
        <AffiliateDisclosure style={{ marginBottom: 32 }} />
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
        <Link href="/join" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 13, color: '#aaa', textDecoration: 'none' }}>
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
      <Link href="/join" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: T, textDecoration: 'none', borderBottom: `1.5px solid ${T}`, paddingBottom: 2 }}>
        Suggest a product for evaluation →
      </Link>
    </div>
  )
}
