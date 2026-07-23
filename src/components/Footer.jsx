import { C, F } from '../theme'

export default function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.mid}`,
      padding: '28px 60px',
    }}>
      <p style={{
        fontFamily: F.heading, fontSize: 12, color: '#999',
        letterSpacing: '0.03em', lineHeight: 1.7,
        marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${C.mid}`,
      }}>
        Good Food Ambassador was started by food professionals who believe the industry owes eaters better information.
      </p>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 8,
      }}>
        <p style={{ fontFamily: F.heading, fontSize: 12, color: '#bbb', letterSpacing: '0.03em' }}>
          © Good Food Ambassador ·{' '}
          <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
            hello@goodfoodambassador.com
          </a>
        </p>
        <p style={{ fontFamily: F.heading, fontSize: 12, color: '#bbb', letterSpacing: '0.03em' }}>
          No ads. No sponsored rankings. Independent by design. We may earn from qualifying purchases — never from ranking decisions.
        </p>
      </div>
    </footer>
  )
}
