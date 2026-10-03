import heritageThumb from "@/assets/project-pastproof.jpg";

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
    slug: "pastproof",
    title: "PastProof",
    description:
      "A mobile app that verifies conservation claims on Delhi's heritage sites. Photograph an ASI-protected monument and PastProof identifies it with AI, pulls the official conservation record, and compares it against the structure's real condition — cracks, vegetation, litter, graffiti, structural damage — to generate an explainable Reality Match Score from 0–100.",
    technologies: [
      "React Native",
      "Expo",
      "Firebase",
      "Firestore",
      "Google Maps API",
      "Gemini Vision",
      "Computer vision",
    ],
    thumbnail: heritageThumb,
    gallery: [],
    status: "Live",
    highlight: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
