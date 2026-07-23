import { useState, useEffect } from 'react'
import { C, F } from '../theme'
import Pill from '../components/Pill'

const PILLAR_COLOR = { GOOD: C.green, CLEAN: C.cyan, FAIR: C.orange, TRUE: C.gray }

const PILLARS = [
  { label: 'GOOD',  desc: 'Quality that nourishes' },
  { label: 'CLEAN', desc: 'Transparent from field to table' },
  { label: 'FAIR',  desc: 'Dignity for everyone in the chain' },
  { label: 'TRUE',  desc: 'Honest about where food comes from' },
]

const CRITERIA = [
  { pillar: 'GOOD',  label: 'Ingredient and nutritional honesty',
    text: ['Everything in the product is declared clearly. The ingredient list reflects what is actually in the food — no hidden additives, no misleading simplifications. Nutritional claims are accurate and complete, not selected to flatter the label.', 'GFA reports the full nutritional profile — including micronutrients where relevant — as part of every evaluation. We present it as data. Eaters decide what it means for them.'] },
  { pillar: 'GOOD',  label: 'Quality and food safety',
    text: ['The product meets applicable food safety standards in the country where it is produced and sold. Quality is consistent and verifiable. Sensory properties — flavour, aroma, texture — are genuine expressions of the ingredients, not reconstructed or enhanced to simulate freshness or character the product does not naturally have.'] },
  { pillar: 'CLEAN', label: 'Traceable from origin',
    text: ['The product\'s origin — country, region, producer where possible — is stated on the label or verifiable by the eater on request. The supply chain is not obscured. A product that cannot say where it comes from cannot ask for trust.'] },
  { pillar: 'CLEAN', label: 'Packaging that tells the truth',
    text: ['Packaging communicates honestly: materials are disclosed, environmental claims are not exaggerated. Packaging choices reflect an awareness of the full lifecycle — from production to disposal. GFA reports packaging materials and their known trade-offs as part of every evaluation.'] },
  { pillar: 'FAIR',  label: 'Workers treated with dignity throughout the chain',
    text: ['Everyone who touches this product — growers, processors, packers, transporters — is treated with basic dignity and compensated lawfully. The producer operates in compliance with applicable labour law throughout the supply chain, not only in the facility of origin.'] },
  { pillar: 'FAIR',  label: 'Land and resources used responsibly',
    text: ['The land, water, and energy used to make this product are treated as assets to steward, not deplete. Applicable environmental law is respected. GFA reports on land use, water intensity, and energy sources where evidence is available.'] },
  { pillar: 'TRUE',  label: 'Cultural roots honoured, evolution welcomed',
    text: ['Food carries history. We recognise the value of foods that travel, adapt, and find new expression in new contexts — that is how food culture has always worked.', 'What GFA asks is that the original be respected: authentic ingredients where authenticity matters, honest labelling of inspired-by versus the real thing, no imitation that misleads eaters about what they are eating or where it comes from.'] },
]

const SCORECARD_ROWS = [
  { pillar: 'GOOD',  criterion: 'Ingredient and nutritional honesty' },
  { pillar: 'GOOD',  criterion: 'Quality and food safety' },
  { pillar: 'CLEAN', criterion: 'Traceable from origin' },
  { pillar: 'CLEAN', criterion: 'Packaging that tells the truth' },
  { pillar: 'FAIR',  criterion: 'Workers treated with dignity throughout the chain' },
  { pillar: 'FAIR',  criterion: 'Land and resources used responsibly' },
  { pillar: 'TRUE',  criterion: 'Cultural roots honoured, evolution welcomed' },
]

