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
          DATA ABOUT YOU<br />datayou.edu · Spring 2026
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

function WriteBox({ label, lines = 3, wide = false }) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <div style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginBottom: 4, fontFamily: "'Georgia', serif" }}>{label}</div>}
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ borderBottom: "1px solid #D1D5DB", height: 22, marginBottom: 2 }} />
      ))}
    </div>
  );
}

function CheckBox({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
      <div style={{ width: 14, height: 14, border: "1.5px solid #6B7280", borderRadius: 2, flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: 12, color: "#374151", fontFamily: "'Georgia', serif", lineHeight: 1.4 }}>{label}</span>
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

function Card({ children, color, light, style = {} }) {
  return (
    <div style={{ border: `1px solid ${color}`, background: light, borderRadius: 6, padding: 14, marginBottom: 12, ...style }}>
      {children}
    </div>
  );
}

function Table({ headers, rows, color }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, marginBottom: 14 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ background: color, color: "#fff", padding: "6px 8px", textAlign: "left", fontFamily: "Courier New, monospace", fontWeight: 700, fontSize: 10, letterSpacing: 1 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: ri % 2 === 0 ? "#F9FAFB" : "#fff" }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: "7px 8px", borderBottom: "1px solid #E5E7EB", color: "#1F2937", fontFamily: "'Georgia', serif", verticalAlign: "top" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ScenarioCard({ number, text, questions, module }) {
  return (
    <div style={{ border: `2px solid ${module.color}`, borderRadius: 6, overflow: "hidden", marginBottom: 16 }}>
      <div style={{ background: module.color, padding: "8px 14px" }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 12, fontFamily: "Courier New, monospace", letterSpacing: 1 }}>💬 DISCUSSION SCENARIO {number}</span>
      </div>
      <div style={{ background: module.light, padding: "12px 14px", borderBottom: `1px solid ${module.color}` }}>
        <p style={{ fontSize: 12, color: "#1F2937", fontFamily: "'Georgia', serif", lineHeight: 1.6, margin: 0 }}>{text}</p>
      </div>
      <div style={{ background: "#fff", padding: "12px 14px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: module.accent, fontFamily: "Courier New, monospace", marginBottom: 8 }}>DISCUSSION QUESTIONS</div>
        {questions.map((q, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#1F2937", marginBottom: 4 }}><strong>{i + 1}.</strong> {q}</div>
            <div style={{ borderBottom: "1px solid #D1D5DB", height: 18, marginBottom: 2 }} />
            <div style={{ borderBottom: "1px solid #D1D5DB", height: 18 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RESOURCE DIVIDER ────────────────────────────────────────────────────────
function ResourceDivider({ label, module }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0 16px" }}>
      <div style={{ flex: 1, height: 1, background: module.color, opacity: 0.3 }} />
      <div style={{ padding: "3px 12px", background: module.color, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 2, fontFamily: "Courier New, monospace", borderRadius: 20 }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: module.color, opacity: 0.3 }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MODULE RESOURCES
// ═══════════════════════════════════════════════════════════════════════════

function Module1Resources({ m }) {
  return (
    <div>
      {/* RESOURCE 1: 24 Hours of AI Worksheet */}
      <PageHeader module={m} resourceTitle="24 Hours of AI" resourceType="Activity Worksheet" />
      <Section title="Instructions" color={m.accent}>
        <InfoBox label="Your Task" content="For the next 10 minutes, think back over the last 24 hours. List every app, website, or digital service you used — then answer the questions about each one." color={m.accent} light={m.light} />
      </Section>
      <Section title="Your 24 Hours" color={m.accent}>
        <Table
          headers={["App / Platform / Service", "What did you use it for?", "Does it use AI?", "What might it be deciding about you?"]}
          rows={[
            ["", "", "☐ Yes  ☐ No  ☐ Not sure", ""],
            ["", "", "☐ Yes  ☐ No  ☐ Not sure", ""],
            ["", "", "☐ Yes  ☐ No  ☐ Not sure", ""],
            ["", "", "☐ Yes  ☐ No  ☐ Not sure", ""],
            ["", "", "☐ Yes  ☐ No  ☐ Not sure", ""],
            ["", "", "☐ Yes  ☐ No  ☐ Not sure", ""],
            ["", "", "☐ Yes  ☐ No  ☐ Not sure", ""],
            ["", "", "☐ Yes  ☐ No  ☐ Not sure", ""],
          ]}
          color={m.color}
        />
      </Section>
      <Section title="Reflection" color={m.accent}>
        <WriteBox label="Which decision surprised you the most — one you didn't realize was being made?" lines={3} />
        <WriteBox label="Which app or platform do you now feel differently about? Why?" lines={3} />
        <WriteBox label="Who do you think benefits when AI makes these decisions about you? Who might be harmed?" lines={3} />
      </Section>

      <ResourceDivider label="RESOURCE 2" module={m} />

      {/* RESOURCE 2: Job Applicant Cards */}
      <PageHeader module={m} resourceTitle="Train a Simple Model — Job Applicant Cards" resourceType="Activity: Cut-Out Cards" />
      <InfoBox label="Facilitator Instructions" content="Print and cut out the 20 cards below. Give each small group a full set. Their task: identify what pattern predicts 'hired' in this dataset. After they find the pattern, reveal that one of the features is a proxy variable." color={m.accent} light={m.light} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
        {[
          { name: "Jordan L.", degree: "CS", years: 3, club: "Chess Club", hired: "✓ HIRED" },
          { name: "Alex M.", degree: "CS", years: 5, club: "Debate Club", hired: "✓ HIRED" },
          { name: "Riley S.", degree: "English", years: 1, club: "Women's Volleyball", hired: "✗ NOT HIRED" },
          { name: "Morgan T.", degree: "CS", years: 2, club: "Robotics Club", hired: "✓ HIRED" },
          { name: "Casey B.", degree: "Math", years: 4, club: "Track & Field", hired: "✓ HIRED" },
          { name: "Drew P.", degree: "Biology", years: 0, club: "Women's Chess Club", hired: "✗ NOT HIRED" },
          { name: "Avery K.", degree: "CS", years: 3, club: "Coding Club", hired: "✓ HIRED" },
          { name: "Quinn R.", degree: "CS", years: 1, club: "Women's Lacrosse", hired: "✗ NOT HIRED" },
          { name: "Sam W.", degree: "Math", years: 6, club: "Math Olympiad", hired: "✓ HIRED" },
          { name: "Jamie C.", degree: "CS", years: 0, club: "Women's Track", hired: "✗ NOT HIRED" },
          { name: "Taylor N.", degree: "CS", years: 4, club: "Hackathon Club", hired: "✓ HIRED" },
          { name: "Parker H.", degree: "English", years: 2, club: "Women's Debate", hired: "✗ NOT HIRED" },
          { name: "Reese D.", degree: "CS", years: 3, club: "AI Club", hired: "✓ HIRED" },
          { name: "Logan F.", degree: "Math", years: 5, club: "Physics Club", hired: "✓ HIRED" },
          { name: "Blake A.", degree: "Biology", years: 1, club: "Women's Soccer", hired: "✗ NOT HIRED" },
          { name: "Charlie V.", degree: "CS", years: 2, club: "Open Source Club", hired: "✓ HIRED" },
          { name: "Finley G.", degree: "Math", years: 4, club: "Women's Swim", hired: "✗ NOT HIRED" },
          { name: "Harper J.", degree: "CS", years: 3, club: "Game Dev Club", hired: "✓ HIRED" },
          { name: "Skyler O.", degree: "CS", years: 0, club: "Women's Tennis", hired: "✗ NOT HIRED" },
          { name: "Ellis Z.", degree: "CS", years: 5, club: "Robotics Club", hired: "✓ HIRED" },
        ].map((c, i) => (
          <div key={i} style={{ border: `1.5px dashed ${m.color}`, borderRadius: 4, padding: 8, background: c.hired.includes("✓") ? m.light : "#FEF2F2", fontSize: 10, fontFamily: "'Georgia', serif" }}>
            <div style={{ fontWeight: 700, color: m.color, marginBottom: 3, fontFamily: "Courier New, monospace" }}>APPLICANT #{i + 1}</div>
            <div><strong>Name:</strong> {c.name}</div>
            <div><strong>Degree:</strong> {c.degree}</div>
            <div><strong>Exp:</strong> {c.years} yr{c.years !== 1 ? "s" : ""}</div>
            <div><strong>Activity:</strong> {c.club}</div>
            <div style={{ marginTop: 4, fontWeight: 700, color: c.hired.includes("✓") ? "#166534" : "#991B1B", fontFamily: "Courier New, monospace" }}>{c.hired}</div>
          </div>
        ))}
      </div>
      <InfoBox label="After They Find the Pattern — Reveal This" content="The pattern: applicants who listed activities with 'Women's' in the name were systematically not hired. The algorithm wasn't told to discriminate — it learned the pattern from 10 years of historical hiring decisions. This is exactly how Amazon's real résumé screening tool worked until they scrapped it in 2018." color={m.accent} light={m.light} />

      <ResourceDivider label="RESOURCE 3" module={m} />

      {/* RESOURCE 3: Careers Database Entry */}
      <PageHeader module={m} resourceTitle="Careers Database Entry" resourceType="Module 1 Contribution" />
      <InfoBox label="Your Mission" content="Find one real woman working in AI research, ML engineering, or AI product development. Add her to our shared database. This entry will be part of a living resource we publish at the end of the program." color={m.accent} light={m.light} />
      <Section title="Find & Document" color={m.accent}>
        <WriteBox label="Full Name" lines={1} />
        <WriteBox label="Current Role / Job Title" lines={1} />
        <WriteBox label="Organization / Company / Institution" lines={1} />
        <WriteBox label="Where did you find her? (LinkedIn, article, podcast, research paper...)" lines={1} />
        <WriteBox label="One sentence about what her work involves" lines={2} />
        <WriteBox label="One thing about her career that surprised or inspired you" lines={2} />
        <WriteBox label="Link to her profile, work, or a relevant article" lines={1} />
      </Section>
      <CheckBox label="I have added this person to the shared class database (Google Sheet)" />

      <ScenarioBox m={m} />
    </div>
  );
}

function ScenarioBox({ m }) {
  const scenarios = [
    { num: 1, text: "A university uses an AI system to rank applicants for a competitive STEM scholarship. The system was trained on 10 years of previous scholarship winners. Over those 10 years, 78% of winners were male — not because of a formal policy, but because of cultural and structural barriers that existed at the time. The AI is now used to generate a shortlist for human reviewers to read.", questions: ["What patterns might the AI have learned from this training data?", "Is the AI 'sexist' — or is it doing exactly what it was designed to do? Does that distinction matter?", "The university says 'a human still makes the final decision.' Does that address the problem?", "What would you change about how this system is designed or used?"] },
    { num: 2, text: "A healthcare AI company builds a tool to predict which patients are 'high risk' and should receive additional care resources. They train it on historical records of which patients received extra care in the past. However, historical records show that Black patients and women were systematically under-referred for specialist care — not because they were less sick, but because of provider bias. The AI learns this historical pattern and replicates it.", questions: ["The company says their model is 'trained on real clinical data.' Is that a defense?", "Who is harmed by this AI system, and how directly can that harm be traced back to the training data?", "What alternative training approach might have avoided this outcome?", "What responsibility does a healthcare system have before deploying a tool like this?"] },
    { num: 3, text: "A major financial institution uses an LLM-powered chatbot to answer customer questions about investments and loan products. The chatbot was fine-tuned using RLHF with human raters from the bank's existing customer service team. Internal analysis later reveals that when users ask about high-risk investment products, the chatbot recommends them less often to users with female names. When asked about this, the bank says: 'The model was trained on human feedback — we didn't program any rules about gender.'", questions: ["Is the bank's statement technically accurate? Does accuracy make it an acceptable defense?", "Who are the human raters, and why does their composition matter?", "How would you design a study to measure whether this chatbot discriminates?", "What should regulators require banks to prove before deploying an AI like this?"] },
    { num: 4, text: "A hospital system deploys an AI tool to prioritize patients for a follow-up care program. Resources are limited, so only the 'highest risk' patients are enrolled. The tool uses previous healthcare utilization as a proxy for health need — patients who have historically sought more care are scored as higher risk. Research later shows that women, who are more likely to seek preventive care, are systematically scored lower than men with equivalent health conditions, because the model interprets 'seeking care' as 'not very sick.'", questions: ["What is the proxy variable here, and why does it produce discriminatory outcomes?", "This system was built with no intent to discriminate. Does intent matter for the outcome?", "What are the direct health consequences for the women who are deprioritized?", "What would a responsible pre-deployment audit of this system look like?"] },
    { num: 5, text: "Sofia and Marco both graduate with CS degrees from the same university in the same year. They have identical GPAs, similar internship experience, and both apply for the same loan to start a tech company. A lending algorithm denies Sofia and approves Marco. When Sofia requests an explanation, the bank says the algorithm is proprietary. When she investigates, she learns the model uses 'expected lifetime earnings' as a factor — a calculation that embeds the gender wage gap, which statistically predicts lower lifetime earnings for women regardless of individual circumstances.", questions: ["Is Sofia's individual profile relevant if the model uses a statistical group-level factor?", "Is 'expected lifetime earnings' a legitimate financial variable or a discriminatory proxy?", "What legal rights does Sofia have? What practical options does she have?", "What would a fairer credit model look like — and who should be required to build it?"] },
    { num: 6, text: "A large tech company announces a major initiative: they will hire 50 more women and underrepresented people onto their AI safety team. Press coverage is positive. Six months later, researchers outside the company document that the company's core language model still exhibits significant gender bias in job recommendation outputs. When asked, the company points to their diversity initiative as evidence they take the problem seriously.", questions: ["Is hiring more diverse people onto safety teams sufficient to address the technical bias problem?", "What is the difference between diversity as optics and diversity as structural change?", "What would meaningful accountability look like — from inside the company? From outside it?", "What role, if any, should government regulation play in requiring AI fairness?"] },
    { num: 7, text: "A city government wants to use AI to help process applications for affordable housing. The system would score applications and automatically approve or deny them based on income, employment history, and other factors. A city council member proposes that the system first undergo an independent algorithmic impact assessment. The company that built the tool argues this would delay deployment by six months and cost $200,000. The city has a waitlist of 10,000 families who need housing.", questions: ["What are the strongest arguments for requiring the AIA before deployment? Against?", "Who should bear the cost of the AIA — the city, the company, or shared?", "What specific things should the AIA examine, given what you've learned about how bias gets built into AI?", "If the AIA found that women-headed households were systematically scored lower, what should happen next?"] },
    { num: 8, text: "You are 22 and starting your first job. You want to begin investing. You open a robo-advisor app. After answering intake questions, it recommends a portfolio that is 60% bonds and 40% stocks — much more conservative than the portfolio it recommends to your male roommate who answered identically. You do some research and find that multiple women have reported the same thing on a personal finance forum. You consider: doing nothing; adjusting your own portfolio manually; filing a complaint; posting about it publicly.", questions: ["Which of these responses — or which combination — would you actually take?", "What evidence would you need to file a formal complaint, and who would you file it with?", "How do you weigh the personal cost of taking action against the potential benefit to others?", "If you had 10 minutes with the company's head of AI, what would you say?"] },
  ];
  const s = scenarios[m.num - 1];
  return (
    <>
      <ResourceDivider label={`DISCUSSION SCENARIO ${m.num}`} module={m} />
      <ScenarioCard number={m.num} text={s.text} questions={s.questions} module={m} />
    </>
  );
}

function Module2Resources({ m }) {
  return (
    <div>
      <PageHeader module={m} resourceTitle="Mock Loan Dataset — Audit Exercise" resourceType="Activity Handout" />
      <InfoBox label="Your Task" content="Examine the loan application data below. Calculate approval rates by gender. Then investigate whether income explains the gap — or if something else is driving it." color={m.accent} light={m.light} />
      <Section title="The Dataset" color={m.accent}>
        <Table
          headers={["Applicant ID", "Gender", "Annual Income", "Years Employed", "Credit Score", "Loan Amount", "Outcome"]}
          rows={[
            ["A001", "F", "$62,000", "4", "720", "$15,000", "✗ Denied"],
            ["A002", "M", "$58,000", "3", "710", "$15,000", "✓ Approved"],
            ["A003", "F", "$75,000", "6", "740", "$20,000", "✗ Denied"],
            ["A004", "M", "$75,000", "6", "740", "$20,000", "✓ Approved"],
            ["A005", "F", "$48,000", "2", "690", "$10,000", "✗ Denied"],
            ["A006", "M", "$48,000", "2", "695", "$10,000", "✓ Approved"],
            ["A007", "F", "$90,000", "8", "760", "$25,000", "✓ Approved"],
            ["A008", "M", "$42,000", "1", "670", "$8,000", "✓ Approved"],
            ["A009", "F", "$55,000", "3", "715", "$12,000", "✗ Denied"],
            ["A010", "M", "$55,000", "3", "712", "$12,000", "✓ Approved"],
            ["A011", "F", "$68,000", "5", "730", "$18,000", "✗ Denied"],
            ["A012", "M", "$67,000", "5", "728", "$18,000", "✓ Approved"],
          ]}
          color={m.color}
        />
      </Section>
      <Section title="Your Analysis" color={m.accent}>
        <WriteBox label="Overall approval rate for female applicants: ___ / ___ = ___%" lines={1} />
        <WriteBox label="Overall approval rate for male applicants: ___ / ___ = ___%" lines={1} />
        <WriteBox label="Is there a gap? How large is it?" lines={2} />
        <WriteBox label="Look at applicants with the same income (e.g., A003 vs A004, A009 vs A010). What do you notice?" lines={3} />
        <WriteBox label="Is the gap fully explained by income differences? What else might be driving it?" lines={3} />
        <WriteBox label="Which variables in this dataset could serve as proxy variables for gender? List them." lines={3} />
        <WriteBox label="If an AI was trained on this data, what pattern would it learn about who to approve?" lines={3} />
      </Section>
      <ScenarioBox m={m} />
    </div>
  );
}

function Module3Resources({ m }) {
  return (
    <div>
      <PageHeader module={m} resourceTitle="Design a Fairer AI System" resourceType="Group Activity Brief" />
      <InfoBox label="Your Brief" content="You are building a hiring AI for a large tech company. Your mandate: make it as fair as possible. Your group must make three decisions, justify each, and present your design to the class." color={m.accent} light={m.light} />
      <Section title="Decision 1 — What Data Do You Include?" color={m.accent}>
        <p style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#374151", marginBottom: 10 }}>Check all features you would include in your training data, and explain why you excluded the others.</p>
        {["Previous job title", "University name", "GPA", "Years of experience", "GitHub activity", "References", "Cover letter text", "LinkedIn connections", "Extracurricular activities", "Location / ZIP code", "Name (for personalization)"].map(f => <CheckBox key={f} label={f} />)}
        <WriteBox label="Anything you'd add that isn't listed above?" lines={2} />
        <WriteBox label="Which features did you exclude, and why?" lines={3} />
      </Section>
      <Section title="Decision 2 — What Fairness Metric Do You Optimize For?" color={m.accent}>
        {[
          ["Demographic Parity", "Hire at equal rates across gender — if 30% of male applicants are hired, 30% of female applicants must be hired too."],
          ["Equal Opportunity", "Ensure equally qualified candidates (by your definition of 'qualified') have equal chances of being hired, regardless of gender."],
          ["Calibration", "The model's confidence scores should mean the same thing across genders — a 70% 'good hire' prediction should be equally accurate for men and women."],
        ].map(([name, desc]) => (
          <div key={name} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
              <div style={{ width: 14, height: 14, border: `2px solid ${m.accent}`, borderRadius: "50%", flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: m.color, fontFamily: "Courier New, monospace" }}>{name}</div>
                <div style={{ fontSize: 11, color: "#4B5563", fontFamily: "'Georgia', serif" }}>{desc}</div>
              </div>
            </div>
          </div>
        ))}
        <WriteBox label="Which metric did your group choose, and why?" lines={2} />
        <WriteBox label="What tradeoffs does your choice involve? Who might be disadvantaged by it?" lines={3} />
      </Section>
      <Section title="Decision 3 — Human Oversight" color={m.accent}>
        <WriteBox label="At what stage(s) does a human review the AI's recommendations? What authority do they have?" lines={3} />
        <WriteBox label="How would you monitor the system after deployment for emerging bias?" lines={3} />
      </Section>

      <ResourceDivider label="RESOURCE 2" module={m} />

      <PageHeader module={m} resourceTitle="Map a Feedback Loop" resourceType="Activity Worksheet" />
      <InfoBox label="Your Task" content="Choose a domain below, then trace how an initial bias gets amplified over time through the AI's feedback loop. Draw or write out each step." color={m.accent} light={m.light} />
      <Section title="Choose Your Domain" color={m.accent}>
        {["Social media recommendation", "Hiring / résumé screening", "Credit / lending", "Healthcare diagnosis"].map(d => <CheckBox key={d} label={d} />)}
      </Section>
      <Section title="Trace the Loop" color={m.accent}>
        <Table
          headers={["Step", "What Happens", "How It Creates or Amplifies Bias"]}
          rows={[
            ["1. Initial Training Data", "", ""],
            ["2. Model Output / Decisions", "", ""],
            ["3. Real-World Impact", "", ""],
            ["4. New Data Generated", "", ""],
            ["5. Model Re-trained on New Data", "", ""],
          ]}
          color={m.color}
        />
        <WriteBox label="At which step in the loop could you most effectively intervene? What would that intervention look like?" lines={3} />
        <WriteBox label="Who has the power to make that intervention — the company, regulators, users, researchers?" lines={3} />
      </Section>
      <ScenarioBox m={m} />
    </div>
  );
}

function Module4Resources({ m }) {
  return (
    <div>
      <PageHeader module={m} resourceTitle="Case Study Deep Dive" resourceType="Group Research Activity" />
      <InfoBox label="Instructions" content="Your group is assigned one domain. Research one specific, real documented case of AI bias in that domain. Prepare a 3-minute presentation: technical cause, who was harmed, and what was (or wasn't) done." color={m.accent} light={m.light} />
      <Section title="Domain Assignment" color={m.accent}>
        {["Healthcare & Medical AI", "Hiring & Resume Screening", "Social Media & Content Moderation", "Education & College Admissions", "Image Generation & Language Models"].map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 20, height: 20, border: `2px solid ${m.color}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: m.color }}>{i + 1}</div>
            <span style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#1F2937" }}>{d}</span>
          </div>
        ))}
        <WriteBox label="Your group's assigned domain:" lines={1} />
        <WriteBox label="The specific case you researched (system name, company, year):" lines={1} />
      </Section>
      <Section title="Your Findings" color={m.accent}>
        <WriteBox label="What did the AI system do? What was it supposed to do?" lines={3} />
        <WriteBox label="What data was used to train it, and what bias was in that data?" lines={3} />
        <WriteBox label="Who was harmed, and how severely?" lines={3} />
        <WriteBox label="What was the technical mechanism — representational bias, proxy variable, feedback loop, RLHF, or something else?" lines={3} />
        <WriteBox label="What action, if any, was taken after the bias was discovered?" lines={3} />
        <WriteBox label="What should have happened instead?" lines={3} />
      </Section>

      <ResourceDivider label="RESOURCE 2" module={m} />

      <PageHeader module={m} resourceTitle="Bias Spectrum Cards" resourceType="Activity: Cut-Out Cards" />
      <InfoBox label="Facilitator Instructions" content="Cut out the 10 cards below. Participants place them on a spectrum from 'Low Stakes' to 'High Stakes / Severe.' After placing, discuss: does severity change who is responsible? What response is proportionate?" color={m.accent} light={m.light} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
        {[
          { title: "Ad Targeting", text: "A social media algorithm shows beauty ads to women and tech ads to men, based on inferred gender from browsing." },
          { title: "Job Ad Serving", text: "A job platform shows senior engineering roles primarily to male users, even when both genders have equal qualifications in their profiles." },
          { title: "Credit Limit", text: "An algorithm gives a woman a $5,000 credit limit and her husband a $20,000 limit despite identical financial profiles. (Apple Card, 2019)" },
          { title: "Résumé Rejection", text: "A hiring AI screens out a qualified female applicant's résumé before any human sees it, because she attended a women's college." },
          { title: "Autocomplete Bias", text: "A search engine autocompletes 'women are' with negative stereotypes more often than it does for 'men are.'" },
          { title: "Misdiagnosis Risk", text: "A medical AI trained on male patients fails to flag a woman's cardiac symptoms as high risk, contributing to a delayed diagnosis." },
          { title: "Housing Ad Exclusion", text: "A landlord uses ad targeting to show housing listings only to users in certain demographics, excluding women with children." },
          { title: "Loan Denial", text: "An algorithm denies a woman's small business loan application based partly on her predicted 'expected lifetime earnings,' which embeds the wage gap." },
          { title: "Content Suppression", text: "A content moderation AI flags posts about women's health (mastectomy, reproductive rights) at higher rates than equivalent male-coded health content." },
          { title: "Parole Risk Score", text: "An AI tool used in criminal sentencing assigns higher risk scores to women who are primary caregivers, because their family obligations are flagged as 'unstable.'" },
        ].map((card, i) => (
          <div key={i} style={{ border: `1.5px dashed ${m.color}`, borderRadius: 6, padding: 12, background: m.light }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: m.color, letterSpacing: 1, fontFamily: "Courier New, monospace", marginBottom: 6 }}>CARD {i + 1} · {card.title.toUpperCase()}</div>
            <p style={{ fontSize: 11, fontFamily: "'Georgia', serif", color: "#1F2937", margin: 0, lineHeight: 1.5 }}>{card.text}</p>
            <div style={{ marginTop: 10, borderTop: `1px dashed #9CA3AF`, paddingTop: 6 }}>
              <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Courier New, monospace" }}>Low Stakes  ←──────→  High Stakes</div>
              <div style={{ borderBottom: "1px solid #D1D5DB", height: 16 }} />
              <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Courier New, monospace", marginTop: 6 }}>Notes:</div>
              <div style={{ borderBottom: "1px solid #D1D5DB", height: 16 }} />
            </div>
          </div>
        ))}
      </div>
      <ScenarioBox m={m} />
    </div>
  );
}

function Module5Resources({ m }) {
  return (
    <div>
      <PageHeader module={m} resourceTitle="Prompt Comparison Worksheet" resourceType="Live AI Experiment" />
      <InfoBox label="Instructions" content="Work with a partner. Open ChatGPT or Gemini. Submit the SAME financial scenario twice — once with a male name, once with a female name. Document everything: the recommendation, the tone, the risk level, the caveats. Do this for all three scenarios below." color={m.accent} light={m.light} />
      {[
        { scenario: "Scenario A — Investment Advice", male: "Alex is 23, earns $52,000/year, and has $7,000 saved. What investment strategy would you recommend for Alex?", female: "Avery is 23, earns $52,000/year, and has $7,000 saved. What investment strategy would you recommend for Avery?" },
        { scenario: "Scenario B — Risk Assessment", male: "Marcus just received a $15,000 bonus. He's considering putting it into index funds. Is this a good idea?", female: "Sofia just received a $15,000 bonus. She's considering putting it into index funds. Is this a good idea?" },
        { scenario: "Scenario C — Loan Advice", male: "James is 28 and wants to take out a $25,000 personal loan to start a small business. What should he consider?", female: "Emily is 28 and wants to take out a $25,000 personal loan to start a small business. What should she consider?" },
      ].map((s, i) => (
        <Section key={i} title={s.scenario} color={m.accent}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 }}>
            <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 4, padding: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "Courier New, monospace", color: "#1D4ED8", marginBottom: 4 }}>PROMPT A (MALE NAME)</div>
              <p style={{ fontSize: 11, fontFamily: "'Georgia', serif", color: "#374151", margin: 0, fontStyle: "italic" }}>"{s.male}"</p>
            </div>
            <div style={{ background: "#FDF2F8", border: "1px solid #F9A8D4", borderRadius: 4, padding: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "Courier New, monospace", color: "#9D174D", marginBottom: 4 }}>PROMPT B (FEMALE NAME)</div>
              <p style={{ fontSize: 11, fontFamily: "'Georgia', serif", color: "#374151", margin: 0, fontStyle: "italic" }}>"{s.female}"</p>
            </div>
          </div>
          <Table
            headers={["What to Compare", "Response A (Male Name)", "Response B (Female Name)", "Difference? Y/N"]}
            rows={[
              ["Investment type recommended", "", "", ""],
              ["Risk level suggested (high/med/low)", "", "", ""],
              ["Number of caveats / warnings", "", "", ""],
              ["Tone (confident / cautious / neutral)", "", "", ""],
              ["Specific products mentioned", "", "", ""],
            ]}
            color={m.color}
          />
          <WriteBox label="Your summary: was there a meaningful difference? What surprised you?" lines={3} />
        </Section>
      ))}
      <Section title="Class Aggregation" color={m.accent}>
        <WriteBox label="Across all pairs in the class, what was the most common difference found?" lines={2} />
        <WriteBox label="Were there pairs who found no difference? What might explain that?" lines={2} />
        <WriteBox label="What would you conclude about AI financial advice tools based on this experiment?" lines={3} />
      </Section>

      <ResourceDivider label="RESOURCE 2" module={m} />

      <PageHeader module={m} resourceTitle="Simplified HMDA Lending Data" resourceType="Data Analysis Exercise" />
      <InfoBox label="About HMDA" content="The Home Mortgage Disclosure Act requires lenders to report data on mortgage applications, including applicant demographics and outcomes. This simplified dataset is based on patterns in real HMDA data." color={m.accent} light={m.light} />
      <Section title="The Data" color={m.accent}>
        <Table
          headers={["Income Bracket", "Male Applicants", "Male Approved", "Male Rate", "Female Applicants", "Female Approved", "Female Rate", "Gap"]}
          rows={[
            ["Under $40K", "142", "89", "63%", "168", "84", "50%", "___"],
            ["$40K–$60K", "234", "187", "80%", "201", "142", "71%", "___"],
            ["$60K–$80K", "189", "163", "86%", "175", "138", "79%", "___"],
            ["$80K–$100K", "156", "141", "90%", "143", "121", "85%", "___"],
            ["Over $100K", "98", "94", "96%", "87", "81", "93%", "___"],
            ["TOTAL", "819", "674", "___", "774", "566", "___", "___"],
          ]}
          color={m.color}
        />
      </Section>
      <Section title="Your Analysis" color={m.accent}>
        <WriteBox label="Fill in the Gap column above. At which income level is the gap largest?" lines={2} />
        <WriteBox label="Calculate the overall approval rate for each gender. Is there a gap overall?" lines={2} />
        <WriteBox label="Within the same income bracket, is there still a gap? What does that tell you?" lines={3} />
        <WriteBox label="What variables are NOT in this dataset that might explain (or not explain) the gap?" lines={3} />
        <WriteBox label="If an AI was trained on this data to predict creditworthiness, what would it learn?" lines={3} />
      </Section>
      <ScenarioBox m={m} />
    </div>
  );
}

function Module6Resources({ m }) {
  return (
    <div>
      <PageHeader module={m} resourceTitle="Policy Response Simulation — Role Cards" resourceType="Activity: Role-Play" />
      <InfoBox label="Setup" content="The scenario: an AI hiring tool used by a major tech company has been documented rejecting more women's applications than men's with equivalent qualifications. A congressional hearing is convened. Each group plays one role and prepares a 2-minute opening statement." color={m.accent} light={m.light} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { role: "AI Company Engineer", color: "#1E3A5F", light: "#EFF6FF", brief: "You built the system. You believe it works as designed and that the hiring data it was trained on reflected legitimate business decisions. You are worried that over-regulation will stifle innovation and put your company at a competitive disadvantage. You are willing to improve the system — but on your own timeline and terms." },
          { role: "Federal Regulator (EEOC)", color: "#166534", light: "#ECFDF5", brief: "You are responsible for enforcing employment discrimination law. Courts have ruled that disparate impact (different outcomes by gender/race) can constitute discrimination even without intent. You want to establish clear rules that apply to all AI hiring tools — but you need to understand the technical details well enough to write enforceable regulations." },
          { role: "Consumer Advocate", color: "#7C2D12", light: "#FFF7ED", brief: "You represent the women whose applications were rejected by this system. You want accountability, transparency, and compensation. You also want systemic change — mandatory pre-deployment audits, public disclosure of bias metrics, and a right to human review of any AI decision. You don't trust the company to self-regulate." },
          { role: "Affected User", color: "#9F1239", light: "#FFF1F2", brief: "You are a software engineer who applied to this company three times over two years and was rejected each time. After seeing news coverage of the bias issue, you suspect the AI may have rejected your application. You want to know if that's true — and you want the tools you'd need to prove it or dispute it." },
        ].map((r, i) => (
          <div key={i} style={{ border: `2px solid ${r.color}`, borderRadius: 6, overflow: "hidden" }}>
            <div style={{ background: r.color, padding: "8px 12px" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, fontFamily: "Courier New, monospace" }}>ROLE {i + 1}: {r.role.toUpperCase()}</div>
            </div>
            <div style={{ background: r.light, padding: 12 }}>
              <p style={{ fontSize: 11, fontFamily: "'Georgia', serif", color: "#1F2937", margin: "0 0 10px 0", lineHeight: 1.5 }}>{r.brief}</p>
              <div style={{ fontSize: 10, fontWeight: 700, color: r.color, fontFamily: "Courier New, monospace", marginBottom: 6 }}>YOUR 2-MINUTE STATEMENT NOTES:</div>
              {[1, 2, 3].map(n => <div key={n} style={{ borderBottom: "1px solid #D1D5DB", height: 20, marginBottom: 3 }} />)}
            </div>
          </div>
        ))}
      </div>
      <Section title="Post-Simulation Debrief" color={m.accent}>
        <WriteBox label="Where did the four roles agree? Where did they fundamentally conflict?" lines={3} />
        <WriteBox label="Whose position did you find most persuasive, and why?" lines={3} />
        <WriteBox label="What single policy change do you think would most effectively address this problem?" lines={3} />
      </Section>
      <ScenarioBox m={m} />
    </div>
  );
}

function Module7Resources({ m }) {
  return (
    <div>
      <PageHeader module={m} resourceTitle="Global AI Policy Comparison" resourceType="Reference Sheet & Analysis Activity" />
      <Section title="Quick Reference: Key Frameworks" color={m.accent}>
        <Table
          headers={["Jurisdiction", "Framework", "Coverage", "Key Requirement", "Status"]}
          rows={[
            ["European Union", "EU AI Act", "Comprehensive — all AI by risk tier", "High-risk AI (hiring, credit, healthcare) requires conformity assessment, transparency, human oversight, public registration", "In force 2026"],
            ["United States (Federal)", "Patchwork: ECOA, Title VII, Fair Housing Act + executive guidance", "Sector-specific — applied by existing agencies", "Disparate impact liability; right to explanation for adverse credit actions", "No comprehensive AI law as of 2026"],
            ["New York City", "Local Law 144", "AI hiring tools only", "Annual third-party bias audit; public disclosure of results", "In force 2023"],
            ["Colorado", "SB 205", "AI in insurance", "Requires insurers to test AI tools for discriminatory outcomes", "In force 2023"],
            ["Canada", "AIDA (Bill C-27)", "High-impact AI systems", "Transparency, bias mitigation, human oversight, penalties for non-compliance", "Proposed — in legislative process"],
            ["United Kingdom", "Sector regulator approach", "Existing sectoral rules applied to AI", "Each regulator (FCA, NHS, etc.) applies own rules to AI in their domain", "No central AI law"],
          ]}
          color={m.color}
        />
      </Section>
      <Section title="Policy Gap Analysis Activity" color={m.accent}>
        <InfoBox label="Scenario" content="An AI hiring tool in the US has been documented rejecting more women's applications than men's with equivalent qualifications. Work through the questions below." color={m.accent} light={m.light} />
        <WriteBox label="1. What US law, if any, currently addresses this? What would need to happen for the company to face consequences?" lines={4} />
        <WriteBox label="2. Would this be treated differently under the EU AI Act? What specifically would the EU require?" lines={4} />
        <WriteBox label="3. Would NYC Local Law 144 help in this situation? Why or why not?" lines={3} />
        <WriteBox label="4. What's the gap — what policy mechanism is missing that would most effectively address this harm?" lines={4} />
      </Section>

      <ResourceDivider label="RESOURCE 2" module={m} />

      <PageHeader module={m} resourceTitle="Policy Proposal Template" resourceType="Activity: Draft a Policy" />
      <InfoBox label="Your Task" content="Choose one AI domain from the curriculum and draft a one-paragraph policy proposal. Be specific: what rule, who enforces it, what's the penalty, and who has the right to complain." color={m.accent} light={m.light} />
      <Section title="Your Proposal" color={m.accent}>
        <WriteBox label="Domain (financial AI, hiring AI, healthcare AI, or social media):" lines={1} />
        <WriteBox label="The specific harm you're addressing:" lines={2} />
        <WriteBox label="The rule you'd require (what AI systems must do or prove before deployment):" lines={4} />
        <WriteBox label="Who enforces it (which agency, court, or new body)?" lines={2} />
        <WriteBox label="What is the penalty for non-compliance?" lines={2} />
        <WriteBox label="Who has standing to file a complaint (affected individuals, regulators, advocacy groups)?" lines={2} />
        <WriteBox label="Is there a real bill, regulation, or law that resembles your proposal? (Research and fill in if you can find one.)" lines={2} />
        <WriteBox label="What are the strongest arguments against your proposal? How would you respond to them?" lines={4} />
      </Section>

      <ResourceDivider label="RESOURCE 3" module={m} />

      <PageHeader module={m} resourceTitle="AI Policy Stakeholder Map" resourceType="Activity Worksheet" />
      <InfoBox label="Instructions" content="Map the key actors who have power over AI policy. For each, identify: what tools do they have? What are their incentives? Who do they listen to? Then identify where you, as a young woman, have leverage." color={m.accent} light={m.light} />
      <Table
        headers={["Stakeholder", "Tools / Powers", "Incentives", "Who Influences Them", "Your Leverage?"]}
        rows={[
          ["US Congress", "", "", "", ""],
          ["State Legislatures", "", "", "", ""],
          ["White House / Executive", "", "", "", ""],
          ["CFPB / EEOC / FTC / FDA", "", "", "", ""],
          ["Federal Courts", "", "", "", ""],
          ["AI Companies", "", "", "", ""],
          ["Advocacy Orgs (EFF, ACLU, AJL)", "", "", "", ""],
          ["Academic Researchers", "", "", "", ""],
          ["Journalists / Media", "", "", "", ""],
          ["You / Young People", "", "", "", ""],
        ]}
        color={m.color}
      />
      <WriteBox label="Where is the most leverage for a young person who wants to change AI policy right now?" lines={3} />
      <WriteBox label="What action could you take in the next 30 days to engage in AI policymaking?" lines={3} />
      <ScenarioBox m={m} />
    </div>
  );
}

function Module8Resources({ m }) {
  return (
    <div>
      <PageHeader module={m} resourceTitle="AI Prompting Reference Card" resourceType="Take-Home Reference" />
      <InfoBox label="Keep This" content="These are the five strategies for getting better, less biased outputs from AI tools. Print this and keep it. Use it the next time you ask an AI for financial, career, or healthcare advice." color={m.accent} light={m.light} />
      <Section title="The Five Strategies" color={m.accent}>
        {[
          { num: "01", title: "Explicit Instruction", example: `Instead of: "Give me investment advice for someone my age."\n\nTry: "Give me investment advice for a 22-year-old. Please do not make assumptions about my gender, risk tolerance, or financial goals — ask me if you need that information."`, note: "Tell the model what NOT to assume." },
          { num: "02", title: "Role Framing", example: `"You are a financial advisor who applies identical standards to all clients regardless of gender, age, or background."`, note: "Frame the model's role to encode the behavior you want." },
          { num: "03", title: "Comparative Prompting", example: `Submit the same question with a male name and a female name. Document differences. Share them publicly.`, note: "Test for bias and create accountability through documentation." },
          { num: "04", title: "Iterate and Push Back", example: `After the first response: "Why did you recommend a conservative portfolio? Would you give the same advice to a 22-year-old man with identical finances?"`, note: "Don't accept the first response uncritically. Ask follow-ups." },
          { num: "05", title: "Know the Limits", example: `Some decisions should not be delegated to AI until bias has been formally audited: medical diagnoses, legal advice, major financial decisions.`, note: "Prompting reduces but does not eliminate bias." },
        ].map(s => (
          <Card key={s.num} color={m.color} light={m.light}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: m.color, fontFamily: "Courier New, monospace", opacity: 0.4, flexShrink: 0, lineHeight: 1 }}>{s.num}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: m.color, fontFamily: "'Georgia', serif", marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#374151", fontFamily: "Courier New, monospace", background: "#F9FAFB", padding: "6px 10px", borderRadius: 4, whiteSpace: "pre-line", marginBottom: 6 }}>{s.example}</div>
                <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>↗ {s.note}</div>
              </div>
            </div>
          </Card>
        ))}
      </Section>

      <ResourceDivider label="RESOURCE 2" module={m} />

      <PageHeader module={m} resourceTitle="Know Your Rights — Quick Reference" resourceType="Take-Home Reference" />
      <Table
        headers={["Law / Agency", "What It Covers", "What You Can Do"]}
        rows={[
          ["Equal Credit Opportunity Act (ECOA)", "Prohibits credit discrimination on the basis of sex, race, age, and other characteristics. Applies to AI-driven credit decisions.", "Request a written explanation for any adverse credit action within 60 days. File a complaint with CFPB."],
          ["CFPB (consumerfinance.gov)", "Federal agency that enforces ECOA and accepts complaints about discriminatory lending, including AI-driven decisions.", "Submit a complaint at consumerfinance.gov/complaint. Complaints are tracked and inform enforcement priorities."],
          ["Fair Housing Act", "Prohibits housing discrimination, including AI-driven ad targeting that excludes protected groups from seeing listings.", "File a complaint with HUD (hud.gov) or your state's housing agency."],
          ["Title VII (Employment)", "Prohibits employment discrimination. Courts and EEOC have confirmed this applies to AI hiring tools with disparate impact.", "File a charge with the EEOC within 180–300 days of the discriminatory act. They investigate and can bring lawsuits."],
          ["NYC Local Law 144", "Requires employers in NYC to audit AI hiring tools annually and publish bias results.", "Ask employers if they use AI hiring tools and request their bias audit disclosure before your interview."],
          ["State Consumer Protection Offices", "State laws vary — some provide stronger protections than federal law, including rights related to algorithmic transparency.", "Find your state's AG or consumer protection office. Many have tech/AI-specific complaint processes."],
        ]}
        color={m.color}
      />

      <ResourceDivider label="RESOURCE 3" module={m} />

      <PageHeader module={m} resourceTitle="Pre/Post Survey" resourceType="Program Evaluation" />
      <InfoBox label="Instructions" content="Complete this survey at the start of Module 1 (before). You will complete the same survey again at the end of Module 8 (after). Your responses help measure what the program taught you — there are no wrong answers." color={m.accent} light={m.light} />
      <Section title="Section A — Knowledge" color={m.accent}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#1F2937", marginBottom: 8 }}><strong>1.</strong> In your own words, explain what machine learning is. (Write what you know — a few words or sentences is fine.)</div>
          {[1, 2, 3].map(n => <div key={n} style={{ borderBottom: "1px solid #D1D5DB", height: 22, marginBottom: 3 }} />)}
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#1F2937", marginBottom: 8 }}><strong>2.</strong> Can you name one technical mechanism by which bias enters an AI system? If yes, describe it briefly.</div>
          {[1, 2].map(n => <div key={n} style={{ borderBottom: "1px solid #D1D5DB", height: 22, marginBottom: 3 }} />)}
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#1F2937", marginBottom: 8 }}><strong>3.</strong> Can you name one existing US law that applies to AI bias in hiring or lending? If yes, name it.</div>
          {[1, 2].map(n => <div key={n} style={{ borderBottom: "1px solid #D1D5DB", height: 22, marginBottom: 3 }} />)}
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#1F2937", marginBottom: 8 }}><strong>4.</strong> What is the EU AI Act? Describe it in one or two sentences (or write "I don't know").</div>
          {[1, 2].map(n => <div key={n} style={{ borderBottom: "1px solid #D1D5DB", height: 22, marginBottom: 3 }} />)}
        </div>
      </Section>
      <Section title="Section B — Awareness & Confidence (circle your answer)" color={m.accent}>
        {[
          "Have you ever considered that an AI financial tool might give you different advice than a male peer?   YES  /  NO  /  NOT SURE",
          "Have you ever thought about how AI might be affecting your job applications or college process?   YES  /  NO  /  NOT SURE",
          "Do you know of a career that works on making AI systems fairer?   YES (describe below)  /  NO",
        ].map((q, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#1F2937", marginBottom: 4 }}><strong>{i + 5}.</strong> {q}</div>
            {i === 1 && <div style={{ borderBottom: "1px solid #D1D5DB", height: 22, marginBottom: 4 }} />}
          </div>
        ))}
        {[
          ["I could explain what machine learning is to a friend.", "1  —  2  —  3  —  4  —  5"],
          ["I could identify biased AI output and know what to do about it.", "1  —  2  —  3  —  4  —  5"],
          ["I feel confident navigating AI tools that affect my financial life.", "1  —  2  —  3  —  4  —  5"],
          ["I know what rights I have when an AI makes a decision about me.", "1  —  2  —  3  —  4  —  5"],
        ].map(([label, scale], i) => (
          <div key={i} style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5E7EB", paddingBottom: 8 }}>
            <div style={{ fontSize: 12, fontFamily: "'Georgia', serif", color: "#1F2937", flex: 1 }}><strong>{i + 8}.</strong> {label}</div>
            <div style={{ fontSize: 12, fontFamily: "Courier New, monospace", color: "#6B7280", marginLeft: 16, flexShrink: 0 }}>{scale}<br /><span style={{ fontSize: 9 }}>not at all → very confident</span></div>
          </div>
        ))}
      </Section>
      <Section title="Section C — Open Response" color={m.accent}>
        <WriteBox label="12. What questions do you have about AI that you hope this program answers?" lines={3} />
      </Section>

      <ResourceDivider label="RESOURCE 4" module={m} />

      <PageHeader module={m} resourceTitle="Closing Reflection Card" resourceType="Module 8 Closing Activity" />
      <div style={{ border: `2px solid ${m.color}`, borderRadius: 8, padding: 20, background: m.light }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: m.color, fontFamily: "'Georgia', serif", marginBottom: 4 }}>Three Things Before You Go</div>
          <div style={{ fontSize: 11, color: "#6B7280", fontFamily: "Courier New, monospace" }}>Take 5 minutes. Write these down. Keep this card.</div>
        </div>
        <WriteBox label="One thing I learned that I didn't know before this program:" lines={3} />
        <WriteBox label="One thing I will do differently — in how I use AI, question AI, or think about AI:" lines={3} />
        <WriteBox label="One person I will tell about something I learned here:" lines={2} />
        <div style={{ borderTop: `1px dashed ${m.color}`, paddingTop: 14, marginTop: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: m.color, fontFamily: "Courier New, monospace", marginBottom: 8 }}>IF YOU WANT TO GO FURTHER:</div>
          {[
            "Algorithmic Justice League — ajl.org",
            "AI Now Institute — ainowinstitute.org",
            "EFF (Electronic Frontier Foundation) — eff.org",
            "CFPB Consumer Complaints — consumerfinance.gov/complaint",
            "EEOC AI Guidance — eeoc.gov",
          ].map((r, i) => (
            <div key={i} style={{ fontSize: 11, fontFamily: "Courier New, monospace", color: "#374151", marginBottom: 4 }}>→ {r}</div>
          ))}
        </div>
      </div>
      <ScenarioBox m={m} />
    </div>
  );
}

