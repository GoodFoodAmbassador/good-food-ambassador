'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { T, W, MID } from '@/lib/tokens'

const NAV_LINKS = [
  { label: 'The Standard', href: '/standard' },
  { label: 'Good Food Index', href: '/#categories' },
  { label: 'Ambassadors', href: '/ambassadors' },
]

const linkStyle = (active) => ({
  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: '0.06em',
  color: T,
  textDecoration: 'none',
  opacity: active ? 1 : 0.7,
  borderBottom: active ? `1.5px solid ${T}` : 'none',
  paddingBottom: active ? 2 : 0,
})

export default function GFANav() {
  const pathname = usePathname()
  const [mobile, setMobile] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
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
          padding: mobile ? '0 20px' : '0 60px',
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

        {mobile ? (
          /* Hamburger button */
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <span style={{ display: 'block', width: 22, height: 1.5, background: T, transition: 'transform 0.2s', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: T, opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: T, transition: 'transform 0.2s', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        ) : (
          /* Desktop links */
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} style={linkStyle(pathname === href)}>
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
        )}
      </nav>

      {/* Mobile drawer */}
      {mobile && open && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: W,
            zIndex: 199,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 32px',
            gap: 32,
            borderTop: `1px solid ${MID}`,
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: T,
                textDecoration: 'none',
                opacity: pathname === href ? 1 : 0.7,
              }}
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:hello@goodfoodambassador.com"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: T,
              textDecoration: 'none',
              opacity: 0.7,
            }}
          >
            hello@goodfoodambassador.com
          </a>
        </div>
      )}
    </>
  )
}
