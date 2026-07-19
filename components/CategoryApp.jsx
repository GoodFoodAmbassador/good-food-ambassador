'use client'

import { useState, useEffect } from 'react'

// ── GFA brand tokens ─────────────────────────────────────────────────────────
const W      = '#ffffff'
const T      = '#3e3e3f'
const LIGHT  = '#f7f7f6'
const GREEN  = '#77d46c'
const YELLOW = '#ffd110'
const ORANGE = '#ed5a29'
const CYAN   = '#01b3ff'
const GRAY   = '#75756d'

// ── Product tier accent palette ───────────────────────────────────────────────
const TIER_COLORS = {
  everyday: { label:'Everyday', color:'#2D7A1F', bg:'rgba(45,122,31,0.09)' },
  stepup:   { label:'Step Up',  color:'#B87808', bg:'rgba(184,120,8,0.09)' },
  special:  { label:'Special',  color:'#6D3DB5', bg:'rgba(109,61,181,0.09)' },
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function Pill({ label, color = GRAY }) {
  return (
    <span style={{
      display:'inline-block', padding:'2px 9px', borderRadius:20,
      background:`${color}18`, color, fontSize:11, fontWeight:600,
      letterSpacing:0.2, whiteSpace:'nowrap',
    }}>
      {label}
    </span>
  )
}

function BottomNav({ page, onNav }) {
  const tabs = [
    { id:'home',     icon:'🏠', label:'Home' },
    { id:'lab',      icon:'🧪', label:'Lab' },
    { id:'guide',    icon:'📖', label:'Guide' },
    { id:'products', icon:'🫒', label:'Products' },
    { id:'quiz',     icon:'✨', label:'Quiz' },
    { id:'academy',  icon:'📚', label:'Academy' },
  ]
  return (
    <nav aria-label="Main navigation" style={{
      position:'fixed', bottom:0, left:0, right:0,
      background:W, borderTop:`1px solid ${LIGHT}`,
      display:'flex', zIndex:100,
    }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onNav(t.id)}
          aria-label={t.label}
          aria-current={page === t.id ? 'page' : undefined}
          style={{
            flex:1, padding:'8px 0 6px', border:'none', background:'none',
            display:'flex', flexDirection:'column', alignItems:'center', gap:2,
            color: page === t.id ? GREEN : GRAY,
            fontSize:9, fontWeight: page === t.id ? 700 : 500, cursor:'pointer',
          }}>
          <span aria-hidden="true" style={{ fontSize:18 }}>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}

function PageShell({ children, page, onNav, noNav }) {
  return (
    <div style={{ minHeight:'100vh', background:LIGHT, paddingBottom: noNav ? 0 : 80, fontFamily:'system-ui,sans-serif' }}>
      <a href="#main-content" style={{
        position:'absolute', left:'-9999px', top:'auto',
        width:'1px', height:'1px', overflow:'hidden',
        zIndex:9999, background:GREEN, color:W, padding:'8px 16px',
        borderRadius:4, fontWeight:700, fontSize:14,
      }} onFocus={e => { e.target.style.left='50%'; e.target.style.transform='translateX(-50%)'; e.target.style.width='auto'; e.target.style.height='auto'; }}
         onBlur={e => { e.target.style.left='-9999px'; e.target.style.width='1px'; e.target.style.height='1px'; }}>
        Skip to main content
      </a>
      <main id="main-content" role="main" style={{ outline:'none' }}>
        {children}
      </main>
      {!noNav && <BottomNav page={page} onNav={onNav} />}
    </div>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ padding:'28px 20px 16px' }}>
      <div style={{ fontSize:18, fontWeight:800, color:T }}>{title}</div>
      {subtitle && <div style={{ fontSize:13, color:GRAY, marginTop:4 }}>{subtitle}</div>}
    </div>
  )
}

// ── ProductCard ───────────────────────────────────────────────────────────────

