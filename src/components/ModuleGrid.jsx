import { modules, MODULE_COLORS } from '../data'

export default function ModuleGrid({ onOpenModule }) {
  return (
    <div id="modules">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Eight Modules</h2>
          <span className="section-label">Curriculum · 90 min each</span>
        </div>
        <div className="modules-grid">
          {modules.map((mod) => (
            <div
              key={mod.num}
              className="module-card pressable"
              style={{ '--mc': MODULE_COLORS[mod.num] }}
              onClick={() => onOpenModule(mod.num)}
            >
              <div className="module-card-band" />
              <div className="module-card-inner">
                <div className="module-card-top">
                  <span className="module-index">MODULE 0{mod.num}</span>
                  <span className={`module-badge ${mod.cs ? 'badge-cs' : 'badge-no-cs'}`}>
                    {mod.cs ? 'CS Recommended' : mod.fintech ? 'No CS · Fintech Workshop' : 'No CS Required'}
                  </span>
                </div>
                <h3 className="module-card-title">
                  {mod.title}
                  {mod.subtitle && <><br />{mod.subtitle}</>}
                </h3>
                <p className="module-card-desc">{mod.desc}</p>
                <div>
                  {mod.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="module-card-footer">
                <span>90 min{mod.lab && <span className="lab-flag"> · ⚗ Lab: {mod.lab}</span>}</span>
                <span className="module-open-btn">Open Module →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
