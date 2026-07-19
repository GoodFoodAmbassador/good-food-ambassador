import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { C, F, CATEGORY_COLOR, CATEGORY_TEXT_COLOR } from '../theme'
import Pill from '../components/Pill'

const CATEGORIES = [
  { id: 'oils-condiments', name: 'Oils & Condiments',  status: '30 products evaluated', img: '/illustrations/GFA_illus_oils.png',    desc: 'Extra virgin olive oils, cold-pressed single-origins, vinegars, and fermented condiments.' },
  { id: 'grains-noodles',  name: 'Grains & Noodles',   status: '10 producers scouted',  img: '/illustrations/GFA_illus_grains.png',  desc: 'Pasta, rice, soba, udon, couscous, millet, quinoa. Staple foods from every tradition.' },
  { id: 'legumes-pulses',  name: 'Legumes & Pulses',   status: 'Coming soon',            img: '/illustrations/GFA_illus_legumes.png', desc: 'Beans, lentils, chickpeas, and heritage varieties from smallholder farms worldwide.' },
  { id: 'snacks-pantry',   name: 'Snacks & Pantry',    status: 'Coming soon',            img: '/illustrations/GFA_illus_snacks.png',  desc: 'Crackers, dried fruit, preserved foods, ferments, and small bites from every food culture.' },
  { id: 'low-no-alcohol',  name: 'Low & No Alcohol',   status: '10 products scouted',   img: '/illustrations/GFA_illus_lna.png',     desc: 'Kombucha, kefir, shrubs, de-alcoholised wine, botanical waters, and more.' },
  { id: 'seafood',         name: 'Seafood',             status: 'Coming soon',            img: '/illustrations/GFA_illus_seafood.png', desc: 'Tuna, sardines, mackerel, anchovies — canned and fresh.' },
]

export default function IndexPage() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <div style={{ background: C.white, color: C.ink, minHeight: 'calc(100vh - 64px)' }}>
      <section style={{ padding: mobile ? '40px 20px 60px' : '80px 60px' }}>
        <h1 style={{
          fontFamily: F.heading, fontWeight: 300,
          fontSize: mobile ? 28 : 38, marginBottom: 12,
        }}>
          The <strong style={{ fontWeight: 600 }}>Good Food Index</strong>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#666', maxWidth: 540, marginBottom: 48 }}>
          Every product in the Index has been evaluated against the Good Food Standard — across all seven criteria. No ads, no sponsored rankings.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: 2 }}>
          {CATEGORIES.map((cat) => {
            const color = CATEGORY_COLOR[cat.id]
            const textColor = CATEGORY_TEXT_COLOR[cat.id]
            const isLive = cat.status !== 'Coming soon'
            const Wrapper = isLive ? Link : 'div'
            const wrapperProps = isLive ? { to: `/index/${cat.id}`, style: { textDecoration: 'none', color: 'inherit', display: 'block' } } : {}

            return (
              <Wrapper key={cat.id} {...wrapperProps}>
                <div style={{
                  background: C.light, padding: mobile ? '28px 20px' : '36px 28px',
                  minHeight: 240, display: 'flex', alignItems: 'center', gap: 16,
                  opacity: isLive ? 1 : 0.6,
                  cursor: isLive ? 'pointer' : 'default',
                  transition: 'background 0.15s',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Pill bg={color} color={textColor}>{cat.name}</Pill>
                    <h2 style={{
                      fontFamily: F.heading, fontSize: mobile ? 18 : 22, fontWeight: 600,
                      margin: '22px 0 12px',
                    }}>
                      {cat.name}
                    </h2>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: '#777', marginBottom: 12 }}>
                      {cat.desc}
                    </p>
                    <div style={{
                      fontFamily: F.heading, fontSize: 11, letterSpacing: '0.06em',
                      color: isLive ? C.ink : '#aaa', fontWeight: 500,
                    }}>
                      {cat.status} {isLive && '→'}
                    </div>
                  </div>
                  {!mobile && (
                    <img loading="lazy" src={cat.img} alt="" style={{
                      width: 130, height: 130, objectFit: 'contain',
                      opacity: 0.75, flexShrink: 0, pointerEvents: 'none',
                    }} />
                  )}
                </div>
              </Wrapper>
            )
          })}
        </div>
      </section>
    </div>
  )
}
