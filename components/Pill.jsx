import { W } from '@/lib/tokens'

export default function Pill({ children, bg, color }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: color || W,
        background: bg,
        padding: '5px 11px',
        borderRadius: 2,
      }}
    >
      {children}
    </span>
  )
}
