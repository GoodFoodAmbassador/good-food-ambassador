import Link from 'next/link'
import Image from 'next/image'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'

export const metadata = {
  title: 'Ambassadors | Good Food Ambassador',
  description:
    'Good Food Ambassadors are growers, food supply chain professionals, food service workers, and eaters who believe what you eat touches everything — and act on it.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/ambassadors' },
}

const AMBASSADOR_TYPES = [
  {
    label: 'Growers',
    color: GREEN,
    img: '/illustrations/GFA_illus_growers.png',
    desc: 'Farmers, producers, and smallholders who grow food with intention. They know the land their food comes from because they tend it — and they evaluate other food by that same standard.',
  },
  {
    label: 'Supply Chain',
    color: CYAN,
    img: '/illustrations/GFA_illus_supplychain.png',
    desc: 'Distributors, logistics workers, buyers, and wholesalers who move food from source to shelf. They see the full chain — and know where transparency breaks down.',
  },
  {
    label: 'Food Service',
    color: ORANGE,
    img: '/illustrations/GFA_illus_foodservice.png',
    desc: 'Chefs, bakers, café owners, and hospitality professionals who work with ingredients every day. They evaluate food by how it performs — and what it tells them about how it was made.',
  },
  {
    label: 'Eaters',
    color: GRAY,
    img: '/illustrations/GFA_illus_eaters.png',
    desc: 'Home cooks, food lovers, and everyday buyers who want to eat well and understand what they are eating. The largest and most important part of the community.',
  },
]

export default function AmbassadorsPage() {
  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      {/* ── HERO ── */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px 60px' }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: T,
            textDecoration: 'none',
            borderBottom: `1.5px solid ${T}`,
            paddingBottom: 2,
            display: 'inline-block',
            marginBottom: 60,
          }}
        >
          ← Good Food Ambassador
        </Link>

        <h1
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 40,
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          Good Food Ambassadors
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
          A Good Food Ambassador is anyone who believes what you eat touches everything — and acts on it. They are not
          paid to promote products. They are not sponsored by brands. They share findings, not endorsements.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555' }}>
          The community spans everyone in the food chain: the people who grow it, move it, cook it, and eat it.
        </p>
      </div>

      {/* ── FOUR TYPES ── */}
      <section style={{ padding: '0 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          }}
        >
          {AMBASSADOR_TYPES.map((type) => (
            <div
              key={type.label}
              style={{
                background: LIGHT,
                padding: '40px 36px',
              }}
            >
              <Image
                src={type.img}
                alt={type.label}
                width={400}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block', marginBottom: 28 }}
              />
              <Pill bg={type.color}>{type.label}</Pill>
              <h2
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: 22,
                  fontWeight: 600,
                  margin: '16px 0 12px',
                }}
              >
                {type.label}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#666' }}>{type.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section style={{ padding: '0 40px 80px', maxWidth: 720, margin: '0 auto' }}>
        <div
          style={{
            background: LIGHT,
            padding: '40px 44px',
            borderLeft: `3px solid ${GREEN}`,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Want to contribute?
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666', marginBottom: 24 }}>
            If you work in food — growing, moving, cooking, or eating it — and you share this standard, get in touch.
            We&rsquo;re always looking for people who evaluate food honestly.
          </p>
          <a
            href="mailto:hello@goodfoodambassador.com"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: T,
              textDecoration: 'none',
              border: `1.5px solid ${T}`,
              padding: '12px 24px',
              borderRadius: 2,
            }}
          >
            Get in touch →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${MID}`, padding: '28px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
          </p>
          <Link
            href="/"
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
            ← Back to GFA
          </Link>
        </div>
      </footer>
    </div>
  )
}
