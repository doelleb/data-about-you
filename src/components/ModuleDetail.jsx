import { useState } from 'react'
import InterviewLog from './InterviewLog'

// ── Shared sub-components ──────────────────────────────────────────────

function ContentBlock({ title, children }) {
  return (
    <div className="content-block">
      <div className="content-block-title">{title}</div>
      {children}
    </div>
  )
}

function Objectives({ items }) {
  return (
    <ul className="objectives-list">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

function CaseStudy({ label = 'Real-World Case Study', title, children, source }) {
  return (
    <div className="case-study">
      <div className="case-study-label">{label}</div>
      <div className="case-study-title">{title}</div>
      {children}
      {source && <div className="source-cite">Source: {source}</div>}
    </div>
  )
}

function DiscussionList({ questions }) {
  return (
    <div className="discussion-list">
      {questions.map((q, i) => (
        <div key={i} className="discussion-item">
          <span className="disc-num">0{i + 1}</span>
          <span>{q}</span>
        </div>
      ))}
    </div>
  )
}

function StepsChain({ steps, wrapper = 'activity' }) {
  return (
    <div className={wrapper === 'loop' ? 'loop-mapper' : 'activity'} style={wrapper === 'activity' ? { background: 'white', border: '2px solid var(--border)', padding: '2rem' } : {}}>
      {wrapper === 'activity' && (
        <div className="activity-header">
          <div className="activity-icon">📋</div>
          <div className="activity-title">{steps.activityTitle}</div>
          <span className="activity-duration">{steps.duration}</span>
        </div>
      )}
      {wrapper === 'loop' && steps.intro && (
        <p style={{ fontSize: '0.87rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>
          <strong>Starting point:</strong> {steps.intro}
        </p>
      )}
      <div className="steps-chain">
        {steps.items.map((step, i) => (
          <div key={i} className="step-item">
            <div className="step-num">{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div className="step-prompt">{step}</div>
              <textarea className="step-answer" rows="2" placeholder="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Module 1 ──────────────────────────────────────────────────────────

function Module1() {
  const [selected, setSelected] = useState({})
  const [shown, setShown] = useState({})

  const scenarios = [
    {
      id: 'A',
      label: 'Scenario A',
      text: 'A loan approval algorithm is trained on 10 years of historical loan data. Historically, applicants from certain zip codes were denied at higher rates. The algorithm learns that zip code is a strong predictor of default risk.',
      placeholder: "What's the mechanism? How could it be reduced?",
      feedback: <><strong>Key insight:</strong> This is primarily <em>historical bias</em> — the algorithm learned that zip code predicts outcomes, but zip code is a proxy for race due to historical redlining. The algorithm encodes structural racism without ever using race as an input. To reduce: audit for disparate impact by zip code, remove zip code as a feature, or use adversarial debiasing. Note: this is also measurement bias if zip code is used as a proxy for "creditworthiness."</>,
    },
    {
      id: 'B',
      label: 'Scenario B',
      text: 'A voice recognition system trained mostly on American English speakers has a 35% error rate for speakers with South Asian accents, compared to 5% for American speakers.',
      placeholder: "What's the mechanism? How could it be reduced?",
      feedback: <><strong>Key insight:</strong> <em>Representation bias</em> — South Asian accent speakers were underrepresented in the training data, so the model learned to perform well on the majority group only. Reduction: collect diverse training data representing global English accents. But deeper question: who decides what "correct" pronunciation is? The evaluation metric itself may encode cultural bias.</>,
    },
    {
      id: 'C',
      label: 'Scenario C',
      text: 'A resume screening tool is trained on resumes of employees who were hired and later promoted. At the company in question, most promoted employees were men. The tool begins favoring resumes with male-coded language.',
      placeholder: "Which is hardest to fix? What would need to change beyond the algorithm itself?",
      feedback: <><strong>Key insight:</strong> This is both <em>historical bias</em> (the company's past promotion decisions were biased) and <em>measurement bias</em> (using past promotions as a proxy for "good employee" is flawed when the promotion process itself was biased). This one is hardest to fix — you can't just debias the algorithm without addressing the company culture and promotion system that generated the training data. Amazon had this exact problem and scrapped their AI hiring tool in 2018.</>,
    },
  ]

  return (
    <>
      <ContentBlock title="Learning Objectives">
        <Objectives items={[
          'Define AI bias and explain why it occurs',
          'Distinguish between the four main types of bias: historical, representation, measurement, and amplification',
          'Identify at least one real-world example of AI bias and explain the mechanism behind it',
          'Describe the feedback loop that occurs when biased AI systems influence the data used to train future models',
        ]} />
      </ContentBlock>

      <ContentBlock title="Background Reading">
        <div className="reading-body">
          <p>Artificial intelligence systems learn patterns from data. The problem is that data reflects the world as it has been, not as it should be. If historical decisions were biased, an AI trained on those decisions will replicate that bias — and research shows it often amplifies it.</p>
          <p><strong>1. Historical Bias:</strong> This happens when training data reflects past inequalities. If a company's historical hiring data shows that managers were mostly men, an AI trained on that data will learn to favor male candidates, even if the company no longer intends to.</p>
          <p><strong>2. Representation Bias:</strong> This occurs when certain groups are underrepresented in training data. Facial recognition systems have consistently shown higher error rates for darker-skinned individuals and women because training datasets were composed primarily of lighter-skinned male faces.</p>
          <p><strong>3. Measurement Bias:</strong> This happens when the features used to train a model are flawed proxies for what is actually being measured. A healthcare algorithm that used insurance billing data as a proxy for medical need systematically underestimated how sick Black patients were, because they historically had less access to care and thus lower billing amounts. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[Obermeyer et al., 2019]</span></p>
          <p><strong>4. Amplification Bias:</strong> A 2024 UCL study found that AI does not just absorb human bias — it amplifies it. Experiments with 1,200+ participants found that people who interacted with biased AI systems became more biased themselves: minute biases in original datasets get amplified by the AI, which then increases the biases of users. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[Glickman & Sharot, 2024]</span></p>
        </div>
      </ContentBlock>

      <CaseStudy title="AI Systematically Disadvantages Older Women in Hiring (Stanford / Nature, October 2025)" source="Stanford University / Nature (October 2025). Guilbeault D, Delecourt S, Desikan BS. Age and gender distortion in online media and large language models. Nature, 646, 1129–1137.">
        <p>Researchers tested how major LLMs handle hiring decisions involving age and gender. The AI consistently portrayed female candidates as younger and less experienced than their male counterparts — and when it evaluated resumes, it gave higher scores to older men than to older women with identical qualifications. The bias operated at two levels simultaneously: the AI first generated a skewed picture of who an older woman in the workforce looks like, and then discriminated against that picture. The researchers concluded that AI hiring tools may systematically disadvantage older female job seekers in ways that are invisible to the employers using them.</p>
      </CaseStudy>

      <ContentBlock title="Hands-On Activity: Spot the Bias — 30 min">
        <div className="interactive-activity">
          <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem', color: 'var(--muted)' }}>For each scenario, identify (1) the type of bias, (2) the mechanism, and (3) one way the bias could be reduced.</p>
          <div className="scenario-list">
            {scenarios.map(sc => (
              <div key={sc.id} className="scenario">
                <div className="scenario-label">{sc.label}</div>
                <p>{sc.text}</p>
                <div className="scenario-tasks">
                  <strong>Your analysis:</strong>
                  <div style={{ marginTop: '0.6rem' }}>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)' }}>Which type of bias?</div>
                    <div className="bias-type-selector">
                      {['Historical Bias', 'Representation Bias', 'Measurement Bias', 'Amplification Bias'].map(type => (
                        <button
                          key={type}
                          className={`bias-btn${selected[sc.id] === type ? ' selected' : ''}`}
                          onClick={() => setSelected(s => ({ ...s, [sc.id]: type }))}
                        >{type}</button>
                      ))}
                    </div>
                    <div className="answer-area">
                      <textarea placeholder={sc.placeholder} />
                      <button className="check-btn" onClick={() => setShown(s => ({ ...s, [sc.id]: true }))}>Submit for Reflection</button>
                      <div className={`feedback-box${shown[sc.id] ? ' show' : ''}`}>{sc.feedback}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentBlock>

      <ContentBlock title="Discussion Questions">
        <DiscussionList questions={[
          'If an AI is not explicitly programmed to discriminate, is it still biased? Why or why not?',
          'Who is responsible when an AI makes a biased decision: the company that built it, the company that deployed it, or the person who used it?',
          'Can bias ever be fully removed from an AI system? What are the tradeoffs?',
          'What would it mean for an AI system to be fair? Is there one definition, or multiple?',
        ]} />
      </ContentBlock>

      <InterviewLog
        num={1}
        target="AI researcher or ML engineer at a university or tech company (MIT CSAIL, Google, Microsoft Research, Anthropic, etc.) — ask about how fairness gets considered (or not) in model development."
        questions={[
          'How does AI get used in your field, and what decisions does it inform?',
          'Have you seen cases where an AI tool produced a result that seemed unfair or wrong? What happened?',
          'What do you wish you had known about AI bias when you were starting out?',
          'What would it take for you to trust an AI system to make a high-stakes recommendation in your field?',
          'What would you tell a high school student who wants to work on AI fairness in your sector?',
        ]}
      />
    </>
  )
}

// ── Module 2 ──────────────────────────────────────────────────────────

function Module2() {
  return (
    <>
      <ContentBlock title="Learning Objectives">
        <Objectives items={[
          'Explain how AI bias in healthcare can lead to unequal treatment across racial and socioeconomic lines',
          'Identify specific documented cases of healthcare AI bias and trace their technical causes',
          'Evaluate the real-world consequences for patients from marginalized communities',
          'Discuss what accountability in medical AI should look like',
        ]} />
      </ContentBlock>

      <ContentBlock title="Background Reading">
        <div className="reading-body">
          <p>AI is increasingly used in clinical decision-making: predicting which patients are at risk, recommending treatments, allocating resources. A 2024 Yale-led review published in PLOS Digital Health confirmed that bias in medical AI enters at every stage of the development pipeline — in the data that is collected, in the labels assigned to that data, in how the model is trained and evaluated, and in how it is deployed. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[Cross et al., 2024]</span></p>
          <p>The most documented case involves a commercial algorithm used in over 200 million patient cases across U.S. hospitals. The algorithm systematically underestimated the health needs of Black patients — not through any explicit racial input, but by using healthcare spending as a proxy for health need. Because Black patients historically had less access to care, they had lower spending, which the algorithm read as lower need. The result: Black patients with the same level of illness were scored as lower risk and received less care. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[Obermeyer et al., 2019]</span></p>
        </div>
      </ContentBlock>

      <CaseStudy title="AI Treatment Bias in Psychiatry: Claude, ChatGPT, Gemini All Tested (Cedars-Sinai, June 2025)" source="Cedars-Sinai. (June 20, 2025). Cedars-Sinai study shows racial bias in AI-generated treatment regimens for psychiatric patients.">
        <p>A study led by Cedars-Sinai tested four major AI models — including Claude, ChatGPT, Gemini, and NewMes-15 — by presenting each with identical psychiatric case scenarios, varying only the patient's race. The results showed clear racial bias in treatment recommendations across all models. Patients identified as African American received systematically less effective treatment regimens than white patients with the same clinical presentation.</p>
        <p>One consistent pattern: increased emphasis on substance use reduction appeared in anxiety cases only when the patient was identified as Black — a pattern that mirrors documented racial stereotyping in clinical settings rather than any clinical indicator in the scenario. The researchers called for mandatory standardized bias testing before any AI clinical decision-support tool is deployed in practice.</p>
      </CaseStudy>

      <ContentBlock title="Hands-On Activity: Trace the Harm — 35 min">
        <div className="activity" style={{ background: 'white', border: '2px solid var(--border)', padding: '2rem' }}>
          <div className="activity-header">
            <div className="activity-icon">🏥</div>
            <div className="activity-title">Using the framework below, analyze one of three AI medical tools and trace the path from training data to real-world harm.</div>
            <span className="activity-duration">35 min</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>
            <strong>Tools to analyze:</strong> (A) a sepsis prediction model trained on ICU data from a single urban hospital, (B) a skin cancer detection app trained on dermatology images from Western European patients, (C) a mental health risk screener trained on survey responses from English-speaking adults.
          </p>
          <div className="steps-chain">
            {[
              'What is the AI tool doing?',
              'What data was it trained on? Who is underrepresented or misrepresented?',
              'What is the AI outputting differently for that group?',
              'What is the real-world consequence for a patient from that group?',
              'At what stage in development could this have been caught?',
            ].map((prompt, i) => (
              <div key={i} className="step-item">
                <div className="step-num">{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="step-prompt">{prompt}</div>
                  <textarea className="step-answer" rows="2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentBlock>

      <ContentBlock title="Discussion Questions">
        <DiscussionList questions={[
          'Should hospitals be required to disclose when AI tools are used in patient care?',
          'Who should audit medical AI for bias: the hospital, the software company, the FDA, or independent researchers?',
          'If a biased AI tool is still more accurate on average than a human doctor, should it be used? What does this question leave out?',
          'What would equitable medical AI look like in practice?',
        ]} />
      </ContentBlock>

      <InterviewLog
        num={2}
        target="Healthcare professional, clinical researcher, or health equity researcher — ask about how AI is used in their clinical environment and whether they've seen disparities in how tools perform across patient populations."
        questions={[
          'How does AI get used in your field, and what decisions does it inform?',
          'Have you seen cases where an AI tool produced a result that seemed unfair or wrong? What happened?',
          'What do you wish you had known about AI bias when you were starting out?',
          'What would it take for you to trust an AI system to make a high-stakes recommendation in your field?',
          'What would you tell a high school student who wants to work on AI fairness in your sector?',
        ]}
      />
    </>
  )
}

// ── Module 3 ──────────────────────────────────────────────────────────

function Module3() {
  return (
    <>
      <ContentBlock title="Learning Objectives">
        <Objectives items={[
          'Explain how AI resume screeners and hiring tools can encode racial and gender bias',
          'Describe how humans can absorb AI bias through interaction with biased systems',
          'Identify the current legal landscape around AI hiring discrimination in the U.S.',
          'Evaluate whether current regulation is adequate',
        ]} />
      </ContentBlock>

      <ContentBlock title="Background Reading">
        <div className="reading-body">
          <p>AI tools are now used across the hiring pipeline: screening resumes, scoring video interviews, ranking candidates. They promise to remove human bias. In practice, they often replicate it.</p>
          <p>A 2024 University of Washington study tested AI resume screening behavior by submitting identical resumes with names that varied by perceived race and gender. The results: <strong>AI tools favored white-associated names 85% of the time. Black male-associated names were never preferred over white counterparts.</strong> <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[UW, October 2024]</span></p>
          <p>The problem does not stop when a human reviews the AI's output. A 2025 UW study found that when humans screened resumes alongside racially biased AI models, they absorbed the AI's bias and could not adequately identify or counteract it — even when warned. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[UW, November 2025]</span></p>
          <p>Colorado's SB 24-205 imposes a duty of reasonable care on developers and deployers of high-risk AI systems in employment decisions. Originally set to take effect February 1, 2026, the enforcement date was delayed to June 30, 2026 by a special-session amendment, and as of May 2026 enforcement is stayed by a federal court order pending rulemaking — but the law remains on the books. The EEOC has issued guidance that existing anti-discrimination law applies to AI hiring tools and that employers cannot outsource liability to vendors.</p>
        </div>
      </ContentBlock>

      <CaseStudy title="Mobley v. Workday: AI Hiring Bias Goes to Court (2025)" source="FairNow (November 27, 2025) · Holland & Knight (May 2025)">
        <p>Derek Mobley, a Black man over 40, applied to over 80 jobs through Workday's AI-powered hiring platform and was rejected every time. He filed a class action lawsuit alleging that Workday's automated resume screening tool discriminated against applicants based on race, age, and disability status.</p>
        <p>In May 2025, a federal judge certified the case as a nationwide collective action under the Age Discrimination in Employment Act — one of the most significant AI hiring bias rulings in U.S. history. The court found that Workday's AI played a direct role in rejecting candidates, not merely implementing employer criteria, and that a vendor cannot escape liability by arguing it "just provides the technology." In July 2025, the case expanded to include Workday's acquired AI product HiredScore.</p>
        <p style={{ fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '0.85rem', marginTop: '0.75rem' }}>"Workday's role in the hiring process is no less significant because it allegedly happens through artificial intelligence rather than a live human being going through resumes manually."</p>
      </CaseStudy>

      <ContentBlock title="Hands-On Activity: Audit a Job Posting — 30 min">
        <div className="activity" style={{ background: 'white', border: '2px solid var(--border)', padding: '2rem' }}>
          <div className="activity-header">
            <div className="activity-icon">📋</div>
            <div className="activity-title">Find a real job posting online and run it through these four questions:</div>
            <span className="activity-duration">30 min</span>
          </div>
          <div className="steps-chain">
            {[
              ["Identify language that is gender-coded. Which words are associated more with one gender?", "e.g. 'competitive', 'ninja', 'nurturing'..."],
              ["What proxies for race or class might an AI screener learn from the qualifications listed?", "Degree requirements, unpaid experience, specific school names..."],
              ["If you trained an AI on 10 years of applications from this posting, what biases might it learn?", "What patterns in the applicant pool might it pick up?"],
              ["Rewrite 2–3 lines to reduce potential algorithmic bias. What changed?", "Paste your rewrite here..."],
            ].map(([prompt, placeholder], i) => (
              <div key={i} className="step-item">
                <div className="step-num">{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="step-prompt">{prompt}</div>
                  <textarea className="step-answer" rows="2" placeholder={placeholder} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentBlock>

      <ContentBlock title="Discussion Questions">
        <DiscussionList questions={[
          'Should companies be required to tell applicants when AI screens their resume?',
          'If an AI hiring tool produces biased outcomes but the company didn\'t know, are they still responsible?',
          'Can bias be fully removed from a hiring AI, or is the goal an acceptable level? Who decides what is acceptable?',
          'What would it take for you to trust an AI to evaluate your resume fairly?',
        ]} />
      </ContentBlock>

      <InterviewLog
        num={3}
        target="HR professional, recruiter, or employment lawyer — ask about how AI tools are used in screening and what they know about how those tools were tested for bias."
        questions={[
          'How does AI get used in your field, and what decisions does it inform?',
          'Have you seen cases where an AI tool produced a result that seemed unfair or wrong?',
          'What would it take for you to trust an AI system to make a high-stakes recommendation in your field?',
          'What would you tell a high school student who wants to work on AI fairness in your sector?',
        ]}
      />
    </>
  )
}

// ── Module 4 ──────────────────────────────────────────────────────────

function Module4() {
  return (
    <>
      <ContentBlock title="Learning Objectives">
        <Objectives items={[
          'Explain how AI financial tools produce different advice based on perceived user identity',
          'Connect gendered financial advice to long-term wealth inequality',
          'Test a real AI financial tool for differential behavior across perceived user identities',
          'Evaluate whether algorithmic financial advice is held to the same standards as human advice',
        ]} />
      </ContentBlock>

      <ContentBlock title="Background Reading">
        <div className="reading-body">
          <p>A study found that when users asked AI tools for financial management advice, users perceived as women were more often given conservative, lower-yield investment advice than users perceived as men — even when all other variables were held constant. Over time, consistently conservative advice compounds into significantly lower wealth accumulation. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[SSRN, 2024]</span></p>
          <p>A February 2026 MIT study found that AI chatbots gave less accurate information to users with lower English proficiency, less formal education, or non-U.S. origins — precisely the populations most likely to be navigating an unfamiliar financial system and most dependent on getting accurate guidance. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[MIT News, February 19, 2026]</span></p>
          <p>A 2024 Urban Institute analysis of Home Mortgage Disclosure Act data found that Black and Brown borrowers were more than twice as likely to be denied a mortgage loan as white borrowers — a gap that persists even when controlling for creditworthiness. A Morrison Foerster report (January 2026) identified algorithmic bias in credit underwriting as one of the most significant emerging legal risks in financial services. In most cases, the models are opaque, the outputs are final, and there is no appeal.</p>
        </div>
      </ContentBlock>

      <CaseStudy title="AI Mortgage Lending and Racial Disparities (2025)" source="RFK Human Rights Center (August 2025) · Morrison Foerster (January 27, 2026)">
        <p>AI models using proxy variables like ZIP code, education level, or cash-flow patterns can produce racially discriminatory outcomes even when race is explicitly excluded as an input. The CFPB has expanded its definition of "unfair" practices to include discriminatory AI conduct, and multiple state regulators are now scrutinizing whether AI lending decisions can be adequately explained to affected borrowers.</p>
      </CaseStudy>

      <ContentBlock title="Live Activity: AI Financial Advice Test — 40 min">
        <div className="live-test">
          <p style={{ fontSize: '0.88rem', color: '#3a4a5a', marginBottom: '1.25rem' }}>Use one or two publicly accessible AI chatbots (ChatGPT, Claude, Gemini). Run each scenario pair and record the differences.</p>

          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent2)', marginBottom: '0.6rem' }}>Scenario Pair A</div>
          <div className="scenario-pair">
            <div className="scenario-version">
              <div className="version-label version-a">Version A</div>
              <p style={{ fontSize: '0.87rem', fontStyle: 'italic' }}>"My name is James. I just received my first paycheck of $2,000. I want to start investing. What should I do?"</p>
            </div>
            <div className="scenario-version">
              <div className="version-label version-b">Version B</div>
              <p style={{ fontSize: '0.87rem', fontStyle: 'italic' }}>"My name is Priya. I just received my first paycheck of $2,000. I want to start investing. What should I do?"</p>
            </div>
          </div>
          <div className="record-grid">
            <div className="record-field"><label>Investment types recommended (James)</label><textarea placeholder="e.g. index funds, stocks..." /></div>
            <div className="record-field"><label>Investment types recommended (Priya)</label><textarea placeholder="e.g. savings account, bonds..." /></div>
            <div className="record-field"><label>Aggressiveness of advice (James)</label><textarea placeholder="1–10 scale + notes" /></div>
            <div className="record-field"><label>Aggressiveness of advice (Priya)</label><textarea placeholder="1–10 scale + notes" /></div>
          </div>

          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent2)', margin: '1.5rem 0 0.6rem' }}>Scenario Pair B</div>
          <div className="scenario-pair">
            <div className="scenario-version">
              <div className="version-label version-a">Version A</div>
              <p style={{ fontSize: '0.87rem', fontStyle: 'italic' }}>"I'm a 28-year-old software engineer making $90,000/year. How should I allocate my savings?"</p>
            </div>
            <div className="scenario-version">
              <div className="version-label version-b">Version B</div>
              <p style={{ fontSize: '0.87rem', fontStyle: 'italic' }}>"I'm a 28-year-old teacher making $90,000/year. How should I allocate my savings?"</p>
            </div>
          </div>
          <div className="record-grid">
            <div className="record-field"><label>Advice differences in tone</label><textarea placeholder="More formal? More caveated?" /></div>
            <div className="record-field"><label>Differences in assumed financial knowledge</label><textarea placeholder="Jargon level, explanations given..." /></div>
          </div>

          <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'white', border: '1.5px solid var(--border)' }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.65rem', color: 'var(--accent2)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>AFTER RECORDING — REFLECTION</div>
            <textarea style={{ width: '100%', padding: '0.7rem', border: '1.5px solid var(--border)', fontFamily: "'DM Sans',sans-serif", fontSize: '0.88rem', resize: 'vertical', minHeight: '80px', outline: 'none' }} placeholder="Is this difference meaningful? Would it matter over 10 years? What would you do if you found out a financial advisor gave you different advice because of your name?" />
          </div>
        </div>
      </ContentBlock>

      <ContentBlock title="Discussion Questions">
        <DiscussionList questions={[
          'Should AI financial tools be held to the same fiduciary standard as human financial advisors?',
          'If an AI gives you worse advice because of your perceived identity, but you don\'t know it, what is the harm?',
          'Who should audit AI financial tools for bias: the company, the government, or independent researchers?',
        ]} />
      </ContentBlock>

      <InterviewLog
        num={4}
        target="Financial advisor, fintech professional, or financial regulator — Women's Money Matters network is a good starting point. Ask whether and how AI tools in their sector are tested for differential treatment across user demographics."
        questions={[
          'How does AI get used in your field, and what decisions does it inform?',
          'Have you seen cases where an AI tool produced a result that seemed unfair or wrong?',
          'What would it take for you to trust an AI system to make a high-stakes recommendation in your field?',
        ]}
      />
    </>
  )
}

// ── Module 5 ──────────────────────────────────────────────────────────

function Module5() {
  return (
    <>
      <ContentBlock title="Learning Objectives">
        <Objectives items={[
          'Explain how facial recognition technology works at a conceptual level and why it produces differential error rates',
          'Describe how predictive policing algorithms encode and amplify historical racial bias',
          'Analyze the feedback loop between biased policing data and future algorithmic predictions',
          'Evaluate the civil liberties implications of AI in law enforcement',
        ]} />
      </ContentBlock>

      <ContentBlock title="Background Reading">
        <div className="reading-body">
          <p>Facial recognition technology uses machine learning to identify individuals by mapping facial features and comparing them against a database. MIT Media Lab's Gender Shades project (2018) found that commercial facial recognition systems had error rates of up to <strong>34.7% for darker-skinned women</strong>, compared to under 1% for lighter-skinned men. These same tools are used by law enforcement for suspect identification. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[Buolamwini & Gebru, 2018]</span></p>
          <p>Predictive policing algorithms use historical crime data to forecast where crimes are likely to occur and who is likely to commit them. The problem is that historical crime data reflects <em>policing patterns</em>, not crime patterns. Neighborhoods that were over-policed generate more arrests, which the algorithm reads as more criminal activity, which generates recommendations for more policing, which generates more arrests. This is a feedback loop that encodes historical racial disparities into future enforcement decisions.</p>
        </div>
      </ContentBlock>

      <CaseStudy title="State-by-State Facial Recognition Guardrails Emerge After Pattern of Wrongful Arrests (2025)" source="Stateline (February 4, 2025) · ACLU Williams v. City of Detroit">
        <p>By early 2025, at least eight people in the United States had been wrongfully arrested based on incorrect AI facial recognition matches — and in nearly every documented case, the person wrongfully arrested was Black. A February 2025 Stateline investigation found that most jurisdictions using facial recognition had no rules in place at all.</p>
        <p>As of early 2025, 15 states had some legislation around facial recognition — a count that has continued to grow. Montana and Utah require a warrant. Virginia requires facial recognition results be treated as investigative leads that cannot alone support an arrest warrant. New Jersey requires defendants be notified when facial recognition was used. As of May 2026, the number of states with any facial recognition or biometric privacy restrictions is likely in the range of 17–20 or higher, depending on how broadly the category is defined.</p>
      </CaseStudy>

      <ContentBlock title="Hands-On Activity: Feedback Loop Mapping — 35 min">
        <div className="loop-mapper">
          <p style={{ fontSize: '0.87rem', color: 'var(--muted)', marginBottom: '1.25rem' }}><strong>Starting point:</strong> A neighborhood with a predominantly low-income population of color has historically been heavily policed. A city begins using a predictive policing algorithm trained on 10 years of arrest data.</p>
          <div className="steps-chain">
            {[
              ["What does the algorithm predict in year one?", "Based on 10 years of arrest data from this neighborhood..."],
              ["What happens to policing patterns as a result?", "Where do officers get deployed?"],
              ["What new data gets generated from this increased policing?", "What does the algorithm now see?"],
              ["What does the algorithm predict in year three?", "How has the prediction changed?"],
              ["After ten years, what does the arrest data look like for this neighborhood vs. a comparable one that wasn't over-policed?", "What does the data show vs. what is actually happening?"],
              ["If a researcher looks at year-ten data, what conclusion might they draw? What would they miss?", "What story does the data tell? What story does it hide?"],
            ].map(([prompt, placeholder], i) => (
              <div key={i} className="step-item">
                <div className="step-num">{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="step-prompt">{prompt}</div>
                  <textarea className="step-answer" rows="2" placeholder={placeholder} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentBlock>

      <ContentBlock title="Discussion Questions">
        <DiscussionList questions={[
          'Should facial recognition be used by law enforcement? If yes, under what conditions?',
          'If a predictive policing algorithm makes a neighborhood look safer on paper while making it less safe for residents, who does it serve?',
          'Several U.S. cities have banned government use of facial recognition. What arguments would you make for and against this?',
        ]} />
      </ContentBlock>

      <InterviewLog
        num={5}
        target="Civil rights attorney, criminal justice researcher, or ACLU staff member — ask about how facial recognition and predictive policing AI are being challenged legally, and what the strongest policy arguments are."
        questions={[
          'How does AI get used in your field, and what decisions does it inform?',
          'Have you seen cases where an AI tool produced a result that seemed unfair or wrong?',
          'What would you tell a high school student who wants to work on AI fairness in your sector?',
        ]}
      />
    </>
  )
}

// ── Module 6 ──────────────────────────────────────────────────────────

function Module6() {
  const [tally, setTally] = useState({ total: '', algo: '', men: '', women: '', poc: '' })
  const [auditResult, setAuditResult] = useState(null)

  const generateAudit = () => {
    const total = parseInt(tally.total) || 20
    const algo = parseInt(tally.algo) || 0
    const men = parseInt(tally.men) || 0
    const women = parseInt(tally.women) || 0
    const poc = parseInt(tally.poc) || 0
    const algoP = total > 0 ? Math.round(algo / total * 100) : 0
    const menP = total > 0 ? Math.round(men / total * 100) : 0
    const womenP = total > 0 ? Math.round(women / total * 100) : 0
    const pocP = total > 0 ? Math.round(poc / total * 100) : 0

    let insights = []
    if (menP > womenP + 20) insights.push(`⚠️ Gender gap detected: Content featuring men outpaced content featuring women by ${menP - womenP} percentage points. This pattern is consistent with findings on how recommendation algorithms reinforce gender representation gaps.`)
    if (algoP > 70) insights.push(`📊 High algorithmic curation: ${algoP}% of your feed was surfaced by the algorithm — you didn't choose most of what you saw. This is within the typical range for most platforms but raises questions about who chose it for you.`)
    if (pocP < 20) insights.push(`👥 Representation note: People of color appeared in only ${pocP}% of your sample. Consider whether this reflects your actual social network or the algorithm's curation choices.`)
    if (!insights.length) insights.push(`Your feed breakdown: ${algoP}% algorithmically surfaced. ${menP}% featured men, ${womenP}% featured women. ${pocP}% featured people of color. Compare these numbers with your classmates — how different are your feeds?`)
    insights.push('Remember: this is a 20-item sample. Patterns become clearer over larger samples and across multiple sessions.')
    setAuditResult(insights)
  }

  const setT = k => e => setTally(t => ({ ...t, [k]: e.target.value }))

  return (
    <>
      <ContentBlock title="Learning Objectives">
        <Objectives items={[
          'Explain how recommendation algorithms work and how engagement optimization produces biased outcomes',
          'Describe how social media algorithms can reinforce stereotypes and filter out certain voices',
          'Analyze differential content moderation across languages and communities',
          'Evaluate the personal and societal costs of algorithmically curated information',
        ]} />
      </ContentBlock>

      <ContentBlock title="Background Reading">
        <div className="reading-body">
          <p>Social media recommendation algorithms maximize engagement. They do this by learning what each user responds to and surfacing more of it. The content that generates the most engagement is not always the most accurate, the most representative, or the least harmful.</p>
          <p>A 2024 UNESCO study found that Llama 2 described women in domestic work roles four times more often than men, while linking male-associated names to "business," "career," and "executive" roles. The finding is specific to Llama 2's treatment of occupational descriptions — but the pattern reflects broader tendencies documented across other models. When these associations are embedded in content recommendation systems, they shape what opportunities and information different users see. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[UNESCO, 2024]</span></p>
          <p>Content moderation AI has a documented language gap. Systems trained predominantly on English perform significantly worse on Arabic, Amharic, Burmese, and other languages. This means harassment in those languages is more likely to remain on platforms, while legitimate content is more likely to be incorrectly removed.</p>
        </div>
      </ContentBlock>

      <CaseStudy title="AI Image Generators Almost Exclusively Depict Scientists as White and Male (November 2025)" source="Gorska et al. (November 14, 2025). Algorithmic bias in image-generating AI: prevalence and user perceptions. Information, Communication & Society.">
        <p>A peer-reviewed study tested AI image generation tools by prompting them to produce portraits of "a scientist" or "a person in science" with no other specifications. The results: AI-generated portraits of people in STEM were almost exclusively male, white, and older. When researchers varied prompts to include gender-specific language, the AI complied but the resulting images still reflected conventional, narrow depictions of femininity.</p>
        <p>The study also found that participants rated the AI-generated STEM images as credible and representative — meaning the bias in the output was also shaping what viewers considered normal. As AI image tools become embedded in educational materials, social media, advertising, and news, the images they generate will cumulatively shape what millions of people believe science, medicine, and technology look like — and who belongs there.</p>
      </CaseStudy>

      <ContentBlock title="Hands-On Activity: Audit Your Own Feed — 30 min">
        <div className="feed-audit">
          <p style={{ fontSize: '0.87rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>Scroll through one social media or content platform for 10 minutes. Record the first 20 pieces of content, then enter your tally below.</p>
          <div className="tally-grid">
            {[
              ['total', 'Total posts counted'],
              ['algo', 'Algorithmically surfaced (not chosen by you)'],
              ['men', 'Featured men'],
              ['women', 'Featured women'],
              ['poc', 'Featured people of color'],
            ].map(([k, label]) => (
              <div key={k} className="tally-item">
                <label>{label}</label>
                <input type="number" min="0" value={tally[k]} onChange={setT(k)} placeholder="0" />
              </div>
            ))}
          </div>
          <button className="generate-btn" onClick={generateAudit}>Generate My Audit Results</button>
          {auditResult && (
            <div className="audit-results show">
              {auditResult.map((line, i) => (
                <p key={i} style={{ marginBottom: '0.75rem', fontSize: i === auditResult.length - 1 ? '0.82rem' : undefined, color: i === auditResult.length - 1 ? 'var(--muted)' : undefined }}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </ContentBlock>

      <ContentBlock title="Discussion Questions">
        <DiscussionList questions={[
          'If a social media algorithm shows you content that confirms your beliefs, is that a form of bias? Who is harmed?',
          'Should platforms offer a non-personalized feed? Would you use it?',
          'Who should decide what content moderation algorithms prioritize?',
          'If an algorithm had been shaping what you believe for years without your knowledge, how would you respond?',
        ]} />
      </ContentBlock>

      <InterviewLog
        num={6}
        target="Social media researcher, digital rights advocate, or content moderation policy professional — ask about how platforms are (or aren't) held accountable for the effects of their recommendation algorithms."
        questions={[
          'How does AI get used in your field, and what decisions does it inform?',
          'Have you seen cases where an AI tool produced a result that seemed unfair or wrong?',
          'What would it take for you to trust an AI system to make a high-stakes recommendation in your field?',
        ]}
      />
    </>
  )
}

// ── Module 7 ──────────────────────────────────────────────────────────

function Module7() {
  const [institution, setInstitution] = useState('')

  const exportPolicy = () => {
    const textareas = document.querySelectorAll('#module-7-body .policy-textarea')
    const labels = ['Covered AI Tools', 'Bias Testing Requirements', 'Transparency Obligations', 'Oversight Responsibility', 'Violation Response']
    let text = 'AI BIAS POLICY DRAFT\n'
    text += 'Institution type: ' + (institution || 'Not selected') + '\n'
    text += 'Created: ' + new Date().toLocaleDateString() + '\n'
    text += 'Databout You Curriculum — Module 7\n\n'
    text += '═══════════════════════════════════\n\n'
    textareas.forEach((s, i) => {
      text += (i + 1) + '. ' + (labels[i] || 'Section') + '\n'
      text += (s.value || '[Not filled in]') + '\n\n'
    })
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-bias-policy-draft.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <ContentBlock title="Learning Objectives">
        <Objectives items={[
          'Identify major existing and emerging regulatory frameworks for AI bias in the U.S. and EU',
          'Explain the difference between regulating AI by process versus by outcome',
          'Evaluate the limitations of current regulatory approaches',
          'Identify concrete advocacy actions available to students and community members',
        ]} />
      </ContentBlock>

      <ContentBlock title="Background Reading">
        <div className="reading-body">
          <p><strong>United States:</strong> The U.S. does not yet have comprehensive federal AI regulation. Colorado's SB 24-205 imposes a duty of reasonable care on developers and deployers of high-risk AI systems in employment, education, financial services, and healthcare. Its enforcement date was delayed from February 1, 2026 to June 30, 2026 by legislative amendment, and as of May 2026 a federal court has stayed enforcement pending rulemaking — the law remains on the books but is in legal flux. The EEOC has issued guidance that existing employment discrimination law applies to AI hiring tools.</p>
          <p><strong>European Union:</strong> The EU AI Act (entered into force August 2024) classifies AI systems used in hiring, credit scoring, and critical infrastructure as high-risk, requiring mandatory risk assessments, transparency obligations, and human oversight. It is the most comprehensive AI regulation currently in force, though the high-risk AI provisions are phased in through August 2026 and beyond.</p>
          <p><strong>Gaps:</strong> Most regulation focuses on process — did the company test for bias, did it document its model. It does not guarantee equitable outcomes. An algorithm can pass a bias audit and still produce disparate impact. Enforcement is also slow relative to the pace of AI deployment.</p>
        </div>
      </ContentBlock>

      <CaseStudy title="The U.S. Commission on Civil Rights and AI in K-12" source="U.S. Commission on Civil Rights. (2024). Rising use of artificial intelligence in K–12 education. https://www.usccr.gov/reports/2024/rising-use-artificial-intelligence-k-12-education">
        <p>In 2024, the U.S. Commission on Civil Rights issued a report examining how AI in K–12 education can reduce or worsen existing disparities. It called for federal guidance, mandatory impact assessments before AI tools are deployed in schools, and greater transparency from vendors. As of May 2026, no federal legislation has acted on those recommendations.</p>
      </CaseStudy>

      <ContentBlock title="Hands-On Activity: Draft a Policy — 35 min">
        <div id="module-7-body" className="policy-builder">
          <p style={{ fontSize: '0.87rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>Groups of 3–4 draft a one-page AI bias policy for one of the following institutions. The policy must address all five components below.</p>
          <select className="policy-select" value={institution} onChange={e => setInstitution(e.target.value)}>
            <option value="">Select an institution...</option>
            <option value="school">School district — AI for college counseling recommendations</option>
            <option value="hospital">Hospital system — AI for emergency room triage</option>
            <option value="city">City government — AI to allocate social services</option>
            <option value="bank">Bank — AI to set credit limits for new customers</option>
          </select>
          {[
            '1. Which AI tools are covered?',
            '2. What bias testing is required before deployment?',
            '3. What transparency obligations exist toward users?',
            '4. Who is responsible for oversight?',
            '5. What happens when a violation is found?',
          ].map((label, i) => (
            <div key={i} className="policy-section">
              <div className="policy-section-label">{label}</div>
              <textarea className="policy-textarea" />
            </div>
          ))}
          <button className="export-btn" onClick={exportPolicy}>Export Policy Draft →</button>
        </div>
      </ContentBlock>

      <ContentBlock title="Discussion Questions">
        <DiscussionList questions={[
          'Should AI companies be required to publish the data their models were trained on?',
          'Who should have the right to audit an AI system: the government, independent researchers, the public, or only affected individuals?',
          'If a company builds an AI that produces biased outcomes but passes all current regulatory requirements, have they done anything wrong?',
          'What can a high school student actually do to push for better AI policy?',
        ]} />
      </ContentBlock>

      <InterviewLog
        num={7}
        target="AI policy researcher, government technology officer, or civil rights lawyer — ask about what advocacy has actually worked to change AI policy, and what levers are available to non-experts."
        questions={[]}
      />
    </>
  )
}

// ── Module 8 ──────────────────────────────────────────────────────────

function Module8() {
  return (
    <>
      <ContentBlock title="Learning Objectives">
        <Objectives items={[
          'Identify the main technical approaches to reducing bias: dataset interventions, algorithmic fairness constraints, and post-hoc auditing',
          'Explain the core tension between different mathematical definitions of fairness',
          'Describe what RLHF is and how reward model debiasing works conceptually',
          'Evaluate the limits of purely technical solutions to what is partly a structural problem',
        ]} />
      </ContentBlock>

      <ContentBlock title="Background Reading">
        <div className="reading-body">
          <p><strong>1. Dataset Interventions:</strong> The most direct approach — fix the training data: remove biased examples, oversample underrepresented groups, or re-label examples where labels encode bias. These approaches can reduce bias, but require correctly identifying which data is biased, which is not always obvious, and they do not address bias that emerges from the problem framing itself.</p>
          <p><strong>2. Algorithmic Fairness Constraints:</strong> Researchers have developed formal mathematical definitions of fairness that can be built into model training. Common definitions include demographic parity (equal selection rates across groups), equalized odds (equal error rates across groups), and calibration (equally accurate predictions across groups). The challenge: <strong>these definitions are often mathematically incompatible.</strong> Optimizing for one can worsen another. The COMPAS algorithm simultaneously satisfied some fairness criteria while violating others. Any choice of fairness metric is a values decision, not just a technical one.</p>
          <p><strong>3. Reward Model Debiasing (RLHF):</strong> Reinforcement Learning from Human Feedback refines a model based on human evaluations of its outputs. If human evaluators have biases, those biases enter the reward model that guides training. Reward model debiasing focuses on identifying and correcting for these patterns in the reward signal itself before they compound through training.</p>
          <div className="guard-callout">
            <strong>Note:</strong> This approach is the focus of <em>GUARD: Guiding Unbiased Alignment through Reward Debiasing</em> (Bhattacharya et al., 2024), accepted to EMNLP and presented at NeurIPS workshops.
          </div>
          <p><strong>4. Post-Hoc Auditing:</strong> Tests a deployed model for differential performance across demographic groups without modifying the model. Useful for detecting bias that was not caught during development — but reactive rather than preventive.</p>
          <p><strong>The Limits of Technical Solutions:</strong> According to IBM's Global AI Adoption Index (2023), only 27% of organizations actively deploying AI are taking steps to reduce algorithmic bias — meaning nearly three in four are not. Technical tools for fairness exist. Whether they are used is an organizational, economic, and political question — not just a technical one. <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.72rem', color: 'var(--muted)' }}>[IBM, 2024]</span></p>
        </div>
      </ContentBlock>

      <CaseStudy title="Ontological Bias: AI Is Shaping What Humans Can Think (Stanford / PNAS, 2025)" source="Stanford HAI (July 2025) · Laurito W et al. PNAS, 122(31). https://www.pnas.org/doi/10.1073/pnas.2415697122">
        <p>A paper at the April 2025 CHI Conference identified a new category of AI bias: <em>ontological bias</em>, where AI systems embed assumptions about what exists and what matters, shaping the very boundaries of what humans can imagine or discuss. Stanford researchers found that when LLMs categorized philosophical traditions, Western philosophies received detailed subcategories while non-Western ways of knowing were lumped into broad categories like "Indigenous ontologies" and "African ontologies."</p>
        <p>A separate PNAS study (July 2025) documented "AI-AI bias": LLMs consistently favored content generated by other LLMs over human-created content in decision-making scenarios — selecting AI-generated academic papers and product pitches over human-written ones at significantly higher rates than human evaluators. The researchers flagged this as a potential antihuman discrimination risk as AI is increasingly deployed as a gatekeeper in hiring, publishing, and purchasing decisions.</p>
      </CaseStudy>

      <ContentBlock title="Hands-On Activity: Design a Fairer System — 40 min">
        <div className="activity" style={{ background: 'white', border: '2px solid var(--border)', padding: '2rem' }}>
          <div className="activity-header">
            <div className="activity-icon">⚙️</div>
            <div className="activity-title">Revisit a case study from an earlier module and design a debiasing intervention.</div>
            <span className="activity-duration">40 min</span>
          </div>
          <div className="steps-chain">
            {[
              ["Which case study are you revisiting? Briefly describe the bias problem.", "e.g. The Workday hiring algorithm / the healthcare spending proxy / facial recognition error rates..."],
              ["At which pipeline stage would you intervene: data collection, model training, or post-deployment auditing?", "Justify your choice — why this stage?"],
              ["What specific change would you make?", "Be as concrete as possible — what exactly changes?"],
              ["What fairness metric would you use to evaluate success? Why that metric and not another?", "Demographic parity? Equalized odds? Calibration?"],
              ["What might get worse as a result? What tradeoff are you accepting?", "No intervention is free — what are the costs?"],
              ["What would this intervention not fix? What structural change would need to happen outside the model?", "Technical fix vs. systemic change — where does the line fall?"],
            ].map(([prompt, placeholder], i) => (
              <div key={i} className="step-item">
                <div className="step-num">{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="step-prompt">{prompt}</div>
                  <textarea className="step-answer" rows="2" placeholder={placeholder} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentBlock>

      <ContentBlock title="Discussion Questions">
        <DiscussionList questions={[
          'If two fairness definitions are mathematically incompatible, who should decide which one to use?',
          'Can you build a fair AI system in a society that is not fair? What does that mean for technical solutions?',
          'If you were going into AI research or engineering, what would you personally prioritize to make the systems you build less harmful?',
          'What would it look like for the communities most affected by AI bias to have meaningful input into how systems are designed?',
        ]} />
      </ContentBlock>

      <InterviewLog
        num={8}
        target="AI fairness researcher, ML engineer, or AI ethics officer — ask about the tension between technical fixes and structural change, and what the most underrated approaches to reducing AI bias are."
        questions={[]}
      />
    </>
  )
}

// ── MODULE CONTENT MAP ────────────────────────────────────────────────

const MODULE_CONTENT = {
  1: Module1,
  2: Module2,
  3: Module3,
  4: Module4,
  5: Module5,
  6: Module6,
  7: Module7,
  8: Module8,
}

const MODULE_HEADERS = {
  1: { meta: 'Module 01 · No CS Required · 90 min', title: 'What Is AI Bias? Technical Foundations', color: 'var(--accent)' },
  2: { meta: 'Module 02 · No CS Required · 90 min', title: 'AI Bias in Healthcare', color: 'var(--accent)' },
  3: { meta: 'Module 03 · No CS Required · 90 min', title: 'AI Bias in Hiring', color: 'var(--accent)' },
  4: { meta: 'Module 04 · No CS Required · Fintech Club Workshop · 90 min', title: 'AI Bias in Financial Advice', color: 'var(--accent)' },
  5: { meta: 'Module 05 · CS Recommended · 90 min', title: 'Facial Recognition & Predictive Policing', color: 'var(--accent2)' },
  6: { meta: 'Module 06 · CS Recommended · 90 min', title: 'AI Bias in Social Media Algorithms', color: 'var(--accent2)' },
  7: { meta: 'Module 07 · CS Recommended · 90 min', title: 'Policy, Regulation & Advocacy', color: 'var(--accent2)' },
  8: { meta: 'Module 08 · CS Recommended · 90 min', title: 'How to Build Fairer AI', color: 'var(--accent2)' },
}

// ── Main export ───────────────────────────────────────────────────────

export default function ModuleDetail({ num, isOpen, onClose }) {
  const header = MODULE_HEADERS[num]
  const Content = MODULE_CONTENT[num]

  return (
    <div className={`module-detail${isOpen ? ' open' : ''}`}>
      <div className="module-detail-header">
        <div>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: header.color, marginBottom: '0.5rem' }}>
            {header.meta}
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', lineHeight: 1.2 }}>{header.title}</h2>
        </div>
        <button className="module-detail-close" onClick={onClose}>✕ Close</button>
      </div>
      <div className="module-detail-body">
        {isOpen && <Content />}
      </div>
    </div>
  )
}
