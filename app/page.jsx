import Link from 'next/link'
import Image from 'next/image'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import { W, T, LIGHT, MID, GREEN, YELLOW, ORANGE, CYAN, GRAY } from '@/lib/tokens'

export const metadata = {
  title: 'Good Food Ambassador',
  description:
    'A community of growers, makers, movers, and eaters who believe what you eat touches everything — and act on it. Independent food evaluations, no ads, no sponsored rankings.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/' },
}

const PILLARS = [
  {
    color: GREEN,
    label: 'Good',
    title: 'Quality that nourishes',
    text: 'Honest ingredients, consistent quality, and sensory truth. Not enhancement. Not imitation.',
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Transparent from source to table',
    text: 'Origin traceable. Packaging honest. Nothing obscured between source and eater.',
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'Dignity for everyone in the chain',
    text: 'Workers compensated lawfully. Land and water treated as assets, not things to deplete.',
  },
  {
    color: GRAY,
    label: 'True',
    title: 'Honest about where food comes from',
    text: 'Cultural roots honoured. Authentic when it matters. No label that misleads eaters.',
  },
]

const CATEGORIES = [
  {
    slug: 'olive-oils',
    label: 'Oils & Condiments',
    pillColor: GREEN,
    desc: 'Extra virgin olive oils, cold-pressed single-origins, vinegars, and fermented condiments. Evaluated for traceability, harvest date, and production integrity.',
    status: '20 products evaluated',
    cta: 'View evaluations →',
    img: '/illustrations/GFA_illus_oils.png',
  },
  {
    slug: 'grains',
    label: 'Grains & Noodles',
    pillColor: YELLOW,
    pillTextColor: T,
    desc: 'Pasta, rice, soba, udon, couscous, millet, quinoa. Staple foods from every tradition, evaluated for origin, variety, and production method.',
    status: 'Products in the index',
    cta: 'View evaluations →',
    img: '/illustrations/GFA_illus_grains.png',
  },
  {
    slug: 'legumes',
    label: 'Legumes & Pulses',
    pillColor: CYAN,
    desc: 'Beans, lentils, chickpeas, and heritage varieties from smallholder farms worldwide. Among the most nutritious and resource-efficient foods on the planet.',
    status: 'Products in the index',
    cta: 'View evaluations →',
    img: '/illustrations/GFA_illus_legumes.png',
  },
  {
    slug: 'snacks',
    label: 'Snacks & Pantry',
    pillColor: GRAY,
    desc: 'Crackers, dried fruit, preserved foods, ferments, and small bites from every food culture. Evaluated for ingredient transparency, labelling accuracy, and production integrity.',
    status: 'Products in the index',
    cta: 'View evaluations →',
    img: '/illustrations/GFA_illus_snacks.png',
  },
  {
    slug: 'lna',
    label: 'Low & No Alcohol',
    pillColor: GREEN,
    desc: 'Kombucha, kefir, drinking vinegars, low-alcohol wine, botanical waters, and more. A fast-growing category where the Good Food Standard matters most.',
    status: 'Products in the index',
    cta: 'View evaluations →',
    img: '/illustrations/GFA_illus_lna.png',
  },
  {
    slug: 'seafood',
    label: 'Seafood',
    pillColor: CYAN,
    desc: 'Tuna, sardines, mackerel, anchovies — canned and fresh. Evaluated for sustainable catch methods, origin transparency, and honest labelling.',
    status: 'Products in the index',
    cta: 'View evaluations →',
    img: '/illustrations/GFA_illus_seafood.png',
  },
]

export default function HubPage() {
  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      {/* ── HERO ── */}
      <section
        className="gfa-hero"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          padding: '100px 60px 80px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Text column */}
        <div style={{ flex: '0 0 auto', maxWidth: 520 }}>
          <h1
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 300,
              fontSize: 56,
              lineHeight: 1.15,
              marginBottom: 32,
            }}
          >
            What you eat
            <br />
            <strong style={{ fontWeight: 600 }}>touches everything.</strong>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', marginBottom: 20 }}>
            The land it came from. The people who grew or made it. Your own health. And the things that are harder to
            measure — the meal that brought people together, the pleasure of eating food made with genuine care.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', marginBottom: 40 }}>
            Good Food Ambassador is a community of growers, makers, movers, and eaters who believe all of this matters
            — and act on it.
          </p>
          <div style={{ display: 'flex', gap: 14 }}>
            <Link
              href="/olive-oils"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: T,
                color: W,
                padding: '14px 28px',
                borderRadius: 2,
                textDecoration: 'none',
                border: `1.5px solid ${T}`,
              }}
            >
              Explore the Index
            </Link>
            <Link
              href="/standard"
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'none',
                color: T,
                padding: '14px 28px',
                borderRadius: 2,
                textDecoration: 'none',
                border: `1.5px solid ${T}`,
              }}
            >
              Read the Standard
            </Link>
          </div>
        </div>

        {/* Community illustration */}
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <Image
            src="/illustrations/GFA_illus_community.png"
            alt="A community of growers, makers, movers, and eaters"
            width={560}
            height={560}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
          />
        </div>
      </section>

      {/* ── PILLARS ── */}
      <div
        className="gfa-pillars"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${MID}`,
          borderBottom: `1px solid ${MID}`,
        }}
      >
        {PILLARS.map((p, i) => (
          <div
            key={p.label}
            style={{
              padding: '44px 36px',
              borderRight: i < 3 ? `1px solid ${MID}` : 'none',
            }}
          >
            <Pill bg={p.color}>{p.label}</Pill>
            <h3
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: 16,
                fontWeight: 600,
                lineHeight: 1.35,
                margin: '18px 0 12px',
              }}
            >
              {p.title}
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: '#888' }}>{p.text}</p>
          </div>
        ))}
      </div>

      {/* ── GOOD FOOD INDEX ── */}
      <section id="categories" className="gfa-index" style={{ padding: '80px 60px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 30,
              fontWeight: 300,
            }}
          >
            The <strong style={{ fontWeight: 600 }}>Good Food Index</strong>
          </h2>
        </div>

        <div className="gfa-index-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.slug}
              style={{
                background: LIGHT,
                padding: '36px 32px',
              }}
            >
              {cat.img && (
                <div style={{ marginBottom: 24 }}>
                  <Image src={cat.img} alt={cat.label} width={400} height={400} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              )}
              <Pill bg={cat.pillColor} color={cat.pillTextColor}>{cat.label}</Pill>
              <h3
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: 20,
                  fontWeight: 600,
                  margin: '20px 0 10px',
                }}
              >
                {cat.label}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#777', marginBottom: 16 }}>{cat.desc}</p>
              <div
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  color: '#aaa',
                  fontWeight: 500,
                  marginBottom: cat.cta ? 14 : 0,
                }}
              >
                {cat.status}
              </div>
              {cat.cta && (
                <Link
                  href={`/${cat.slug}`}
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
                  {cat.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${MID}`, padding: '28px 60px' }}>
        <p
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontSize: 12,
            color: '#999',
            letterSpacing: '0.03em',
            lineHeight: 1.7,
            marginBottom: 24,
            paddingBottom: 24,
            borderBottom: `1px solid ${MID}`,
          }}
        >
          Good Food Ambassador was started by food professionals who believe eaters deserve access to clear,
          independent information about the food they buy.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            © Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
          </p>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            No ads. No sponsored rankings. Independent by design. We may earn from qualifying purchases — never from
            ranking decisions.
          </p>
        </div>
      </footer>
    </div>
  )
}
