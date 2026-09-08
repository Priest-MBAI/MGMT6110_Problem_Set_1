import { Task, StudentProfile } from '../types';

/**
 * Invented student profile for Postgraduate student at local university.
 * All details are invented and non-confidential.
 */
export const CURRENT_STUDENT: StudentProfile = {
  name: 'Marcus Tan',
  studentNumber: 'G2408914K',
  mastersProgramme: 'Master of Science in Management (MSc)'
};

/**
 * Invented academic dataset for Postgraduate students (MGMT 6110 context).
 * All company names, project titles, and data values are fictional.
 */
export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-101',
    title: 'Submit Corporate Valuation & 10-K Financial Analysis',
    courseCode: 'FNCE 6012',
    courseName: 'Advanced Corporate Financial Modeling',
    taskType: 'Assignment',
    deadline: 'Today, 23:59',
    deadlineDetailed: 'Tonight • 23:59 SGT',
    submissionGuidelines: 'Weightage: 25% • Submit finalized PDF executive memo & unlocked Excel workbook (.xlsx) via course LMS.',
    estimatedWorkNeeded: '3.5 hours',
    classroomLocation: 'Seminar Room 2-1, LKCSB',
    classroomLocationFull: 'Lee Kong Chian School of Business, Level 2, Seminar Room 2-1',
    nextLessonName: 'Corporate Valuation & M&A Analysis 101',
    nextLessonDate: 'Thursday, 18 September 2026',
    nextLessonTime: '14:00 – 17:15 SGT',
    nextClassTiming: 'Thursday, 18 Sep 2026 • 14:00 – 17:15 SGT',
    completionTip: 'Cross-check Note 7 for off-balance-sheet operating leases; keep your DuPont decomposition to 3 stages for clarity.',
    nextAction: 'Submit financial 10-K report of Apex Dynamics Holdings',
    estimatedTimeNextAction: '45 mins',
    checklist: [
      'Verify DuPont 3-stage ROE breakdown calculations in Excel model',
      'Proofread 2-page executive summary memo against grading rubric',
      'Export finalized PDF report and upload to course portal'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-102',
    title: 'Collaborative AI Workflow Prototype Milestone',
    courseCode: 'MGMT 6110',
    courseName: 'Human-AI Collaboration in Organizations',
    taskType: 'Group Project',
    deadline: 'Tomorrow, 17:00',
    deadlineDetailed: 'Tomorrow • 17:00 SGT',
    submissionGuidelines: 'Weightage: 30% • Submit 3-minute demonstration walk-through URL and clickable interactive prototype link.',
    estimatedWorkNeeded: '4 hours',
    classroomLocation: 'Seminar Room 3-2, LKCSB',
    classroomLocationFull: 'Lee Kong Chian School of Business, Level 3, Seminar Room 3-2',
    nextLessonName: 'Human-AI Workflow Design & Prototyping 101',
    nextLessonDate: 'Tomorrow, Tuesday, 16 September 2026',
    nextLessonTime: '15:30 – 18:45 SGT',
    nextClassTiming: 'Tuesday, 16 Sep 2026 • 15:30 – 18:45 SGT',
    completionTip: 'Emphasize the human-in-the-loop decision checkpoint; keep screen recording concise and under 3 minutes.',
    nextAction: 'Record 3-minute screen walk-through of prompt interaction flow for Helios BioPharma case',
    estimatedTimeNextAction: '50 mins',
    checklist: [
      'Collate group members feedback on user interface clarity',
      'Record concise 3-minute video walk-through demonstrating the tool',
      'Paste shared drive video link into Team Progress Sheet'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-103',
    title: 'Supply Chain Disruption Simulation Prep',
    courseCode: 'OPIM 6020',
    courseName: 'Global Operations & Supply Chain Resilience',
    taskType: 'Case Study',
    deadline: 'Wednesday, 12:00',
    deadlineDetailed: 'Wednesday • 12:00 SGT',
    submissionGuidelines: 'Weightage: 15% • Individual 500-word decision memo submitted before seminar commencement.',
    estimatedWorkNeeded: '2.5 hours',
    classroomLocation: 'Seminar Room 1-3, SOE',
    classroomLocationFull: 'School of Economics, Level 1, Seminar Room 1-3',
    nextLessonName: 'Global Supply Chain Dynamics & Risk Mitigation 101',
    nextLessonDate: 'Wednesday, 17 September 2026',
    nextLessonTime: '12:00 – 15:15 SGT',
    nextClassTiming: 'Wednesday, 17 Sep 2026 • 12:00 – 15:15 SGT',
    completionTip: 'Assume a 95% service factor (Z = 1.65); use Exhibit 4 standard deviations for safety buffer math.',
    nextAction: 'Calculate safety stock safety buffer numbers for Nova Logistics Global warehouse network',
    estimatedTimeNextAction: '40 mins',
    checklist: [
      'Extract lead-time variance figures from Case Exhibit 4',
      'Compute reorder points under 95% service-level assumption',
      'Draft 3 bullet recommendations for port congestion mitigation'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-104',
    title: 'Machine Learning for Business Analytics Midterm Assessment',
    courseCode: 'IS 6104',
    courseName: 'Applied Machine Learning for Managers',
    taskType: 'Exam',
    deadline: 'Thursday, 09:00',
    deadlineDetailed: 'Thursday • 09:00 - 11:30 SGT',
    submissionGuidelines: 'Weightage: 35% • In-person closed-book invigilated exam; 1 double-sided A4 handwritten sheet permitted.',
    estimatedWorkNeeded: '6 hours',
    classroomLocation: 'Computer Lab 3-1, SCIS1',
    classroomLocationFull: 'School of Computing and Information Systems 1, Level 3, Computer Lab 3-1',
    nextLessonName: 'Supervised Learning & Predictive Analytics 101',
    nextLessonDate: 'Thursday, 18 September 2026',
    nextLessonTime: '09:00 – 11:30 SGT',
    nextClassTiming: 'Thursday, 18 Sep 2026 • 09:00 – 11:30 SGT',
    completionTip: 'Focus revision on confusion matrices, ROC curve thresholds, and decision tree regularization penalties.',
    nextAction: 'Complete Practice Exam Mock 2 on classification confusion matrices and ROC curves',
    estimatedTimeNextAction: '1.5 hours',
    checklist: [
      'Review formulas for precision, recall, and F1 optimization trade-offs',
      'Complete timed mock test questions 1 through 15',
      'Annotate cheat sheet with tree regularization tuning parameters'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-105',
    title: 'Cross-Border M&A Strategy Synthesis',
    courseCode: 'MGMT 6005',
    courseName: 'Strategic Management in Asia-Pacific',
    taskType: 'Assignment',
    deadline: 'Friday, 23:59',
    deadlineDetailed: 'Friday • 23:59 SGT',
    submissionGuidelines: 'Weightage: 20% • 2,500 words maximum; Turnitin originality report must show similarity below 15%.',
    estimatedWorkNeeded: '3 hours',
    classroomLocation: 'Seminar Room 2-4, LKCSB',
    classroomLocationFull: 'Lee Kong Chian School of Business, Level 2, Seminar Room 2-4',
    nextLessonName: 'Strategic Asian Mergers & Market Entry 101',
    nextLessonDate: 'Friday, 19 September 2026',
    nextLessonTime: '19:00 – 22:15 SGT',
    nextClassTiming: 'Friday, 19 Sep 2026 • 19:00 – 22:15 SGT',
    completionTip: 'Anchor synergy claims with at least 2 regional benchmarks; cap terminal growth rate at 2.5%.',
    nextAction: 'Synthesize synergy valuation memo for Zephyr Consumer Goods cross-border buyout',
    estimatedTimeNextAction: '1 hour',
    checklist: [
      'Cross-check discounted cash flow terminal growth rate assumptions',
      'Complete cultural integration risk matrix table',
      'Format footnotes according to APA 7th edition guidelines'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-106',
    title: 'Negotiation Strategy & BATNA Planning Document',
    courseCode: 'OBHR 6010',
    courseName: 'Leadership & Behavioral Negotiation',
    taskType: 'Reading Review',
    deadline: 'Next Monday, 14:00',
    deadlineDetailed: 'Monday • 14:00 SGT',
    submissionGuidelines: 'Weightage: 15% • 1-page BATNA strategic planner due in hard copy prior to live role-play exercise.',
    estimatedWorkNeeded: '1.5 hours',
    classroomLocation: 'Active Learning Lab 2-2, SOL',
    classroomLocationFull: 'Yong Pung How School of Law, Level 2, Active Learning Lab 2-2',
    nextLessonName: 'Negotiation Dynamics & Strategic Concessions 101',
    nextLessonDate: 'Monday, 22 September 2026',
    nextLessonTime: '14:00 – 17:15 SGT',
    nextClassTiming: 'Monday, 22 Sep 2026 • 14:00 – 17:15 SGT',
    completionTip: 'Define your reservation price firmly; establish 2 non-monetary trades to protect core deal margin.',
    nextAction: 'Define walk-away reservation price and aspiration targets for Vanguard Urban Mobility role',
    estimatedTimeNextAction: '30 mins',
    checklist: [
      'Read confidential role briefing packet pages 1 to 6',
      'Map out opening bid strategy and concession sequencing',
      'Identify 2 creative non-monetary trade-offs to protect deal margin'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-107',
    title: 'Green Bond Issuance & ESG Framework Pitch',
    courseCode: 'FNCE 6025',
    courseName: 'Sustainable Finance & Impact Investing',
    taskType: 'Group Project',
    deadline: 'Next Tuesday, 18:00',
    deadlineDetailed: 'Tuesday • 18:00 SGT',
    submissionGuidelines: 'Weightage: 25% • 12-slide executive pitch deck with ICMA Green Bond taxonomy appendix.',
    estimatedWorkNeeded: '4.5 hours',
    classroomLocation: 'Seminar Room 4-1, Connexion',
    classroomLocationFull: 'SMU Connexion, Level 4, Seminar Room 4-1',
    nextLessonName: 'Sustainable Debt Capital Markets 101',
    nextLessonDate: 'Tuesday, 23 September 2026',
    nextLessonTime: '18:00 – 21:15 SGT',
    nextClassTiming: 'Tuesday, 23 Sep 2026 • 18:00 – 21:15 SGT',
    completionTip: 'Structure pitch around the 4 ICMA core principles; state quantifiable carbon offset metrics clearly.',
    nextAction: 'Finalize KPI green bond metrics slide deck for Solaria Clean Power Corp',
    estimatedTimeNextAction: '1 hour',
    checklist: [
      'Align carbon avoidance KPI definitions with ICMA Green Bond principles',
      'Consolidate 12 pitch slides into consistent team template',
      'Rehearse 8-minute presentation with team lead'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-108',
    title: 'Omnichannel Customer Lifetime Value Modeling',
    courseCode: 'MKTG 6015',
    courseName: 'Customer Insights & Predictive Analytics',
    taskType: 'Assignment',
    deadline: 'Next Wednesday, 23:59',
    deadlineDetailed: 'Wednesday • 23:59 SGT',
    submissionGuidelines: 'Weightage: 20% • Submit runnable Jupyter notebook (.ipynb) and compiled HTML executive report.',
    estimatedWorkNeeded: '2.5 hours',
    classroomLocation: 'Seminar Room 2-2, LKCSB',
    classroomLocationFull: 'Lee Kong Chian School of Business, Level 2, Seminar Room 2-2',
    nextLessonName: 'Customer Analytics & Retention Modeling 101',
    nextLessonDate: 'Wednesday, 24 September 2026',
    nextLessonTime: '15:30 – 18:45 SGT',
    nextClassTiming: 'Wednesday, 24 Sep 2026 • 15:30 – 18:45 SGT',
    completionTip: 'Watch for survivor bias in cohort churn curves; re-run Python notebook cells in linear order.',
    nextAction: 'Run retention cohort churn rates in Python notebook for Beacon Retail Group data',
    estimatedTimeNextAction: '45 mins',
    checklist: [
      'Execute cell blocks 12 to 24 in clean Jupyter environment',
      'Export cohort churn heat-map visualization PNGs',
      'Answer discussion questions on customer acquisition payback period'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-109',
    title: 'Decentralized Payment Protocols Architecture Brief',
    courseCode: 'IS 6220',
    courseName: 'FinTech Ecosystems & Digital Banking',
    taskType: 'Case Study',
    deadline: 'Next Thursday, 17:00',
    deadlineDetailed: 'Thursday • 17:00 SGT',
    submissionGuidelines: 'Weightage: 15% • 4-page policy brief aligned with Monetary Authority of Singapore sandbox standards.',
    estimatedWorkNeeded: '3 hours',
    classroomLocation: 'Seminar Room 3-4, SCIS1',
    classroomLocationFull: 'School of Computing and Information Systems 1, Level 3, Seminar Room 3-4',
    nextLessonName: 'Digital Banking & Distributed Ledgers 101',
    nextLessonDate: 'Thursday, 25 September 2026',
    nextLessonTime: '12:00 – 15:15 SGT',
    nextClassTiming: 'Thursday, 25 Sep 2026 • 12:00 – 15:15 SGT',
    completionTip: 'Consult MAS PSN01 and Cyber Hygiene Notice 658 guidelines for compliance benchmark clauses.',
    nextAction: 'Draft regulatory compliance chapter for Aura FinTech Labs cross-border settlement sandbox',
    estimatedTimeNextAction: '40 mins',
    checklist: [
      'Review MAS guidelines on digital token payment services',
      'Document key cyber hygiene controls in architecture diagram',
      'Summarize settlement finality risk in 300 words'
    ],
    status: 'Incomplete'
  },
  {
    id: 'task-110',
    title: 'Global Macroeconomic Outlook Comprehensive Exam Prep',
    courseCode: 'ECON 6002',
    courseName: 'Global Macroeconomics & Monetary Policy',
    taskType: 'Exam',
    deadline: 'Next Friday, 14:00',
    deadlineDetailed: 'Friday • 14:00 - 16:30 SGT',
    submissionGuidelines: 'Weightage: 40% • In-person proctored comprehensive exam; approved financial calculator permitted.',
    estimatedWorkNeeded: '5 hours',
    classroomLocation: 'MPH Hall 1, Admin Building',
    classroomLocationFull: 'Administration Building, Level 4, Multi-Purpose Hall 1',
    nextLessonName: 'Macroeconomic Policy & Foreign Exchange Markets 101',
    nextLessonDate: 'Friday, 26 September 2026',
    nextLessonTime: '14:00 – 16:30 SGT',
    nextClassTiming: 'Friday, 26 Sep 2026 • 14:00 – 16:30 SGT',
    completionTip: 'Practice drawing Mundell-Fleming IS-LM-BP equilibrium shifts under flexible exchange rates.',
    nextAction: 'Solve practice problems on IS-LM-BP equilibrium under floating exchange rates',
    estimatedTimeNextAction: '1.2 hours',
    checklist: [
      'Solve past-year exam questions 2024 and 2025 Paper A',
      'Verify central bank reserve transmission mechanism diagrams',
      'Summarize policy implications of interest rate differential shocks'
    ],
    status: 'Incomplete'
  }
];
