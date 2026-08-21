export const EXPERIENCE_LEVELS = [
  "Fresher",
  "1–3 years",
  "3–6 years",
  "6+ years",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
