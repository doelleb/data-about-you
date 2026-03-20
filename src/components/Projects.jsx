export default function Projects() {
  return (
    <div id="projects">
      <div className="projects-bg">
        <div className="section">
          <div className="section-header" style={{ borderColor: '#444' }}>
            <span className="section-label" style={{ color: '#888' }}>Cross-Curriculum</span>
            <h2 className="section-title" style={{ color: 'var(--paper)' }}>Three Running Projects</h2>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-num">01</div>
              <h3 className="project-title">The AI Careers Database</h3>
              <p className="project-desc">A living, collaboratively maintained spreadsheet mapping careers at the intersection of AI and fairness. Students add entries throughout the curriculum — from algorithmic auditor to clinical AI researcher. By Module 8, the database should have 20+ distinct roles across sectors.</p>
              <div className="project-tag">Google Sheets · Ongoing</div>
            </div>
            <div className="project-card">
              <div className="project-num">02</div>
              <h3 className="project-title">The Community Bias Audit</h3>
              <p className="project-desc">A running document where students log real examples of AI bias encountered in news and research. Each entry includes the domain, harm, bias type, and source link. End-of-course deliverable: a one-page analysis of one selected entry.</p>
              <div className="project-tag">Google Docs · 1 entry/week</div>
            </div>
            <div className="project-card">
              <div className="project-num">03</div>
              <h3 className="project-title">The Policy Tracker</h3>
              <p className="project-desc">A collaboratively maintained tracker of current AI bias legislation — Colorado SB 24-205, the EU AI Act, EEOC guidance, FDA pulse oximeter standards. Students add entries in Modules 7 and 8. A real-world reference for college apps and advocacy work.</p>
              <div className="project-tag">Google Sheets · Updated Modules 7–8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
