import heritageThumb from "@/assets/project-heritage.jpg";

export type Project = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail?: string;
  gallery?: string[];
  status: "Live" | "In progress" | "Planned";
  highlight?: boolean;
  appStoreUrl?: string;
  playStoreUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "heritagecheck",
    title: "HeritageCheck",
    description:
      "A citizen-facing tool for documenting the condition of protected heritage sites. Combines a structured field survey with a public condition index so neglect becomes visible before it becomes irreversible.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Field research", "Policy mapping"],
    thumbnail: heritageThumb,
    gallery: [],
    status: "Live",
    highlight: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
