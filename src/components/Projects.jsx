const PROJECTS = [
  {
    num: '01', color: 'var(--m1)', title: 'The AI Careers Database',
    desc: 'A living, collaboratively maintained spreadsheet mapping careers at the intersection of AI and fairness. Students add entries throughout the curriculum — from algorithmic auditor to clinical AI researcher. By Module 8, the database should have 20+ distinct roles across sectors.',
    tag: 'Google Sheets · Ongoing',
  },
  {
    num: '02', color: 'var(--m6)', title: 'The Community Bias Audit',
    desc: 'A running document where students log real examples of AI bias encountered in news and research. Each entry includes the domain, harm, bias type, and source link. End-of-course deliverable: a one-page analysis of one selected entry.',
    tag: 'Google Docs · 1 entry/week',
  },
  {
    num: '03', color: 'var(--m7)', title: 'The Policy Tracker',
    desc: "A collaboratively maintained tracker of AI bias regulation in motion — Colorado's repeal-and-replace of its AI Act (SB 26-189, effective January 2027), the EU AI Act's rescheduled high-risk deadlines (December 2027), EEOC guidance, FDA pulse oximeter standards. Students add entries in Modules 7 and 8.",
    tag: 'Google Sheets · Updated Modules 7–8',
  },
]

export default function Projects() {
  return (
    <div id="projects">
      <div className="projects-bg">
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Three Running Projects</h2>
            <span className="section-label">Cross-Curriculum</span>
          </div>
          <div className="projects-grid">
            {PROJECTS.map(p => (
              <div key={p.num} className="project-card" style={{ '--pc': p.color }}>
                <div className="project-num">{p.num}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tag">{p.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