function ProductCard({ product: p, tiers }) {
  const [open, setOpen] = useState(false)
  const tier = tiers?.[p.tier] || TIER_COLORS[p.tier] || {}

  return (
    <div style={{
      background:W, borderRadius:14, margin:'0 16px 12px',
      boxShadow:'0 1px 4px rgba(0,0,0,0.07)', overflow:'hidden',
    }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding:'14px 16px', cursor:'pointer', display:'flex', gap:12, alignItems:'flex-start' }}
      >
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:6 }}>
            <span style={{
              background: tier.bg || '#eee', color: tier.color || GRAY,
              borderRadius:20, padding:'2px 9px', fontSize:10, fontWeight:700,
            }}>
              {tier.label || p.tier} · {p.price ? `$${p.price}` : ''}
            </span>
            {p.cert && <Pill label={p.cert} color={GREEN} />}
          </div>
          <div style={{ fontWeight:700, fontSize:15, color:T, marginBottom:2 }}>{p.name}</div>
          <div style={{ fontSize:12, color:GRAY }}>{p.origin}</div>
          {p.flavor?.length > 0 && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:6 }}>
              {p.flavor.map(f => <Pill key={f} label={f} color={CYAN} />)}
            </div>
          )}
        </div>
        <div style={{ fontSize:18, marginTop:2 }}>{open ? '▲' : '▼'}</div>
      </div>

      {open && (
        <div style={{ borderTop:`1px solid ${LIGHT}`, padding:'14px 16px' }}>
          {p.desc && <p style={{ fontSize:13, color:T, lineHeight:1.6, margin:'0 0 10px' }}>{p.desc}</p>}
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
            {p.use?.map(u => <Pill key={u} label={u} color={ORANGE} />)}
          </div>
          {p.harvest && (
            <div style={{ fontSize:12, color:GRAY, marginBottom:4 }}>
              🗓 Harvest: <strong>{p.harvest}</strong>
            </div>
          )}
          {p.retailer && (
            <div style={{ fontSize:12, color:GRAY, marginBottom:4 }}>
              🏪 Where to find: <strong>{p.retailer}</strong>
            </div>
          )}
          {p.profile && (
            <div style={{ fontSize:12, color:GRAY }}>
              🫒 Flavor profile: <strong>{p.profile}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── PAGES ─────────────────────────────────────────────────────────────────────

function HubPage({ cat, onEnter, onBack }) {
  return (
    <div style={{ minHeight:'100vh', background:W, fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column' }}>
      {/* Breadcrumb */}
      <div style={{ padding:'14px 20px 0', display:'flex', alignItems:'center', gap:8 }}>
        <button onClick={onBack} aria-label="Back to GFA Hub" style={{
          background:'none', border:'none', cursor:'pointer',
          fontSize:13, color:GRAY, fontWeight:600, padding:0,
          display:'flex', alignItems:'center', gap:4,
        }}>
          <span aria-hidden="true">←</span> GFA Hub
        </button>
        <span style={{ color:LIGHT, fontSize:13 }}>·</span>
        <span style={{ fontSize:13, color:T, fontWeight:700 }}>{cat.name}</span>
      </div>

      {/* Illustration */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'20px 24px 0' }}>
        {cat.illustration && (
          <img
            src={cat.illustration}
            alt={`${cat.name} illustration`}
            loading="lazy"
            decoding="async"
            style={{ width:'100%', maxWidth:280, height:'auto', marginBottom:24 }}
          />
        )}

        {/* Category number + name */}
        <div style={{ textAlign:'center', marginBottom:8 }}>
          <div style={{ fontSize:11, fontWeight:700, color:GREEN, letterSpacing:2, marginBottom:4 }}>
            {cat.hubNumber} — {cat.name.toUpperCase()}
          </div>
          <div style={{ fontSize:28, fontWeight:900, color:T, lineHeight:1.1, marginBottom:12 }}>
            {cat.experienceName}
          </div>
          <div style={{ fontSize:14, color:T, lineHeight:1.6, maxWidth:280, opacity:0.75 }}>
            {cat.heroTagline}
          </div>
        </div>

        {/* Status-aware CTA */}
        {cat.status === 'live' ? (
          <button onClick={onEnter} style={{
            marginTop:28, background:GREEN, color:W,
            border:'none', borderRadius:40, padding:'14px 40px',
            fontSize:16, fontWeight:800, cursor:'pointer',
            boxShadow:'0 2px 12px rgba(119,212,108,0.35)',
          }}>
            Enter
          </button>
        ) : (
          <div style={{ marginTop:28, textAlign:'center' }}>
            <div style={{
              display:'inline-block', background:YELLOW, color:T,
              borderRadius:40, padding:'8px 22px',
              fontSize:13, fontWeight:800,
            }}>
              Coming soon
            </div>
            {cat.comingSoonDesc && (
              <div style={{ fontSize:12, color:GRAY, marginTop:10, maxWidth:260, lineHeight:1.5 }}>
                {cat.comingSoonDesc}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick nav tiles (live only) */}
      {cat.status === 'live' && (
        <div style={{ padding:'28px 16px 32px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { page:'lab',      icon:'🧪', title:cat.labTitle,      desc:cat.labDesc },
              { page:'guide',    icon:'📖', title:cat.guideTitle,    desc:cat.guideDesc },
              { page:'products', icon:'🫒', title:cat.productsTitle, desc:`Browse recommended ${cat.productsLabel}` },
              { page:'academy',  icon:'📚', title:cat.academyTitle,  desc:cat.academyDesc },
            ].map(tile => (
              <button key={tile.page} onClick={onEnter} style={{
                background:LIGHT, border:'none', borderRadius:12,
                padding:'14px 12px', textAlign:'left', cursor:'pointer',
              }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{tile.icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:T, marginBottom:2 }}>{tile.title}</div>
                <div style={{ fontSize:11, color:GRAY, lineHeight:1.4 }}>{tile.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function HomePage({ cat, onNav }) {
  const sections = [
    { page:'lab',      icon:'🧪', color:CYAN,   title:cat.labTitle,      desc:cat.labDesc },
    { page:'guide',    icon:'📖', color:ORANGE, title:cat.guideTitle,    desc:cat.guideDesc },
    { page:'products', icon:'🫒', color:GREEN,  title:cat.productsTitle, desc:`${cat.products?.length || 0} evaluated` },
    { page:'quiz',     icon:'✨', color:YELLOW, title:'Find your match',  desc:`Personalized ${cat.productLabel} recommendations` },
    { page:'academy',  icon:'📚', color:'#6D3DB5', title:cat.academyTitle, desc:`${cat.academy?.length || 0} topics` },
  ]

  return (
    <PageShell page="home" onNav={onNav}>
      {/* Header */}
      <div style={{ background:W, padding:'20px 20px 16px', borderBottom:`1px solid ${LIGHT}` }}>
        <div style={{ fontSize:11, fontWeight:700, color:GREEN, letterSpacing:2, marginBottom:4 }}>
          {cat.hubNumber} — {cat.name.toUpperCase()}
        </div>
        <div style={{ fontSize:22, fontWeight:900, color:T }}>{cat.experienceName}</div>
        <div style={{ fontSize:13, color:GRAY, marginTop:4, lineHeight:1.5 }}>
          {cat.heroTagline}
        </div>
      </div>

      <div style={{ padding:'16px 0' }}>
        {sections.map(s => (
          <button key={s.page} onClick={() => onNav(s.page)} style={{
            display:'flex', alignItems:'center', gap:14,
            width:'100%', padding:'14px 20px', background:W,
            border:'none', borderBottom:`1px solid ${LIGHT}`, cursor:'pointer', textAlign:'left',
          }}>
            <div style={{
              width:44, height:44, borderRadius:12,
              background:`${s.color}18`, display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:22, flexShrink:0,
            }}>
              {s.icon}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:700, fontSize:15, color:T }}>{s.title}</div>
              <div style={{ fontSize:12, color:GRAY, marginTop:1 }}>{s.desc}</div>
            </div>
            <span style={{ color:GRAY, fontSize:16 }}>›</span>
          </button>
        ))}
      </div>

      {/* Disclosure link */}
      <div style={{ padding:'12px 20px 0', textAlign:'center' }}>
        <button onClick={() => onNav('disclosure')} style={{
          background:'none', border:'none', cursor:'pointer',
          fontSize:11, color:GRAY, textDecoration:'underline',
        }}>
          Transparency & Disclosure
        </button>
        <span style={{ color:LIGHT, margin:'0 6px' }}>·</span>
        <button onClick={() => onNav('about')} style={{
          background:'none', border:'none', cursor:'pointer',
          fontSize:11, color:GRAY, textDecoration:'underline',
        }}>
          About
        </button>
        <span style={{ color:LIGHT, margin:'0 6px' }}>·</span>
        <button onClick={() => onNav('privacy')} style={{
          background:'none', border:'none', cursor:'pointer',
          fontSize:11, color:GRAY, textDecoration:'underline',
        }}>
          Privacy
        </button>
      </div>
    </PageShell>
  )
}

function LabPage({ cat, onNav }) {
  const [session, setSession] = useState(null)

  const sessions = cat.labSessions || [
    { id:1, title:'Smell before you taste', icon:'👃',
      steps:['Pour a small amount into a dark glass or coffee mug.','Cup the glass in your hands for 30 seconds to warm it slightly.','Swirl gently and inhale. What do you notice first?','Write down three words: any words that come to mind.','Compare across different oils: what changes?'],
      why:'The nose detects volatile compounds before the palate. Training the smell first builds a cleaner vocabulary for taste.' },
    { id:2, title:'Identify the three positives', icon:'✅',
      steps:['Fruitiness: smell fresh? Any fruit, grass, or green herb notes?','Bitterness: sip a small amount. Does it register as bitter on the sides of the tongue?','Pungency: swallow. Do you feel a catch or pepper sensation in the throat?','Rate each 1–5. Real EVOO should show all three.','Oils with no bitterness or pungency are likely old, refined, or adulterated.'],
      why:'The IOC sensory standard measures these three attributes. Learning them gives you the same framework used by professional evaluators.' },
    { id:3, title:'Spot rancidity', icon:'🚫',
      steps:['Let the oil sit in an open container for 10 minutes.','Smell again. Any waxy, crayon, or stale nut smell? That\'s rancidity.','Rancidity comes from oxidation – usually age, heat, or light exposure.','Compare a rancid oil side-by-side with a fresh one. The difference is unmistakable.','Rancid oils are still edible but have lost their health properties and flavor.'],
      why:'Rancidity is the most common defect in grocery-store olive oil. Recognizing it helps you avoid bad purchases and waste.' },
    { id:4, title:'Compare tiers', icon:'📊',
      steps:['Get three oils at different price points: everyday, step-up, and special.','Taste all three in succession, palate-cleansing with water and plain bread.','Note: which has the strongest green fruitiness? Which the most pungency?','Does price correlate with your preference? Not always.','The goal is calibration, not confirmation.'],
      why:'Most people have never done a proper side-by-side comparison. The tier framework isn\'t about cost – it\'s about production choices that result in different flavor profiles.' },
    { id:5, title:'Blind variety test', icon:'🫒',
      steps:['If possible, source the same grade from two different regions (e.g., Kalamata vs. Tuscan).','Taste blind – pour both into identical containers, labeled A and B.','Attempt to identify characteristics of each without knowing origin.','Reveal and compare. Were your notes accurate?','Repeat with different variety pairs to build vocabulary.'],
      why:'Blind tasting removes confirmation bias. Most preferences we think are about quality are actually about familiarity.' },
    { id:6, title:'Taste against food', icon:'🍞',
      steps:['Taste the oil plain first. Record your notes.','Now dip good bread and taste again. How does the flavor change?','Try the same oil on tomato vs. on green vegetables. Does it behave differently?','A finishing oil (fruity, mild) may disappear into intense flavors; a robust oil may compete.','Matching intensity of oil to food is a core skill.'],
      why:'Oils behave differently in context. The flavor that seems harsh alone may become harmonious with food – and vice versa.' },
    { id:7, title:'Track freshness over time', icon:'📅',
      steps:['Open a bottle and taste it on day 1. Record your notes.','Taste again at 2 weeks, then 4 weeks after opening.','Notice: does the green fruitiness fade? Does any bitterness or pungency diminish?','This tracks real-time oxidation in your bottle.','Always store in a cool, dark place with the cap sealed. Oxygen is the enemy.'],
      why:'Fresh oil is a perishable product. Tracking its decline builds intuition for freshness – and teaches you how quickly to consume an open bottle.' },
  ]

  if (session !== null) {
    const s = sessions[session]
    return (
      <PageShell page="lab" onNav={onNav}>
        <div style={{ background:W, padding:'16px 20px', borderBottom:`1px solid ${LIGHT}`, display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={() => setSession(null)} style={{ background:'none', border:'none', cursor:'pointer', color:GRAY, fontSize:22, padding:0 }}>‹</button>
          <div style={{ fontWeight:800, fontSize:16, color:T }}>{s.icon} {s.title}</div>
        </div>
        <div style={{ padding:'20px' }}>
          <div style={{ background:LIGHT, borderRadius:12, padding:'16px', marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:700, color:GREEN, marginBottom:6, letterSpacing:1 }}>WHY THIS SESSION</div>
            <div style={{ fontSize:13, color:T, lineHeight:1.6 }}>{s.why}</div>
          </div>
          <div style={{ fontSize:13, fontWeight:700, color:T, marginBottom:10 }}>Steps</div>
          {s.steps.map((step, i) => (
            <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
              <div style={{
                width:24, height:24, borderRadius:'50%', background:GREEN,
                color:W, fontSize:12, fontWeight:800, flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {i + 1}
              </div>
              <div style={{ fontSize:14, color:T, lineHeight:1.55, paddingTop:3 }}>{step}</div>
            </div>
          ))}
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell page="lab" onNav={onNav}>
      <SectionHeader title={cat.labTitle} subtitle={cat.labSessionsTitle || `Sessions on sensory evaluation and tasting.`} />
      {sessions.map((s, i) => (
        <button key={s.id} onClick={() => setSession(i)} style={{
          display:'flex', alignItems:'center', gap:12,
          width:'100%', padding:'14px 20px', background:W,
          border:'none', borderBottom:`1px solid ${LIGHT}`,
          cursor:'pointer', textAlign:'left',
        }}>
          <div style={{
            width:40, height:40, borderRadius:10,
            background:`${CYAN}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0,
          }}>
            {s.icon}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:14, color:T }}>Session {s.id}: {s.title}</div>
            <div style={{ fontSize:11, color:GRAY, marginTop:2, lineHeight:1.4 }}>{s.steps[0].slice(0,60)}…</div>
          </div>
          <span style={{ color:GRAY, fontSize:16 }}>›</span>
        </button>
      ))}
    </PageShell>
  )
}

function GuidePage({ cat, onNav }) {
  const [open, setOpen] = useState(null)

  return (
    <PageShell page="guide" onNav={onNav}>
      <SectionHeader title={cat.guideTitle} subtitle={cat.guideDesc} />

      {/* Buying checklist */}
      <div style={{ background:W, margin:'0 0 1px', padding:'16px 20px 20px' }}>
        <div style={{ fontSize:13, fontWeight:700, color:T, marginBottom:10 }}>Quick buying checklist</div>
        {(cat.guideChecklist || [
          { icon:'📅', label:'Harvest date', tip:'Look for a date within the last 12 months. Best-before dates can be 2+ years after harvest.' },
          { icon:'🏷️', label:'Certification', tip:'COOC (California), PDO/DOP (EU), or NAOOA are independent quality checkpoints. Marketing seals mean nothing.' },
          { icon:'📍', label:'Single origin', tip:'Oils from a specific region are traceable. "Product of multiple countries" blends cannot be verified.' },
          { icon:'🫙', label:'Dark glass or tin', tip:'Light degrades oil. Avoid clear bottles. Dark glass or tin extend shelf life significantly.' },
          { icon:'💸', label:'Price signal', tip:'Very cheap oils cannot be high quality given the cost of production. Under $8/liter is a red flag.' },
        ]).map((item, i) => (
          <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
            <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight:700, fontSize:13, color:T }}>{item.label}</div>
              <div style={{ fontSize:12, color:GRAY, lineHeight:1.4, marginTop:2 }}>{item.tip}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Myths */}
      {cat.myths?.length > 0 && (
        <>
          <SectionHeader title="Common myths" subtitle="Labels and marketing phrases that don't mean what they seem." />
          {cat.myths.map((m, i) => (
            <div key={i} style={{ background:W, marginBottom:1 }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width:'100%', padding:'14px 20px', border:'none', background:'none',
                cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:10,
              }}>
                <span style={{ fontSize:22 }}>{m.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T }}>MYTH: {m.myth}</div>
                </div>
                <span style={{ color:GRAY, fontSize:14 }}>{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && (
                <div style={{ padding:'0 20px 16px', borderTop:`1px solid ${LIGHT}` }}>
                  <div style={{ fontSize:12, fontWeight:700, color:GREEN, marginTop:12, marginBottom:6 }}>REALITY</div>
                  <div style={{ fontSize:13, color:T, lineHeight:1.6 }}>{m.truth}</div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </PageShell>
  )
}

function ProductsPage({ cat, onNav }) {
  const [tierFilter, setTierFilter] = useState('all')
  const [search, setSearch] = useState('')
  const tiers = cat.tiers || TIER_COLORS

  const filtered = (cat.products || []).filter(p => {
    const matchTier = tierFilter === 'all' || p.tier === tierFilter
    const matchSearch = !search || [p.name, p.origin, ...(p.flavor||[])].join(' ').toLowerCase().includes(search.toLowerCase())
    return matchTier && matchSearch
  })

  return (
    <PageShell page="products" onNav={onNav}>
      <SectionHeader title={cat.productsTitle} subtitle={cat.productsDesc || ''} />

      {/* Search */}
      <div style={{ padding:'0 16px 12px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search ${cat.productsLabel}…`}
          aria-label={`Search ${cat.productsLabel}`}
          role="searchbox"
          style={{
            width:'100%', padding:'10px 14px', borderRadius:10, border:`1px solid #ddd`,
            fontSize:14, color:T, background:W, boxSizing:'border-box',
          }}
        />
      </div>

      {/* Tier filter */}
      <div style={{ display:'flex', gap:8, padding:'0 16px 16px', overflowX:'auto' }}>
        {[
          { id:'all', label:`All (${cat.products?.length || 0})` },
          ...Object.entries(tiers).map(([id, t]) => ({
            id,
            label:`${t.label} · ${t.range || ''}`.trim(),
            color: t.color,
          }))
        ].map(f => (
          <button key={f.id} onClick={() => setTierFilter(f.id)} style={{
            padding:'6px 14px', borderRadius:20, border:'none', cursor:'pointer',
            background: tierFilter === f.id ? (f.color || T) : LIGHT,
            color: tierFilter === f.id ? W : T,
            fontSize:12, fontWeight:700, whiteSpace:'nowrap', flexShrink:0,
          }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Product list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'40px 20px', color:GRAY }}>
          No {cat.productsLabel} match your filter.
        </div>
      ) : (
        filtered.map(p => <ProductCard key={p.id} product={p} tiers={tiers} />)
      )}
    </PageShell>
  )
}

function QuizPage({ cat, onNav }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const questions = cat.quiz || []

  function choose(qid, value) {
    const next = { ...answers, [qid]: value }
    setAnswers(next)
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      computeResult(next)
    }
  }

  function computeResult(ans) {
    const profiles = cat.profiles
    if (!profiles) { setResult('cook'); return }

    const budgetAns = ans['q3'] || ''
    const flavorAns = ans['q2'] || ''

    if (budgetAns === 'special' || flavorAns === 'peppery') {
      setResult('enthusiast')
    } else if (budgetAns === 'everyday' && flavorAns === 'mild') {
      setResult('beginner')
    } else {
      setResult('cook')
    }
  }

  function reset() {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (result && cat.profiles) {
    const profile = cat.profiles[result]
    const recommended = (cat.products || [])
      .filter(p => p.journey?.includes(result))
      .slice(0, 4)

    return (
      <PageShell page="quiz" onNav={onNav}>
        <SectionHeader title="Your match" />
        <div style={{ background:W, margin:'0 16px 16px', borderRadius:14, padding:'20px', textAlign:'center', boxShadow:'0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize:36, marginBottom:8 }}>{profile.icon}</div>
          <div style={{ fontSize:18, fontWeight:800, color:profile.color, marginBottom:6 }}>{profile.label}</div>
          <div style={{ fontSize:13, color:T, lineHeight:1.6, marginBottom:10 }}>{profile.desc}</div>
          <div style={{
            background:profile.bg, borderRadius:10, padding:'10px 14px',
            fontSize:12, color:profile.color, fontWeight:700,
          }}>
            Mission: {profile.mission}
          </div>
        </div>

        {recommended.length > 0 && (
          <>
            <SectionHeader title={`Recommended ${cat.productsLabel}`} />
            {recommended.map(p => <ProductCard key={p.id} product={p} tiers={cat.tiers} />)}
          </>
        )}

        <div style={{ padding:'12px 20px 0', textAlign:'center' }}>
          <button onClick={reset} style={{
            background:LIGHT, border:'none', borderRadius:40, padding:'10px 28px',
            fontSize:13, fontWeight:700, color:T, cursor:'pointer',
          }}>
            Retake quiz
          </button>
          <span style={{ margin:'0 10px', color:GRAY }}>·</span>
          <button onClick={() => onNav('products')} style={{
            background:GREEN, border:'none', borderRadius:40, padding:'10px 28px',
            fontSize:13, fontWeight:700, color:W, cursor:'pointer',
          }}>
            See all {cat.productsLabel}
          </button>
        </div>
      </PageShell>
    )
  }

  if (questions.length === 0) {
    return (
      <PageShell page="quiz" onNav={onNav}>
        <SectionHeader title="Find your match" subtitle={`Quiz coming soon.`} />
      </PageShell>
    )
  }

  const q = questions[step]
  return (
    <PageShell page="quiz" onNav={onNav}>
      <SectionHeader title="Find your match" subtitle={`Question ${step + 1} of ${questions.length}`} />
      <div style={{ padding:'0 16px' }}>
        <div style={{
          background:W, borderRadius:14, padding:'20px', marginBottom:16,
          boxShadow:'0 1px 4px rgba(0,0,0,0.07)',
        }}>
          <div style={{ fontSize:16, fontWeight:800, color:T, marginBottom:16, lineHeight:1.4 }}>{q.question}</div>
          {q.options.map(opt => (
            <button key={opt.value} onClick={() => choose(q.id, opt.value)} style={{
              display:'block', width:'100%', textAlign:'left',
              padding:'12px 16px', marginBottom:8, borderRadius:10,
              border:`1px solid #eee`, background:LIGHT,
              fontSize:14, color:T, cursor:'pointer', fontWeight:500,
            }}>
              {opt.label}
            </button>
          ))}
        </div>
        {/* Progress */}
        <div style={{ display:'flex', gap:6, justifyContent:'center' }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width:8, height:8, borderRadius:'50%',
              background: i <= step ? GREEN : LIGHT,
              transition:'background 0.2s',
            }} />
          ))}
        </div>
      </div>
    </PageShell>
  )
}

function AcademyPage({ cat, onNav }) {
  const [open, setOpen] = useState(null)

  const topics = cat.academy || []

  return (
    <PageShell page="academy" onNav={onNav}>
      <SectionHeader title={cat.academyTitle} subtitle={cat.academyDesc} />

      {topics.map((topic, i) => (
        <div key={topic.id} style={{ background:W, marginBottom:1, overflow:'hidden' }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            display:'flex', alignItems:'center', gap:12, width:'100%',
            padding:'16px 20px', border:'none', background:'none', cursor:'pointer', textAlign:'left',
          }}>
            <div style={{
              width:40, height:40, borderRadius:10,
              background:`${topic.color}18`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:20, flexShrink:0,
            }}>
              {topic.icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, fontSize:14, color:T }}>{topic.title}</div>
              <div style={{ fontSize:12, color:GRAY, marginTop:2, lineHeight:1.4 }}>{topic.hook}</div>
            </div>
            <span style={{ color:GRAY, fontSize:14 }}>{open === i ? '▲' : '▼'}</span>
          </button>

          {open === i && (
            <div style={{ borderTop:`1px solid ${LIGHT}`, padding:'0 0 16px' }}>
              {topic.sections.map((s, j) => (
                <div key={j} style={{ padding:'12px 20px 0' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                    <div style={{ fontWeight:700, fontSize:13, color:topic.color }}>{s.h}</div>
                    {s.tag && (
                      <span style={{
                        background:`${topic.color}18`, color:topic.color,
                        borderRadius:10, padding:'1px 7px', fontSize:10, fontWeight:700,
                      }}>
                        {s.tag}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize:13, color:T, lineHeight:1.65 }}>{s.b}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {topics.length === 0 && (
        <div style={{ textAlign:'center', padding:'40px 20px', color:GRAY }}>
          Academy content coming soon.
        </div>
      )}
    </PageShell>
  )
}

// Static pages ────────────────────────────────────────────────────────────────

function StaticPage({ title, children, page, onNav }) {
  return (
    <PageShell page={page} onNav={onNav}>
      <div style={{ background:W, padding:'20px', borderBottom:`1px solid ${LIGHT}` }}>
        <div style={{ fontSize:20, fontWeight:800, color:T }}>{title}</div>
      </div>
      <div style={{ padding:'20px', fontSize:14, color:T, lineHeight:1.7 }}>
        {children}
      </div>
    </PageShell>
  )
}

function AboutPage({ onNav }) {
  return (
    <StaticPage title="About GFA" page="about" onNav={onNav}>
      <p>Good Food Ambassadors is an independent food research and education project. We evaluate food products on transparency, provenance, and integrity – not on marketing claims.</p>
      <p>We are not affiliated with any producer or retailer. We do not accept payment for reviews. Every evaluation is conducted independently.</p>
      <p>We don't call the people who eat our recommendations "consumers." We call them eaters. The distinction matters to us.</p>
      <p>Our principle: we don't judge, we don't moralize, we don't fall into stereotypes. We inform, we provide data and facts, and we invite people to make good choices.</p>
    </StaticPage>
  )
}

function PrivacyPage({ onNav }) {
  return (
    <StaticPage title="Privacy" page="privacy" onNav={onNav}>
      <p>This site does not collect personal data, use cookies for tracking, or share any information with third parties.</p>
      <p>We do not use advertising networks. We do not use social login. No personal identifiers are stored.</p>
      <p>The site is hosted on Vercel. Usage analytics, if any, are anonymized and aggregate only.</p>
      <p>Questions: hello@goodfoodambassador.com</p>
    </StaticPage>
  )
}

function DisclosurePage({ onNav }) {
  return (
    <StaticPage title="Transparency & Disclosure" page="disclosure" onNav={onNav}>
      <p>All products on this site were evaluated independently. We purchased products at retail prices unless explicitly noted otherwise.</p>
      <p>Some links may be affiliate links. We will always disclose this clearly where it applies. Affiliate relationships do not influence our evaluations.</p>
      <p>We do not work with Amazon. We link to brand websites and independently verified retailers only.</p>
      <p>SEMINA products are excluded from our evaluation on a permanent and unconditional basis. This is a standing recusal, not a review.</p>
      <p>Prices and product availability are based on research conducted at the time of evaluation. They may have changed.</p>
    </StaticPage>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function CategoryApp({ category: cat, onBack }) {
  const [page, setPage] = useState('hub')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const nav = (p) => setPage(p)

  if (page === 'hub') {
    return (
      <HubPage
        cat={cat}
        onEnter={() => setPage('home')}
        onBack={onBack}
      />
    )
  }

  if (cat.status === 'coming-soon') {
    return (
      <HubPage
        cat={cat}
        onEnter={() => {}}
        onBack={onBack}
      />
    )
  }

  switch (page) {
    case 'home':        return <HomePage       cat={cat} onNav={nav} />
    case 'lab':         return <LabPage        cat={cat} onNav={nav} />
    case 'guide':       return <GuidePage      cat={cat} onNav={nav} />
    case 'products':    return <ProductsPage   cat={cat} onNav={nav} />
    case 'quiz':        return <QuizPage       cat={cat} onNav={nav} />
    case 'academy':     return <AcademyPage    cat={cat} onNav={nav} />
    case 'about':       return <AboutPage      onNav={nav} />
    case 'privacy':     return <PrivacyPage    onNav={nav} />
    case 'disclosure':  return <DisclosurePage onNav={nav} />
    default:            return <HomePage       cat={cat} onNav={nav} />
  }
}
