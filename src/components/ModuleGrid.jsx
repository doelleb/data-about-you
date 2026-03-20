import { modules } from '../data'

export default function ModuleGrid({ onOpenModule }) {
  return (
    <div id="modules">
      <div className="modules-section">
        <div className="section">
          <div className="section-header">
            <span className="section-label">Curriculum</span>
            <h2 className="section-title">Eight Modules</h2>
          </div>
          <div className="modules-grid">
            {modules.map((mod) => (
              <div
                key={mod.num}
                className="module-card"
                onClick={() => onOpenModule(mod.num)}
              >
                <div className="module-card-inner">
                  <div className="module-card-top">
                    <span className="module-index">Module 0{mod.num}</span>
                    <span className={`module-badge ${mod.cs ? 'badge-cs' : 'badge-no-cs'}`}>
                      {mod.cs ? 'CS Recommended' : mod.num === 4 ? 'No CS Required · Fintech Workshop' : 'No CS Required'}
                    </span>
                  </div>
                  <h3 className="module-card-title">
                    {mod.title}
                    {mod.subtitle && <><br />{mod.subtitle}</>}
                  </h3>
                  <p className="module-card-desc">{mod.desc}</p>
                  <div>
                    {mod.tags.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="module-card-footer">
                  <span>90 min</span>
                  <span className="module-open-btn">Open Module →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
