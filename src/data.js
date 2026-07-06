export const MODULE_COLORS = {
  1: '#2B4EE6', 2: '#0CA678', 3: '#F59F00', 4: '#F03E3E',
  5: '#7048E8', 6: '#E64980', 7: '#1098AD', 8: '#66A80F',
}

export const modules = [
  {
    num: 1,
    title: 'What Is AI Bias?',
    subtitle: 'Technical Foundations',
    cs: false,
    desc: 'Define AI bias. Distinguish historical, representation, measurement, and amplification bias. Trace the feedback loop that turns biased data into biased futures.',
    tags: ['Historical Bias', 'Representation', 'Amplification'],
  },
  {
    num: 2,
    title: 'AI Bias in Healthcare',
    cs: false,
    desc: 'How a single proxy variable denied Black patients appropriate care — in 200 million cases. Plus: Claude, ChatGPT, Gemini all tested for psychiatric treatment bias.',
    tags: ['Clinical AI', 'Racial Bias', 'Healthcare Equity'],
  },
  {
    num: 3,
    title: 'AI Bias in Hiring',
    cs: false,
    desc: "AI screeners favored white-associated names 85% of the time. And humans couldn't correct the bias even when warned. Then there's Mobley v. Workday.",
    tags: ['Resume Screening', 'Legal Cases', 'Discrimination'],
  },
  {
    num: 4,
    title: 'AI Bias in Financial Advice',
    cs: false,
    fintech: true,
    desc: 'Conservative advice compounds into lower wealth. Vulnerable users get worse info. Live activity: test an AI chatbot with identical questions from different names.',
    tags: ['Gender Bias', 'Fintech', 'Wealth Inequality'],
  },
  {
    num: 5,
    title: 'Facial Recognition & Predictive Policing',
    cs: true,
    desc: '34.7% error rate for darker-skinned women vs 1% for lighter-skinned men. In nearly every documented wrongful arrest from facial recognition, the person was Black.',
    tags: ['Civil Liberties', 'Feedback Loops', 'Policing'],
  },
  {
    num: 6,
    title: 'AI Bias in Social Media Algorithms',
    cs: true,
    desc: 'Llama 2 described women in domestic work roles 4× more often than men (UNESCO, 2024). AI image generators almost exclusively depict scientists as white and male. Audit your own feed.',
    tags: ['Recommendation Algorithms', 'Content Moderation'],
  },
  {
    num: 7,
    title: 'Policy, Regulation & Advocacy',
    cs: true,
    desc: 'Colorado passed the first state AI law — then repealed and replaced it before it ever took effect. The EU just delayed its high-risk rules. Draft a real AI bias policy, then defend it.',
    tags: ['Legislation', 'EU AI Act', 'Advocacy'],
  },
  {
    num: 8,
    title: 'How to Build Fairer AI',
    cs: true,
    desc: 'Dataset interventions, fairness constraints, RLHF reward debiasing (the GUARD paper), post-hoc auditing. Then: why most organizations deploy AI without bias safeguards anyway.',
    tags: ['RLHF', 'Fairness Metrics', 'GUARD'],
  },
]

