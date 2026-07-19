import { C, F } from '../theme'

export default function AmbassadorsPage() {
  return (
    <div style={{ background: C.white, color: C.ink, minHeight: 'calc(100vh - 64px)', padding: '80px 60px' }}>
      <h1 style={{ fontFamily: F.heading, fontWeight: 300, fontSize: 38, marginBottom: 16 }}>
        <strong style={{ fontWeight: 600 }}>Ambassadors</strong>
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666', maxWidth: 480 }}>
        The Ambassador programme is in development. If you're a grower, maker, mover, or eater who wants to contribute evaluations to the Good Food Index, get in touch.
      </p>
      <a href="mailto:hello@goodfoodambassador.com" style={{
        display: 'inline-block', marginTop: 32,
        fontFamily: F.heading, fontSize: 12, fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: C.white, background: C.ink,
        padding: '14px 28px', borderRadius: 2, textDecoration: 'none',
      }}>
        hello@goodfoodambassador.com
      </a>
    </div>
  )
}
