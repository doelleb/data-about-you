export default function Colophon() {
  return (
    <div id="colophon" className="colophon">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">About this project</h2>
          <span className="section-label">Colophon</span>
        </div>
        <div className="colophon-grid">
          <div className="colophon-main">
            <p>
              Databout You started as a capstone at the MIT Leadership Training Institute and grew into the thing I wished had existed when I started doing AI fairness research: a curriculum where the evidence is primary-sourced, the mechanisms are things you can touch, and a teacher with no CS background can run a rigorous 90 minutes on it tomorrow.
            </p>
            <p>
              The design principle throughout is <em>no black boxes</em>. Every simulation on this site is a model small enough to read; every statistic links to the study it came from; every facilitator note says what to do when the discussion gets hard, because it will. The labs are deliberately simple — a proxy, a ledger of weights, a feedback loop, a threshold — since the uncomfortable point of the research is that the simple version already produces the documented harms.
            </p>
            <p>
              It comes out of my own research on how bias enters AI systems during training, including GUARD, a reward-model debiasing method presented at NeurIPS 2025 workshops and EMNLP 2025, which is where Module 8's material on fixing the reward signal comes from. If you teach with this, find an error, or want a workshop run at your school or club, I want to hear about it.
            </p>
          </div>
          <div className="colophon-side">
            <div className="colophon-fact"><span>Author</span>Doelle Bhattacharya — Brookline High School '28, researcher (GUARD, NeurIPS/EMNLP 2025 workshops)</div>
            <div className="colophon-fact"><span>Built with</span>React + Vite, hand-rolled SVG, seeded simulations, zero trackers, zero accounts</div>
            <div className="colophon-fact"><span>Citations</span>Every source verified July 2026 — including the ones that changed mid-course (Colorado repealed and replaced its AI Act while this was being written)</div>
            <div className="colophon-fact"><span>License</span>Free for any classroom, club, or workshop. Attribution appreciated, permission not required</div>
          </div>
        </div>
      </div>
    </div>
  )
}
