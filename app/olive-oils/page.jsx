import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
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
    title: 'Quality across the category',
    criteria: [
      'Harvest date for oils; production or bottling date for condiments — freshness markers specific to each product',
      'Sensory quality present and lively: fruitiness and pungency in oils, real acidity in vinegars, depth and complexity in fermented condiments',
      'Live cultures retained where fermentation is the point — miso, raw ACV, naturally brewed soy sauce',
      'Bottle or tin sized to the contents, not padded with excess weight or oversized boxing for shelf presence',
    ],
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Origin you can verify',
    criteria: [
      'Named geographic origin for all products: region, estate, or country — not generic',
      'Geographical Indication (PDO or PGI) where available: Tradizionale balsamic, sherry vinegar, extra virgin olive oils from protected areas',
      'Ingredient lists that reflect what the product is — without additions that mask the base',
      'Dark glass, tin, or other food-contact material free of undisclosed PFAS, BPA, or similar substances of concern',
    ],
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'Dignity for everyone in the chain',
    criteria: [
      'Producer transparent about where ingredients are grown, fermented, and packaged — three different things',
      'GI certification anchors the product to a specific territory and community of producers, not just a commercial brand',
      'Land and water treated with care; cooperative or traceable sourcing that keeps value tied to the place of origin',
    ],
  },
  {
    color: GRAY,
    label: 'True',
    title: 'Honest from grove to table',
    criteria: [
      '"First cold press" is meaningless — olives are pressed once; "cold extraction" (below 27°C) is the real, separate claim worth checking for',
      '"Non-GMO" and "gluten-free" on olive oil are redundant — no GMO olive trees exist commercially, and olive oil contains no gluten',
      'Country of bottling clearly distinguished from country of production — they are often different things',
      'Recyclable-glass or recyclable-tin claims backed by an actual collection system, not just the symbol on the label',
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
      <section className="gfa-section" style={{ padding: '80px 60px 60px', maxWidth: 760 }}>
        <Pill bg={GREEN} style={{ marginBottom: 28 }}>Oils &amp; Condiments</Pill>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 52, lineHeight: 1.15, marginBottom: 24, marginTop: 20 }}>
          Small bottle, long story —<br />
          <strong style={{ fontWeight: 600 }}>trace it back.</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          Every civilisation found its fat. The oil, the vinegar, the condiment that carried flavour and defined a cuisine. Oils are among the most health-consequential foods we eat — with real differences in how they are grown, pressed, and priced. The cost of a bottle always tells part of the story. This is where we look for the rest of it.
        </p>
      </section>

      {/* ── SECTION 1: KNOWLEDGE ── */}
      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div className="gfa-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About this oil
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Extra virgin olive oil —<br />
              <strong style={{ fontWeight: 600 }}>what the label tells you.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Olive oil is a fresh product. Its flavour and polyphenol content diminish from the point of extraction. The harvest date on the label tells you when the oil was made. The best-before date tells you when it was bottled. Both together give the clearest picture of freshness.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Taste is the most direct test. A good extra virgin olive oil carries a recognisable fruitiness — the scent of fresh olives, grass, or green herbs — followed by bitterness and pungency on the palate. That peppery catch at the back of the throat is polyphenols at work: a sign of freshness and antioxidant content. Fruitiness, bitterness, and pungency all present and lively — that is the benchmark.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Olive oil is produced on every continent, though the Mediterranean still dominates. Spain is consistently the largest producer — typically somewhere between a third and nearly half of global supply, a share that swings significantly from year to year since a single drought or poor harvest in Spain can reshape the global figures. Italy, Greece, Turkey, and Tunisia round out the next tier of major producers, with Morocco and Portugal not far behind. In the Southern Hemisphere, Argentina and Chile produce smaller but high-quality harvests in May and June — the opposite season from the Mediterranean, which matters for sourcing fresh oil year-round. The USA and China are smaller, growing producers. Each country brings its own olive varieties, climate, and production culture — origin is always part of the story.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              "First cold press" is an obsolete term — olives are only ever pressed once, so there's no second press to distinguish it from. What people are usually gesturing at is "cold extraction": mechanical extraction kept below 27°C, which preserves more flavour and polyphenols. That's a real, specific claim some producers make on top of the extra virgin grade — but it isn't a requirement of the grade itself, which is defined by acidity and sensory quality, not extraction temperature. In practice, virtually no real extra virgin oil is made with added heat, since heat degrades the qualities the grade requires. Similarly, "non-GMO" and "gluten-free" labels on olive oil are redundant: no GMO olive trees exist commercially, and olive oil contains no gluten.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              Independent certification means a third party has verified the oil meets a defined grade threshold through chemistry and sensory testing. Geographical Indications — PDO (Protected Designation of Origin) and PGI (Protected Geographical Indication) — anchor the product to a specific territory and its community of producers. COOC in the USA, NAOOA and the Extra Virgin Alliance (EVA) in North America each require third-party testing. Price reflects the cost of producing something genuine.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Four things to check on any bottle
              </p>
              {[
                { n: '01', title: 'Harvest date', body: 'Tells you when the oil was made. Together with the best-before date — which tells you when it was bottled — you get a full picture of where the oil is in its life.' },
                { n: '02', title: 'Specific origin', body: 'A named region or estate tells you more than a country alone. PDO and PGI (Geographical Indications) mean the product is anchored to a specific territory and its producers.' },
                { n: '03', title: 'Independent certification', body: 'COOC (California), PDO/PGI (EU), EVA and NAOOA (North America) each require third-party chemistry and sensory testing — the mark of a producer willing to be held to a standard.' },
                { n: '04', title: 'Sensory markers', body: 'Fruitiness, bitterness, and pungency all present in balance. The peppery sensation at the back of the throat is polyphenols — a sign of freshness and antioxidant content.' },
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

      {/* ── SECTION 1b: VINEGARS ── */}
      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div className="gfa-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About vinegar
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Fermentation, time, and<br />
              <strong style={{ fontWeight: 600 }}>what it means.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              True vinegar is made in two steps: first alcoholic fermentation converts fruit or grain to alcohol, then acetic acid bacteria convert that alcohol to vinegar. That process takes time and produces complexity. Speed shortcuts it.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Traditional balsamic — Aceto Balsamico Tradizionale from Modena or Reggio Emilia, both PDO — is aged for a minimum of 12 years through a series of wooden barrels made from different woods. It is a deeply concentrated condiment with no resemblance to commercial "balsamic" made from grape must concentrate and caramel colouring. That distinction is entirely invisible on most supermarket shelves.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Apple cider vinegar made with the "mother" — the cloudy culture of live acetic acid bacteria — is unpasteurised and still active. Wine vinegars, sherry vinegar (PDO, from Jerez), and rice vinegar each carry the character of their base ingredient when produced traditionally.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              The most useful question for any vinegar: made from real fermentation, and for how long?
            </p>
          </div>
          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check
              </p>
              {[
                { n: '01', title: 'The base', body: 'Wine, apple, rice, grape — named and specific. "Spirit vinegar" tells you almost nothing about origin or process.' },
                { n: '02', title: 'Fermentation method', body: 'Slow traditional vs. fast industrial. For balsamic: PDO status is the only reliable mark. For ACV: "with the mother" or "raw."' },
                { n: '03', title: 'Aging', body: 'For wine and sherry vinegars, time in wood adds depth. Tradizionale balsamic requires a minimum of 12 years by PDO law.' },
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

      {/* ── SECTION 1c: FERMENTED CONDIMENTS ── */}
      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div className="gfa-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About fermented condiments
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Salt, time, and<br />
              <strong style={{ fontWeight: 600 }}>the oldest food technology on earth.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Fermented condiments are among the oldest foods humans have made. Miso has been produced in Japan for over a thousand years. Fish sauce from Southeast Asia and garum from ancient Rome share the same logic: salt, protein, time. Soy sauce, gochujang, preserved lemons, fermented black bean — every food culture found fermentation, and every one made it entirely their own.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The distinction that matters most is whether a product is still alive. Unpasteurised miso retains live cultures and continues to develop in the jar. Industrially produced soy sauce — made in days through chemical hydrolysis rather than months of natural brewing — is a fundamentally different product that happens to carry the same name.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              Naturally brewed soy sauce says so on the label. Ingredient lists are short: soybeans, wheat, salt, water. Traditional fish sauce lists fish and salt. Nothing else. Additional flavourings, caramel colouring, or MSG point to a different process and a different intention.
            </p>
          </div>
          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check
              </p>
              {[
                { n: '01', title: 'Naturally brewed', body: 'For soy sauce: "naturally brewed" means months of fermentation, not days. For miso: "unpasteurised" or "raw" means live cultures are still present.' },
                { n: '02', title: 'Ingredient list', body: 'Short is meaningful. Fish sauce: fish and salt. Miso: soybeans, grain, salt, koji. Additional flavourings or colours point to shortcuts.' },
                { n: '03', title: 'Origin', body: 'Shoyu from Japan, gochujang from Korea, preserved lemons from Morocco — origin tells you which tradition you are eating from.' },
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

      {/* ── SECTION 2: GFA PILLARS FOR OLIVE OILS ── */}
      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px', background: LIGHT }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
          How we evaluate
        </p>
        <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, marginBottom: 40 }}>
          The <strong style={{ fontWeight: 600 }}>Four Pillars</strong> applied to oils &amp; condiments
        </h2>
        <div className="gfa-pillars-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
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
      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 }}>
              The Directory
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30 }}>
              Oils &amp; Condiments<br />
              <strong style={{ fontWeight: 600 }}>in the directory</strong>
            </h2>
          </div>
          <Link
            href="/join"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', textDecoration: 'none', borderBottom: `1px solid #ddd`, paddingBottom: 2, whiteSpace: 'nowrap' }}
          >
            Suggest a product →
          </Link>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#999', marginBottom: 48, maxWidth: 600 }}>
          Listed alphabetically. Products here have been evaluated against the Four Pillars using publicly available information. We look at what producers share — we look for the full picture, and we do not rank between products.
        </p>
        <AffiliateDisclosure style={{ marginBottom: 32 }} />

        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <ProductList products={products} />
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '28px 60px' }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#999', letterSpacing: '0.03em', lineHeight: 1.7, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${MID}` }}>
          Good Food Ambassador was started by food professionals who believe eaters deserve access to clear, independent information about the food they buy.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            © Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
            {' · '}
            <Link href="/privacy" style={{ color: '#bbb', textDecoration: 'none' }}>Privacy</Link>
            {' · '}
            <Link href="/terms" style={{ color: '#bbb', textDecoration: 'none' }}>Terms</Link>
          </p>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            Know something worth adding?{' '}
            <a href="/join" style={{ color: T, textDecoration: 'none', borderBottom: '1px solid ' + T, paddingBottom: 1 }}>Join →</a>
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
          className="gfa-product-row"
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
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#777', maxWidth: 560, marginBottom: Object.values(product.pillars).some(Boolean) ? 12 : 0 }}>
                {product.description}
              </p>
            )}
            {Object.values(product.pillars).some(Boolean) && (
              <Link href={`/olive-oils/${generateSlug(product.name)}`} style={{ display: 'inline-block', fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: T, textDecoration: 'none', borderBottom: `1px solid ${T}`, paddingBottom: 1 }}>
                Read the full evaluation →
              </Link>
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
          href="/join"
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
        href="/join"
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
