export default function Nav({ teacherMode, onToggleTeacher }) {
  return (
    <nav>
      <a className="nav-logo" href="#">Databout <span>You</span></a>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#labs">labs</a></li>
          <li><a href="#modules">modules</a></li>
          <li><a href="#projects">projects</a></li>
          <li><a href="#bibliography">sources</a></li>
          <li><a href="#colophon">about</a></li>
        </ul>
        <button
          className={`teacher-toggle${teacherMode ? ' on' : ''}`}
          onClick={onToggleTeacher}
          aria-pressed={teacherMode}
          title="Show facilitator guides, pacing notes, and answer guidance"
        >
          <span className="knob" aria-hidden="true" />
          Teacher Mode
        </button>
      </div>
    </nav>
  )
}
