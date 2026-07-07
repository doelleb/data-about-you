import { useState, useMemo, useEffect, useRef } from 'react'

/* ════════════════════════════════════════════════════════════════════
   THE LABS — four in-browser simulations of the bias mechanisms
   the curriculum teaches. No black boxes: every model here is small
   enough to read, and every number on screen can be traced by hand.
   ════════════════════════════════════════════════════════════════════ */

// Deterministic RNG so every student sees the same "data".
function mulberry32(seed) {
  let a = seed
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const LABS = [
  {
    id: 'proxy',
    num: '01',
    module: 2,
    title: 'The Proxy Trap',
    method: 'Simulation · 120 synthetic patients',
    claim: 'An algorithm that never sees race can still ration care by race. Rank patients by spending instead of sickness and watch who gets left out.',
    minutes: 15,
  },
  {
    id: 'screener',
    num: '02',
    module: 3,
    title: 'Screened Out',
    method: 'Interactive model · transparent weights',
    claim: 'One candidate, fixed qualifications. Flip the name, the zip code, the resume gap — and watch the score cross the rejection line.',
    minutes: 10,
  },
  {
    id: 'loop',
    num: '03',
    module: 5,
    title: 'The Loop',
    method: 'Ten-year simulation · two districts',
    claim: 'Two districts with identical crime. Give one a few extra patrols in year one, let the algorithm learn from arrests, and run the decade.',
    minutes: 15,
  },
  {
    id: 'fairness',
    num: '04',
    module: 8,
    title: 'Impossible Fairness',
    method: 'Threshold explorer · three metrics',
    claim: 'Try to satisfy three definitions of fairness at once. The math will not let you — and that impossibility is the whole field.',
    minutes: 20,
  },
]

/* ── Shared pieces ──────────────────────────────────────────────── */

function GapMeter({ label, a, b, aLabel = 'A', bLabel = 'B', unit = '%', good = 5, flip = false }) {
  const gap = Math.abs(a - b)
  const ok = gap <= good
  const lo = Math.min(a, b), hi = Math.max(a, b)
  return (
    <div className={`gap-meter${ok ? ' gap-ok' : ''}`}>
      <div className="gap-meter-head">
        <span>{label}</span>
        <span className="gap-meter-read">{ok ? 'within tolerance' : `gap ${gap.toFixed(0)}${unit === '%' ? ' pts' : unit}`}</span>
      </div>
      <div className="gap-track">
        <div className="gap-hatch" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
        <div className="gap-mark" style={{ left: `${a}%` }}><span>{aLabel}</span></div>
        <div className="gap-mark gap-mark-b" style={{ left: `${b}%` }}><span>{bLabel}</span></div>
      </div>
      <div className="gap-nums">
        <span>{aLabel} {a.toFixed(0)}{unit}</span>
        <span>{bLabel} {b.toFixed(0)}{unit}</span>
      </div>
    </div>
  )
}

function LabControls({ children }) {
  return <div className="lab-controls">{children}</div>
}

function Control({ label, children }) {
  return (
    <div className="lab-control">
      <div className="lab-control-label">{label}</div>
      {children}
    </div>
  )
}

function Seg({ options, value, onChange }) {
  return (
    <div className="seg">
      {options.map(o => (
        <button
          key={o.value}
          className={`seg-btn${value === o.value ? ' on' : ''}`}
          onClick={() => onChange(o.value)}
        >{o.label}</button>
      ))}
    </div>
  )
}

function Punchline({ children }) {
  return <div className="lab-punchline"><span className="lab-punchline-mark">⤷</span><div>{children}</div></div>
}

function ForClass({ items }) {
  return (
    <div className="lab-forclass">
      <div className="lab-forclass-title">Run it, then argue about it</div>
      <ul>{items.map((q, i) => <li key={i}>{q}</li>)}</ul>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   LAB 01 · THE PROXY TRAP  (Module 2 — the Obermeyer mechanism)
   ════════════════════════════════════════════════════════════════════ */

function buildPatients(access) {
  const rand = mulberry32(20260706)
  const patients = []
  for (let i = 0; i < 60; i++) {
    const illness = Math.round(rand() * 100)
    patients.push({ id: `A${i}`, group: 'A', illness })
    patients.push({ id: `B${i}`, group: 'B', illness }) // identical illness distribution by construction
  }
  // spending = how sick you are × how much access you have (+ noise)
  return patients.map(p => ({
    ...p,
    spending: p.illness * (p.group === 'A' ? 1 : access) * (0.85 + 0.3 * rand()),
  }))
}

export function ProxyTrapLab() {
  const [access, setAccess] = useState(0.55)
  const [rankBy, setRankBy] = useState('spending')
  const capacity = 30

  const { patients, enrolledIds, stats } = useMemo(() => {
    const patients = buildPatients(access)
    const ranked = [...patients].sort((x, y) => (rankBy === 'spending' ? y.spending - x.spending : y.illness - x.illness))
    const enrolled = ranked.slice(0, capacity)
    const enrolledIds = new Set(enrolled.map(p => p.id))
    const enrA = enrolled.filter(p => p.group === 'A').length
    const enrB = capacity - enrA
    // among the 30 objectively sickest people, who actually got a slot?
    const sickest = [...patients].sort((x, y) => y.illness - x.illness).slice(0, capacity)
    const sickA = sickest.filter(p => p.group === 'A')
    const sickB = sickest.filter(p => p.group === 'B')
    const gotA = sickA.filter(p => enrolledIds.has(p.id)).length
    const gotB = sickB.filter(p => enrolledIds.has(p.id)).length
    return {
      patients, enrolledIds,
      stats: {
        enrA, enrB,
        sickA: sickA.length, sickB: sickB.length, gotA, gotB,
        missB: sickB.length - gotB,
        rateA: sickA.length ? (gotA / sickA.length) * 100 : 0,
        rateB: sickB.length ? (gotB / sickB.length) * 100 : 0,
      },
    }
  }, [access, rankBy])

  const strip = (group) => {
    const rows = patients.filter(p => p.group === group).sort((x, y) => y.illness - x.illness)
    return (
      <div className="dot-strip">
        <div className="dot-strip-label">Group {group}<span>sorted sickest → healthiest</span></div>
        <div className="dot-strip-dots">
          {rows.map(p => (
            <span
              key={p.id}
              className={`pdot${enrolledIds.has(p.id) ? ' pdot-in' : ''}`}
              style={{ opacity: 0.35 + (p.illness / 100) * 0.65 }}
              title={`${p.id} · illness ${p.illness} · spending ${p.spending.toFixed(0)}${enrolledIds.has(p.id) ? ' · ENROLLED' : ''}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="lab-body">
      <p className="lab-setup">
        A hospital has <strong>30 slots</strong> in a high-risk care program and <strong>120 patients</strong> — 60 in Group A, 60 in Group B, with <em>identical</em> illness distributions by construction. The algorithm below is the one from Obermeyer et al. (2019), reduced to its skeleton: it never sees group membership. It ranks patients by <strong>past healthcare spending</strong> — and Group B, with less access to care, spends less at every level of sickness.
      </p>

      <LabControls>
        <Control label={`Group B access to care: ${(access * 100).toFixed(0)}% of Group A's`}>
          <input type="range" min="0.3" max="1" step="0.05" value={access} onChange={e => setAccess(+e.target.value)} />
        </Control>
        <Control label="Rank patients by">
          <Seg
            value={rankBy}
            onChange={setRankBy}
            options={[
              { value: 'spending', label: 'Past spending (the deployed proxy)' },
              { value: 'illness', label: 'Actual illness (the intended target)' },
            ]}
          />
        </Control>
      </LabControls>

      <div className="lab-canvas">
        {strip('A')}
        {strip('B')}
        <div className="dot-key">
          <span><span className="pdot pdot-in" /> enrolled in program</span>
          <span><span className="pdot" /> not enrolled</span>
          <span>darker = sicker</span>
        </div>
      </div>

      <div className="lab-readout">
        <GapMeter
          label="Of each group's 30 sickest patients, share enrolled"
          a={stats.rateA} b={stats.rateB} aLabel="A" bLabel="B"
        />
        <div className="lab-figures">
          <div><span className="fig-num">{stats.enrA}</span><span className="fig-label">slots → Group A</span></div>
          <div><span className="fig-num">{stats.enrB}</span><span className="fig-label">slots → Group B</span></div>
          <div><span className="fig-num fig-flag">{stats.missB}</span><span className="fig-label">sick Group B patients passed over</span></div>
        </div>
      </div>

      <Punchline>
        {rankBy === 'spending'
          ? <>The model has no idea Group B exists. It only knows spending — and spending is sickness <em>times access</em>. Every point of access Group B lacks becomes invisibility in the ranking. In the real version of this system, the disparity was found across <strong>200 million patient cases</strong>.</>
          : <>Ranked by actual illness, the slots split roughly evenly — because the groups really are equally sick. The fix was never about removing race from the inputs. It was never there. The fix is choosing a target that measures what you mean.</>}
      </Punchline>

      <ForClass items={[
        'Set access to 30% and rank by spending. Then ask: would auditing the algorithm\u2019s code find this problem? What would you have to audit instead?',
        'The hospital says: "spending data is what we have; illness scores are expensive to collect." Is that an acceptable answer? Who pays the cost either way?',
        'Where else could "spending" stand in for "need"? (Think: school funding, policing, credit.)',
      ]} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   LAB 02 · SCREENED OUT  (Module 3 — proxies in a resume screener)
   ════════════════════════════════════════════════════════════════════ */

const SCREEN_FEATURES = [
  {
    key: 'name', label: 'Name on resume',
    options: [
      { value: 'a', label: 'Emily Walsh', w: +4 },
      { value: 'b', label: 'Lakisha Washington', w: -6 },
    ],
    why: 'The model was trained on ten years of past hires. Names that resembled past hires score higher. This exact effect: UW (2024) found white-associated names favored 85% of the time.',
    blindable: true,
  },
  {
    key: 'zip', label: 'Home zip code',
    options: [
      { value: 'a', label: '02445 (Brookline)', w: +3 },
      { value: 'b', label: '02121 (Dorchester)', w: -4 },
    ],
    why: 'Zip code correlates with race and income through decades of housing policy. The model reads it as "similarity to past successful hires."',
    blindable: true,
  },
  {
    key: 'gap', label: 'Employment history',
    options: [
      { value: 'a', label: 'Continuous', w: 0 },
      { value: 'b', label: '8-month gap', w: -7 },
    ],
    why: 'Gaps proxy for caregiving, illness, and disability. In Mobley v. Workday (June 2026), the court let a claim proceed that screening on exactly this can discriminate against people with disabilities.',
    blindable: false,
  },
  {
    key: 'path', label: 'Education path',
    options: [
      { value: 'a', label: '4-year direct', w: +2 },
      { value: 'b', label: 'Community college transfer', w: -3 },
    ],
    why: 'Same degree, same GPA. The path correlates with family income — and with who the company hired before.',
    blindable: false,
  },
]

export function ScreenerLab() {
  const BASE = 78
  const THRESHOLD = 75
  const [choices, setChoices] = useState({ name: 'a', zip: 'a', gap: 'a', path: 'a' })
  const [blind, setBlind] = useState(false)
  const [openWhy, setOpenWhy] = useState(null)

  const rows = SCREEN_FEATURES.map(f => {
    const opt = f.options.find(o => o.value === choices[f.key])
    const zeroed = blind && f.blindable
    return { ...f, opt, w: zeroed ? 0 : opt.w, zeroed }
  })
  const score = BASE + rows.reduce((s, r) => s + r.w, 0)
  const pass = score >= THRESHOLD

  return (
    <div className="lab-body">
      <p className="lab-setup">
        One candidate. Her qualifications — skills, degree, GPA, experience — are scored once, at <strong>{BASE} points</strong>, and never change in this lab. Everything below is what a screener trained on historical hiring data adds or subtracts <em>on top of</em> qualifications. The advance line sits at <strong>{THRESHOLD}</strong>. Every weight is visible; nothing is hidden.
      </p>

      <div className="screener-grid">
        <div className="screener-ledger">
          <div className="ledger-row ledger-base">
            <span>Qualifications (fixed)</span><span className="ledger-w">+{BASE}</span>
          </div>
          {rows.map(f => (
            <div key={f.key} className={`ledger-row${f.zeroed ? ' ledger-zeroed' : ''}`}>
              <div className="ledger-feature">
                <span className="ledger-feature-name">{f.label}
                  <button className="why-btn" onClick={() => setOpenWhy(openWhy === f.key ? null : f.key)}>why does this have a weight?</button>
                </span>
                <Seg
                  value={choices[f.key]}
                  onChange={v => setChoices(c => ({ ...c, [f.key]: v }))}
                  options={f.options.map(o => ({ value: o.value, label: o.label }))}
                />
                {openWhy === f.key && <div className="why-box">{f.why}</div>}
              </div>
              <span className={`ledger-w${f.w < 0 ? ' ledger-neg' : ''}`}>{f.zeroed ? 'blinded' : (f.w >= 0 ? `+${f.w}` : f.w)}</span>
            </div>
          ))}
          <label className="blind-toggle">
            <input type="checkbox" checked={blind} onChange={e => setBlind(e.target.checked)} />
            <span>"Blind" the screener — remove name and zip code</span>
          </label>
        </div>

        <div className="screener-verdict">
          <div className="score-scale">
            <div className="score-threshold" style={{ bottom: `${THRESHOLD}%` }}><span>advance line · {THRESHOLD}</span></div>
            <div className={`score-fill${pass ? '' : ' score-fail'}`} style={{ height: `${Math.max(0, Math.min(100, score))}%` }} />
          </div>
          <div className="verdict-panel">
            <div className="verdict-score">{score}</div>
            <div className={`verdict-stamp${pass ? ' stamp-pass' : ''}`}>{pass ? 'ADVANCE' : 'REJECT'}</div>
            <div className="verdict-note">qualifications: {BASE}, unchanged</div>
          </div>
        </div>
      </div>

      <Punchline>
        {blind
          ? <>Blinding helps — and then the proxies underneath keep working. The employment gap and education path still move the score, and both correlate with the same protected traits the blinding was meant to hide. Models do not need the sensitive column; they reconstruct it.</>
          : <>Flip every field from the first option to the second: identical qualifications travel from <strong>{BASE + 9}</strong> to <strong>{BASE - 20}</strong>. No one programmed "discriminate." The model just learned what past hires looked like — which is the definition of historical bias.</>}
      </Punchline>

      <ForClass items={[
        'Which single feature is doing the most damage? Is it the one you expected?',
        'A vendor says: "the human recruiter makes the final call, so the score is just advice." The 2025 UW study found humans absorb the model\u2019s bias even when warned. Does "human in the loop" fix anything here?',
        'Design the audit: what test would catch this screener before deployment? What data would you need to run it?',
      ]} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   LAB 03 · THE LOOP  (Module 5 — predictive policing feedback)
   ════════════════════════════════════════════════════════════════════ */

function runLoop({ initShare, dataSource, cap }) {
  const TRUE_A = 50, TRUE_B = 50 // identical true crime, by construction
  const detect = (share) => 0.9 * Math.pow(share, 0.7)
  let share = initShare
  const years = [{ year: 0, share, detA: null, detB: null }]
  for (let y = 1; y <= 10; y++) {
    let sigA, sigB
    if (dataSource === 'arrests') {
      sigA = TRUE_A * detect(share)
      sigB = TRUE_B * detect(1 - share)
    } else {
      // victim reports arrive whether or not a patrol is nearby
      sigA = TRUE_A * 0.65
      sigB = TRUE_B * 0.65
    }
    // Hot-spot allocation: departments concentrate patrols on whichever
    // district the numbers say is worse (over-responsive to the signal),
    // per the runaway-feedback-loop result of Ensign et al. (2018).
    let next = (sigA * sigA) / (sigA * sigA + sigB * sigB)
    if (cap) next = Math.max(share - 0.05, Math.min(share + 0.05, next))
    share = next
    years.push({ year: y, share, detA: Math.round(sigA), detB: Math.round(sigB) })
  }
  return years
}

export function LoopLab() {
  const [initShare, setInitShare] = useState(0.65)
  const [dataSource, setDataSource] = useState('arrests')
  const [cap, setCap] = useState(false)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timer = useRef(null)

  const years = useMemo(() => runLoop({ initShare, dataSource, cap }), [initShare, dataSource, cap])

  useEffect(() => { setStep(0); setPlaying(false) }, [initShare, dataSource, cap])
  useEffect(() => {
    if (!playing) { clearInterval(timer.current); return }
    timer.current = setInterval(() => {
      setStep(s => {
        if (s >= 10) { setPlaying(false); return s }
        return s + 1
      })
    }, 650)
    return () => clearInterval(timer.current)
  }, [playing])

  const now = years[step]
  const W = 560, H = 200, PAD = 34
  const x = (yr) => PAD + (yr / 10) * (W - PAD * 2)
  const y = (s) => H - PAD - s * (H - PAD * 2)
  const path = years.slice(0, step + 1).map((p, i) => `${i ? 'L' : 'M'}${x(p.year).toFixed(1)},${y(p.share).toFixed(1)}`).join(' ')

  return (
    <div className="lab-body">
      <p className="lab-setup">
        Two districts. <strong>Identical true crime: 50 incidents a year, each, every year</strong> — that is hard-coded, and nothing you do below changes it. The city has 100 patrols. Each year, the algorithm concentrates them on whichever district the <em>detected</em> numbers say is worse — and detection depends on where the patrols already were. Choose the starting split ("last decade's data"), press run, and watch what the algorithm proves to itself.
      </p>

      <LabControls>
        <Control label={`Year-one split from historical data: ${Math.round(initShare * 100)} / ${Math.round((1 - initShare) * 100)}`}>
          <input type="range" min="0.5" max="0.8" step="0.01" value={initShare} onChange={e => setInitShare(+e.target.value)} />
        </Control>
        <Control label="Algorithm learns from">
          <Seg
            value={dataSource}
            onChange={setDataSource}
            options={[
              { value: 'arrests', label: 'Arrest data (patrol-dependent)' },
              { value: 'reports', label: 'Victim reports (patrol-independent)' },
            ]}
          />
        </Control>
        <Control label="Policy intervention">
          <label className="blind-toggle" style={{ margin: 0 }}>
            <input type="checkbox" checked={cap} onChange={e => setCap(e.target.checked)} />
            <span>Cap reallocation at ±5 pts / year</span>
          </label>
        </Control>
      </LabControls>

      <div className="lab-canvas loop-canvas">
        <svg viewBox={`0 0 ${W} ${H}`} className="loop-chart" role="img" aria-label="District A's share of patrols over ten years">
          {[0.25, 0.5, 0.75, 1].map(g => (
            <g key={g}>
              <line x1={PAD} x2={W - PAD} y1={y(g)} y2={y(g)} className="loop-grid" />
              <text x={PAD - 6} y={y(g) + 3} className="loop-axis" textAnchor="end">{g * 100}%</text>
            </g>
          ))}
          <line x1={PAD} x2={W - PAD} y1={y(0.5)} y2={y(0.5)} className="loop-fairline" />
          <text x={W - PAD} y={y(0.5) - 5} className="loop-axis" textAnchor="end">equal split (the truth)</text>
          {years.map(p => (
            <text key={p.year} x={x(p.year)} y={H - PAD + 16} className="loop-axis" textAnchor="middle">Y{p.year}</text>
          ))}
          <path d={path} className="loop-line" />
          {step > 0 && years.slice(0, step + 1).map(p => (
            <circle key={p.year} cx={x(p.year)} cy={y(p.share)} r="3.5" className="loop-dot" />
          ))}
        </svg>
        <div className="loop-controls">
          <button className="lab-btn" onClick={() => setPlaying(p => !p)}>{playing ? 'Pause' : step >= 10 ? 'Replay ↺' : '▶ Run the decade'}</button>
          <button className="lab-btn lab-btn-ghost" onClick={() => { setPlaying(false); setStep(s => Math.min(10, s + 1)) }}>Step one year</button>
          <button className="lab-btn lab-btn-ghost" onClick={() => { setPlaying(false); setStep(0) }}>Reset</button>
        </div>
      </div>

      <div className="lab-readout">
        <div className="lab-figures loop-figures">
          <div><span className="fig-num">Y{now.year}</span><span className="fig-label">year</span></div>
          <div><span className="fig-num">{Math.round(now.share * 100)}%</span><span className="fig-label">patrols in District A</span></div>
          <div><span className="fig-num">{now.detA ?? '—'} / {now.detB ?? '—'}</span><span className="fig-label">detected crime A / B</span></div>
          <div><span className="fig-num">50 / 50</span><span className="fig-label">true crime A / B (always)</span></div>
        </div>
      </div>

      <Punchline>
        {dataSource === 'reports'
          ? <>Fed patrol-independent data, the loop unwinds: victim reports say the districts are the same, so the allocation drifts back toward even. Same algorithm, different data — the bias was never in the code.</>
          : cap
            ? <>The cap slows the spiral but does not stop it — it schedules it. Guardrails on the <em>rate</em> of a feedback loop change when the distortion arrives, not whether.</>
            : <>By year ten the arrest data "proves" District A is the dangerous one, and the proof is circular: the algorithm sent the patrols that generated the arrests that justified the patrols. A researcher who only sees year-ten data would call the allocation evidence-based. It is — the algorithm manufactured the evidence.</>}
      </Punchline>

      <ForClass items={[
        'Start at 51/49 — a nearly fair split. Where does the loop end up? What does that say about "small" initial biases?',
        'Arrest data measures policing; victim reports measure (some) crime. What does each data source miss? Is any crime data neutral?',
        'You are the city\u2019s auditor and only get year-ten data. Write the question you would ask that could reveal the loop.',
      ]} />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   LAB 04 · IMPOSSIBLE FAIRNESS  (Module 8 — metric incompatibility)
   ════════════════════════════════════════════════════════════════════ */

function buildScores(baseRate, seed) {
  const rand = mulberry32(seed)
  const gauss = () => {
    const u = Math.max(rand(), 1e-9), v = rand()
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
  }
  const people = []
  for (let i = 0; i < 240; i++) {
    const qualified = rand() < baseRate
    const mean = qualified ? 66 : 44
    const score = Math.max(0, Math.min(100, Math.round(mean + gauss() * 13)))
    people.push({ score, qualified })
  }
  return people
}

function metrics(people, threshold) {
  const sel = people.filter(p => p.score >= threshold)
  const pos = people.filter(p => p.qualified)
  const neg = people.filter(p => !p.qualified)
  const tp = sel.filter(p => p.qualified).length
  const fp = sel.length - tp
  return {
    selRate: (sel.length / people.length) * 100,
    tpr: pos.length ? (tp / pos.length) * 100 : 0,
    fpr: neg.length ? (fp / neg.length) * 100 : 0,
    ppv: sel.length ? (tp / sel.length) * 100 : 0,
    n: sel.length,
  }
}

function Hist({ people, threshold, color }) {
  const bins = Array.from({ length: 20 }, (_, i) => ({ q: 0, u: 0, lo: i * 5 }))
  people.forEach(p => {
    const b = Math.min(19, Math.floor(p.score / 5))
    p.qualified ? bins[b].q++ : bins[b].u++
  })
  const max = Math.max(...bins.map(b => b.q + b.u))
  const W = 260, H = 110, bw = W / 20
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="fair-hist" role="img" aria-label="Score distribution">
      {bins.map((b, i) => {
        const hq = (b.q / max) * (H - 14)
        const hu = (b.u / max) * (H - 14)
        return (
          <g key={i}>
            <rect x={i * bw + 1} y={H - hu} width={bw - 2} height={hu} className="hist-unq" />
            <rect x={i * bw + 1} y={H - hu - hq} width={bw - 2} height={hq} style={{ fill: color }} />
          </g>
        )
      })}
      <line x1={(threshold / 100) * W} x2={(threshold / 100) * W} y1="0" y2={H} className="hist-thresh" />
    </svg>
  )
}

export function FairnessLab() {
  const [tA, setTA] = useState(58)
  const [tB, setTB] = useState(58)
  const [linked, setLinked] = useState(true)
  const [baseB, setBaseB] = useState(0.42)

  const peopleA = useMemo(() => buildScores(0.55, 11), [])
  const peopleB = useMemo(() => buildScores(baseB, 22), [baseB])
  const mA = metrics(peopleA, tA)
  const mB = metrics(peopleB, linked ? tA : tB)
  const effTB = linked ? tA : tB

  const gaps = [
    { name: 'Demographic parity', desc: 'equal selection rates', a: mA.selRate, b: mB.selRate },
    { name: 'Equal opportunity', desc: 'equal true-positive rates', a: mA.tpr, b: mB.tpr },
    { name: 'Predictive parity', desc: 'equal precision of a "yes"', a: mA.ppv, b: mB.ppv },
  ]
  const satisfied = gaps.filter(g => Math.abs(g.a - g.b) <= 5).length

  return (
    <div className="lab-body">
      <p className="lab-setup">
        A model scores 240 people in each group and selects everyone above a threshold. The score distributions are identical <em>given qualification</em> — the only structural difference is the qualified base rate (Group A 55%, Group B adjustable), standing in for unequal prior opportunity. Your challenge: move the thresholds until all three fairness definitions hold at once (gaps ≤ 5 pts). This is the trade-off at the center of the COMPAS debate.
      </p>

      <LabControls>
        <Control label={`Group A threshold: ${tA}`}>
          <input type="range" min="30" max="85" value={tA} onChange={e => setTA(+e.target.value)} />
        </Control>
        <Control label={linked ? 'Group B threshold: linked to A (one rule for everyone)' : `Group B threshold: ${tB}`}>
          <input type="range" min="30" max="85" value={effTB} disabled={linked} onChange={e => setTB(+e.target.value)} />
          <label className="blind-toggle" style={{ marginTop: '.4rem' }}>
            <input type="checkbox" checked={!linked} onChange={e => { setLinked(!e.target.checked); setTB(tA) }} />
            <span>Allow group-specific thresholds (is that fair? discuss)</span>
          </label>
        </Control>
        <Control label={`Group B qualified base rate: ${Math.round(baseB * 100)}%`}>
          <input type="range" min="0.3" max="0.55" step="0.01" value={baseB} onChange={e => setBaseB(+e.target.value)} />
        </Control>
      </LabControls>

      <div className="fair-grid">
        <div className="fair-group">
          <div className="fair-group-head"><span>Group A</span><span className="fair-group-sub">base rate 55% · selects {mA.n}</span></div>
          <Hist people={peopleA} threshold={tA} color="var(--m1)" />
        </div>
        <div className="fair-group">
          <div className="fair-group-head"><span>Group B</span><span className="fair-group-sub">base rate {Math.round(baseB * 100)}% · selects {mB.n}</span></div>
          <Hist people={peopleB} threshold={effTB} color="var(--m5)" />
        </div>
      </div>

      <div className="lab-readout">
        <div className={`fair-scoreboard${satisfied === 3 ? ' fair-win' : ''}`}>
          <span className="fair-score-num">{satisfied} / 3</span>
          <span>fairness definitions satisfied{satisfied === 3 ? ' — check the base rates before you celebrate' : ''}</span>
        </div>
        {gaps.map(g => (
          <GapMeter key={g.name} label={`${g.name} — ${g.desc}`} a={g.a} b={g.b} aLabel="A" bLabel="B" />
        ))}
      </div>

      <Punchline>
        {satisfied === 3 && Math.abs(0.55 - baseB) > 0.02
          ? <>If you hit 3/3 with different base rates, look closely — the gaps are hiding inside the tolerance, not gone. Kleinberg, Mullainathan & Raghavan (2016) proved that when base rates differ, calibration and error-rate balance are <em>mathematically</em> incompatible except in degenerate cases. The 5-point tolerance is doing the work.</>
          : Math.abs(0.55 - baseB) <= 0.02
            ? <>You equalized the base rates — and suddenly everything is satisfiable. That is the theorem in reverse: the metrics only conflict because the world the data describes is already unequal. "Fixing the algorithm" and "fixing the base rates" are different projects, and only one of them is a slider.</>
            : <>Whichever two definitions you satisfy, the third breaks. That is not a bug in this lab — it is a proved theorem, and it means choosing a fairness metric is choosing <em>who bears which error</em>. Math sets the menu; values pick from it.</>}
      </Punchline>

      <ForClass items={[
        'In COMPAS, the vendor said "the scores are calibrated" and ProPublica said "the false-positive rates are unequal." Both were arithmetically correct. Who was right?',
        'Group-specific thresholds can equalize opportunity — and are often described as discrimination. Construct the strongest argument for each side.',
        'For a loan model, a bail model, and a college-admissions model: would you pick the same fairness definition? Why not?',
      ]} />
    </div>
  )
}

/* ── Lab plumbing: section, cards, overlay, hero demo ───────────── */

const LAB_BODIES = {
  proxy: ProxyTrapLab,
  screener: ScreenerLab,
  loop: LoopLab,
  fairness: FairnessLab,
}

export function LabBody({ id }) {
  const Body = LAB_BODIES[id]
  return Body ? <Body /> : null
}

export function LabsSection({ onOpenLab }) {
  return (
    <div id="labs">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">The Labs</h2>
          <span className="section-label">Four mechanisms, running live in your browser</span>
        </div>
        <p className="labs-lede">
          Every case study in this curriculum comes down to a mechanism — a proxy, a feedback loop, a threshold. Reading about a mechanism is not the same as holding it. Each lab below is a small, fully transparent model of one documented harm: no black boxes, no hidden weights, every number traceable by hand. They run standalone as workshop centerpieces, or embedded inside their home module.
        </p>
        <div className="labs-grid">
          {LABS.map(lab => (
            <button key={lab.id} className="lab-card pressable" style={{ '--lc': `var(--m${lab.module})` }} onClick={() => onOpenLab(lab.id)}>
              <div className="lab-card-top">
                <span className="lab-card-num">LAB {lab.num}</span>
                <span className="lab-card-method">{lab.method}</span>
              </div>
              <h3 className="lab-card-title">{lab.title}</h3>
              <p className="lab-card-claim">{lab.claim}</p>
              <div className="lab-card-footer">
                <span>Module 0{lab.module} · ~{lab.minutes} min</span>
                <span className="lab-card-open">Run the lab →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LabOverlay({ openLab, onClose }) {
  const lab = LABS.find(l => l.id === openLab)
  return (
    <div className={`module-detail lab-overlay${openLab ? ' open' : ''}`} style={lab ? { '--mdc': `var(--m${lab.module})` } : undefined}>
      {lab && (
        <>
          <div className="module-detail-header">
            <div>
              <div className="module-detail-meta">Lab {lab.num} · lives in Module 0{lab.module} · ~{lab.minutes} min</div>
              <h2>{lab.title}</h2>
            </div>
            <div className="detail-header-actions">
              <button className="detail-btn" onClick={onClose}>✕ Close</button>
            </div>
          </div>
          <div className="module-detail-body">
            <LabBody id={lab.id} />
          </div>
        </>
      )}
    </div>
  )
}

/* Hero micro-demo: the thesis, interactive, in four seconds. */
export function HeroScreenerDemo({ onOpenLab }) {
  const [alt, setAlt] = useState(false)
  const score = alt ? 72 : 82
  const pass = score >= 75
  return (
    <div className="hero-demo">
      <div className="hero-demo-label">Live from Lab 02 — a resume screener with visible weights</div>
      <div className="hero-demo-card">
        <div className="hero-resume">
          <div className="hero-resume-name">{alt ? 'Lakisha Washington' : 'Emily Walsh'}</div>
          <div className="hero-resume-lines">
            <span>B.S. Computer Science · GPA 3.8</span>
            <span>3 yrs experience · Python, SQL</span>
            <span>Qualifications score: 78 <em>(fixed)</em></span>
          </div>
          <button className="hero-swap lab-btn" onClick={() => setAlt(a => !a)}>
            ⇄ Swap only the name
          </button>
        </div>
        <div className="hero-verdict">
          <div className="hero-score-track">
            <div className="hero-score-thresh" style={{ left: '75%' }} />
            <div className={`hero-score-fill${pass ? '' : ' score-fail'}`} style={{ width: `${score}%` }} />
          </div>
          <div className="hero-verdict-row">
            <span className="hero-score-num">{score}</span>
            <span className={`verdict-stamp${pass ? ' stamp-pass' : ''}`}>{pass ? 'ADVANCE' : 'REJECT'}</span>
          </div>
          <button className="hero-demo-more" onClick={() => onOpenLab('screener')}>See every weight in the full lab →</button>
        </div>
      </div>
    </div>
  )
}
