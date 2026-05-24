import type {
  ExperienceLevel,
  JobLocation,
  JobSearchInput,
  PortalLink,
} from "@/types/job-search";
import { toHiristKeyword } from "@/lib/jobs/hirist-keyword";
import {
  getPortalLocations,
  pickPrimaryLocation,
  slugifySegment,
} from "@/lib/jobs/portal-locations";

export const PORTAL_IDS = [
  "naukri",
  "indeed",
  "foundit",
  "shine",
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
  foundit: "Foundit",
  shine: "Shine",
  instahyre: "Instahyre",
  wellfound: "Wellfound",
  hirist: "Hirist",
  uplers: "Uplers",
  weekday: "Weekday",
};

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
      ? input.locations.slice(0, 3).join(", ")
      : "India";
  return `${input.jobTitle} · ${input.experienceLevel} · ${loc}`;
}

function buildInstahyreUrl(loc: ReturnType<typeof getPortalLocations>): string {
  if (loc.instahyre === "remote") {
    return "https://www.instahyre.com/search-jobs/";
  }
  return `https://www.instahyre.com/jobs-in-${loc.instahyre}/`;
}

function buildHiristUrl(
  jobTitle: string,
  loc: ReturnType<typeof getPortalLocations>,
): string {
  const keyword = toHiristKeyword(jobTitle);
  if (loc.hirist === "india") {
    return `https://www.hirist.tech/k/${keyword}-jobs`;
  }
  return `https://www.hirist.tech/${keyword}-jobs-in-${loc.hirist}`;
}

function buildShineUrl(keyword: string, loc: ReturnType<typeof getPortalLocations>): string {
  const slug = slugifySegment(keyword);
  if (loc.shine === "all-india") {
    return `https://www.shine.com/job-search/${slug}-jobs`;
  }
  return `https://www.shine.com/job-search/${slug}-jobs-in-${loc.shine}`;
}

export function buildPortalLinks(
  input: JobSearchInput,
  tips?: Record<string, string>,
): PortalLink[] {
  const keyword = buildKeywordQuery(input);
  const primary = pickPrimaryLocation(input.locations);
  const loc = getPortalLocations(primary);
  const summary = querySummary(input);
  const encodedKeyword = encodeURIComponent(keyword);
  const titleSlug = slugifySegment(input.jobTitle);
  const hiristKeyword = toHiristKeyword(input.jobTitle);
  const naukriExp = naukriExperienceParam(input.experienceLevel);

  const portals: Omit<PortalLink, "tip">[] = [
    {
      id: "naukri",
      name: "Naukri",
      description: "India's largest job portal for IT and product roles.",
      url: `https://www.naukri.com/${titleSlug}-jobs-in-${loc.naukri}?experience=${naukriExp}`,
      querySummary: summary,
    },
    {
      id: "indeed",
      name: "Indeed India",
      description: "Broad listings across companies and consultancies.",
      url: `https://in.indeed.com/jobs?q=${encodedKeyword}&l=${encodeURIComponent(loc.indeed)}`,
      querySummary: summary,
    },
    {
      id: "foundit",
      name: "Foundit",
      description: "Formerly Monster India — large IT and enterprise listings.",
      url: `https://www.foundit.in/srp/results?query=${encodedKeyword}&locations=${encodeURIComponent(loc.foundit)}`,
      querySummary: summary,
    },
    {
      id: "shine",
      name: "Shine",
      description: "Popular India job board for tech and corporate roles.",
      url: buildShineUrl(keyword, loc),
      querySummary: summary,
    },
    {
      id: "instahyre",
      name: "Instahyre",
      description: `Curated startup roles${primary !== "Remote India" ? ` in ${primary}` : ""}. Filter skills on site.`,
      url: buildInstahyreUrl(loc),
      querySummary: summary,
    },
    {
      id: "wellfound",
      name: "Wellfound",
      description: "Startup jobs — fintech, SaaS, and early-stage teams.",
      url: `https://wellfound.com/jobs?search=${encodedKeyword}&locations[]=${encodeURIComponent(loc.wellfound)}`,
      querySummary: summary,
    },
    {
      id: "hirist",
      name: "Hirist",
      description: `Handpicked tech roles${primary !== "Remote India" ? ` in ${primary}` : ""}.`,
      url: buildHiristUrl(input.jobTitle, loc),
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
      url: hiristKeyword
        ? `https://www.weekday.works/jobs/${hiristKeyword}-jobs`
        : "https://jobs.weekday.works/?jobsTab=search",
      querySummary: summary,
    },
  ];

  return portals.map((p) => ({
    ...p,
    tip: tips?.[p.id],
  }));
}
