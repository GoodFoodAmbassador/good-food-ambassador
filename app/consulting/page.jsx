import Link from 'next/link'
import GFASeedMark from '@/components/GFASeedMark'
import GFANav from '@/components/GFANav'
import { W, T, MID } from '@/lib/tokens'

export const metadata = {
  title: 'Consulting',
  description: 'Ask Good Food Ambassador to match you with an independent food consultant from our network.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/consulting' },
}

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
          From the Group
        </p>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 40, lineHeight: 1.2, marginBottom: 12 }}>
          A hand, if you need one
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#555', marginBottom: 20 }}>
          Some of the people who read us are building a food business and could use an experienced second opinion. If that is you, tell us a little about what you are working on. If we know someone in our network who has done it before, we will introduce you.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 20 }}>
          There is no fee to you. The consultant is independent, and what you agree with them is between the two of you.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 56 }}>
          <a href="mailto:hello@goodfoodambassador.com?subject=An%20introduction" style={{ color: T, borderBottom: `1px solid ${T}`, textDecoration: 'none' }}>hello@goodfoodambassador.com</a>
        </p>

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
