import Link from 'next/link'
import GFASeedMark from '@/components/GFASeedMark'
import GFANav from '@/components/GFANav'
import { W, T, LIGHT, MID } from '@/lib/tokens'

export const metadata = {
  title: 'Consulting',
  description: 'Ask Good Food Ambassador to match you with an independent food consultant from our network.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/consulting' },
}

const SECTIONS = [
  {
    h: "How it works",
    body: [
      "Email us what you need. If we know a good fit in our network, we introduce you. You then agree scope and price directly with the consultant."
    ],
  },
  {
    h: "What it costs",
    body: [
      "Nothing for you. We do not charge companies for introductions. We may later charge consultants to be in the network, and will say so here."
    ],
  },
  {
    h: "Good to know",
    body: [
      "Consultants are independent. We make the introduction only, and cannot guarantee a match or an outcome. If we have a personal or business interest in an introduction, we will tell you first."
    ],
  },
  {
    h: "Start here",
    body: [
      "__CTA__"
    ],
  },
]

export default function ConsultingPage() {
  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />
      <div className="gfa-narrow-page" style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>

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

        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
          Consulting
        </p>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 40, lineHeight: 1.2, marginBottom: 12 }}>
          Find a food consultant
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#555', marginBottom: 40 }}>
          Tell us what you need. We will match you with an independent food consultant from our network.
        </p>

        <div style={{ background: LIGHT, padding: '28px 32px', marginBottom: 56, borderLeft: `3px solid ${T}` }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            You write to us, we introduce you to the right person. No fee for you.
          </p>
        </div>

        {SECTIONS.map((s, i) => (
          <div key={i} style={{ borderTop: `1px solid ${MID}`, padding: '32px 0' }}>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
              {s.h}
            </h2>
            {s.body.map((p, j) => (
              p === '__CTA__' ? (
                <a key={j} href="mailto:hello@goodfoodambassador.com?subject=Consulting%20match%20request" style={{ display: 'inline-block', fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', color: T, textDecoration: 'none', border: `1.5px solid ${T}`, padding: '12px 24px', borderRadius: 2 }}>
                  Email hello@goodfoodambassador.com
                </a>
              ) : (
                <p key={j} style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 12 }}>
                  {p}
                </p>
              )
            ))}
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${MID}`, marginTop: 24, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            <GFASeedMark />Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
            {' · '}
            <Link href="/terms" style={{ color: '#bbb', textDecoration: 'none' }}>Terms</Link>
            {' · '}
            <Link href="/affiliate-disclosure" style={{ color: '#bbb', textDecoration: 'none' }}>Affiliate Disclosure</Link>
          </p>
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: T, textDecoration: 'none', borderBottom: `1.5px solid ${T}`, paddingBottom: 2 }}
          >
            ← Back to GFA
          </Link>
        </div>

      </div>
    </div>
  )
}
