import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import GFAScorecard from '@/components/GFAScorecard'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'

export const metadata = {
  title: 'The Good Food Standard',
  description:
    'A framework for evaluating food with honesty, curiosity, and respect for everyone in the chain. Four pillars, seven criteria.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/standard' },
}

const PILLARS = [
  { color: GREEN,  label: 'GOOD',  desc: 'Quality that nourishes' },
  { color: CYAN,   label: 'CLEAN', desc: 'Transparent from source to table' },
  { color: ORANGE, label: 'FAIR',  desc: 'Dignity for everyone in the chain' },
  { color: GRAY,   label: 'TRUE',  desc: 'Honest about where food comes from' },
]

const CRITERIA = [
  {
    pillar: 'GOOD', color: GREEN,
    label: 'Ingredient and nutritional honesty',
    text: [
      'Everything in the product is declared clearly. The ingredient list reflects what is actually in the food — no hidden additives, no misleading simplifications. Nutritional claims are accurate and complete, not selected to flatter the label.',
      'GFA reports the full nutritional profile — including micronutrients where relevant — as part of every evaluation. We present it as data. Eaters decide what it means for them.',
    ],
  },
  {
    pillar: 'GOOD', color: GREEN,
    label: 'Quality and food safety',
    text: [
      'The product meets applicable food safety standards in the country where it is produced and sold. Quality is consistent and verifiable. Sensory properties — flavour, aroma, texture — are genuine expressions of the ingredients, not reconstructed or enhanced to simulate freshness or character the product does not naturally have.',
    ],
  },
  {
    pillar: 'CLEAN', color: CYAN,
    label: 'Traceable from origin',
    text: [
      "The product's origin — country, region, producer where possible — is stated on the label or verifiable by the eater on request. The supply chain is not obscured. A product that cannot say where it comes from cannot ask for trust.",
    ],
  },
  {
    pillar: 'CLEAN', color: CYAN,
    label: 'Packaging that tells the truth',
    text: [
      'Packaging communicates honestly: materials are disclosed, environmental claims are not exaggerated. Packaging choices reflect an awareness of the full lifecycle — from production to disposal. GFA reports packaging materials and their known trade-offs as part of every evaluation.',
    ],
  },
  {
    pillar: 'FAIR', color: ORANGE,
    label: 'Workers treated with dignity throughout the chain',
    text: [
      'Everyone who touches this product — growers, processors, packers, transporters — is treated with basic dignity and compensated lawfully. The producer operates in compliance with applicable labour law throughout the supply chain, not only in the facility of origin.',
    ],
  },
  {
    pillar: 'FAIR', color: ORANGE,
    label: 'Land and resources used responsibly',
    text: [
      'The land, water, and energy used to make this product are treated as assets to steward, not deplete. Applicable environmental law is respected. GFA reports on land use, water intensity, and energy sources where evidence is available.',
    ],
  },
  {
    pillar: 'TRUE', color: GRAY,
    label: 'Cultural roots honoured, evolution welcomed',
    text: [
      'Food carries history. We recognise the value of foods that travel, adapt, and find new expression in new contexts — that is how food culture has always worked.',
      'What GFA asks is that the original be respected: authentic ingredients where authenticity matters, honest labelling of inspired-by versus the real thing, no imitation that misleads eaters about what they are eating or where it comes from.',
    ],
  },
]

export default function StandardPage() {
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
            marginBottom: 12,
          }}
        >
          The Good Food Standard
        </h1>
        <p style={{ fontSize: 16, color: '#888', fontStyle: 'italic', marginBottom: 48, lineHeight: 1.6 }}>
          A framework for evaluating food with honesty, curiosity, and respect for everyone in the chain.
        </p>

        {/* How we evaluate */}
        <div
          style={{
            background: LIGHT,
            padding: '32px 36px',
            marginBottom: 60,
            borderLeft: `3px solid ${T}`,
          }}
        >
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
            The Good Food Standard is a framework for judgment, not a certification checklist.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
            A small producer who cannot afford third-party audits, organic certification, or compliance infrastructure
            may fully meet this Standard. A large producer with every certification may not.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
            <strong>
              Certifications are useful evidence — we consider them. They are not proof, and their absence is not
              disqualification.
            </strong>
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            We evaluate practice, transparency, and intent. Evidence can come from producer documentation, independent
            testing, community reputation, field visits, or public records. We report what we find and how we found it.
            Eaters decide what it means for them.
          </p>
        </div>

        {/* Four pillars */}
        <h2
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: '0.04em',
            marginBottom: 32,
          }}
        >
          The four pillars
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 60 }}>
          {PILLARS.map((p) => (
            <div key={p.label} style={{ background: LIGHT, padding: '24px 28px' }}>
              <Pill bg={p.color}>{p.label}</Pill>
              <p
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: 15,
                  fontWeight: 500,
                  marginTop: 12,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Seven criteria */}
        <h2
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: '0.04em',
            marginBottom: 8,
          }}
        >
          The seven criteria
        </h2>
        {CRITERIA.map((c, i) => (
          <div key={i} style={{ borderTop: `1px solid ${MID}`, padding: '32px 0' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap' }}>
              <Pill bg={c.color}>{c.pillar}</Pill>
              <h3
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: 18,
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {c.label}
              </h3>
            </div>
            {c.text.map((para, j) => (
              <p key={j} style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 12 }}>
                {para}
              </p>
            ))}
          </div>
        ))}

        {/* What this is not */}
        <div style={{ borderTop: `1px solid ${MID}`, paddingTop: 32 }}>
          <h2
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontWeight: 600,
              fontSize: 18,
              marginBottom: 16,
            }}
          >
            What this Standard is not
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 12 }}>
            It is not a pass/fail certification. It is not a list of brands to avoid. It is not a political position on
            farming, diet, or lifestyle.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            It is a shared set of beliefs about what food should be — and a commitment to evaluating food honestly
            against those beliefs, with data, transparency, and respect for eaters.
          </p>
        </div>

        {/* Scorecard — client component */}
        <GFAScorecard />

        {/* Footer */}
        <div
          style={{
            borderTop: `1px solid ${MID}`,
            marginTop: 48,
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
