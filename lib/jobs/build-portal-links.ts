import type {
  ExperienceLevel,
  JobLocation,
  JobSearchInput,
  PortalLink,
} from "@/types/job-search";

/** LinkedIn f_E: 1=intern, 2=entry, 3=associate, 4=mid-senior, 5=director, 6=executive */
function linkedInExperienceFilter(level: ExperienceLevel): string {
  switch (level) {
    case "Fresher":
      return "1,2";
    case "1–3 years":
      return "2,3";
    case "3–6 years":
      return "3,4";
    case "6+ years":
      return "4,5";
  }
}

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
  const linkedInExp = linkedInExperienceFilter(input.experienceLevel);
  const naukriExp = naukriExperienceParam(input.experienceLevel);

  const portals: Omit<PortalLink, "tip">[] = [
    {
      id: "linkedin",
      name: "LinkedIn Jobs",
      description: "Professional network with strong India tech hiring.",
      url: `https://www.linkedin.com/jobs/search/?keywords=${encodedKeyword}&location=${encodedLocation}&f_E=${encodeURIComponent(linkedInExp)}`,
      querySummary: summary,
    },
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
      id: "cutshort",
      name: "Cutshort",
      description: "India tech hiring with skill-based matching.",
      url: `https://cutshort.io/jobs?query=${encodedKeyword}`,
      querySummary: summary,
    },
    {
      id: "google",
      name: "Google Jobs",
      description: "Aggregated listings across multiple sources.",
      url: `https://www.google.com/search?q=${encodeURIComponent(`${keyword} jobs ${location} India`)}&ibp=htl;jobs`,
      querySummary: summary,
    },
  ];

  return portals.map((p) => ({
    ...p,
    tip: tips?.[p.id],
  }));
}
