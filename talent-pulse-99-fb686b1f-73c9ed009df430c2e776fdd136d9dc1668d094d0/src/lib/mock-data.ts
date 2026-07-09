// Mock data — replace with real API calls (Spring Boot REST) later.
export type Role = "candidate" | "hr" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  company?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employees: string;
  openJobs: number;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  salary: string;
  skills: string[];
  description: string;
  eligibility: string;
  vacancies: number;
  deadline: string;
  postedAt: string;
  department: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidateId: string;
  candidateName: string;
  appliedAt: string;
  status: "Pending" | "Shortlisted" | "Rejected" | "Interview Scheduled" | "Offer Released";
  matchScore: number;
}

export interface Interview {
  id: string;
  applicationId: string;
  candidateName: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  mode: "Online" | "Offline";
  interviewer: string;
  status: "Pending" | "Selected" | "Rejected";
  link?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  createdAt: string;
  read: boolean;
}

export const companies: Company[] = [
  { id: "c1", name: "Infosys", logo: "IN", industry: "IT Services", location: "Bengaluru, India", employees: "300,000+", openJobs: 42, description: "Global leader in next-generation digital services and consulting." },
  { id: "c2", name: "TCS", logo: "TC", industry: "Consulting", location: "Mumbai, India", employees: "600,000+", openJobs: 78, description: "Leading global IT services, consulting and business solutions organisation." },
  { id: "c3", name: "Google", logo: "GO", industry: "Technology", location: "Hyderabad, India", employees: "180,000+", openJobs: 12, description: "Organize the world's information and make it universally accessible." },
  { id: "c4", name: "Microsoft", logo: "MS", industry: "Technology", location: "Bengaluru, India", employees: "220,000+", openJobs: 24, description: "Empower every person and every organization on the planet to achieve more." },
  { id: "c5", name: "Amazon", logo: "AM", industry: "E-commerce / Cloud", location: "Hyderabad, India", employees: "1,500,000+", openJobs: 56, description: "Earth's most customer-centric company." },
  { id: "c6", name: "Wipro", logo: "WI", industry: "IT Services", location: "Bengaluru, India", employees: "250,000+", openJobs: 33, description: "Leading global information technology and consulting company." },
  { id: "c7", name: "Accenture", logo: "AC", industry: "Consulting", location: "Pune, India", employees: "740,000+", openJobs: 91, description: "A global professional services company with leading capabilities in digital, cloud and security." },
  { id: "c8", name: "Capgemini", logo: "CG", industry: "Consulting", location: "Mumbai, India", employees: "350,000+", openJobs: 28, description: "Global leader in consulting, technology services and digital transformation." },
];

