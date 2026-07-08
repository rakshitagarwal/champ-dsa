import type {
  ExperienceLevel,
  JobLocation,
  JobSearchInput,
  JobRegion,
  PortalLink,
} from "@/types/job-search";
import { getJobRegion } from "@/types/job-search";
import { toHiristKeyword } from "@/lib/jobs/hirist-keyword";
import {
  getPortalLocations,
  pickPrimaryLocation,
  slugifySegment,
} from "@/lib/jobs/portal-locations";

export const PORTAL_IDS = [
  "naukri",
  "indeed",
  "linkedin",
  "internshala",
  "foundit",
  "shine",
  "instahyre",
  "wellfound",
  "hirist",
  "uplers",
  "weekday",
  "greenhouse",
  "lever",
  "reed",
  "seek",
] as const;

export type PortalId = (typeof PORTAL_IDS)[number];

export const PORTAL_LABELS: Record<PortalId, string> = {
  naukri: "Naukri",
  indeed: "Indeed",
  linkedin: "LinkedIn",
  internshala: "Internshala",
  foundit: "Foundit",
  shine: "Shine",
  instahyre: "Instahyre",
  wellfound: "Wellfound",
  hirist: "Hirist",
  uplers: "Uplers",
  weekday: "Weekday",
  greenhouse: "Greenhouse",
  lever: "Lever",
  reed: "Reed UK",
  seek: "Seek AU",
};

const INDIAN_ONLY_PORTALS: PortalId[] = [
  "naukri",
  "foundit",
  "shine",
  "instahyre",
  "hirist",
  "uplers",
  "weekday",
  "internshala",
];

const UK_ONLY_PORTALS: PortalId[] = ["reed"];

const AU_ONLY_PORTALS: PortalId[] = ["seek"];

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

function buildShineUrl(
  keyword: string,
  loc: ReturnType<typeof getPortalLocations>,
): string {
  const slug = slugifySegment(keyword);
  if (loc.shine === "all-india") {
    return `https://www.shine.com/job-search/${slug}-jobs`;
  }
  return `https://www.shine.com/job-search/${slug}-jobs-in-${loc.shine}`;
}

function buildIndeedUrl(
  keyword: string,
  loc: ReturnType<typeof getPortalLocations>,
  region: JobRegion,
): string {
  const encodedKeyword = encodeURIComponent(keyword);
  if (region === "uk") {
    return `https://uk.indeed.com/jobs?q=${encodedKeyword}&l=${encodeURIComponent(loc.indeed)}`;
  }
  if (region === "au") {
    return `https://au.indeed.com/jobs?q=${encodedKeyword}&l=${encodeURIComponent(loc.indeed)}`;
  }
  return `https://in.indeed.com/jobs?q=${encodedKeyword}&l=${encodeURIComponent(loc.indeed)}`;
}

function buildInternshalaUrl(
  jobTitle: string,
  experienceLevel: ExperienceLevel,
  loc: ReturnType<typeof getPortalLocations>,
): string {
  const slug = slugifySegment(jobTitle);
  if (experienceLevel === "Fresher" || experienceLevel === "1–3 years") {
    return `https://internshala.com/internships/${slug}-internship-in-${loc.internshala}`;
  }
  return `https://internshala.com/jobs/${slug}-jobs-in-${loc.internshala}`;
}

function buildGreenhouseUrl(keyword: string, location: string): string {
  const q = encodeURIComponent(`site:job-boards.greenhouse.io ${keyword} ${location}`);
  return `https://www.google.com/search?q=${q}`;
}

function buildReedUrl(jobTitle: string, loc: ReturnType<typeof getPortalLocations>): string {
  const slug = slugifySegment(jobTitle);
  return `https://www.reed.co.uk/jobs/${slug}-jobs-in-${loc.reed}`;
}

function buildSeekUrl(jobTitle: string, loc: ReturnType<typeof getPortalLocations>): string {
  const slug = slugifySegment(jobTitle);
  return `https://www.seek.com.au/${slug}-jobs/in-${loc.seek}`;
}

export function filterPortalsByRegion(
  portals: PortalLink[],
  region: JobRegion,
): PortalLink[] {
  return portals.filter((p) => {
    const id = p.id as PortalId;
    if (region === "uk") {
      return (
        !INDIAN_ONLY_PORTALS.includes(id) &&
        !AU_ONLY_PORTALS.includes(id)
      );
    }
    if (region === "au") {
      return (
        !INDIAN_ONLY_PORTALS.includes(id) &&
        !UK_ONLY_PORTALS.includes(id)
      );
    }
    if (region === "global") {
      return (
        !INDIAN_ONLY_PORTALS.includes(id) &&
        !UK_ONLY_PORTALS.includes(id) &&
        !AU_ONLY_PORTALS.includes(id)
      );
    }
    // india
    return !UK_ONLY_PORTALS.includes(id) && !AU_ONLY_PORTALS.includes(id);
  });
}

export function buildPortalLinks(
  input: JobSearchInput,
  tips?: Record<string, string>,
): PortalLink[] {
  const keyword = buildKeywordQuery(input);
  const primary = pickPrimaryLocation(input.locations);
  const loc = getPortalLocations(primary);
  const region = getJobRegion(input.locations);
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
      name: region === "uk" ? "Indeed UK" : region === "au" ? "Indeed AU" : "Indeed India",
      description: "Broad listings across companies and consultancies.",
      url: buildIndeedUrl(keyword, loc, region),
      querySummary: summary,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Professional network with curated job listings and referrals.",
      url: `https://www.linkedin.com/jobs/search/?keywords=${encodedKeyword}&location=${encodeURIComponent(loc.linkedin)}`,
      querySummary: summary,
    },
    {
      id: "internshala",
      name: "Internshala",
      description: "Internships and entry-level roles for students and freshers.",
      url: buildInternshalaUrl(input.jobTitle, input.experienceLevel, loc),
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
    {
      id: "greenhouse",
      name: "Greenhouse",
      description: "Search jobs across companies using Greenhouse ATS boards.",
      url: buildGreenhouseUrl(keyword, loc.linkedin),
      querySummary: summary,
    },
    {
      id: "lever",
      name: "Lever",
      description: "Jobs from startups and scale-ups on Lever ATS.",
      url: `https://jobs.lever.co/?search=${encodedKeyword}`,
      querySummary: summary,
    },
    {
      id: "reed",
      name: "Reed UK",
      description: "UK job board for tech, finance, and corporate roles.",
      url: buildReedUrl(input.jobTitle, loc),
      querySummary: summary,
    },
    {
      id: "seek",
      name: "Seek AU",
      description: "Australia's leading job site for tech and professional roles.",
      url: buildSeekUrl(input.jobTitle, loc),
      querySummary: summary,
    },
  ];

  const withTips = portals.map((p) => ({
    ...p,
    tip: tips?.[p.id],
  }));

  return filterPortalsByRegion(withTips, region);
}
