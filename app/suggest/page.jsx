'use client'

import { useState } from 'react'
import Link from 'next/link'
import GFANav from '@/components/GFANav'
import { W, T, LIGHT, MID, GREEN } from '@/lib/tokens'

export default function SuggestPage() {
  const [form, setForm]     = useState({ name: '', producer: '', origin: '', category: '', buyUrl: '', description: '', submittedBy: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError]   = useState('')

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

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        form.name,
          producer:    form.producer,
          origin:      form.origin,
          category:    form.category,
          description: form.description,
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

  const label = {
    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#999',
    display: 'block',
    marginBottom: 6,
  }

  const input = {
    width: '100%',
    padding: '12px 16px',
    border: `1.5px solid ${MID}`,
    borderRadius: 2,
    fontFamily: 'var(--font-mulish), Mulish, sans-serif',
    fontSize: 15,
    color: T,
    background: W,
    outline: 'none',
    boxSizing: 'border-box',
  }

  const field = { marginBottom: 24 }

  return (
    <div style={{ background: W, color: T, fontFamily: 'var(--font-mulish), Mulish, sans-serif', fontWeight: 300 }}>
      <GFANav />

      <section style={{ padding: '80px 60px 40px', maxWidth: 720 }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: 20 }}>
          Suggest a product
        </p>
        <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontWeight: 300, fontSize: 42, lineHeight: 1.2, marginBottom: 20 }}>
          Know something<br />
          <strong style={{ fontWeight: 600 }}>worth evaluating?</strong>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: '#777', maxWidth: 520 }}>
          We evaluate every suggestion against the Good Food Standard. Products that pass are listed in the Directory with no scores, no ranking — just honest information and where to buy.
        </p>
      </section>

      {status === 'success' ? (
        <section style={{ padding: '0 60px 100px', maxWidth: 720 }}>
          <div style={{ background: LIGHT, borderRadius: 4, padding: '40px 48px' }}>
            <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
              Thank you — we received it.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#777', marginBottom: 24 }}>
              We review every suggestion personally. If it passes review against the Four Pillars, it will appear in the Directory.
            </p>
            <Link href="/" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: T, textDecoration: 'none', borderBottom: `1.5px solid ${T}`, paddingBottom: 2 }}>
              Back to home →
            </Link>
          </div>
        </section>
      ) : (
        <section style={{ padding: '0 60px 100px', maxWidth: 720 }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div>
                <label style={label}>Product name *</label>
                <input
                  style={input}
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="e.g. Frantoio Muraglia EVOO"
                  required
                />
              </div>
              <div>
                <label style={label}>Producer / Brand</label>
                <input
                  style={input}
                  value={form.producer}
                  onChange={e => set('producer', e.target.value)}
                  placeholder="e.g. Muraglia"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div>
                <label style={label}>Origin</label>
                <input
                  style={input}
                  value={form.origin}
                  onChange={e => set('origin', e.target.value)}
                  placeholder="e.g. Puglia, Italy"
                />
              </div>
              <div>
                <label style={label}>Category *</label>
                <select
                  style={{ ...input, appearance: 'none' }}
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  required
                >
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

            <div style={field}>
              <label style={label}>Where to buy it (URL)</label>
              <input
                style={input}
                type="url"
                value={form.buyUrl}
                onChange={e => set('buyUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div style={field}>
              <label style={label}>Why does it belong here?</label>
              <textarea
                style={{ ...input, minHeight: 120, resize: 'vertical' }}
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="What do you know about this product? Certification, origin, production method — anything useful for our evaluation."
              />
            </div>

            <div style={field}>
              <label style={label}>Your name (optional)</label>
              <input
                style={input}
                value={form.submittedBy}
                onChange={e => set('submittedBy', e.target.value)}
                placeholder="How should we credit you if it's listed?"
              />
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
              {status === 'submitting' ? 'Sending…' : 'Submit for evaluation'}
            </button>
          </form>
        </section>
      )}

      <footer style={{ borderTop: `1px solid ${MID}`, padding: '28px 60px' }}>
        <p style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 12, color: '#bbb' }}>
          © Good Food Ambassador ·{' '}
          <a href="mailto:hello@goodfoodambassador.com" style={{ color: '#bbb', textDecoration: 'none' }}>
            hello@goodfoodambassador.com
          </a>
        </p>
      </footer>
    </div>
  )
}
