const PATHS = [
  {
    k: 'course', title: 'The full course',
    desc: 'Eight 90-minute modules in sequence, three running projects, and a practitioner interview log that builds across the semester.',
    spec: '8 weeks · club or elective',
  },
  {
    k: 'workshop', title: 'One workshop',
    desc: 'Every module stands alone. Pick one, open Teacher Mode for the facilitator guide and pacing bar, print the handout, teach it tomorrow.',
    spec: '90 min · zero prep beyond the guide',
  },
  {
    k: 'lab', title: 'Just a lab',
    desc: 'Fifteen minutes with one simulation is a complete lesson: run it live on a projector, argue about the discussion prompts, done.',
    spec: '10–20 min · no accounts, no installs',
  },
]

export default function Pathways() {
  return (
    <div className="pathways">
      <div className="section">
        <div className="pathways-grid">
          {PATHS.map((p, i) => (
            <div key={p.k} className="pathway">
              <div className="pathway-head"><span className="pathway-way">Way {i + 1}</span><span className="pathway-spec">{p.spec}</span></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