export const jobs: Job[] = [
  { id: "j1", title: "Full Stack Java Developer", company: "Infosys", companyId: "c1", location: "Bengaluru", type: "Full-time", experience: "2-4 years", salary: "₹8-14 LPA", skills: ["Java", "Spring Boot", "Angular", "MySQL", "Docker"], description: "Build enterprise-grade applications with Java, Spring Boot and Angular. Work on micro-services architecture for global banking clients.", eligibility: "B.Tech / MCA with 60% throughout.", vacancies: 12, deadline: "2026-07-30", postedAt: "2 days ago", department: "Engineering" },
  { id: "j2", title: "Frontend Engineer (React)", company: "Google", companyId: "c3", location: "Hyderabad", type: "Full-time", experience: "3-5 years", salary: "₹25-40 LPA", skills: ["React", "TypeScript", "GraphQL", "CSS", "Testing"], description: "Build delightful user experiences for products used by billions.", eligibility: "Bachelors in CS or equivalent.", vacancies: 4, deadline: "2026-07-25", postedAt: "1 day ago", department: "Engineering" },
  { id: "j3", title: "Cloud DevOps Engineer", company: "Amazon", companyId: "c5", location: "Hyderabad", type: "Full-time", experience: "4-7 years", salary: "₹22-35 LPA", skills: ["AWS", "Kubernetes", "Terraform", "Python", "CI/CD"], description: "Own deployment pipelines and platform reliability for AWS-native services.", eligibility: "Bachelors with proven cloud experience.", vacancies: 6, deadline: "2026-08-10", postedAt: "3 days ago", department: "Cloud Infrastructure" },
  { id: "j4", title: "Data Scientist", company: "Microsoft", companyId: "c4", location: "Bengaluru", type: "Full-time", experience: "2-5 years", salary: "₹18-30 LPA", skills: ["Python", "ML", "TensorFlow", "SQL", "Statistics"], description: "Design and ship ML models that improve Microsoft 365 productivity.", eligibility: "Masters in CS / Stats preferred.", vacancies: 5, deadline: "2026-07-20", postedAt: "5 days ago", department: "AI & Research" },
  { id: "j5", title: "Backend Engineer (Spring Boot)", company: "TCS", companyId: "c2", location: "Mumbai", type: "Full-time", experience: "1-3 years", salary: "₹6-10 LPA", skills: ["Java", "Spring Boot", "MySQL", "REST", "Microservices"], description: "Develop secure, scalable backend services for enterprise clients.", eligibility: "B.E / B.Tech with strong Java fundamentals.", vacancies: 20, deadline: "2026-08-01", postedAt: "1 week ago", department: "Engineering" },
  { id: "j6", title: "UI/UX Designer", company: "Accenture", companyId: "c7", location: "Pune", type: "Full-time", experience: "2-4 years", salary: "₹10-16 LPA", skills: ["Figma", "Design Systems", "Prototyping", "User Research"], description: "Shape end-to-end product experiences for Fortune 500 clients.", eligibility: "Portfolio required.", vacancies: 3, deadline: "2026-07-28", postedAt: "4 days ago", department: "Design" },
  { id: "j7", title: "QA Automation Engineer", company: "Wipro", companyId: "c6", location: "Bengaluru", type: "Full-time", experience: "2-5 years", salary: "₹7-12 LPA", skills: ["Selenium", "Java", "TestNG", "CI/CD", "API Testing"], description: "Drive automation strategy across release pipelines.", eligibility: "B.Tech / MCA.", vacancies: 8, deadline: "2026-08-05", postedAt: "6 days ago", department: "Quality" },
  { id: "j8", title: "Product Manager", company: "Capgemini", companyId: "c8", location: "Mumbai", type: "Full-time", experience: "5-8 years", salary: "₹20-32 LPA", skills: ["Product Strategy", "Agile", "Stakeholder Mgmt", "Analytics"], description: "Own roadmap for digital transformation products.", eligibility: "MBA preferred.", vacancies: 2, deadline: "2026-07-22", postedAt: "1 week ago", department: "Product" },
  { id: "j9", title: "Mobile Developer (Flutter)", company: "Infosys", companyId: "c1", location: "Remote", type: "Contract", experience: "2-4 years", salary: "₹12-18 LPA", skills: ["Flutter", "Dart", "Firebase", "REST APIs"], description: "Ship cross-platform mobile apps for banking clients.", eligibility: "Mobile portfolio required.", vacancies: 4, deadline: "2026-08-15", postedAt: "2 days ago", department: "Mobile" },
  { id: "j10", title: "Security Engineer", company: "Google", companyId: "c3", location: "Hyderabad", type: "Full-time", experience: "4-6 years", salary: "₹30-45 LPA", skills: ["Pen Testing", "Cloud Security", "Python", "SIEM"], description: "Protect Google's infrastructure and users.", eligibility: "Security certifications a plus.", vacancies: 2, deadline: "2026-07-30", postedAt: "3 days ago", department: "Security" },
];

export const candidateApplications: Application[] = [
  { id: "a1", jobId: "j1", jobTitle: "Full Stack Java Developer", company: "Infosys", candidateId: "u-c1", candidateName: "Arjun Sharma", appliedAt: "2026-06-20", status: "Shortlisted", matchScore: 87 },
  { id: "a2", jobId: "j5", jobTitle: "Backend Engineer (Spring Boot)", company: "TCS", candidateId: "u-c1", candidateName: "Arjun Sharma", appliedAt: "2026-06-18", status: "Interview Scheduled", matchScore: 92 },
  { id: "a3", jobId: "j2", jobTitle: "Frontend Engineer (React)", company: "Google", candidateId: "u-c1", candidateName: "Arjun Sharma", appliedAt: "2026-06-15", status: "Pending", matchScore: 64 },
  { id: "a4", jobId: "j7", jobTitle: "QA Automation Engineer", company: "Wipro", candidateId: "u-c1", candidateName: "Arjun Sharma", appliedAt: "2026-06-10", status: "Rejected", matchScore: 48 },
  { id: "a5", jobId: "j4", jobTitle: "Data Scientist", company: "Microsoft", candidateId: "u-c1", candidateName: "Arjun Sharma", appliedAt: "2026-06-05", status: "Offer Released", matchScore: 78 },
];

