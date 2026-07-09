export type TipsTabSlug =
  | "resume"
  | "linkedin"
  | "projects"
  | "interview"
  | "email";

export type TipsTabMeta = {
  slug: TipsTabSlug;
  title: string;
  description: string;
};

export const TIPS_CATALOG: TipsTabMeta[] = [
  {
    slug: "resume",
    title: "Resume optimise",
    description: "ATS-friendly structure, metrics, and when to stop tweaking.",
  },
  {
    slug: "linkedin",
    title: "LinkedIn updates",
    description: "Headline, about section, and a 15-minute weekly rhythm.",
  },
  {
    slug: "projects",
    title: "Project work",
    description:
      "What to build so recruiters and hiring managers take your profile seriously.",
  },
  {
    slug: "interview",
    title: "Interview questions",
    description: "STAR answers, prep routine, and day-of checklists.",
  },
  {
    slug: "email",
    title: "Cold email strategy",
    description: "Templates, hooks, follow-ups, and weekly send targets.",
  },
];

export const DEFAULT_TIPS_TAB: TipsTabSlug = "resume";

export function isTipsTabSlug(value: string | null): value is TipsTabSlug {
  return TIPS_CATALOG.some((t) => t.slug === value);
}
