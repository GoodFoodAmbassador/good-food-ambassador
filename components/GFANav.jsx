'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { T, W, MID } from '@/lib/tokens'

const NAV_LINKS = [
  { label: 'The Standard', href: '/standard' },
  { label: 'Good Food Index', href: '/' },
  { label: 'Ambassadors', href: '/ambassadors' },
]

export default function GFANav() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: W,
        borderBottom: `1px solid ${MID}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 60px',
        height: 64,
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: T,
          textDecoration: 'none',
        }}
      >
        Good Food Ambassador
      </Link>

      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: T,
              textDecoration: 'none',
              opacity: pathname === href ? 1 : 0.7,
              borderBottom: pathname === href ? `1.5px solid ${T}` : 'none',
              paddingBottom: pathname === href ? 2 : 0,
            }}
          >
            {label}
          </Link>
        ))}
        <a
          href="mailto:hello@goodfoodambassador.com"
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: T,
            textDecoration: 'none',
            border: `1.5px solid ${T}`,
            padding: '8px 18px',
            borderRadius: 2,
          }}
        >
          hello@
        </a>
      </div>
    </nav>
  )
}
