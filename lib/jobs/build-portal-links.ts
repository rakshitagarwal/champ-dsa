import type {
  ExperienceLevel,
  JobLocation,
  JobSearchInput,
  PortalLink,
} from "@/types/job-search";

export const PORTAL_IDS = [
  "naukri",
  "indeed",
  "instahyre",
  "wellfound",
  "hirist",
  "uplers",
  "weekday",
] as const;

export type PortalId = (typeof PORTAL_IDS)[number];

export const PORTAL_LABELS: Record<PortalId, string> = {
  naukri: "Naukri",
  indeed: "Indeed",
  instahyre: "Instahyre",
  wellfound: "Wellfound",
  hirist: "Hirist",
  uplers: "Uplers",
  weekday: "Weekday",
};

/** Naukri experience range codes (approximate) */
function naukriExperienceParam(level: ExperienceLevel): string {
  switch (level) {
    case "Fresher":
      return "0";
    case "1–3 years":
      return "2";
    case "3–6 years":
      return "4";
    case "6+ years":
      return "6";
  }
}

/** Hirist minexp/maxexp query params */
function hiristExperienceParams(level: ExperienceLevel): {
  minexp: string;
  maxexp: string;
} {
  switch (level) {
    case "Fresher":
      return { minexp: "0", maxexp: "1" };
    case "1–3 years":
      return { minexp: "1", maxexp: "3" };
    case "3–6 years":
      return { minexp: "3", maxexp: "6" };
    case "6+ years":
      return { minexp: "6", maxexp: "15" };
  }
}

function keywordSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function primaryLocation(locations: JobLocation[]): string {
  if (locations.includes("Remote India") && locations.length === 1) {
    return "India";
  }
  const onSite = locations.filter((l) => l !== "Remote India");
  return onSite[0] ?? "Bangalore";
}

function buildKeywordQuery(input: JobSearchInput): string {
  const parts = [input.jobTitle.trim()];
  if (input.extraKeywords?.length) {
    parts.push(input.extraKeywords.slice(0, 3).join(" "));
  }
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function querySummary(input: JobSearchInput): string {
  const loc =
    input.locations.length > 0
      ? input.locations.slice(0, 2).join(", ")
      : "India";
  return `${input.jobTitle} · ${input.experienceLevel} · ${loc}`;
}

export function buildPortalLinks(
  input: JobSearchInput,
  tips?: Record<string, string>,
): PortalLink[] {
  const keyword = buildKeywordQuery(input);
  const location = primaryLocation(input.locations);
  const summary = querySummary(input);
  const encodedKeyword = encodeURIComponent(keyword);
  const encodedLocation = encodeURIComponent(location);
  const slug = keywordSlug(keyword);
  const naukriExp = naukriExperienceParam(input.experienceLevel);
  const hiristExp = hiristExperienceParams(input.experienceLevel);

  const portals: Omit<PortalLink, "tip">[] = [
    {
      id: "naukri",
      name: "Naukri",
      description: "India's largest job portal for IT and product roles.",
      url: `https://www.naukri.com/${encodeURIComponent(keyword.replace(/\s+/g, "-").toLowerCase())}-jobs-in-${encodeURIComponent(location.replace(/\s+/g, "-").toLowerCase())}?experience=${naukriExp}`,
      querySummary: summary,
    },
    {
      id: "indeed",
      name: "Indeed India",
      description: "Broad listings across companies and consultancies.",
      url: `https://in.indeed.com/jobs?q=${encodedKeyword}&l=${encodedLocation}`,
      querySummary: summary,
    },
    {
      id: "instahyre",
      name: "Instahyre",
      description: "Curated startup and product-company roles.",
      url: `https://www.instahyre.com/search/jobs/?query=${encodedKeyword}`,
      querySummary: summary,
    },
    {
      id: "wellfound",
      name: "Wellfound",
      description: "Startup jobs — fintech, SaaS, and early-stage teams.",
      url: `https://wellfound.com/jobs?search=${encodedKeyword}&locations[]=${encodedLocation}`,
      querySummary: summary,
    },
    {
      id: "hirist",
      name: "Hirist",
      description: "Premium handpicked tech roles from product companies.",
      url: `https://www.hirist.tech/k/${slug}-jobs?minexp=${hiristExp.minexp}&maxexp=${hiristExp.maxexp}`,
      querySummary: summary,
    },
    {
      id: "uplers",
      name: "Uplers",
      description: "Verified product and tech roles from 1,000+ companies.",
      url: "https://platform.uplers.com/",
      querySummary: summary,
    },
    {
      id: "weekday",
      name: "Weekday",
      description: "Curated high-growth startup jobs with AI-assisted apply.",
      url: slug
        ? `https://www.weekday.works/jobs/${slug}-jobs`
        : "https://jobs.weekday.works/?jobsTab=search",
      querySummary: summary,
    },
  ];

  return portals.map((p) => ({
    ...p,
    tip: tips?.[p.id],
  }));
}
