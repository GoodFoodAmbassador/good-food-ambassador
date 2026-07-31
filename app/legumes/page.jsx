import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import { getProductsByCategory, generateSlug } from '@/lib/airtable'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'
export const revalidate = 3600

export const metadata = {
  title: 'Legumes & Pulses',
  description:
    'Lentils, chickpeas, beans, peas, edamame. The protein backbone of plant-based cooking, evaluated for origin traceability, processing integrity, and labelling honesty.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/legumes' },
}

const PILLARS = [
  {
    color: GREEN,
    label: 'Good',
    title: 'Quality worth buying',
    criteria: [
      'Variety stated — Puy lentil, Castelluccio, Borlotti, Kabocha — distinct varieties with distinct cooking profiles',
      'For canned: short, clean ingredient list; canning liquid worth keeping (aquafaba has real culinary value)',
      'Dried legumes from a recent harvest — crop year or harvest date is the most useful freshness signal',
    ],
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Origin you can verify',
    criteria: [
      'Country or region where the legume was grown — distinct from where it was packaged',
      'Organic certification where pesticide load is a real concern — soy is one of the most heavily treated crops globally',
      'GI certification for protected varieties: Puy lentil PDO, Castelluccio IGP',
    ],
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'Dignity for everyone in the chain',
    criteria: [
      'Producers transparent about growing relationships — who farms it, where, and under what conditions',
      'Fair pricing to small-scale growers, particularly for heritage varieties and producers in developing regions',
      'Land managed for long-term productivity — legumes are natural nitrogen-fixers; regenerative farming uses that',
    ],
  },
  {
    color: GRAY,
    label: 'True',
    title: 'Honest from field to can',
    criteria: [
      'Variety names used with precision — "lentils" is not a variety; Puy, green, or red is',
      'Canned legumes: BPA-free lining disclosed where relevant',
      'Health claims accompanied by specific, verifiable information — legumes are genuinely nutritious without exaggeration',
    ],
  },
]