const MODULE_COMPONENTS = [
  Module1Resources,
  Module2Resources,
  Module3Resources,
  Module4Resources,
  Module5Resources,
  Module6Resources,
  Module7Resources,
  Module8Resources,
];

// ═══════════════════════════════════════════════════════════════════════════
// SHARED RESOURCES (cross-module)
// ═══════════════════════════════════════════════════════════════════════════

function SharedResources() {
  return (
    <div>
      <div style={{ borderBottom: "3px solid #1E1040", paddingBottom: 10, marginBottom: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#6B7280", textTransform: "uppercase", fontFamily: "Courier New, monospace", marginBottom: 2 }}>PROGRAM-WIDE · USED ACROSS ALL MODULES</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1E1040", fontFamily: "'Georgia', serif" }}>Shared Resources</div>
      </div>

      {/* Careers Database Template */}
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1040", fontFamily: "Courier New, monospace", letterSpacing: 1, borderBottom: "1px solid #1E1040", paddingBottom: 4, marginBottom: 10 }}>CAREERS DATABASE — MASTER TEMPLATE</div>
      <InfoBox label="About This Resource" content="Participants add one entry per module (8 total). At the end of Module 8, the full database is published as a class resource. This is a template for the Google Sheet that facilitators should set up before Module 1." color="#1E1040" light="#F3F4F6" />
      <Table
        headers={["Module", "Entered By", "Full Name", "Role / Title", "Organization", "Field", "One Career Insight", "Link"]}
        rows={[
          ["1 — Foundations", "", "", "", "", "AI Research / ML Engineering", "", ""],
          ["2 — Roots of Bias", "", "", "", "", "Data Science / Healthcare AI", "", ""],
          ["3 — Built-In Bias", "", "", "", "", "ML Engineering / AI Ethics", "", ""],
          ["4 — Domain Impact", "", "", "", "", "Healthcare Tech / Civil Rights", "", ""],
          ["5 — Follow Money", "", "", "", "", "Fintech / Financial Protection", "", ""],
          ["6 — Who Builds It", "", "", "", "", "AI Policy / Tech Law", "", ""],
          ["7 — Policy", "", "", "", "", "AI Policy / Government / Advocacy", "", ""],
          ["8 — Take Action", "", "", "", "", "Any — personal choice", "", ""],
        ]}
        color="#1E1040"
      />

      <div style={{ margin: "24px 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, height: 1, background: "#1E1040", opacity: 0.2 }} />
        <div style={{ padding: "3px 12px", background: "#1E1040", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 2, fontFamily: "Courier New, monospace", borderRadius: 20 }}>FACILITATOR GUIDE</div>
        <div style={{ flex: 1, height: 1, background: "#1E1040", opacity: 0.2 }} />
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1040", fontFamily: "Courier New, monospace", letterSpacing: 1, borderBottom: "1px solid #1E1040", paddingBottom: 4, marginBottom: 10 }}>MODULE OVERVIEW — FACILITATOR QUICK REFERENCE</div>
      <Table
        headers={["Module", "Title", "Duration", "Core Resource(s)", "Tech Concepts Covered", "Discussion Scenario Topic"]}
        rows={[
          ["1", "What Is AI, Really?", "45–60 min", "24 Hours of AI worksheet; Applicant cards", "ML vs. programming; models; training", "STEM scholarship AI bias"],
          ["2", "Where Does Bias Come From?", "45–60 min", "Mock loan dataset; Audit worksheet", "Representational, measurement & label bias; proxy variables", "Healthcare AI and historical under-referral"],
          ["3", "How Bias Gets Built In", "50–60 min", "Fairer system brief; Feedback loop worksheet", "RLHF; feedback loops; fairness metrics", "Financial chatbot RLHF bias"],
          ["4", "AI Bias Across Your Life", "50–60 min", "Case study cards; Bias spectrum cards", "Proxy variables; disparate impact across domains", "Healthcare AI prioritization proxy"],
          ["5", "Follow the Money", "50–60 min", "Prompt comparison worksheet; HMDA data", "Credit scoring; robo-advisor bias; LLM financial advice", "Startup loan algorithm — Sofia & Marco"],
          ["6", "Who Builds This Stuff?", "45–55 min", "Role cards for policy simulation", "Industry demographics; diversity vs. structural change", "Diversity initiative vs. persistent model bias"],
          ["7", "AI Policy & Governance", "50–60 min", "Policy comparison table; proposal template; stakeholder map", "EU AI Act; ECOA; AIA; US patchwork", "Affordable housing AI and AIA requirements"],
          ["8", "Push Back & Take Action", "55–65 min", "Prompting card; Know Your Rights; Survey; Reflection card", "Prompting strategies; consumer rights; careers", "Robo-advisor gender gap — personal action"],
        ]}
        color="#1E1040"
      />

      <div style={{ margin: "24px 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, height: 1, background: "#1E1040", opacity: 0.2 }} />
        <div style={{ padding: "3px 12px", background: "#1E1040", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 2, fontFamily: "Courier New, monospace", borderRadius: 20 }}>GLOSSARY</div>
        <div style={{ flex: 1, height: 1, background: "#1E1040", opacity: 0.2 }} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1040", fontFamily: "Courier New, monospace", letterSpacing: 1, borderBottom: "1px solid #1E1040", paddingBottom: 4, marginBottom: 10 }}>KEY TERMS — PARTICIPANT REFERENCE</div>
      <Table
        headers={["Term", "Plain Language Definition", "First Appears"]}
        rows={[
          ["Machine Learning", "A way of building AI where the system finds patterns in examples rather than following rules a human wrote.", "Module 1"],
          ["Training Data", "The examples a machine learning model learns from. If the data is biased, the model learns biased patterns.", "Module 1"],
          ["Model / Algorithm", "A mathematical function trained to take inputs and produce outputs (predictions, recommendations, decisions).", "Module 1"],
          ["RLHF", "Reinforcement Learning from Human Feedback — a technique for fine-tuning AI using human ratings of its outputs. Human raters' preferences (including biases) are encoded into the model.", "Module 3"],
          ["Representational Bias", "When a group is underrepresented in training data, the model learns less about them and performs worse for them.", "Module 2"],
          ["Measurement Bias", "When data is collected or measured differently for different groups, encoding those differences as if they're meaningful.", "Module 2"],
          ["Label Bias", "When the 'correct answers' in training data reflect historical human biases (e.g., biased past hiring decisions).", "Module 2"],
          ["Proxy Variable", "A variable that isn't protected (like ZIP code) but correlates strongly with a protected characteristic (like race), enabling indirect discrimination.", "Module 2"],
          ["Feedback Loop", "When a model's outputs influence the data it will be trained on in the future, amplifying initial biases over time.", "Module 3"],
          ["Disparate Impact", "When a policy or system produces unequal outcomes for different groups, even without discriminatory intent. Legally actionable under Title VII and ECOA.", "Module 4"],
          ["Algorithmic Impact Assessment (AIA)", "A structured pre-deployment analysis of how an AI system may affect different groups — similar to an environmental impact report.", "Module 7"],
          ["EU AI Act", "The world's first comprehensive AI regulation, classifying AI systems by risk tier and requiring conformity assessments, transparency, and human oversight for high-risk AI.", "Module 7"],
          ["ECOA", "Equal Credit Opportunity Act — US law prohibiting credit discrimination based on sex, race, age, and other characteristics. Applies to AI credit decisions.", "Module 5"],
          ["CFPB", "Consumer Financial Protection Bureau — US federal agency that enforces ECOA and accepts consumer complaints about AI-driven lending discrimination.", "Module 5"],
        ]}
        color="#1E1040"
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════

export default function DataAboutYouResources() {
  const [activeTab, setActiveTab] = useState(0); // 0 = shared, 1–8 = modules

  const activeModule = activeTab === 0 ? null : MODULE_META[activeTab - 1];
  const ActiveComponent = activeTab === 0 ? SharedResources : MODULE_COMPONENTS[activeTab - 1];

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F8F7F4", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ background: "#1E1040", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div>
          <div style={{ color: "#A5F3FC", fontFamily: "Courier New, monospace", fontSize: 10, fontWeight: 700, letterSpacing: 3 }}>DATA ABOUT YOU</div>
          <div style={{ color: "#fff", fontFamily: "'Georgia', serif", fontSize: 15, fontWeight: 700, marginTop: 1 }}>Complete Resource Kit · 8-Module Curriculum</div>
        </div>
        <div style={{ color: "#6B7280", fontSize: 11, fontFamily: "Courier New, monospace", textAlign: "right" }}>
          All handouts, worksheets<br />& facilitator materials
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: "#fff", borderBottom: "2px solid #E5E7EB", overflowX: "auto", display: "flex", padding: "0 8px" }}>
        <button
          onClick={() => setActiveTab(0)}
          style={{
            padding: "10px 14px", border: "none", background: "none", cursor: "pointer", fontFamily: "Courier New, monospace", fontSize: 10, fontWeight: 700, letterSpacing: 1, whiteSpace: "nowrap",
            borderBottom: activeTab === 0 ? "3px solid #1E1040" : "3px solid transparent",
            color: activeTab === 0 ? "#1E1040" : "#6B7280",
          }}
        >SHARED ★</button>
        {MODULE_META.map((m, i) => (
          <button
            key={m.num}
            onClick={() => setActiveTab(i + 1)}
            style={{
              padding: "10px 12px", border: "none", background: "none", cursor: "pointer", fontFamily: "Courier New, monospace", fontSize: 10, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap",
              borderBottom: activeTab === i + 1 ? `3px solid ${m.color}` : "3px solid transparent",
              color: activeTab === i + 1 ? m.color : "#6B7280",
            }}
          >
            <span style={{ opacity: 0.6 }}>M{m.num} · </span>{m.short.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Module title strip */}
      {activeModule && (
        <div style={{ background: activeModule.color, padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 4, padding: "4px 10px", fontFamily: "Courier New, monospace", fontSize: 11, fontWeight: 700, color: "#fff" }}>MODULE {activeModule.num}</div>
          <div style={{ color: "#fff", fontFamily: "'Georgia', serif", fontSize: 16, fontWeight: 700 }}>{activeModule.title}</div>
          <div style={{ flex: 1 }} />
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontFamily: "Courier New, monospace" }}>PRINT ALL MATERIALS FOR THIS MODULE</div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <ActiveComponent m={activeModule || {}} />
      </div>

      {/* Print hint */}
      <div style={{ background: "#1E1040", padding: "10px 24px", textAlign: "center" }}>
        <span style={{ color: "#6B7280", fontFamily: "Courier New, monospace", fontSize: 10 }}>
          To print: File → Print → set margins to Minimum → Print background graphics ON
        </span>
      </div>
    </div>
  );
}
