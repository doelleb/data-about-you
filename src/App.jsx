import { useState } from "react";

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const MODULE_META = [
  { num: 1, short: "Foundations",    title: "What Is AI, Really?",             color: "#1E3A5F", light: "#EFF6FF", accent: "#3B82F6" },
  { num: 2, short: "Roots of Bias",  title: "Where Does Bias Come From?",      color: "#1E4034", light: "#ECFDF5", accent: "#10B981" },
  { num: 3, short: "Built-In Bias",  title: "How Bias Gets Built In",          color: "#4C1D95", light: "#F5F3FF", accent: "#8B5CF6" },
  { num: 4, short: "Domain Impact",  title: "AI Bias Across Your Life",        color: "#7C2D12", light: "#FFF7ED", accent: "#EA580C" },
  { num: 5, short: "Follow Money",   title: "Follow the Money",                color: "#164E63", light: "#F0F9FF", accent: "#0284C7" },
  { num: 6, short: "Who Builds It",  title: "Who Builds This Stuff?",          color: "#3B0764", light: "#FAF5FF", accent: "#9333EA" },
  { num: 7, short: "Policy",         title: "AI Policy & Governance",          color: "#881337", light: "#FFF1F2", accent: "#E11D48" },
  { num: 8, short: "Take Action",    title: "Push Back & Take Action",         color: "#134E4A", light: "#F0FDFA", accent: "#0D9488" },
];

// ─── SHARED PRIMITIVES ───────────────────────────────────────────────────────
function PageHeader({ module, resourceTitle, resourceType }) {
  return (
    <div style={{ borderBottom: `3px solid ${module.color}`, paddingBottom: 10, marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: module.accent, textTransform: "uppercase", fontFamily: "Courier New, monospace", marginBottom: 2 }}>
            MODULE {module.num} · {module.short} · {resourceType}
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: module.color, fontFamily: "'Georgia', serif", lineHeight: 1.1 }}>
            {resourceTitle}
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: 10, color: "#9CA3AF", fontFamily: "Courier New, monospace" }}>
          DATA ABOUT YOU<br />Brookline High School · Spring 2026
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color, fontFamily: "Courier New, monospace", borderBottom: `1px solid ${color}`, paddingBottom: 4, marginBottom: 10 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function InfoBox({ label, content, color, light }) {
  return (
    <div style={{ background: light, border: `1px solid ${color}`, borderLeft: `4px solid ${color}`, borderRadius: 4, padding: "10px 14px", marginBottom: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color, fontFamily: "Courier New, monospace", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: "#1F2937", fontFamily: "'Georgia', serif", lineHeight: 1.5 }}>{content}</div>
    </div>
  );
}

// ─── INTERACTIVE ACTIVITY ───────────────────────────────────────────────────

