import { HERO_STATS, MODULE_COLORS, modules } from '../data'
import { HeroScreenerDemo } from './Labs'

export default function Hero({ onOpenModule, onOpenLab }) {
  return (
    <section className="hero">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-left">
        <div className="hero-eyebrow fade-up">A curriculum built like an audit</div>
        <h1 className="fade-up delay-1">
          Same input.<br /><em>Different</em><br />output.
        </h1>
        <p className="hero-sub fade-up delay-2">
          <strong>Databout You</strong> is an eight-module, evidence-first curriculum on AI bias for high schoolers and the teachers who run it — with four live simulations of the mechanisms behind the headlines, from healthcare to hiring, policing to policy.
        </p>
        <div className="hero-actions fade-up delay-3">
          <a href="#labs" className="hero-cta">Run the labs</a>
          <a href="#modules" className="hero-cta hero-cta-ghost">Browse the modules</a>
        </div>
        <div className="hero-meta fade-up delay-3">
          <div><strong>Author</strong> Doelle Bhattacharya, Brookline High School '28</div>
          <div><strong>Built at</strong> MIT Leadership Training Institute, 2026</div>
          <div><strong>Scope</strong> 8 modules · 4 labs · 90 min each · grades 9–12 · free</div>
        </div>
      </div>
      <div className="hero-right fade-up delay-2">
        <HeroScreenerDemo onOpenLab={onOpenLab} />
        <div className="hero-stats">
          <div className="hero-stats-title">The record, from the sources</div>
          {HERO_STATS.map((s) => {
            const mod = modules.find(m => m.num === s.module)
            return (
              <button key={s.module} className="stat-row" onClick={() => onOpenModule(s.module)} title={`Open Module 0${s.module}: ${mod.title}`}>
                <span className="stat-value" style={{ color: MODULE_COLORS[s.module] }}>{s.value}</span>
                <span className="stat-label">{s.label} <span className="stat-chip">M0{s.module} →</span></span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
