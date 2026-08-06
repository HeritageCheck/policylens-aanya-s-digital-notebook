import heritageThumb from "@/assets/project-heritage.jpg";

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  thumbnail?: string;
  status: "Live" | "In progress" | "Planned";
  highlight?: boolean;
};

export const projects: Project[] = [
  {
    title: "HeritageCheck",
    description:
      "A citizen-facing tool for documenting the condition of protected heritage sites. Combines a structured field survey with a public condition index so neglect becomes visible before it becomes irreversible.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Field research", "Policy mapping"],
    thumbnail: heritageThumb,
    status: "Live",
    highlight: true,
  },
  {
    title: "Scheme Uptake Tracker",
    description:
      "A working prototype that visualises the drop-off between eligibility, application, and disbursal for selected welfare schemes.",
    technologies: ["Data visualisation", "Public datasets"],
    status: "In progress",
  },
  {
    title: "Heat Action Reading Room",
    description:
      "An annotated library of municipal heat action plans, indexed by city, budget line, and enforcement mechanism.",
    technologies: ["Research", "Document analysis"],
    status: "Planned",
  },
  {
    title: "Placeholder for future work",
    description:
      "Reserved for the next project — likely something at the intersection of education data and local governance.",
    technologies: ["To be decided"],
    status: "Planned",
  },
];