// ── 90-minute pacing plans (minutes must sum to 90) ────────────────────
export const PACING = {
  1: [
    { label: 'Hook: one biased headline', min: 10 },
    { label: 'The four bias types', min: 20 },
    { label: 'Case study read + react', min: 10 },
    { label: 'Activity: Spot the Bias', min: 30 },
    { label: 'Discussion', min: 15 },
    { label: 'Wrap + interview assignment', min: 5 },
  ],
  2: [
    { label: 'Hook: the 200M-case algorithm', min: 8 },
    { label: 'Background: bias in the clinical pipeline', min: 17 },
    { label: 'Case study: psychiatric treatment bias', min: 10 },
    { label: 'Activity: Trace the Harm', min: 35 },
    { label: 'Discussion', min: 15 },
    { label: 'Wrap', min: 5 },
  ],
  3: [
    { label: 'Hook: 85% and never preferred', min: 10 },
    { label: 'Background + the legal landscape', min: 20 },
    { label: 'Case study: Mobley v. Workday', min: 10 },
    { label: 'Activity: Audit a Job Posting', min: 30 },
    { label: 'Discussion', min: 15 },
    { label: 'Wrap', min: 5 },
  ],
  4: [
    { label: 'Hook: same paycheck, different advice', min: 5 },
    { label: 'Background: advice gaps compound', min: 15 },
    { label: 'Case study: AI mortgage lending', min: 10 },
    { label: 'Live activity: AI advice test', min: 40 },
    { label: 'Discussion', min: 15 },
    { label: 'Wrap', min: 5 },
  ],
  5: [
    { label: 'Hook: 34.7% vs under 1%', min: 10 },
    { label: 'How FR + predictive policing work', min: 20 },
    { label: 'Case study: wrongful arrests + guardrails', min: 10 },
    { label: 'Activity: Feedback Loop Mapping', min: 35 },
    { label: 'Discussion', min: 10 },
    { label: 'Wrap', min: 5 },
  ],
  6: [
    { label: 'Hook: who picked your feed?', min: 10 },
    { label: 'Background: engagement optimization', min: 15 },
    { label: 'Case study: AI image generators', min: 10 },
    { label: 'Activity: Audit Your Own Feed', min: 30 },
    { label: 'Discussion', min: 20 },
    { label: 'Wrap', min: 5 },
  ],
  7: [
    { label: 'Hook: a law repealed before it began', min: 10 },
    { label: 'The regulatory landscape (US + EU)', min: 20 },
    { label: 'Case study: AI in K-12', min: 10 },
    { label: 'Activity: Draft a Policy', min: 35 },
    { label: 'Present + defend drafts', min: 10 },
    { label: 'Wrap', min: 5 },
  ],
  8: [
    { label: 'Hook: the tools exist. Why the gap?', min: 5 },
    { label: 'Four debiasing approaches', min: 25 },
    { label: 'Case study: ontological + AI-AI bias', min: 10 },
    { label: 'Activity: Design a Fairer System', min: 40 },
    { label: 'Discussion + course close', min: 10 },
  ],
}

