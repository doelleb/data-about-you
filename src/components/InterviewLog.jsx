import { useState, useEffect } from 'react'
import { confettiBurst } from '../confetti'

export default function InterviewLog({ num, target, questions }) {
  const [fields, setFields] = useState({ name: '', org: '', date: '', surprise: '', takeaways: '', connection: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`databout-log-${num}`)
      if (stored) setFields(prev => ({ ...prev, ...JSON.parse(stored) }))
    } catch (e) {}
  }, [num])

  const handleSave = (e) => {
    if (!fields.name && !fields.takeaways) {
      alert('Please fill in at least the interviewee name and key takeaways before saving.')
      return
    }
    try {
      localStorage.setItem(`databout-log-${num}`, JSON.stringify({ ...fields, saved: new Date().toLocaleDateString() }))
    } catch (err) {}
    confettiBurst(e.clientX, e.clientY)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }))

  return (
    <div className="interview-corner">
      <div className="interview-header">
        <span className="interview-icon">🎙</span>
        <h3 className="interview-title">Informational Interview Corner</h3>
      </div>
      <div className="interview-target">
        <strong>Suggested target:</strong> {target}
      </div>
      {questions && questions.length > 0 && (
        <ul className="question-list">
          {questions.map((q, i) => (
            <li key={i}><span className="q-num">Q{i + 1}</span><span>{q}</span></li>
          ))}
        </ul>
      )}
      <div className="interview-log">
        <div className="log-title">Interview Log</div>
        <div className="log-fields">
          <div className="log-field"><label>Name</label><input type="text" value={fields.name} onChange={set('name')} /></div>
          <div className="log-field"><label>Title / Organization</label><input type="text" value={fields.org} onChange={set('org')} /></div>
          <div className="log-field"><label>Date</label><input type="date" value={fields.date} onChange={set('date')} /></div>
          {num === 1 || num === 2 ? (
            <>
              <div className="log-field"><label>One thing that surprised you</label><input type="text" value={fields.surprise} onChange={set('surprise')} /></div>
              <div className="log-field full-width"><label>Key takeaways</label><textarea rows="3" value={fields.takeaways} onChange={set('takeaways')} /></div>
              <div className="log-field full-width"><label>How this connects to Module {num}</label><textarea rows="2" value={fields.connection} onChange={set('connection')} /></div>
            </>
          ) : (
            <div className="log-field full-width"><label>Key takeaways</label><textarea rows="3" value={fields.takeaways} onChange={set('takeaways')} /></div>
          )}
        </div>
        <button className={`save-log-btn${saved ? ' saved' : ''}`} onClick={handleSave}>
          {saved ? '✓ Saved' : 'Save Log Entry'}
        </button>
      </div>
    </div>
  )
}