export default function StandardPage() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <div style={{ background: C.white, color: C.ink }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: mobile ? '40px 20px 80px' : '80px 40px 120px' }}>

        <h1 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: mobile ? 30 : 40, lineHeight: 1.2, marginBottom: 12 }}>
          The Good Food Standard
        </h1>
        <p style={{ fontSize: 16, color: '#888', fontStyle: 'italic', marginBottom: 48, lineHeight: 1.6 }}>
          A framework for evaluating food with honesty, curiosity, and respect for everyone in the chain.
        </p>

        {/* How we evaluate */}
        <div style={{ background: C.light, padding: '32px 36px', marginBottom: 60, borderLeft: `3px solid ${C.ink}` }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
            The Good Food Standard is a framework for judgment, not a certification checklist.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
            A small producer who cannot afford third-party audits, organic certification, or compliance infrastructure may fully meet this Standard. A large producer with every certification may not.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
            <strong>Certifications are useful evidence — we consider them. They are not proof, and their absence is not disqualification.</strong>
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            We evaluate practice, transparency, and intent. Evidence can come from producer documentation, independent testing, community reputation, field visits, or public records. We report what we find and how we found it. Eaters decide what it means for them.
          </p>
        </div>

        {/* Four pillars */}
        <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 20, letterSpacing: '0.04em', marginBottom: 32 }}>
          The four pillars
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, marginBottom: 60 }}>
          {PILLARS.map((p) => (
            <div key={p.label} style={{ background: C.light, padding: '24px 28px' }}>
              <Pill bg={PILLAR_COLOR[p.label]}>{p.label}</Pill>
              <p style={{ fontFamily: F.heading, fontSize: 15, fontWeight: 500, marginTop: 12 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Seven criteria */}
        <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 20, letterSpacing: '0.04em', marginBottom: 8 }}>
          The seven criteria
        </h2>
        {CRITERIA.map((c, i) => (
          <div key={i} style={{ borderTop: `1px solid ${C.mid}`, padding: '32px 0' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap' }}>
              <Pill bg={PILLAR_COLOR[c.pillar]}>{c.pillar}</Pill>
              <h3 style={{ fontFamily: F.heading, fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{c.label}</h3>
            </div>
            {c.text.map((para, j) => (
              <p key={j} style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 12 }}>{para}</p>
            ))}
          </div>
        ))}

        {/* What this is not */}
        <div style={{ borderTop: `1px solid ${C.mid}`, paddingTop: 32, marginBottom: 60 }}>
          <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
            What this Standard is not
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 12 }}>
            It is not a pass/fail certification. It is not a list of brands to avoid. It is not a political position on farming, diet, or lifestyle.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            It is a shared set of beliefs about what food should be — and a commitment to evaluating food honestly against those beliefs, with data, transparency, and respect for eaters.
          </p>
        </div>

        {/* Scorecard */}
        <Scorecard mobile={mobile} />

      </div>
    </div>
  )
}

