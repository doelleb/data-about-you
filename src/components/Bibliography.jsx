import { bibGroups } from '../data'

export default function Bibliography() {
  return (
    <div id="bibliography" className="bib-section">
      <div className="bib-inner">
        <div className="section-header">
          <h2 className="section-title" style={{ color: 'var(--paper)' }}>Full Bibliography</h2>
          <span className="section-label">Verified as of July 2026</span>
        </div>
        {bibGroups.map((group) => (
          <div key={group.title} className="bib-group">
            <div className="bib-group-title">{group.title}</div>
            {group.entries.map((entry, i) => (
              <div key={i} className="bib-entry">
                {entry.text}{' '}
                {entry.url && <a href={entry.url} target="_blank" rel="noreferrer">{entry.urlLabel}</a>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
