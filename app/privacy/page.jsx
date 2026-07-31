import Link from 'next/link'
import GFANav from '@/components/GFANav'
import { W, T, LIGHT, MID } from '@/lib/tokens'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Good Food Ambassador collects, uses, and protects information from visitors and contributors.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/privacy' },
}

const SECTIONS = [
  {
    h: 'What this policy covers',
    body: [
      'This policy explains what information Good Food Ambassador collects when you visit the site, submit a product suggestion, or write to us — and what we do with it. It applies to www.goodfoodambassador.com and has no bearing on any other site you may reach by following a link from here.',
    ],
  },
  {
    h: 'What we collect',
    body: [
      'We collect only what you choose to give us. If you use the Suggest or Join forms, that may include your name, email address, and whatever product or contact details you enter. If you email us directly, we receive whatever is in that email.',
      'We do not require an account to use this site, and we do not collect passwords, payment details, or government ID of any kind — the site has no checkout or login.',
      'Our hosting provider (Vercel) automatically logs basic technical data for every website it serves — things like IP address, browser type, and page requested — for security and performance purposes. This is standard practice for any hosted website and is not something Good Food Ambassador configures or accesses individually. We do not currently run any third-party analytics or advertising trackers on this site.',
    ],
  },
  {
    h: 'How we use it',
    body: [
      'Contact details are used only to respond to your submission, follow up on a product suggestion, or correspond with you about becoming an Ambassador. We do not sell, rent, or trade personal information to anyone, for any reason.',
      'If a product suggestion is approved and published in the Directory, we publish the product information you submitted — name, origin, description — but not your personal contact details, unless you have asked to be credited by name.',
    ],
  },
  {
    h: 'How long we keep it',
    body: [
      'We keep submission and correspondence records for as long as reasonably useful for evaluating and following up on a suggestion, and delete or anonymise them when they are no longer needed.',
    ],
  },
  {
    h: 'Your rights',
    body: [
      'You can ask us at any time what information we hold about you, ask us to correct it, or ask us to delete it. Write to hello@goodfoodambassador.com and we will act on it promptly.',
      'If you are in the European Economic Area, UK, or California, you have specific rights under GDPR or CCPA to access, correct, delete, or restrict the use of your personal data — the process is the same: email us.',
    ],
  },
  {
    h: 'Children',
    body: [
      'This site is not directed at children, and we do not knowingly collect information from anyone under 16.',
    ],
  },
  {
    h: 'Changes to this policy',
    body: [
      'If this policy changes in a meaningful way, we will update the date below. Continued use of the site after a change means you accept the updated policy.',
    ],
  },
  {
    h: 'Contact',
    body: [
      'Questions about this policy or your data: hello@goodfoodambassador.com.',
    ],
  },
]

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: 15, color: '#888', marginBottom: 60 }}>
          Last updated: July 31, 2026
        </p>

        <div style={{ background: LIGHT, padding: '28px 32px', marginBottom: 56, borderLeft: `3px solid ${T}` }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            The short version: we collect only what you give us, we use it only to do what you asked, and we never sell it.
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
            Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
            {' · '}
            <Link href="/terms" style={{ color: '#bbb', textDecoration: 'none' }}>Terms</Link>
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
