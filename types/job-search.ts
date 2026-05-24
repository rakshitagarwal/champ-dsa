export const EXPERIENCE_LEVELS = [
  "Fresher",
  "1–3 years",
  "3–6 years",
  "6+ years",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

/** Metro and emerging hubs — Delhi NCR cities are listed separately. */
export const JOB_LOCATIONS = [
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Chennai",
  "Delhi",
  "Noida",
  "Gurgaon",
  "Ahmedabad",
  "Gift City",
  "Kolkata",
  "Chandigarh",
  "Jaipur",
  "Kochi",
  "Indore",
  "Remote India",
] as const;

export type JobLocation = (typeof JOB_LOCATIONS)[number];

export type JobSearchInput = {
  jobTitle: string;
  experienceLevel: ExperienceLevel;
  locations: JobLocation[];
  extraKeywords?: string[];
};

export type PortalLink = {
  id: string;
  name: string;
  description: string;
  url: string;
  querySummary: string;
  tip?: string;
};

export type JobSearchKeywords = {
  primaryKeywords: string;
  alternateKeywords: string[];
  suggestedTitles: string[];
  portalTips: Record<string, string>;
};
