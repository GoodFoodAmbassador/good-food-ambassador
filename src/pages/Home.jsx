import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { C, F, CATEGORY_COLOR, CATEGORY_TEXT_COLOR } from '../theme'
import Pill from '../components/Pill'

const CATEGORIES = [
  {
    id: 'oils-condiments',
    name: 'Oils & Condiments',
    desc: 'Extra virgin olive oils, cold-pressed single-origins, vinegars, and fermented condiments. Evaluated for traceability, harvest date, and production integrity.',
    status: '30 products evaluated',
    cta: 'View evaluations →',
    img: '/illustrations/GFA_illus_oils.png',
  },
  {
    id: 'grains-noodles',
    name: 'Grains & Noodles',
    desc: 'Pasta, rice, soba, udon, couscous, millet, quinoa. Staple foods from every tradition, evaluated for origin, variety, and production method.',
    status: '10 producers scouted',
    cta: 'Explore →',
    img: '/illustrations/GFA_illus_grains.png',
  },
  {
    id: 'legumes-pulses',
    name: 'Legumes & Pulses',
    desc: 'Beans, lentils, chickpeas, and heritage varieties from smallholder farms worldwide. Among the most nutritious and land-efficient foods on the planet.',
    status: 'Coming soon',
    img: '/illustrations/GFA_illus_legumes.png',
  },
  {
    id: 'snacks-pantry',
    name: 'Snacks & Pantry',
    desc: 'Crackers, dried fruit, preserved foods, ferments, and small bites from every food culture. The category with the widest gap between marketing and reality.',
    status: 'Coming soon',
    img: '/illustrations/GFA_illus_snacks.png',
  },
  {
    id: 'low-no-alcohol',
    name: 'Low & No Alcohol',
    desc: 'Kombucha, kefir, shrubs, de-alcoholised wine, botanical waters, and more. A fast-growing space where the Good Food Standard matters most.',
    status: '10 products scouted',
    cta: 'Explore →',
    img: '/illustrations/GFA_illus_lna.png',
  },
  {
    id: 'seafood',
    name: 'Seafood',
    desc: 'Tuna, sardines, mackerel, anchovies — canned and fresh. Evaluated for sustainable catch methods, origin transparency, and honest labelling.',
    status: 'Coming soon',
    img: '/illustrations/GFA_illus_seafood.png',
  },
]

const PILLARS = [
  { color: C.green,  label: 'Good',  title: 'Quality that nourishes',         text: 'Honest ingredients, consistent quality, and sensory truth. Not enhancement. Not imitation.' },
  { color: C.cyan,   label: 'Clean', title: 'Transparent field to table',      text: 'Origin traceable. Packaging honest. Nothing obscured between source and eater.' },
  { color: C.orange, label: 'Fair',  title: 'Dignity for everyone in the chain', text: 'Workers compensated lawfully. Land and water treated as assets, not things to deplete.' },
  { color: C.gray,   label: 'True',  title: 'Honest about where food comes from', text: 'Cultural roots honoured. Authentic when it matters. No label that misleads eaters.' },
]

