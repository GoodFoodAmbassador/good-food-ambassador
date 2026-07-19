'use client'

import { useState } from 'react'
import Pill from '@/components/Pill'
import { W, T, LIGHT, MID, GREEN, CYAN, ORANGE, GRAY } from '@/lib/tokens'

const SCORECARD_ROWS = [
  { pillar: 'GOOD',  color: GREEN,  criterion: 'Ingredient and nutritional honesty' },
  { pillar: 'GOOD',  color: GREEN,  criterion: 'Quality and food safety' },
  { pillar: 'CLEAN', color: CYAN,   criterion: 'Traceable from origin' },
  { pillar: 'CLEAN', color: CYAN,   criterion: 'Packaging that tells the truth' },
  { pillar: 'FAIR',  color: ORANGE, criterion: 'Workers treated with dignity throughout the chain' },
  { pillar: 'FAIR',  color: ORANGE, criterion: 'Land and resources used responsibly' },
  { pillar: 'TRUE',  color: GRAY,   criterion: 'Cultural roots honoured, evolution welcomed' },
]

const inputStyle = {
  fontFamily: 'var(--font-mulish), Mulish, sans-serif',
  fontSize: 14,
  fontWeight: 300,
  border: `1px solid ${MID}`,
  borderRadius: 2,
  padding: '10px 14px',
  width: '100%',
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

function radioStyle(active) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    color: active ? T : '#888',
    padding: '8px 14px',
    borderRadius: 2,
    border: `1.5px solid ${active ? T : MID}`,
    background: active ? LIGHT : W,
  }
}

export default function GFAScorecard() {
  const empty = SCORECARD_ROWS.map((r) => ({ ...r, evidence: '', source: '', notes: '' }))
  const [product, setProduct] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [evaluator, setEvaluator] = useState('')
  const [declaration, setDeclaration] = useState('')
  const [rows, setRows] = useState(empty)

  const setRow = (i, field, val) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)))

  const handleSubmit = () => {
    const header = [
      `Product: ${product}`,
      `Category: ${category}`,
      `Date: ${date}`,
      `Evaluator: ${evaluator || '(not provided)'}`,
      `Declaration: ${
        declaration === 'self'
          ? 'Self-assessment (producer)'
          : declaration === 'independent'
          ? 'Independent evaluation (reviewer/ambassador)'
          : '(not declared)'
      }`,
      '',
      'EVALUATION SCORECARD',
      '─────────────────────────────────────────',
    ].join('\n')

    const table = rows
      .map((r) =>
        [
          `[${r.pillar}] ${r.criterion}`,
          `Evidence: ${
            r.evidence === 'found'
              ? '✓ Found'
              : r.evidence === 'partial'
              ? '~ Partial'
              : r.evidence === 'not-disclosed'
              ? '— Not disclosed'
              : '(not assessed)'
          }`,
          `Source: ${r.source || '—'}`,
          `Notes: ${r.notes || '—'}`,
        ].join('\n')
      )
      .join('\n\n')

    const body = encodeURIComponent(`${header}\n\n${table}`)
    const subject = encodeURIComponent(`GFA Evaluation — ${product || 'Product submission'}`)
    window.location.href = `mailto:hello@goodfoodambassador.com?subject=${subject}&body=${body}`
  }

  return (
    <div style={{ borderTop: `3px solid ${T}`, marginTop: 60, paddingTop: 52 }}>
      <h2
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontWeight: 600,
          fontSize: 26,
          marginBottom: 12,
        }}
      >
        Evaluate a product
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 8 }}>
        Use this scorecard to map evidence against the Good Food Standard. One form for both producers submitting a
        product and reviewers doing independent research — just declare which at the top.
      </p>

      {/* Header fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', marginBottom: 32, marginTop: 32 }}>
        <div>
          <label style={labelStyle}>Product name *</label>
          <input
            style={inputStyle}
            placeholder="e.g. Kosterina Original EVOO"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Category *</label>
          <select
            style={{ ...inputStyle, cursor: 'pointer' }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Oils & Condiments">Oils &amp; Condiments</option>
            <option value="Grains & Noodles">Grains &amp; Noodles</option>
            <option value="Legumes & Pulses">Legumes &amp; Pulses</option>
            <option value="Snacks & Pantry">Snacks &amp; Pantry</option>
            <option value="Low & No Alcohol">Low &amp; No Alcohol</option>
            <option value="Other">Other (describe in notes)</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input style={inputStyle} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Your name / contact (optional)</label>
          <input
            style={inputStyle}
            placeholder="Name or email"
            value={evaluator}
            onChange={(e) => setEvaluator(e.target.value)}
          />
        </div>
      </div>

      {/* Declaration */}
      <div style={{ marginBottom: 48 }}>
        <label style={labelStyle}>Declaration *</label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button style={radioStyle(declaration === 'self')} onClick={() => setDeclaration('self')}>
            Self-assessment (producer)
          </button>
          <button style={radioStyle(declaration === 'independent')} onClick={() => setDeclaration('independent')}>
            Independent evaluation (reviewer/ambassador)
          </button>
        </div>
      </div>

      {/* Criteria rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 40 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ background: LIGHT, padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Pill bg={row.color}>{row.pillar}</Pill>
              <span
                style={{
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {row.criterion}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              {[
                { val: 'found', label: '✓ Evidence found' },
                { val: 'partial', label: '~ Partial / unclear' },
                { val: 'not-disclosed', label: '— Not found / not disclosed' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  style={radioStyle(row.evidence === opt.val)}
                  onClick={() => setRow(i, 'evidence', opt.val)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Source</label>
                <input
                  style={inputStyle}
                  placeholder="Label, website, third-party..."
                  value={row.source}
                  onChange={(e) => setRow(i, 'source', e.target.value)}
                />
              </div>
              <div>
                <label style={labelStyle}>Notes</label>
                <input
                  style={inputStyle}
                  placeholder="What did you find?"
                  value={row.notes}
                  onChange={(e) => setRow(i, 'notes', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <button
          onClick={handleSubmit}
          style={{
            fontFamily: 'var(--font-poppins), Poppins, sans-serif',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: T,
            color: W,
            padding: '14px 28px',
            border: 'none',
            borderRadius: 2,
            cursor: 'pointer',
          }}
        >
          Submit evaluation →
        </button>
        <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
          Opens your email client with the scorecard pre-filled.
          <br />
          Send to hello@goodfoodambassador.com
        </p>
      </div>
    </div>
  )
}
