import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { C, F } from '../theme'

export default function Nav() {
  const { pathname } = useLocation()
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  // Close menu on navigation
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const linkStyle = (active) => ({
    fontFamily: F.heading,
    fontSize: 12,
    fontWeight: active ? 600 : 500,
    letterSpacing: '0.06em',
    color: active ? C.ink : C.gray,
    textDecoration: 'none',
    padding: 0,
    borderBottom: active ? `1.5px solid ${C.ink}` : '1.5px solid transparent',
    paddingBottom: 2,
    transition: 'color 0.15s',
  })

  const navLinks = [
    { to: '/standard',    label: 'The Standard' },
    { to: '/index',       label: 'Good Food Index' },
    { to: '/ambassadors', label: 'Ambassadors' },
  ]

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: C.white, borderBottom: `1px solid ${C.mid}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: mobile ? '0 20px' : '0 60px', height: 64,
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily: F.heading, fontWeight: 600,
        fontSize: mobile ? 11 : 13, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: C.ink, textDecoration: 'none',
      }}>
        Good Food Ambassador
      </Link>

      {/* Desktop links */}
      {!mobile && (
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} style={linkStyle(pathname.startsWith(to))}>
              {label}
            </Link>
          ))}
          <a href="mailto:hello@goodfoodambassador.com" style={{
            fontFamily: F.heading, fontSize: 12, fontWeight: 500,
            letterSpacing: '0.06em', color: C.ink, textDecoration: 'none',
            border: `1.5px solid ${C.ink}`, padding: '8px 18px', borderRadius: 2,
          }}>
            hello@
          </a>
        </div>
      )}

      {/* Mobile menu button */}
      {mobile && (
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: F.mono, fontSize: 20, color: C.ink, padding: 0,
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile dropdown */}
      {mobile && menuOpen && (
        <div style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: C.white, borderBottom: `1px solid ${C.mid}`,
          padding: '20px 20px 28px', display: 'flex', flexDirection: 'column', gap: 20,
          zIndex: 199,
        }}>
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily: F.heading, fontSize: 14, fontWeight: 500,
              letterSpacing: '0.06em', color: C.ink, textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
          <a href="mailto:hello@goodfoodambassador.com" style={{
            fontFamily: F.heading, fontSize: 14, fontWeight: 500,
            color: C.ink, textDecoration: 'none',
          }}>
            hello@goodfoodambassador.com
          </a>
        </div>
      )}
    </nav>
  )
}
