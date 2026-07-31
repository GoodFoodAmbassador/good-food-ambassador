'use client'

import { useState } from 'react'
import Link from 'next/link'
import GFANav from '@/components/GFANav'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'

const PILLARS = [
  { label: 'Good',  color: GREEN,  placeholder: 'What do you know about the quality, ingredients, or nutritional honesty of this product?' },
  { label: 'Clean', color: CYAN,   placeholder: 'What can you find about its origin, supply chain, or packaging?' },
  { label: 'Fair',  color: ORANGE, placeholder: 'What do you know about how the workers and land behind this product are treated?' },
  { label: 'True',  color: GRAY,   placeholder: 'What can you say about the cultural honesty or intention behind this product?' },
]

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid ' + MID,
  borderRadius: 2,
  fontFamily: 'var(--font-mulish), Mulish, sans-serif',
  fontSize: 15,
  color: T,
  background: W,
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle = {
  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#999',
  display: 'block',
  marginBottom: 6,
}

export default function JoinPage() {
  const [form, setForm] = useState({ name: '', producer: '', origin: '', category: '', buyUrl: '', submittedBy: '', good: '', clean: '', fair: '', true: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    const buyLinks = form.buyUrl.trim()
      ? [{ label: 'Link provided', url: form.buyUrl.trim() }]
      : []

    const description = [
      form.good  ? `GOOD: ${form.good}`   : '',
      form.clean ? `CLEAN: ${form.clean}` : '',
      form.fair  ? `FAIR: ${form.fair}`   : '',
      form.true  ? `TRUE: ${form.true}`   : '',
    ].filter(Boolean).join('\n\n')

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        form.name,
          producer:    form.producer,
          origin:      form.origin,
          category:    form.category,
          description,
          buyLinks,
          submittedBy: form.submittedBy,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '80px 40px' }}>

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
          Contribute
        </p>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 48, lineHeight: 1.15, marginBottom: 24 }}>
          Join Good Food<br />
          <strong style={{ fontWeight: 600 }}>Ambassador</strong>
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#666', maxWidth: 560, marginBottom: 72 }}>
          Two ways to be part of this. Contribute a product you believe belongs in the directory — or reach out to become a Good Food Ambassador.
        </p>

        {/* Section 1 — Contribute a product */}
        <div style={{ borderTop: '3px solid ' + T, paddingTop: 48, marginBottom: 80 }}>
          <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 26, marginBottom: 12 }}>
            Contribute a product
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#777', marginBottom: 40 }}>
            Tell us what you know. Share what you found across the four pillars — in your own words, as much or as little as you have. We review every submission and add it to the directory if it belongs.
          </p>

          {status === 'success' ? (
            <div style={{ background: LIGHT, padding: '40px 48px', borderRadius: 2 }}>
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
                Thank you — we received it.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: '#777', marginBottom: 24 }}>
                We review every submission personally. If it belongs in the directory, it will appear there.
              </p>
              <Link href="/" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: T, textDecoration: 'none', borderBottom: '1.5px solid ' + T, paddingBottom: 2 }}>
                Back to home →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                <div>
                  <label style={labelStyle}>Product name *</label>
                  <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Frantoio Muraglia EVOO" required />
                </div>
                <div>
                  <label style={labelStyle}>Producer / Brand</label>
                  <input style={inputStyle} value={form.producer} onChange={e => set('producer', e.target.value)} placeholder="e.g. Muraglia" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                <div>
                  <label style={labelStyle}>Origin</label>
                  <input style={inputStyle} value={form.origin} onChange={e => set('origin', e.target.value)} placeholder="e.g. Puglia, Italy" />
                </div>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select style={{ ...inputStyle, appearance: 'none' }} value={form.category} onChange={e => set('category', e.target.value)} required>
                    <option value="">Select a category</option>
                    <option value="olive-oils">Oils &amp; Condiments</option>
                    <option value="grains">Grains &amp; Noodles</option>
                    <option value="legumes">Legumes &amp; Pulses</option>
                    <option value="snacks">Snacks &amp; Pantry</option>
                    <option value="lna">Low &amp; No Alcohol</option>
                    <option value="seafood">Seafood</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={labelStyle}>Where to buy (URL)</label>
                <input style={inputStyle} type="url" value={form.buyUrl} onChange={e => set('buyUrl', e.target.value)} placeholder="https://..." />
              </div>

              {/* Four pillars */}
              <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: 16 }}>
                What you know — across the four pillars
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 32 }}>
                {PILLARS.map(p => (
                  <div key={p.label} style={{ background: LIGHT, padding: '20px 24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ background: p.color, color: W, fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '3px 10px', borderRadius: 2 }}>{p.label.toUpperCase()}</span>
                    </div>
                    <textarea
                      style={{ ...inputStyle, minHeight: 80, resize: 'vertical', display: 'block' }}
                      value={form[p.label.toLowerCase()]}
                      onChange={e => set(p.label.toLowerCase(), e.target.value)}
                      placeholder={p.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={labelStyle}>Your name (optional)</label>
                <input style={inputStyle} value={form.submittedBy} onChange={e => set('submittedBy', e.target.value)} placeholder="How should we credit you if it's listed?" />
              </div>

              {status === 'error' && (
                <p style={{ color: '#c0392b', fontSize: 14, marginBottom: 20 }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: T,
                  color: W,
                  padding: '14px 32px',
                  border: 'none',
                  borderRadius: 2,
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  opacity: status === 'submitting' ? 0.6 : 1,
                }}
              >
                {status === 'submitting' ? 'Sending…' : 'Submit →'}
              </button>
            </form>
          )}
        </div>

        {/* Section 2 — Become an ambassador */}
        <div style={{ borderTop: '3px solid ' + T, paddingTop: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 600, fontSize: 26, marginBottom: 12 }}>
            Become an Ambassador
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#777', marginBottom: 32 }}>
            If you grow, make, move, research, cook, or simply care deeply about food — this community is for you. Tell us what you do and where you are.
          </p>
          <a
            href="mailto:hello@goodfoodambassador.com?subject=I want to be a Good Food Ambassador"
            style={{
              fontFamily: 'var(--font-poppins), Poppins, sans-serif',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: T,
              color: W,
              padding: '14px 28px',
              borderRadius: 2,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Write to us →
          </a>
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
