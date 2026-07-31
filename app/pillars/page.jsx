import Link from 'next/link'
import GFANav from '@/components/GFANav'
import Pill from '@/components/Pill'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'

export const metadata = {
  title: 'The Four Pillars — Good Food Ambassador',
  description:
    'Four questions GFA asks about every product: Good, Clean, Fair, True. Not a certification — a way of looking at food.',
  alternates: { canonical: 'https://www.goodfoodambassador.com/pillars' },
}

const PILLARS = [
  {
    color: GREEN,
    label: 'Good',
    title: 'Food that does what food is supposed to do',
    text: 'Food that nourishes your body, connects you to other people, and is easy to understand, prepare, and enjoy. Ingredients you recognise. Flavour that comes from the food itself. Food that does what food is supposed to do.',
    questions: [
      'Are the ingredients what they say they are?',
      'Does the flavour come from the food itself?',
      'Is the nutritional information honest and complete?',
      'Is this food easy to understand and prepare?',
    ],
  },
  {
    color: CYAN,
    label: 'Clean',
    title: 'Clean food makes you curious in the best way',
    text: 'Clean food makes you curious in the best way. It gives you something to follow — a farm, a region, a method, a person. The packaging invites questions. The answers are findable. The journey from source to table is one you can actually trace.',
    questions: [
      'Where exactly does this come from?',
      'Can you trace the journey from source to shelf?',
      'Does the packaging tell the truth about what is inside?',
      'Are the environmental claims verifiable?',
    ],
  },
  {
    color: ORANGE,
    label: 'Fair',
    title: 'The communities that feed us deserve to thrive from it',
    text: 'Behind every product is a place and the people who work it. Fair means the land stays clean, the water stays drinkable, the work is chosen freely, and the wages are enough to live well — including eating well. The communities that feed us deserve to thrive from it.',
    questions: [
      'Are the workers paid enough to live and eat well?',
      'Is the work voluntary and dignified?',
      'Is the land and water left in good condition?',
      'Do the communities behind this food benefit from it?',
    ],
  },
  {
    color: GRAY,
    label: 'True',
    title: 'A conscience made visible',
    text: 'Behind every good product is someone who cared — about the soil, about the worker, about the person who would eventually eat it, even knowing they would never meet. True food carries that intention all the way to the table. It is the most honest thing a person can make.',
    questions: [
      'Does the label reflect the cultural origin honestly?',
      'Is the story behind this product real and verifiable?',
      'Does the price reflect the true cost of making it?',
      'Can you sense the intention behind it?',
    ],
  },
]

export default function PillarsPage() {
  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <div className="gfa-narrow-page" style={{ maxWidth: 760, margin: '0 auto', padding: '80px 40px' }}>

        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: T,
            textDecoration: 'none',
            borderBottom: '1.5px solid ' + T,
            paddingBottom: 2,
            display: 'inline-block',
            marginBottom: 60,
          }}
        >
          ← Good Food Ambassador
        </Link>

        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
          How we look at food
        </p>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 48, lineHeight: 1.15, marginBottom: 24 }}>
          The Four<br />
          <strong style={{ fontWeight: 600 }}>Pillars</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560, marginBottom: 72 }}>
          GFA does not certify or score products. We go looking — for the information that already exists about the food we eat — and organise it around four questions. The same four questions, applied equally to every product in the directory.
        </p>

        {/* Four pillars */}
        {PILLARS.map((p, i) => (
          <div
            key={p.label}
            style={{
              borderTop: '1px solid ' + MID,
              paddingTop: 48,
              paddingBottom: 48,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <Pill bg={p.color}>{p.label}</Pill>
              <h2 style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: 20,
                fontWeight: 600,
                lineHeight: 1.3,
              }}>
                {p.title}
              </h2>
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 28, maxWidth: 640 }}>
              {p.text}
            </p>

            <div style={{ background: LIGHT, padding: '24px 28px' }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 16 }}>
                What we ask
              </p>
              {p.questions.map((q, j) => (
                <p key={j} style={{ fontSize: 14, lineHeight: 1.7, color: '#666', marginBottom: j < p.questions.length - 1 ? 8 : 0 }}>
                  — {q}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{ borderTop: '1px solid ' + MID, paddingTop: 60, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 22, fontWeight: 300, lineHeight: 1.4, marginBottom: 32 }}>
            Now it's your turn.
          </p>
          <Link
            href="/join"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: T,
              color: W,
              padding: '16px 40px',
              borderRadius: 2,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Start →
          </Link>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid ' + MID, marginTop: 60, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
            Good Food Ambassador ·{' '}
            <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
              hello@goodfoodambassador.com
            </a>
            {' · '}
            <Link href="/privacy" style={{ color: '#bbb', textDecoration: 'none' }}>Privacy</Link>
            {' · '}
            <Link href="/terms" style={{ color: '#bbb', textDecoration: 'none' }}>Terms</Link>
          </p>
          <Link href="/" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', color: T, textDecoration: 'none', borderBottom: '1.5px solid ' + T, paddingBottom: 2 }}>
            ← Back to GFA
          </Link>
        </div>

      </div>
    </div>
  )
}
