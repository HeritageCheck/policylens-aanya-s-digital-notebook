import { projects } from "@/data/projects";

export const getStats = (blogsCount: number) => [
  { label: "Blogs Written", value: blogsCount, suffix: "" },
  { label: "Projects", value: projects.length, suffix: "" },
  { label: "Competitions", value: 11, suffix: "" },
];

export type TimelineItem = {
  period: string;
  title: string;
  place?: string;
  detail: string;
};

export const academicJourney: TimelineItem[] = [
  {
    period: "2025 — present",
    title: "Undergraduate studies in Political Science & Public Policy",
    place: "Coursework in governance, quantitative methods, and political economy",
    detail:
      "Focusing on implementation research: what happens between a notified scheme and a household that receives it.",
  },
  {
    period: "2024 — 2025",
    title: "Research assistantship, urban governance",
    place: "Independent study group",
    detail:
      "Coded municipal budget documents across six cities and built a comparative view of adaptation spending.",
  },
  {
    period: "2023 — 2024",
    title: "Senior secondary, humanities stream",
    place: "School leadership and debate",
    detail:
      "Started writing publicly about policy after a year of parliamentary debate and a first attempt at a research paper.",
  },
];

export const interests = [
  "Public policy design",
  "Welfare delivery",
  "Urban and municipal governance",
  "Education policy",
  "Climate adaptation",
  "Technology and the state",
];

export const skills = [
  "Policy memo writing",
  "Qualitative interviewing",
  "Budget and document analysis",
  "Descriptive data analysis",
  "Literature reviews",
  "Public speaking",
  "Research design",
  "Editing and long-form writing",
];

export const researchInterests = [
  {
    title: "Implementation gaps in welfare",
    detail:
      "Measuring where legitimate claims drop out of the pipeline, and which frictions are cheapest to remove.",
  },
  {
    title: "Municipal climate capacity",
    detail:
      "Whether cities have the staffing and budget lines to run the adaptation plans they have published.",
  },
  {
    title: "Automated decision-making by the state",
    detail:
      "Appeal rights and error transparency when eligibility is decided by a model rather than an officer.",
  },
];

export const competitions: TimelineItem[] = [
  {
    period: "2026",
    title: "National Policy Case Challenge",
    place: "Finalist",
    detail: "Proposed a single-window verification model for a state-level scholarship scheme.",
  },
  {
    period: "2025",
    title: "Model United Nations, UNEP committee",
    place: "Best Delegate",
    detail: "Negotiated a working paper on urban heat resilience financing.",
  },
  {
    period: "2025",
    title: "Inter-collegiate Research Paper Competition",
    place: "Second place",
    detail: "Submitted a comparative reading of six municipal heat action plans.",
  },
];

export const leadership: TimelineItem[] = [
  {
    period: "2026",
    title: "Editor, student policy review",
    detail:
      "Commission and edit six essays per issue; run the writing workshop for new contributors.",
  },
  {
    period: "2025 — present",
    title: "Founder, The 3rd Eye Economist reading circle",
    detail: "A weekly group that reads one primary policy document together, start to finish.",
  },
  {
    period: "2024",
    title: "Head of the debating society",
    detail: "Coached twelve first-time debaters through their first competitive season.",
  },
];

export const awards = [
  {
    title: "Young Researcher Commendation",
    year: "2026",
    detail: "For sustained independent writing on welfare implementation.",
  },
  {
    title: "Best Delegate, UNEP",
    year: "2025",
    detail: "Recognised for the strongest working paper in committee.",
  },
  {
    title: "Academic Excellence Award",
    year: "2025",
    detail: "Top of cohort in political science coursework.",
  },
  {
    title: "Writing Prize, school essay competition",
    year: "2024",
    detail: "For an essay on the right to information in practice.",
  },
];

export const contactLinks = [
  {
    label: "Email",
    value: "checkheritage@gmail.com",
    href: "mailto:checkheritage@gmail.com",
    icon: "mail",
  },
  { label: "LinkedIn", value: "/in/aanyamonga", href: "https://linkedin.com", icon: "linkedin" },
  {
    label: "GitHub",
    value: "HeritageCheck",
    href: "https://github.com/HeritageCheck",
    icon: "github",
  },
  { label: "Location", value: "New Delhi, India", href: undefined, icon: "map" },
] as const;