export default async function LegumesPage() {
  const products = await getProductsByCategory('legumes')

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <section className="gfa-section" style={{ padding: '80px 60px 60px', maxWidth: 760 }}>
        <Pill bg={CYAN} style={{ marginBottom: 28 }}>Legumes &amp; Pulses</Pill>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 52, lineHeight: 1.15, marginBottom: 24, marginTop: 20 }}>
          Every food culture has its own way with legumes —<br />
          <strong style={{ fontWeight: 600 }}>the variety is where that story starts.</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560 }}>
          Lentils, chickpeas, beans, peas — the protein backbone of plant-based cooking in every food culture. The details that matter: variety, origin, freshness, and how they were grown and processed. Most labels say very little. A few say a lot.
        </p>
      </section>

      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div className="gfa-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About dried legumes
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Variety and origin —<br />
              <strong style={{ fontWeight: 600 }}>what they mean for legumes.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              A Puy lentil from the Auvergne has a distinct texture and earthy, mineral flavour that holds up to cooking. A generic "green lentil" from the commodity supply chain may be three or four different varieties blended at a packing facility. Both are called green lentils. Neither label tells you which you have until you cook them.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Dried legumes age without spoiling, but age affects them. Older beans require longer cooking times and may not fully soften regardless of preparation. Crop year or harvest date are rarely stated on packaging; a best-before date set two years from purchase reflects safe storage life rather than when the crop was harvested. Freshness matters most for chickpeas and large beans — lentils are more forgiving.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Geographical Indication certification does more than protect a name — it anchors a variety to a specific place and growing method. Puy lentils carry PDO status; Castelluccio lentils from Umbria and Sorana beans from Tuscany carry PGI. The certification guarantees variety and origin where self-declaration would otherwise be unverifiable.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              "Product of multiple countries" reflects how most commodity legumes are sourced — blended at packing facilities from multiple origins. Single-origin labelling, where it exists, gives you specific information about the crop and its provenance — and usually points to a producer who grows, packs, and stands behind the product.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check on any pack
              </p>
              {[
                { n: '01', title: 'Variety name', body: 'Puy, Castelluccio, Borlotti, Kabocha, Beluga — these are meaningful distinctions. A named variety gives you more information about texture, flavour, and what to expect in cooking.' },
                { n: '02', title: 'Country of origin', body: 'For the legume itself, not just the packaging location. Single-country origin tells you more than "product of multiple countries." Regional designations (e.g. Puy PDO) verify both variety and origin.' },
                { n: '03', title: 'Harvest date', body: 'Rarely stated, but more useful than a best-before date. Crop year on the pack signals a producer tracking freshness. For chickpeas and large beans, freshness makes a real difference to cooking time and texture.' },
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

      {/* Section 1b — Canned & Jarred */}
      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div className="gfa-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About canned &amp; jarred legumes
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              Canned is fine —<br />
              <strong style={{ fontWeight: 600 }}>the details still matter.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The best canned chickpeas, beans, and lentils come from quality crops, treated with care in processing, and packed in liquid worth keeping. The aquafaba — the cooking liquid from canned chickpeas — has real culinary value when the beans are good. When it is heavily salted, cloudy, or smells flat, it tells you something about the product underneath.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Ingredient list for canned legumes should be short: legume, water, salt. Firming agents (calcium chloride is common and harmless) appear in some products; added sugar and flavourings are unnecessary in a quality product. BPA-free lining is increasingly standard but still worth confirming — it is not yet universal.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              The gap between a well-sourced canned legume and a commodity one is significant. The best Spanish jarred chickpeas, Italian canned borlotti, or French Puy lentils carry the character of their origin even through the canning process. Crop quality is preserved, not masked. Where it comes from still matters — even in a tin.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check on any can
              </p>
              {[
                { n: '01', title: 'Ingredient list', body: 'Legume, water, salt. Anything additional is worth understanding. Firming agents are common and generally harmless; added sugar or flavourings are not necessary.' },
                { n: '02', title: 'The canning liquid', body: 'For chickpeas: aquafaba has real culinary value when the beans are good. If the liquid smells flat or excessively salty, it reflects the quality of the beans inside.' },
                { n: '03', title: 'BPA-free lining', body: 'Increasingly standard, still worth confirming. Look for the declaration on the can or the brand\'s website. Jarred legumes in glass sidestep the question entirely.' },
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

      {/* Section 1c — Fermented & Processed Soy */}
      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div className="gfa-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80, maxWidth: 1080 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
              About fermented &amp; processed soy
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, lineHeight: 1.3, marginBottom: 28 }}>
              The world's most transformed legume —<br />
              <strong style={{ fontWeight: 600 }}>and the most misread.</strong>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              The soybean becomes tofu, tempeh, edamame, miso, soy milk, and dozens of other products — each with its own production method, quality markers, and place in a food culture. Organic and non-GMO soy matter here in a way they rarely do elsewhere: soy is one of the most heavily pesticide-treated and genetically modified crops globally. For fermented products that retain living cultures, the distinction carries through to the end product.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Tofu varies enormously in quality. Nigari-set tofu — using magnesium chloride derived from seawater — has a mineral complexity and firmness that gypsum-set tofu (calcium sulfate) lacks; gypsum gives a softer, milder result. The setting agent is usually listed in ingredients. Fresh tofu made the same day has a sweetness that disappears with time. Origin of the soybeans and setting method together tell you most of what you need to know.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
              Tempeh is fermented whole soybean, bound by Rhizopus mould into a dense cake. Traditional tempeh is live; commercially stabilised tempeh is heat-treated for shelf stability. The fermentation gives it a nutty, mushroom-like flavour that deepens with cooking. Unpasteurised tempeh has a shorter shelf life and more complex flavour — the label will tell you which one you have.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555' }}>
              Miso and soy sauce are covered in the Oils &amp; Condiments guide — the same principles apply: live cultures in unpasteurised miso, short ingredient lists, and named variety matter. For edamame: frozen at source preserves quality better than fresh that has travelled far. Origin is worth checking.
            </p>
          </div>

          <div>
            <div style={{ background: LIGHT, padding: '36px 32px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
                Three things to check for soy
              </p>
              {[
                { n: '01', title: 'Tofu: how it was set', body: 'Nigari (magnesium chloride from seawater) gives mineral complexity and a firmer texture. Gypsum (calcium sulfate) gives a softer, milder result. The setting agent in the ingredient list tells you which.' },
                { n: '02', title: 'Tempeh: organic matters', body: 'Soy is one of the most heavily pesticide-treated crops globally. Organic and non-GMO are meaningful distinctions here. Live vs. pasteurised affects flavour and shelf life — the label declares it.' },
                { n: '03', title: 'Edamame: origin and freshness', body: 'Frozen at source from Japan or China preserves quality better than fresh that has travelled long distances. Origin is rarely stated prominently — worth looking for on the back of pack.' },
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
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>How we evaluate</p>
        <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30, marginBottom: 40 }}>
          The <strong style={{ fontWeight: 600 }}>Four Pillars</strong> applied to legumes &amp; pulses
        </h2>
        <div className="gfa-pillars-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
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

      <section className="gfa-section" style={{ borderTop: `1px solid ${MID}`, padding: '64px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 12 }}>The Directory</p>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 30 }}>
              Legumes &amp; Pulses<br /><strong style={{ fontWeight: 600 }}>in the directory</strong>
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
                <Link href={`/legumes/${generateSlug(product.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>{product.name}</Link>
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
