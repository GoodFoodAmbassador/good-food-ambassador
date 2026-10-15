import Link from 'next/link'
import GFASeedMark from '@/components/GFASeedMark'
import GFANav from '@/components/GFANav'
import { W, T, LIGHT, MID } from '@/lib/tokens'

export const metadata = {
  title: 'Affiliate Disclosure',
  description: 'How Good Food Ambassador earns money from buy links, and what that does and does not change.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/affiliate-disclosure' },
}

const SECTIONS = [
  {
    h: "Affiliate links",
    body: [
      "Some buy links on this site are affiliate links. If you buy through one, the retailer may pay us a commission. You pay the same price."
    ],
  },
  {
    h: "What it does not change",
    body: [
      "What we list or how we evaluate it. Products are listed alphabetically, not ranked by commission. Nobody can pay to be listed or to change an evaluation."
    ],
  },
  {
    h: "Other sites",
    body: [
      "Retailers and affiliate networks may use cookies once you click through. See their privacy policies. Questions: hello@goodfoodambassador.com."
    ],
  },
]

export default function AffiliateDisclosurePage() {
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
          Legal
        </p>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 40, lineHeight: 1.2, marginBottom: 12 }}>
          Affiliate Disclosure
        </h1>
        <p style={{ fontSize: 15, color: '#888', marginBottom: 60 }}>
          Last updated: October 15, 2026
        </p>

        <div style={{ background: LIGHT, padding: '28px 32px', marginBottom: 56, borderLeft: `3px solid ${T}` }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            The short version: some buy links may pay us a commission. It costs you nothing and changes nothing about our evaluations.
          </p>
        </div>

        {SECTIONS.map((s, i) => (
          <div key={i} style={{ borderTop: `1px solid ${MID}`, padding: '32px 0' }}>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
              {s.h}
            </h2>
            {s.body.map((p, j) => (
              <p key={j} style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 12 }}>
                {p}
              </p>
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
            <Link href="/privacy" style={{ color: '#bbb', textDecoration: 'none' }}>Privacy</Link>
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