// ── Facilitator guides (visible in Teacher Mode) ───────────────────────
export const FACILITATOR = {
  1: {
    prep: [
      'Skim the four bias-type definitions; be ready to give one non-tech analogy for each (e.g. historical bias = studying for the wrong test because the answer key is outdated).',
      'Queue one recent news headline about AI bias for the hook — the fresher the better.',
      'Decide groupings for Spot the Bias: pairs work best; each pair takes one scenario, then shares out.',
    ],
    notes: [
      'The four types overlap on purpose. Scenario C is both historical and measurement bias — reward students who see multiple types instead of hunting for one right answer.',
      'The feedback-loop concept returns in Modules 5 and 6. Plant the phrase "biased data creates biased futures" now.',
      'If students finish scenarios early, have them invent a Scenario D from their own life (school, sports, social media).',
    ],
    misconceptions: [
      '"Bias means someone programmed it to discriminate." No — bias usually enters through data, proxies, and problem framing, not intent.',
      '"More data fixes bias." More of the same biased data amplifies the problem; representative data is what matters.',
    ],
  },
  2: {
    prep: [
      'Read the Obermeyer proxy-variable mechanism carefully — students will ask how spending stands in for health, and the answer (access shapes spending) is the whole module.',
      'Assign the three Trace the Harm tools (sepsis, skin cancer, mental health) across groups so all three get covered.',
    ],
    notes: [
      'The key move: no racial input, racially disparate output. Have students state the mechanism in one sentence before moving on.',
      'The Cedars-Sinai case lands hard because it tested tools students actually use (Claude, ChatGPT, Gemini). Let that discomfort sit; it powers the discussion.',
      'For step 5 of the activity ("where could this be caught?"), push past "test it more" — ask who tests, on what data, and who signs off.',
    ],
    misconceptions: [
      '"The algorithm was racist because someone entered race." The Obermeyer algorithm never used race — that is exactly why it matters.',
      '"AI in medicine is experimental." Clinical AI is already deployed at scale; the 200M figure is real patient cases.',
    ],
  },
  3: {
    prep: [
      'Check the latest Mobley v. Workday news the week you teach — this case moves fast (major rulings in March and June 2026 alone).',
      'Pull 2-3 real job postings (mix of industries) in case students struggle to find good ones for the audit.',
    ],
    notes: [
      'The two UW findings pair as a one-two punch: the AI is biased (2024), and humans absorb the bias even when warned (2025). Human review is not the safety net students assume.',
      'On the legal landscape: the point is instability, not memorizing statutes. Colorado wrote, delayed, and replaced its law within two years — regulation is a moving target.',
      'The June 2026 ruling on "proxy indicators" (employment gaps read as disability signals) is a concrete bridge back to Module 1 measurement bias.',
    ],
    misconceptions: [
      '"A human makes the final call, so the AI does not matter." The court in Mobley rejected exactly this: the vendor was plausibly an agent making decisions.',
      '"Removing names from resumes removes bias." Models pick up proxies — schools, zip codes, gaps, word choice.',
    ],
  },
  4: {
    prep: [
      'Confirm which chatbots students can access on school devices; have a backup plan (teacher screen-shares one account) if access is limited.',
      'Remind students not to enter real personal or financial information into any chatbot during the test.',
    ],
    notes: [
      'Results will vary — some pairs will show no visible difference. That is a finding, not a failure: discuss sample size and why single anecdotes cannot prove or disprove bias.',
      'Have pairs swap transcripts before the reflection so each group codes advice they did not elicit.',
      'The compounding argument (conservative advice → decades of lower returns) is where this connects to wealth inequality. A quick 7% vs 4% over 30 years example on the board makes it visceral.',
    ],
    misconceptions: [
      '"Conservative advice is just safer, so it is fine." Systematically safer advice for one group is a wealth transfer over time.',
      '"If I did not tell it my gender, it cannot be biased." Names, phrasing, and stated professions all carry demographic signal.',
    ],
  },
  5: {
    prep: [
      'Preview the feedback-loop activity yourself — the year-one to year-ten arc is the intellectual core of the module.',
      'Check whether your own state restricts police facial recognition; local specifics make the discussion concrete.',
    ],
    notes: [
      'Keep the two technologies distinct: facial recognition mis-identifies individuals; predictive policing mis-directs resources. Both are biased, differently.',
      'The activity punchline (step 6): by year ten, the data "proves" the algorithm right. Make sure every group articulates why that proof is circular.',
      'This module runs heavy — protect the last 10 minutes for discussion, since civil liberties positions differ and students need room to disagree well.',
    ],
    misconceptions: [
      '"Wrongful arrests mean the tech barely works." The tech works well for some faces — the differential error rate is the problem.',
      '"Crime data measures crime." Arrest data measures policing; that gap drives the feedback loop.',
    ],
  },
  6: {
    prep: [
      'Decide the feed-audit platform policy in advance: personal phones, a shared class account, or a logged-out feed all work with different privacy tradeoffs.',
      'If devices are unavailable, print a mock feed of 20 items for a paper audit.',
    ],
    notes: [
      'Students know feeds are curated but rarely quantify it. The tally makes the invisible visible — comparing percentages across the class is the moment.',
      'Handle the representation counts with care: the goal is auditing the algorithm, not auditing classmates. Keep the frame on what the platform chose to show.',
      'This is the longest discussion block in the course (20 min) — the final question ("if an algorithm shaped your beliefs for years...") deserves unhurried time.',
    ],
    misconceptions: [
      '"I chose what I follow, so my feed is my choice." Most impressions on modern platforms are algorithmically surfaced, not followed content.',
      '"Moderation bias means too much moderation." Under-moderation in lower-resourced languages is the bigger documented gap.',
    ],
  },
  7: {
    prep: [
      'Re-verify the regulatory status the week you teach. As of July 2026: Colorado replaced its AI Act with SB 26-189 (effective Jan 1, 2027), and the EU deferred high-risk obligations to December 2027.',
      'Print or link one real policy for reference (the Colorado AG rulemaking page works well) so drafts have a model.',
    ],
    notes: [
      'The Colorado saga is the lesson: first-in-nation law (2024) → delay (2025) → lawsuit and court-ordered pause → repeal and replace (May 2026). Regulation is a process, not an event.',
      'Push drafting groups on enforcement: a policy with no consequence mechanism is a press release. Section 5 is where drafts usually go soft.',
      'During defend-the-draft, assign one group per presentation to argue the industry perspective — it sharpens everyone.',
    ],
    misconceptions: [
      '"The EU delayed the AI Act, so it is dead." Only the high-risk deadlines moved; transparency obligations still hit August 2, 2026, and the framework stands.',
      '"Passing a law solves the problem." Colorado passed one and replaced it before it ever took effect; enforcement and rulemaking are where policy lives or dies.',
    ],
  },
  8: {
    prep: [
      'Review the three fairness definitions (demographic parity, equalized odds, calibration) until you can explain the incompatibility in plain words — students will test you on it.',
      'Have each group pick their earlier-module case study before class starts to protect activity time.',
    ],
    notes: [
      'The incompatibility of fairness metrics is the hardest idea in the course. Use the COMPAS example: satisfying one definition while violating another is mathematically forced, not a bug.',
      'When GUARD comes up, the teachable point is where the intervention happens: fixing the reward signal before bias compounds through training, rather than patching outputs after.',
      'End the course on agency: the closing discussion question ("what would you personally prioritize?") should get a written answer from every student, not just the talkers.',
    ],
    misconceptions: [
      '"There is a technically correct definition of fairness." Choosing a metric is a values decision; math cannot make it for you.',
      '"Bias is unsolved because it is too hard." Tools exist and are documented — deployment gaps are organizational and economic choices.',
    ],
  },
}

