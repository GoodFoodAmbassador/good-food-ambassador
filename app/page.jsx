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
    title: 'Food that does what food is supposed to do',
    text: 'Food that nourishes your body, connects you to other people, and is easy to understand, prepare, and enjoy. Ingredients you recognise. Flavour that comes from the food itself. Food that does what food is supposed to do.',
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Clean food makes you curious in the best way',
    text: 'Clean food makes you curious in the best way. It gives you something to follow — a farm, a region, a method, a person. The packaging invites questions. The answers are findable. The journey from source to table is one you can actually trace.',
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'The communities that feed us deserve to thrive from it',
    text: 'Behind every product is a place and the people who work it. Fair means the land stays clean, the water stays drinkable, the work is chosen freely, and the wages are enough to live well — including eating well. The communities that feed us deserve to thrive from it.',
  },
  {
    color: GRAY,
    label: 'True',
    title: 'A conscience made visible',
    text: 'Behind every good product is someone who cared — about the soil, about the worker, about the person who would eventually eat it, even knowing they would never meet. True food carries that intention all the way to the table. It is the most honest thing a person can make.',
  },
]

const CATEGORIES = [
  {
    slug: 'olive-oils',
    label: 'Oils & Condiments',
    pillColor: GREEN,
    desc: 'Every civilisation found its fat — the oil, the vinegar, the condiment that carried flavour and defined a cuisine. Oils are also among the most health-consequential foods we eat, with real differences in how they are grown, pressed, and priced. The cost of a bottle always tells part of the story. This is where we look for the rest of it.',
    status: '20 products evaluated',
    cta: 'Dive in →',
    img: '/illustrations/GFA_illus_oils.png',
  },
  {
    slug: 'grains',
    label: 'Grains & Noodles',
    pillColor: YELLOW,
    pillTextColor: T,
    desc: 'No ingredient has done more to define who we are. The grain a culture chose, the shape it gave its pasta, the way it prepared its rice — these are acts of identity as much as nutrition. Global trade changed the scale. The story behind each grain is still worth knowing.',
    status: 'Products in the directory',
    cta: 'Dive in →',
    img: '/illustrations/GFA_illus_grains.png',
  },
  {
    slug: 'legumes',
    label: 'Legumes & Pulses',
    pillColor: CYAN,
    desc: 'Legumes might be the most quietly remarkable food on earth. They need almost nothing to keep, almost nothing to transport, and give back almost everything in return — protein, fibre, nitrogen back into the soil. Every culture found them and made them entirely their own: stewed, ground, fermented, sprouted, shaped into a hundred different forms across a thousand different traditions. Small, colourful, and endlessly generous — one of nature\'s most complete gifts.',
    status: 'Products in the directory',
    cta: 'Dive in →',
    img: '/illustrations/GFA_illus_legumes.png',
  },
  {
    slug: 'snacks',
    label: 'Snacks & Pantry',
    pillColor: GRAY,
    desc: 'The pantry exists because seasons do. Preserved, pickled, fermented, dried — these are the ways every food culture found to hold onto flavour when the fresh harvest was over. A jar of tomatoes in January, kimchi through a cold winter, dried figs from a summer orchard. Some of the most interesting food in the world lives in jars, tins, and packets — ferments that took months to develop, fruits concentrated by sun and time, grains pressed into something crisp and shareable. The pantry is where seasons get extended, ingredients get transformed, and new flavours find their way into your kitchen.',
    status: 'Products in the directory',
    cta: 'Dive in →',
    img: '/illustrations/GFA_illus_snacks.png',
  },
  {
    slug: 'lna',
    label: 'Low & No Alcohol',
    pillColor: GREEN,
    desc: 'Long before cocktails there were potions. Herbalists and foragers who turned bark, seed, grass, and water into something that tasted extraordinary and did something good for the body. That spirit — curious, experimental, generous — is alive in the best kombucha, the best botanical water, the best low-alcohol wine made today. Drinking together is one of the oldest human rituals. Low and no alcohol opens that ritual to everyone — with all the craft, the wonder, and the shared pleasure. Drinks designed to spark conversation, invite curiosity, and leave everyone feeling good.',
    status: 'Products in the directory',
    cta: 'Dive in →',
    img: '/illustrations/GFA_illus_lna.png',
  },
  {
    slug: 'seafood',
    label: 'Seafood',
    pillColor: CYAN,
    desc: 'The planet is mostly ocean. Its rivers feed our valleys, its lakes sustain our cities, its seas have fed humanity since before history began. We live on land and sometimes forget what that water holds — not just the fish we eat, but the entire living world beneath the surface that keeps the ocean healthy, balanced, and generous. Every creature in that world deserves to be there. The ones that feed us and the ones that make it possible for the others to exist. This category celebrates that world, traces where the seafood we eat comes from, and looks for the people who fish, farm, and process with genuine respect for the water and everything it sustains.',
    status: 'Products in the directory',
    cta: 'Dive in →',
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
            There's a lot more to know about what's on your plate than most labels admit. Good Food Ambassador doesn't
            judge what you buy — it just makes it easier to ask better questions about it.
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
              Explore the Directory
            </Link>
            <Link
              href="/pillars"
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
              The Four Pillars
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
            The <strong style={{ fontWeight: 600 }}>Good Food Directory</strong>
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
