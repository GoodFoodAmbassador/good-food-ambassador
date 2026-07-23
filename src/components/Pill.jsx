import { C, F } from '../theme'

export default function Pill({ children, bg, color }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: F.heading,
      fontSize: 10, fontWeight: 700,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: color || C.white, background: bg,
      padding: '5px 11px', borderRadius: 2,
    }}>
      {children}
    </span>
  )
}