export const hrApplications: Application[] = [
  { id: "ha1", jobId: "j1", jobTitle: "Full Stack Java Developer", company: "Infosys", candidateId: "u-c1", candidateName: "Arjun Sharma", appliedAt: "2026-06-20", status: "Shortlisted", matchScore: 87 },
  { id: "ha2", jobId: "j1", jobTitle: "Full Stack Java Developer", company: "Infosys", candidateId: "u-c2", candidateName: "Priya Patel", appliedAt: "2026-06-21", status: "Pending", matchScore: 74 },
  { id: "ha3", jobId: "j1", jobTitle: "Full Stack Java Developer", company: "Infosys", candidateId: "u-c3", candidateName: "Rahul Kumar", appliedAt: "2026-06-22", status: "Interview Scheduled", matchScore: 91 },
  { id: "ha4", jobId: "j1", jobTitle: "Full Stack Java Developer", company: "Infosys", candidateId: "u-c4", candidateName: "Sneha Reddy", appliedAt: "2026-06-22", status: "Pending", matchScore: 68 },
  { id: "ha5", jobId: "j1", jobTitle: "Full Stack Java Developer", company: "Infosys", candidateId: "u-c5", candidateName: "Vikram Singh", appliedAt: "2026-06-23", status: "Rejected", matchScore: 42 },
  { id: "ha6", jobId: "j9", jobTitle: "Mobile Developer (Flutter)", company: "Infosys", candidateId: "u-c6", candidateName: "Aisha Khan", appliedAt: "2026-06-24", status: "Pending", matchScore: 82 },
];

export const interviews: Interview[] = [
  { id: "i1", applicationId: "a2", candidateName: "Arjun Sharma", jobTitle: "Backend Engineer (Spring Boot)", company: "TCS", date: "2026-07-02", time: "11:00 AM", mode: "Online", interviewer: "Anita Desai", status: "Pending", link: "https://meet.example.com/abc-defg" },
  { id: "i2", applicationId: "ha3", candidateName: "Rahul Kumar", jobTitle: "Full Stack Java Developer", company: "Infosys", date: "2026-07-03", time: "2:30 PM", mode: "Offline", interviewer: "Suresh Iyer", status: "Pending" },
  { id: "i3", applicationId: "ha1", candidateName: "Arjun Sharma", jobTitle: "Full Stack Java Developer", company: "Infosys", date: "2026-07-05", time: "10:00 AM", mode: "Online", interviewer: "Meera Joshi", status: "Pending", link: "https://meet.example.com/xyz" },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Interview Scheduled", message: "Your interview for Backend Engineer at TCS is on July 2, 11:00 AM.", type: "info", createdAt: "2 hours ago", read: false },
  { id: "n2", title: "Application Shortlisted", message: "You have been shortlisted for Full Stack Java Developer at Infosys.", type: "success", createdAt: "1 day ago", read: false },
  { id: "n3", title: "Offer Released", message: "Microsoft has released an offer for Data Scientist role.", type: "success", createdAt: "3 days ago", read: true },
  { id: "n4", title: "Application Rejected", message: "Your application for QA Automation Engineer at Wipro was not selected.", type: "warning", createdAt: "1 week ago", read: true },
];

export const candidateProfile = {
  fullName: "Arjun Sharma",
  email: "arjun.sharma@email.com",
  phone: "+91 98765 43210",
  gender: "Male",
  dob: "1999-04-15",
  qualification: "B.Tech Computer Science",
  college: "IIT Bombay",
  cgpa: "8.6",
  experience: "2 years",
  skills: ["Java", "Spring Boot", "Angular", "MySQL", "React", "TypeScript", "Git"],
  certificates: ["Oracle Java SE 11", "AWS Cloud Practitioner", "Spring Professional"],
  projects: [
    { name: "E-commerce Microservices", tech: "Java, Spring Boot, Docker", desc: "Built scalable order management system." },
    { name: "Recruitment Portal", tech: "Angular, MySQL", desc: "Full-stack recruitment platform with AI matching." },
  ],
  languages: ["English", "Hindi", "Marathi"],
  resumeUrl: "arjun_sharma_resume.pdf",
};

export const monthlyHiring = [
  { month: "Jan", hires: 24 }, { month: "Feb", hires: 32 }, { month: "Mar", hires: 28 },
  { month: "Apr", hires: 41 }, { month: "May", hires: 38 }, { month: "Jun", hires: 52 },
];

export const departmentHiring = [
  { dept: "Engineering", count: 142 }, { dept: "Design", count: 28 },
  { dept: "Product", count: 34 }, { dept: "QA", count: 47 },
  { dept: "Security", count: 19 }, { dept: "Cloud", count: 56 },
];

export const adminStats = {
  totalCandidates: 12480,
  totalCompanies: 318,
  totalJobs: 1842,
  totalApplications: 38420,
  selectedCandidates: 1247,
  activeRecruiters: 412,
};
