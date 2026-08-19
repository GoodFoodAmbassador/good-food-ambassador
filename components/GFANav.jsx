'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { T, W, MID, GRAY } from '@/lib/tokens'

const NAV_LINKS = [
  { label: 'The Pillars', href: '/pillars' },
  { label: 'The Directory', href: '/#categories' },
  { label: 'Ambassadors', href: '/ambassadors' },
  { label: 'Join', href: '/join' },
]

function SearchForm({ compact = false, onSubmitted }) {
  const router = useRouter()
  const [q, setQ] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const query = q.trim()
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
    onSubmitted?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search products"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        border: `1.5px solid ${MID}`,
        borderRadius: 20,
        padding: compact ? '10px 14px' : '5px 6px 5px 14px',
        background: W,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: compact ? 15 : 13, color: GRAY }}>⌕</span>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products…"
        aria-label="Search products"
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontSize: compact ? 15 : 12,
          fontWeight: 500,
          color: T,
          width: compact ? '100%' : 140,
        }}
      />
      <button
        type="submit"
        aria-label="Submit search"
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: T,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: compact ? '4px 6px' : '4px 10px',
          opacity: 0.7,
        }}
      >
        Go
      </button>
    </form>
  )
}

function SeedIcon({ size = 26 }) {
  return (
    <svg width={size} height={size * 1.02} viewBox="130 90 130 225" aria-hidden="true">
      <path d="M200,95 C225,100 248,120 253,150 C258,185 250,225 234,258 C222,282 210,298 200,310 C190,298 178,282 166,258 C150,225 142,185 147,150 C152,120 175,100 200,95 Z" fill="#3e3e3f"/>
      <path d="M200,120 L214,139 L200,158 L186,139 Z" fill="#77d46c"/>
      <path d="M200,160 L214,179 L200,198 L186,179 Z" fill="#01b3ff"/>
      <path d="M200,200 L214,219 L200,238 L186,219 Z" fill="#ed5a29"/>
      <path d="M200,240 L214,259 L200,278 L186,259 Z" fill="#75756d"/>
      <line x1="200" y1="105" x2="200" y2="122" stroke="#ffffff" strokeWidth="4"/>
      <line x1="200" y1="276" x2="200" y2="300" stroke="#ffffff" strokeWidth="4"/>
    </svg>
  )
}

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
  const [open, setOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      {/*
        Desktop links and the mobile hamburger button are BOTH always rendered.
        Which one is visible is decided purely by CSS media query (.gfa-nav-desktop /
        .gfa-nav-toggle in globals.css) so the correct nav appears on first paint —
        no JS-computed layout, no flash of the wrong nav while React hydrates.
      */}
      <nav
        className="gfa-nav"
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
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: T,
            textDecoration: 'none',
          }}
        >
          <SeedIcon size={24} />
          Good Food Ambassador
        </Link>

        {/* Desktop links — hidden on mobile via CSS */}
        <div className="gfa-nav-desktop" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={linkStyle(pathname === href)}>
              {label}
            </Link>
          ))}
          <SearchForm />
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

        {/* Hamburger button — hidden on desktop via CSS */}
        <button
          className="gfa-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <span style={{ display: 'block', width: 22, height: 1.5, background: T, transition: 'transform 0.2s', transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: T, opacity: open ? 0 : 1, transition: 'opacity 0.2s' }} />
          <span style={{ display: 'block', width: 22, height: 1.5, background: T, transition: 'transform 0.2s', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile drawer — only ever meaningful on mobile widths, since the
          toggle button that opens it is CSS-hidden above 639px */}
      {open && (
        <div
          className="gfa-nav-drawer"
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
          <SearchForm compact onSubmitted={() => setOpen(false)} />
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
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