function InteractiveHiringModel({ m }) {
  const applicants = [
    { id: 1, degree: "CS", years: 3, activity: "Chess Club", hired: true },
    { id: 2, degree: "English", years: 1, activity: "Volleyball Captain", hired: false },
    { id: 3, degree: "CS", years: 2, activity: "Robotics Club", hired: true },
    { id: 4, degree: "Biology", years: 0, activity: "Softball League", hired: false },
    { id: 5, degree: "Math", years: 4, activity: "Track & Field", hired: true },
    { id: 6, degree: "CS", years: 1, activity: "Field Hockey", hired: false },
    { id: 7, degree: "CS", years: 3, activity: "Coding Club", hired: true },
    { id: 8, degree: "English", years: 2, activity: "Girl Scouts Volunteer", hired: false },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const next = () => {
    if (currentIndex < applicants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setComplete(true);
    }
  };

  const app = applicants[currentIndex];

  return (
    <div style={{ border: `1px solid ${m.color}`, borderRadius: 8, overflow: "hidden", background: "#fff" }}>
      <div style={{ background: m.color, color: "#fff", padding: "8px 16px", fontSize: 11, fontWeight: 700, fontFamily: "Courier New" }}>
        TRAINING SIMULATION: DATASET_HR_2026
      </div>
      <div style={{ padding: 24, textAlign: "center" }}>
        {!complete ? (
          <div>
            <div style={{ fontSize: 11, color: m.accent, marginBottom: 16 }}>RECORD {currentIndex + 1} OF {applicants.length}</div>
            <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 20, maxWidth: 300, margin: "0 auto 20px", textAlign: "left" }}>
              <div style={{ marginBottom: 8 }}><strong>Degree:</strong> {app.degree}</div>
              <div style={{ marginBottom: 8 }}><strong>Experience:</strong> {app.years} yrs</div>
              <div style={{ marginBottom: 12 }}><strong>Extracurricular:</strong> {app.activity}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: app.hired ? "#166534" : "#991B1B" }}>
                DECISION: {app.hired ? "✓ HIRED" : "✗ NOT HIRED"}
              </div>
            </div>
            <button 
              onClick={next}
              style={{ background: m.color, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 4, cursor: "pointer", fontWeight: 700, fontFamily: "Courier New" }}
            >
              PROCESS NEXT RECORD
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "left" }}>
            <div style={{ color: "#166534", fontWeight: 800, marginBottom: 12 }}>✓ MODEL TRAINING COMPLETE</div>
            <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.5, marginBottom: 16 }}>
              The model has finished scanning the historical records. Did you notice which pattern it prioritizes?
            </p>
            <InfoBox 
              label="The Hidden Proxy" 
              content="The algorithm wasn't given a list of names or demographic labels. Instead, it learned that certain activities (like Field Hockey or Volleyball) were statistically linked to lower hiring rates in the past. Even though these words are just hobbies, the AI uses them as a 'proxy variable' to filter based on historical patterns, effectively excluding specific groups without ever seeing a category label." 
              color={m.accent} 
              light={m.light} 
            />
            <p style={{ fontSize: 11, fontStyle: "italic", color: "#6B7280" }}>
              This mirrors a real-world case where an automated hiring tool penalized resumes containing the names of specific single-sex colleges and activities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MODULE COMPONENTS ──────────────────────────────────────────────────────

function Module1Resources({ m }) {
  return (
    <div>
      <PageHeader module={m} resourceTitle="The Foundation" resourceType="Interactive Activity" />
      <Section title="Activity: Train a Simple Model" color={m.accent}>
        <p style={{ fontSize: 13, color: "#4B5563", marginBottom: 16, lineHeight: 1.5 }}>
          Run the simulation below. Your goal is to find the statistical pattern the model is using to make decisions. <strong>Pay close attention to the extracurricular activities.</strong>
        </p>
        <InteractiveHiringModel m={m} />
      </Section>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const activeModule = MODULE_META.find(m => m.num === activeTab);

  return (
    <div style={{ minHeight: "100vh", background: "#F3F4F6", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", background: "#fff", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", borderRadius: 8 }}>
        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid #E5E7EB" }}>
          {MODULE_META.map(m => (
            <button
              key={m.num}
              onClick={() => setActiveTab(m.num)}
              style={{
                padding: "12px 16px",
                border: "none",
                background: activeTab === m.num ? m.light : "transparent",
                color: activeTab === m.num ? m.color : "#6B7280",
                cursor: "pointer",
                fontWeight: activeTab === m.num ? 700 : 400,
                fontSize: 11,
                fontFamily: "Courier New"
              }}
            >
              M{m.num}
            </button>
          ))}
        </div>

        <div style={{ padding: 40 }}>
          {activeTab === 1 && <Module1Resources m={activeModule} />}
          {activeTab > 1 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: activeModule.color }}>{activeModule.title}</div>
              <p style={{ color: "#6B7280", marginTop: 12 }}>Curriculum content for this module is being synchronized...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}