export type TipsTabSlug =
  | "resume"
  | "linkedin"
  | "projects"
  | "interview"
  | "email"
  | "referral";

export type TipsTabMeta = {
  slug: TipsTabSlug;
  title: string;
  description: string;
};

export const TIPS_CATALOG: TipsTabMeta[] = [
  {
    slug: "resume",
    title: "Resume optimise",
    description:
      "Senior / SDE-2 screen: title, tenure story, architecture bullets, and when to stop rewriting.",
  },
  {
    slug: "linkedin",
    title: "LinkedIn updates",
    description:
      "Headline SEO for Senior Full Stack / SDE-2, About that proves ownership, weekly recruiter rhythm.",
  },
  {
    slug: "projects",
    title: "Project work",
    description:
      "What to show besides job bullets — one shipped product, not a fourth clone.",
  },
  {
    slug: "interview",
    title: "Interview questions",
    description:
      "Senior loop: behavioral ownership, DSA, system design, and the hopping question.",
  },
  {
    slug: "email",
    title: "Cold email strategy",
    description:
      "Subject lines and templates for recruiters and EMs hiring Senior / SDE-2.",
  },
  {
    slug: "referral",
    title: "Referral strategy",
    description:
      "Ask for a specific role, give them a paste-ready blurb, close the loop.",
  },
];

export const DEFAULT_TIPS_TAB: TipsTabSlug = "resume";

export function isTipsTabSlug(value: string | null): value is TipsTabSlug {
  return TIPS_CATALOG.some((t) => t.slug === value);
}
