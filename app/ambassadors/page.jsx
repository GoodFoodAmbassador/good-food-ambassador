import Link from 'next/link'
import GFANav from '@/components/GFANav'
import { W, T, LIGHT, MID, GREEN } from '@/lib/tokens'

export const metadata = {
  title: 'Ambassadors',
  description:
    'Good Food Ambassadors are food lovers, producers, and professionals who evaluate food against the Good Food Standard.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/ambassadors' },
}

export default function AmbassadorsPage() {
  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>

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
          Ambassadors
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
          Good Food Ambassadors are food lovers, independent reviewers, producers, and professionals who evaluate food
          honestly against the Good Food Standard.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555', marginBottom: 48 }}>
          They are not paid to promote products. They are not sponsored by brands. They share findings, not endorsements.
        </p>

        <div
          style={{
            background: LIGHT,
            padding: '40px 44px',
            borderLeft: `3px solid ${GREEN}`,
            marginBottom: 60,
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
            Ambassador profiles coming soon.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666' }}>
            We&rsquo;re building out this section. In the meantime, if you&rsquo;d like to become a Good Food Ambassador
            or contribute an evaluation, reach out directly.
          </p>
          <a
            href="mailto:hello@goodfoodambassador.com"
            style={{
              display: 'inline-block',
              marginTop: 24,
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

        <div
          style={{
            borderTop: `1px solid ${MID}`,
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
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
      </div>
    </div>
  )
}
