import { useEffect, useState } from 'react'
import { HERO_STATS, MODULE_COLORS, modules } from '../data'

export default function Hero({ onOpenModule }) {
  const [grown, setGrown] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGrown(true), 350)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-eyebrow fade-up">MIT Leadership Training Institute</div>
        <h1 className="fade-up delay-1">
          Data<br />About<br /><span className="accent">You</span>
        </h1>
        <p className="hero-sub fade-up delay-2">
          An eight-module curriculum on AI bias for high schoolers and the teachers who run it —
          from healthcare to hiring, facial recognition to financial advice.
        </p>
        <div className="hero-meta fade-up delay-3">
          <div><strong>Author</strong> — Doelle Bhattacharya, Brookline High School '28</div>
          <div><strong>Institution</strong> — MIT Leadership Training Institute, Spring 2026</div>
          <div><strong>Scope</strong> — 8 modules · 90 min each · Grades 9–12</div>
        </div>
      </div>
      <div className="hero-right fade-up delay-2">
        <div className="stat-chart-title">The numbers are the argument</div>
        {HERO_STATS.map((s) => {
          const mod = modules.find(m => m.num === s.module)
          const color = MODULE_COLORS[s.module]
          return (
            <button
              key={s.module}
              className="stat-row"
              onClick={() => onOpenModule(s.module)}
              title={`Open Module 0${s.module}: ${mod.title}`}
            >
              <div className="stat-value" style={{ color }}>
                {s.value}
                <span className="stat-chip" style={{ background: color }}>M0{s.module} →</span>
              </div>
              <div className="stat-bar-track">
                <div className="stat-bar" style={{ background: color, width: grown ? `${s.bar}%` : 0 }} />
              </div>
              <div className="stat-label">{s.label}</div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