function Scorecard({ mobile }) {
  const empty = SCORECARD_ROWS.map(r => ({ ...r, evidence: '', source: '', notes: '' }))
  const [product, setProduct] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [evaluator, setEvaluator] = useState('')
  const [declaration, setDeclaration] = useState('')
  const [rows, setRows] = useState(empty)

  const setRow = (i, field, val) =>
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r))

  const handleSubmit = () => {
    const header = [
      `Product: ${product}`, `Category: ${category}`, `Date: ${date}`,
      `Evaluator: ${evaluator || '(not provided)'}`,
      `Declaration: ${declaration === 'self' ? 'Self-assessment (producer)' : declaration === 'independent' ? 'Independent evaluation (reviewer/ambassador)' : '(not declared)'}`,
      '', 'EVALUATION SCORECARD', '─────────────────────────────────────────',
    ].join('\n')

    const table = rows.map(r => [
      `[${r.pillar}] ${r.criterion}`,
      `Evidence: ${r.evidence === 'found' ? '✓ Found' : r.evidence === 'partial' ? '~ Partial' : r.evidence === 'not-disclosed' ? '— Not disclosed' : '(not assessed)'}`,
      `Source: ${r.source || '—'}`, `Notes: ${r.notes || '—'}`,
    ].join('\n')).join('\n\n')

    const body = encodeURIComponent(`${header}\n\n${table}`)
    const subject = encodeURIComponent(`GFA Evaluation — ${product || 'Product submission'}`)
    window.location.href = `mailto:hello@goodfoodambassador.com?subject=${subject}&body=${body}`
  }

  const inputStyle = {
    fontFamily: F.body, fontSize: 14, fontWeight: 300,
    border: `1px solid ${C.mid}`, borderRadius: 2, padding: '10px 14px',
    width: '100%', color: C.ink, background: C.white, outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle = {
    fontFamily: F.heading, fontSize: 11, fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999',
    display: 'block', marginBottom: 6,
  }
  const radioStyle = (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
    fontFamily: F.heading, fontSize: 13, fontWeight: active ? 600 : 400,
    color: active ? C.ink : '#888', padding: '8px 14px', borderRadius: 2,
    border: `1.5px solid ${active ? C.ink : C.mid}`, background: active ? C.light : C.white,
  })

  return (
    <div style={{ borderTop: `3px solid ${C.ink}`, paddingTop: 52 }}>
      <h2 style={{ fontFamily: F.heading, fontWeight: 600, fontSize: 26, marginBottom: 12 }}>
        Evaluate a product
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 8 }}>
        Use this scorecard to map evidence against the Good Food Standard. One form for both producers submitting a product and reviewers doing independent research — just declare which at the top.
      </p>
      <p style={{ fontSize: 13, color: '#aaa', marginBottom: 40 }}>
        Prefer to work offline?{' '}
        <a href="/GFA_Evaluation_Scorecard.pdf" download style={{ color: C.ink, fontWeight: 600 }}>
          Download the PDF template
        </a>
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '16px 24px', marginBottom: 32 }}>
        <div>
          <label style={labelStyle}>Product name *</label>
          <input style={inputStyle} placeholder="e.g. Kosterina Original EVOO" value={product} onChange={e => setProduct(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Category *</label>
          <select style={{ ...inputStyle, cursor: 'pointer' }} value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="Oils & Condiments">Oils &amp; Condiments</option>
            <option value="Grains & Noodles">Grains &amp; Noodles</option>
            <option value="Legumes & Pulses">Legumes &amp; Pulses</option>
            <option value="Snacks & Pantry">Snacks &amp; Pantry</option>
            <option value="Low & No Alcohol">Low &amp; No Alcohol</option>
            <option value="Seafood">Seafood</option>
            <option value="Other">Other (describe in notes)</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input style={inputStyle} type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Your name / contact (optional)</label>
          <input style={inputStyle} placeholder="Name or email" value={evaluator} onChange={e => setEvaluator(e.target.value)} />
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <label style={labelStyle}>Declaration *</label>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <label style={radioStyle(declaration === 'self')} onClick={() => setDeclaration('self')}>
            <span>○</span> Self-assessment (producer)
          </label>
          <label style={radioStyle(declaration === 'independent')} onClick={() => setDeclaration('independent')}>
            <span>○</span> Independent evaluation (reviewer/ambassador)
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 40 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ background: C.light, padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Pill bg={PILLAR_COLOR[row.pillar]}>{row.pillar}</Pill>
              <span style={{ fontFamily: F.heading, fontSize: mobile ? 13 : 15, fontWeight: 600 }}>{row.criterion}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              {[
                { val: 'found', label: '✓ Evidence found' },
                { val: 'partial', label: '~ Partial / unclear' },
                { val: 'not-disclosed', label: '— Not found / not disclosed' },
              ].map(opt => (
                <label key={opt.val} style={radioStyle(row.evidence === opt.val)} onClick={() => setRow(i, 'evidence', opt.val)}>
                  {opt.label}
                </label>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 2fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Source</label>
                <input style={inputStyle} placeholder="Label, website, third-party…" value={row.source} onChange={e => setRow(i, 'source', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Notes</label>
                <input style={inputStyle} placeholder="What did you find?" value={row.notes} onChange={e => setRow(i, 'notes', e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <button onClick={handleSubmit} style={{
          fontFamily: F.heading, fontSize: 12, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', background: C.ink,
          color: C.white, padding: '14px 28px', border: 'none', borderRadius: 2, cursor: 'pointer',
        }}>
          Submit evaluation →
        </button>
        <p style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>
          Opens your email client with the scorecard pre-filled.<br />
          Send to hello@goodfoodambassador.com
        </p>
      </div>
    </div>
  )
}
