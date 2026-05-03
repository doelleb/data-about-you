export default function Hero({ onOpenModule }) {
  const handleClick = (e, num) => {
    e.preventDefault()
    onOpenModule(num)
  }

  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-eyebrow fade-up">MIT Leadership Training Institute</div>
        <h1 className="fade-up delay-1">
          <em>Data About You</em>
          Databout You
        </h1>
        <p className="hero-sub fade-up delay-2">A curriculum on AI bias for high schoolers — from healthcare to hiring, facial recognition to financial advice.</p>
        <div className="hero-meta fade-up delay-3">
          <div><strong>Author</strong> — Doelle Bhattacharya, Brookline High School '28</div>
          <div><strong>Institution</strong> — MIT Leadership Training Institute, Spring 2026</div>
          <div><strong>Scope</strong> — 8 modules · 90 min each · Grades 9–12</div>
        </div>
      </div>
      <div className="hero-right fade-up delay-2">
        <div className="hero-right-title">Jump to module</div>
        {[
          [1, 'What Is AI Bias?', false],
          [2, 'AI Bias in Healthcare', false],
          [3, 'AI Bias in Hiring', false],
          [4, 'AI Bias in Financial Advice', false],
          [5, 'Facial Recognition & Policing', true],
          [6, 'Social Media Algorithms', true],
          [7, 'Policy, Regulation & Advocacy', true],
          [8, 'How to Build Fairer AI', true],
        ].map(([num, title, cs]) => (
          <a
            key={num}
            href="#"
            className={`module-nav-card${cs ? ' cs' : ''}`}
            onClick={(e) => handleClick(e, num)}
          >
            <span className="module-num">0{num}</span>
            <span className="module-nav-title">{title}</span>
            {cs
              ? <span className="cs-badge">CS Rec.</span>
              : <span className="tag pill-green">No CS needed</span>
            }
          </a>
        ))}
      </div>
    </section>
  )
}