export const HERO_STATS = [
  { value: '34.7%', bar: 100, label: 'facial recognition error rate for darker-skinned women — vs under 1% for lighter-skinned men', module: 5 },
  { value: '85%', bar: 78, label: 'of the time, AI resume screeners favored white-associated names', module: 3 },
  { value: '4×', bar: 58, label: 'more often, Llama 2 described women in domestic work roles vs men', module: 6 },
  { value: '200M', bar: 88, label: 'patient cases run through an algorithm that underestimated Black patients\u2019 health needs', module: 2 },
]

export const bibGroups = [
  {
    title: 'Modules 1 & 2 — Foundations and Healthcare',
    entries: [
      { text: 'Obermeyer Z, Powers B, Vogeli C, Mullainathan S. (2019). Dissecting racial bias in an algorithm used to manage the health of populations. Science, 366(6464), 447–453.', url: 'https://pubmed.ncbi.nlm.nih.gov/31649194/', urlLabel: 'pubmed.ncbi.nlm.nih.gov/31649194' },
      { text: 'Cross JL, Choma MA, Onofrey JA. (2024). Bias in medical AI: Implications for clinical decision-making. PLOS Digital Health, 3(11): e0000651.', url: 'https://doi.org/10.1371/journal.pdig.0000651', urlLabel: 'doi.org/10.1371/journal.pdig.0000651' },
      { text: 'Glickman M, Sharot T. (2024). How human-AI feedback loops alter human perceptual, emotional and social judgements. Nature Human Behaviour.', url: 'https://www.ucl.ac.uk/news/2024/dec/bias-ai-amplifies-our-own-biases', urlLabel: 'UCL News coverage' },
      { text: 'Guilbeault D, Delecourt S, Desikan BS. (October 8, 2025). Age and gender distortion in online media and large language models. Nature, 646, 1129–1137.', url: 'https://www.nature.com/articles/s41586-025-09581-z', urlLabel: 'nature.com' },
      { text: 'Bouguettaya A, Stuart EM, Aboujaoude E. (June 4, 2025). Racial bias in AI-mediated psychiatric diagnosis and treatment: a qualitative comparison of four large language models. npj Digital Medicine, 8:332.', url: 'https://pubmed.ncbi.nlm.nih.gov/40467886/', urlLabel: 'pubmed.ncbi.nlm.nih.gov/40467886' },
      { text: 'Buolamwini J, Gebru T. (2018). Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification. PMLR, 81:77–91.', url: 'https://proceedings.mlr.press/v81/buolamwini18a.html', urlLabel: 'proceedings.mlr.press' },
    ],
  },
  {
    title: 'Module 3 — Hiring',
    entries: [
      { text: 'University of Washington. (October 31, 2024). AI bias in resume screening: race and gender.', url: 'https://www.washington.edu/news/2024/10/31/ai-bias-resume-screening-race-gender/', urlLabel: 'washington.edu' },
      { text: "University of Washington. (November 10, 2025). People mirror AI systems' hiring biases, study finds.", url: 'https://www.washington.edu/news/2025/11/10/people-mirror-ai-systems-hiring-biases-study-finds/', urlLabel: 'washington.edu' },
      { text: 'HR Dive. (March 2026). Workday plaintiffs submit amended complaint; judge holds ADEA disparate-impact claims cover job applicants (Mobley v. Workday).', url: 'https://www.hrdive.com/news/workday-partial-loss-judge-refuses-claims-dismissal/814227/', urlLabel: 'hrdive.com' },
      { text: "HR Dive. (June 2026). Workday can't shake California AI discrimination claims — FEHA and ADA claims proceed (Mobley v. Workday).", url: 'https://www.hrdive.com/news/workday-california-AI-bias-lawsuit-feha/823555/', urlLabel: 'hrdive.com' },
      { text: 'Holland & Knight. (May 2025). Federal court allows collective action lawsuit over alleged AI hiring bias.', url: 'https://www.hklaw.com/en/insights/publications/2025/05/federal-court-allows-collective-action-lawsuit-over-alleged', urlLabel: 'hklaw.com' },
    ],
  },
  {
    title: 'Module 4 — Financial Advice',
    entries: [
      { text: 'SSRN. (2024). AI financial advice and gender bias.', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4880335', urlLabel: 'ssrn.com' },
      { text: 'MIT News. (February 19, 2026). Study: AI chatbots provide less accurate information to vulnerable users.', url: 'https://news.mit.edu/2026/study-ai-chatbots-provide-less-accurate-information-vulnerable-users-0219', urlLabel: 'news.mit.edu' },
      { text: 'Robert & Ethel Kennedy Human Rights Center. (August 2025). Bias in code: Algorithm discrimination in financial systems.', url: 'https://rfkhumanrights.org/our-voices/bias-in-code-algorithm-discrimination-in-financial-systems/', urlLabel: 'rfkhumanrights.org' },
      { text: 'Morrison Foerster. (January 27, 2026). AI and algorithmic bias in financial services.', url: 'https://www.mofo.com/resources/insights/260127-ai-trends-for-2026-ai-and-algorithmic-bias', urlLabel: 'mofo.com' },
    ],
  },
  {
    title: 'Module 5 — Policing',
    entries: [
      { text: 'Stateline. (February 4, 2025). Facial recognition in policing is getting state-by-state guardrails.', url: 'https://stateline.org/2025/02/04/facial-recognition-in-policing-is-getting-state-by-state-guardrails/', urlLabel: 'stateline.org' },
      { text: 'Washington Post. (January 13, 2025). Arrested by AI: Police ignore standards after facial recognition matches.', url: 'https://www.washingtonpost.com/business/interactive/2025/police-artificial-intelligence-facial-recognition/', urlLabel: 'washingtonpost.com' },
      { text: 'ACLU. Williams v. City of Detroit.', url: 'https://www.aclu.org/cases/williams-v-city-of-detroit-face-recognition-false-arrest', urlLabel: 'aclu.org' },
      { text: 'Code of Virginia § 15.2-1723.2 (effective July 1, 2026). Facial recognition technology; approval — published policies, audit trails, real-time tracking limits.', url: 'https://law.lis.virginia.gov/vacode/title15.2/chapter17/section15.2-1723.2/', urlLabel: 'law.lis.virginia.gov' },
    ],
  },
  {
    title: 'Module 6 — Social Media',
    entries: [
      { text: 'UNESCO. (2024). Bias Against Women and Girls in Large Language Models. Finds that Llama 2 described women in domestic work roles four times more often than men.', url: 'https://www.unesco.org/en/articles/generative-ai-unesco-study-reveals-alarming-evidence-regressive-gender-stereotypes', urlLabel: 'unesco.org' },
      { text: 'Gorska et al. (November 14, 2025). Algorithmic bias in image-generating AI: prevalence and user perceptions. Information, Communication & Society.', url: 'https://www.tandfonline.com/doi/full/10.1080/1369118X.2025.2584146', urlLabel: 'tandfonline.com' },
      { text: 'Frontiers in Communication. (January 8, 2025). Algorithmic agency and discriminatory Instagram content moderation.', url: 'https://www.frontiersin.org/journals/communication/articles/10.3389/fcomm.2024.1385869/full', urlLabel: 'frontiersin.org' },
    ],
  },
  {
    title: 'Module 7 — Policy',
    entries: [
      { text: 'Seyfarth Shaw. (May 2026). Colorado enacts artificial intelligence replacement law — SB 26-189 repeals and replaces SB 24-205, effective January 1, 2027.', url: 'https://www.seyfarth.com/news-insights/colorado-enacts-artificial-intelligence-replacement-law.html', urlLabel: 'seyfarth.com' },
      { text: 'Colorado Attorney General. (2026). Automated Decision-Making Technology Law rulemaking (SB 26-189) and Chatbot Safety Act (HB 26-1263).', url: 'https://coag.gov/ai/', urlLabel: 'coag.gov/ai' },
      { text: 'Council of the EU. (May 7, 2026). Artificial Intelligence: Council and Parliament agree to simplify and streamline rules (Digital Omnibus on AI).', url: 'https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/', urlLabel: 'consilium.europa.eu' },
      { text: 'DLA Piper GENIE. (June/July 2026). Digital AI Omnibus — Council final approval June 29, 2026; high-risk (Annex III) obligations deferred to December 2, 2027.', url: 'https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/The-Digital-AI-Omnibus-Proposed-deferral-of-high-risk-AI-obligations-under-the-AI-Act', urlLabel: 'knowledge.dlapiper.com' },
      { text: 'U.S. Commission on Civil Rights. (2024). Rising use of artificial intelligence in K–12 education.', url: 'https://www.usccr.gov/reports/2024/rising-use-artificial-intelligence-k-12-education', urlLabel: 'usccr.gov' },
    ],
  },
  {
    title: 'Module 8 — Building Fairer AI',
    entries: [
      { text: 'IBM. (January 2024). Global AI Adoption Index 2023. Reports that only 27% of AI-deploying organizations are taking active steps to reduce algorithmic bias.', url: 'https://newsroom.ibm.com/2024-01-10-Data-Suggests-Growth-in-Enterprise-Adoption-of-AI-is-Due-to-Widespread-Deployment-by-Early-Adopters', urlLabel: 'newsroom.ibm.com' },
      { text: 'Samnerkar A et al. (2025). GUARD: Guiding Unbiased Alignment through Reward Debiasing. Accepted to EMNLP workshop; presented at NeurIPS workshops.' },
      { text: 'Haghighi N, Landay J et al. (April 2025). Ontological bias in LLMs. CHI 2025. Reported by Stanford HAI (July 2025).', url: 'https://hai.stanford.edu/news/when-ai-imagines-a-tree-how-your-chatbots-worldview-shapes-your-thinking', urlLabel: 'hai.stanford.edu' },
      { text: 'Laurito W et al. (July 2025). AI-AI bias: Large language models favor communications generated by large language models. PNAS, 122(31) e2415697122.', url: 'https://www.pnas.org/doi/10.1073/pnas.2415697122', urlLabel: 'pnas.org' },
    ],
  },
]
