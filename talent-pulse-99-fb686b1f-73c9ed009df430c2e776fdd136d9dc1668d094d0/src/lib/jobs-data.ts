// Extended job catalog with LPA, start date, deadline, description, ATS threshold, and assessment.
export interface JobFull {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyDescription: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  freshersAllowed: boolean;
  lpaMin: number;
  lpaMax: number;
  skills: string[];
  description: string;
  responsibilities: string[];
  eligibility: string;
  vacancies: number;
  postedAt: string;
  startDate: string; // ISO
  deadline: string; // ISO
  atsThreshold: number; // 0-100 min ATS score to allow apply
  department: string;
  assessment: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

const GENERIC_QS: AssessmentQuestion[] = [
  {
    id: "q1",
    question: "Which HTTP method is idempotent and used to update a resource fully?",
    options: ["POST", "PATCH", "PUT", "OPTIONS"],
    correctIndex: 2,
  },
  {
    id: "q2",
    question: "In Big-O notation, binary search on a sorted array runs in?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 1,
  },
  {
    id: "q3",
    question: "SQL: which clause filters groups after aggregation?",
    options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    correctIndex: 2,
  },
  {
    id: "q4",
    question: "Which is NOT a principle of REST?",
    options: ["Statelessness", "Uniform interface", "Client-server", "Session affinity"],
    correctIndex: 3,
  },
  {
    id: "q5",
    question: "In Java, which keyword prevents inheritance of a class?",
    options: ["static", "final", "sealed", "abstract"],
    correctIndex: 1,
  },
];

export const jobsFull: JobFull[] = [
  {
    id: "j1",
    title: "Full Stack Java Developer",
    company: "Infosys",
    companyId: "c1",
    companyDescription:
      "Global leader in next-generation digital services and consulting, serving Fortune 500 clients across banking, retail and healthcare.",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "0-2 years",
    freshersAllowed: true,
    lpaMin: 6,
    lpaMax: 10,
    skills: ["Java", "Spring Boot", "React", "MySQL", "REST", "Git"],
    description:
      "Join the digital engineering team building enterprise-grade Java + React applications for global banking clients. You'll ship microservices, contribute to shared platforms, and pair with senior engineers.",
    responsibilities: [
      "Develop and maintain REST APIs with Spring Boot",
      "Build responsive UIs using React and TypeScript",
      "Write unit and integration tests",
      "Participate in code reviews and design discussions",
    ],
    eligibility: "B.Tech / MCA, 60% throughout, strong OOP fundamentals.",
    vacancies: 25,
    postedAt: "2026-06-24",
    startDate: "2026-08-01",
    deadline: "2026-07-30",
    atsThreshold: 55,
    department: "Engineering",
    assessment: GENERIC_QS,
  },
  {
    id: "j2",
    title: "Frontend Engineer (React)",
    company: "Google",
    companyId: "c3",
    companyDescription: "Organize the world's information and make it universally accessible and useful.",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "0-3 years",
    freshersAllowed: true,
    lpaMin: 18,
    lpaMax: 32,
    skills: ["React", "TypeScript", "GraphQL", "CSS", "Testing", "Accessibility"],
    description:
      "Build delightful, accessible user experiences for products used by billions. Own end-to-end features from design to launch.",
    responsibilities: [
      "Architect performant React apps",
      "Collaborate with designers and PMs",
      "Champion accessibility and web performance",
    ],
    eligibility: "Bachelors in CS or equivalent. Freshers with strong portfolio welcome.",
    vacancies: 6,
    postedAt: "2026-06-25",
    startDate: "2026-08-15",
    deadline: "2026-07-25",
    atsThreshold: 65,
    department: "Consumer Products",
    assessment: GENERIC_QS,
  },
  {
    id: "j3",
    title: "Cloud DevOps Engineer",
    company: "Amazon",
    companyId: "c5",
    companyDescription: "Earth's most customer-centric company, hiring builders across AWS and retail.",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "2-5 years",
    freshersAllowed: false,
    lpaMin: 20,
    lpaMax: 34,
    skills: ["AWS", "Kubernetes", "Terraform", "Python", "CI/CD", "Linux"],
    description: "Own deployment pipelines and platform reliability for AWS-native services.",
    responsibilities: [
      "Design multi-region deployment pipelines",
      "Maintain infrastructure-as-code",
      "On-call rotation for platform reliability",
    ],
    eligibility: "Bachelors with 2+ years of production cloud experience.",
    vacancies: 8,
    postedAt: "2026-06-22",
    startDate: "2026-08-20",
    deadline: "2026-08-10",
    atsThreshold: 60,
    department: "Cloud Infrastructure",
    assessment: GENERIC_QS,
  },
  {
    id: "j4",
    title: "Data Scientist (Fresher)",
    company: "Microsoft",
    companyId: "c4",
    companyDescription:
      "Empower every person and organization on the planet to achieve more, through AI-first productivity products.",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "0-1 years",
    freshersAllowed: true,
    lpaMin: 14,
    lpaMax: 22,
    skills: ["Python", "Machine Learning", "SQL", "Statistics", "Pandas"],
    description: "Design and ship ML models that improve Microsoft 365 productivity.",
    responsibilities: [
      "Explore large-scale product telemetry",
      "Build and evaluate ML features",
      "Partner with product teams on rollout",
    ],
    eligibility: "B.Tech / M.Tech in CS / Stats. Freshers eligible.",
    vacancies: 4,
    postedAt: "2026-06-20",
    startDate: "2026-09-01",
    deadline: "2026-07-20",
    atsThreshold: 60,
    department: "AI & Research",
    assessment: GENERIC_QS,
  },
  {
    id: "j5",
    title: "Backend Engineer (Spring Boot)",
    company: "TCS",
    companyId: "c2",
    companyDescription: "India's largest IT services company, hiring freshers across engineering roles.",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "0-2 years",
    freshersAllowed: true,
    lpaMin: 5,
    lpaMax: 8,
    skills: ["Java", "Spring Boot", "MySQL", "REST", "Microservices"],
    description: "Develop secure, scalable backend services for enterprise clients.",
    responsibilities: [
      "Build REST APIs with Spring Boot",
      "Write database migrations",
      "Add unit and contract tests",
    ],
    eligibility: "B.E / B.Tech, freshers welcome.",
    vacancies: 40,
    postedAt: "2026-06-18",
    startDate: "2026-08-01",
    deadline: "2026-08-01",
    atsThreshold: 45,
    department: "Engineering",
    assessment: GENERIC_QS,
  },
  {
    id: "j6",
    title: "UI/UX Designer",
    company: "Accenture",
    companyId: "c7",
    companyDescription: "Global professional services company across digital, cloud and security.",
    location: "Pune, India",
    type: "Full-time",
    experience: "1-3 years",
    freshersAllowed: false,
    lpaMin: 9,
    lpaMax: 14,
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    description: "Shape end-to-end product experiences for Fortune 500 clients.",
    responsibilities: ["Own product design flows", "Run usability testing"],
    eligibility: "Portfolio required.",
    vacancies: 3,
    postedAt: "2026-06-21",
    startDate: "2026-08-10",
    deadline: "2026-07-28",
    atsThreshold: 50,
    department: "Design",
    assessment: GENERIC_QS,
  },
  {
    id: "j7",
    title: "QA Automation Engineer (Fresher)",
    company: "Wipro",
    companyId: "c6",
    companyDescription: "Leading global information technology and consulting company.",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "0-2 years",
    freshersAllowed: true,
    lpaMin: 4.5,
    lpaMax: 7,
    skills: ["Selenium", "Java", "TestNG", "API Testing", "CI/CD"],
    description: "Drive automation strategy across release pipelines.",
    responsibilities: ["Author automated test suites", "Own release regression"],
    eligibility: "B.Tech / MCA.",
    vacancies: 15,
    postedAt: "2026-06-19",
    startDate: "2026-08-05",
    deadline: "2026-08-05",
    atsThreshold: 40,
    department: "Quality",
    assessment: GENERIC_QS,
  },
  {
    id: "j8",
    title: "Data Analyst",
    company: "Capgemini",
    companyId: "c8",
    companyDescription: "Global leader in consulting, technology services and digital transformation.",
    location: "Mumbai, India",
    type: "Full-time",
    experience: "0-2 years",
    freshersAllowed: true,
    lpaMin: 5.5,
    lpaMax: 9,
    skills: ["SQL", "Excel", "Python", "Tableau", "Statistics"],
    description: "Turn raw data into decisions for digital transformation clients.",
    responsibilities: ["Build dashboards", "Write SQL for ad-hoc analysis"],
    eligibility: "B.Tech / B.Sc. Freshers welcome.",
    vacancies: 10,
    postedAt: "2026-06-17",
    startDate: "2026-08-25",
    deadline: "2026-07-22",
    atsThreshold: 50,
    department: "Data",
    assessment: GENERIC_QS,
  },
  {
    id: "j9",
    title: "Mobile Developer (Flutter)",
    company: "Infosys",
    companyId: "c1",
    companyDescription: "Global leader in next-generation digital services and consulting.",
    location: "Remote",
    type: "Contract",
    experience: "2-4 years",
    freshersAllowed: false,
    lpaMin: 12,
    lpaMax: 18,
    skills: ["Flutter", "Dart", "Firebase", "REST APIs"],
    description: "Ship cross-platform mobile apps for banking clients.",
    responsibilities: ["Build Flutter modules", "Integrate REST APIs"],
    eligibility: "Mobile portfolio required.",
    vacancies: 4,
    postedAt: "2026-06-23",
    startDate: "2026-08-15",
    deadline: "2026-08-15",
    atsThreshold: 60,
    department: "Mobile",
    assessment: GENERIC_QS,
  },
  {
    id: "j10",
    title: "Cybersecurity Analyst (Fresher)",
    company: "Google",
    companyId: "c3",
    companyDescription: "Protecting Google's users and infrastructure.",
    location: "Hyderabad, India",
    type: "Full-time",
    experience: "0-1 years",
    freshersAllowed: true,
    lpaMin: 12,
    lpaMax: 20,
    skills: ["Networking", "Linux", "Python", "Security Fundamentals"],
    description: "Kick off your career defending Google's infrastructure.",
    responsibilities: ["Triage security alerts", "Author playbooks"],
    eligibility: "B.Tech CS/IT. Freshers welcome.",
    vacancies: 3,
    postedAt: "2026-06-26",
    startDate: "2026-09-15",
    deadline: "2026-07-30",
    atsThreshold: 55,
    department: "Security",
    assessment: GENERIC_QS,
  },
];

export function getJob(id: string): JobFull | undefined {
  return jobsFull.find((j) => j.id === id);
}

// Compute an ATS-style score from a candidate's skills + qualification vs a job.
export function computeAts(job: JobFull, candidate: {
  skills: string[];
  qualification?: string | null;
  is_fresher?: boolean | null;
  experience?: string | null;
}): { score: number; matched: string[]; missing: string[]; freshersOnlyBlocked: boolean } {
  const lower = candidate.skills.map((s) => s.toLowerCase());
  const matched = job.skills.filter((s) => lower.includes(s.toLowerCase()));
  const missing = job.skills.filter((s) => !lower.includes(s.toLowerCase()));
  let score = Math.round((matched.length / job.skills.length) * 85);
  if (candidate.qualification && candidate.qualification.trim().length > 0) score += 8;
  if (candidate.experience && candidate.experience.trim().length > 0) score += 4;
  score = Math.min(100, Math.max(5, score));
  // Freshers-only jobs: block experienced applicants; freshers-allowed=true means fresher is welcome.
  // For strict freshers-only signaling, treat is_fresher=false as a block only if job title contains "(Fresher)".
  const freshersOnly = /\(Fresher\)/i.test(job.title);
  const freshersOnlyBlocked = freshersOnly && candidate.is_fresher === false;
  return { score, matched, missing, freshersOnlyBlocked };
}