export default function Home() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <div style={{ background: C.white, color: C.ink }}>

      {/* ── HERO ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        alignItems: 'center',
        minHeight: mobile ? 'auto' : 'calc(100vh - 64px)',
        padding: mobile ? '48px 20px 40px' : '80px 60px',
        gap: mobile ? 32 : 60,
      }}>
        <div>
          <h1 style={{
            fontFamily: F.heading, fontWeight: 300,
            fontSize: mobile ? 36 : 52, lineHeight: 1.18, marginBottom: 28,
          }}>
            What you eat<br />
            <strong style={{ fontWeight: 600 }}>touches everything.</strong>
          </h1>
          <p style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.75, color: '#666', marginBottom: 24, maxWidth: 460 }}>
            The land it came from. The hands that made it. Your own health. And something harder to measure — the meal that brought people closer, the taste that called back a memory, the joy of eating something made with genuine care.
          </p>
          <p style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.75, color: '#666', marginBottom: 40, maxWidth: 460 }}>
            Good Food Ambassador is a community of growers, makers, movers, and eaters who believe all of that matters — and act on it.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/index" style={{
              fontFamily: F.heading, fontSize: 12, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
              background: C.ink, color: C.white,
              padding: '14px 28px', border: `1.5px solid ${C.ink}`, borderRadius: 2,
              textDecoration: 'none', display: 'inline-block',
            }}>
              Explore the Index
            </Link>
            <Link to="/standard" style={{
              fontFamily: F.heading, fontSize: 12, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
              background: 'none', color: C.ink,
              padding: '14px 28px', border: `1.5px solid ${C.ink}`, borderRadius: 2,
              textDecoration: 'none', display: 'inline-block',
            }}>
              Read the Standard
            </Link>
          </div>
        </div>
        {!mobile && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img loading="lazy" src="/illustrations/GFA_illus_community.png" alt="" style={{ width: '100%', maxWidth: 540 }} />
          </div>
        )}
      </section>

      {/* ── PILLARS ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        borderTop: `1px solid ${C.mid}`, borderBottom: `1px solid ${C.mid}`,
      }}>
        {PILLARS.map((p, i) => (
          <div key={i} style={{
            padding: mobile ? '28px 20px' : '44px 36px',
            borderRight: mobile
              ? (i % 2 === 0 ? `1px solid ${C.mid}` : 'none')
              : (i < 3 ? `1px solid ${C.mid}` : 'none'),
            borderBottom: mobile && i < 2 ? `1px solid ${C.mid}` : 'none',
          }}>
            <Pill bg={p.color} color={p.label === 'True' ? C.white : undefined}>{p.label}</Pill>
            <h3 style={{
              fontFamily: F.heading, fontSize: mobile ? 14 : 16, fontWeight: 600,
              lineHeight: 1.35, margin: '18px 0 12px',
            }}>
              {p.title}
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: '#888' }}>{p.text}</p>
          </div>
        ))}
      </div>

      {/* ── GOOD FOOD INDEX PREVIEW ── */}
      <section style={{ padding: mobile ? '40px 20px' : '80px 60px' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 48, flexWrap: 'wrap', gap: 12,
        }}>
          <h2 style={{ fontFamily: F.heading, fontSize: mobile ? 24 : 30, fontWeight: 300 }}>
            The <strong style={{ fontWeight: 600 }}>Good Food Index</strong>
          </h2>
          <Link to="/index" style={{
            fontFamily: F.heading, fontSize: 12, fontWeight: 600,
            letterSpacing: '0.06em', color: C.ink, textDecoration: 'none',
            borderBottom: `1.5px solid ${C.ink}`, paddingBottom: 2,
          }}>
            View all categories →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 2 }}>
          {CATEGORIES.map((cat) => {
            const color = CATEGORY_COLOR[cat.id]
            const textColor = CATEGORY_TEXT_COLOR[cat.id]
            const isLive = cat.cta
            return (
              <div key={cat.id} style={{
                background: C.light, padding: mobile ? '28px 20px' : '36px 28px',
                minHeight: 240, display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Pill bg={color} color={textColor}>{cat.name}</Pill>
                  <h3 style={{
                    fontFamily: F.heading, fontSize: mobile ? 18 : 22, fontWeight: 600,
                    margin: '22px 0 12px',
                  }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#777', marginBottom: 12 }}>
                    {cat.desc}
                  </p>
                  <div style={{
                    fontFamily: F.heading, fontSize: 11, letterSpacing: '0.06em',
                    color: '#aaa', fontWeight: 500, marginBottom: isLive ? 12 : 0,
                  }}>
                    {cat.status}
                  </div>
                  {isLive && (
                    <Link to={`/index/${cat.id}`} style={{
                      fontFamily: F.heading, fontSize: 12, fontWeight: 600,
                      letterSpacing: '0.06em', color: C.ink, textDecoration: 'none',
                      borderBottom: `1.5px solid ${C.ink}`, paddingBottom: 2,
                    }}>
                      {cat.cta}
                    </Link>
                  )}
                </div>
                {!mobile && (
                  <img loading="lazy" src={cat.img} alt="" style={{
                    width: 130, height: 130, objectFit: 'contain',
                    opacity: 0.75, flexShrink: 0, pointerEvents: 'none',
                  }} />
                )}
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
