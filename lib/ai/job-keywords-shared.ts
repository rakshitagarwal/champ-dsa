import type { ExperienceLevel } from "@/types/job-search";
import type { JobSearchKeywords } from "@/types/job-search";

export const JOB_KEYWORDS_SYSTEM = `You extract job-search keywords from resumes for Indian software engineering roles.
Return ONLY valid JSON:
{
  "primaryKeywords": string (short search phrase, max 6 words),
  "alternateKeywords": string[] (max 5),
  "suggestedTitles": string[] (max 3 job titles to search),
  "portalTips": {
    "naukri": string (one tip, max 20 words),
    "indeed": string,
    "instahyre": string,
    "wellfound": string,
    "hirist": string,
    "uplers": string,
    "weekday": string
  }
}

Focus on stack (React, Node, MERN), domain (fintech, SaaS), and seniority-appropriate terms.`;

export type JobKeywordsRequest = {
  resumeText: string;
  jobTitle: string;
  experienceLevel: ExperienceLevel;
};

export function buildJobKeywordsPrompt(req: JobKeywordsRequest): string {
  const text = req.resumeText.slice(0, 8000);
  return [
    `Job title: ${req.jobTitle}`,
    `Experience: ${req.experienceLevel}`,
    `Resume:\n"""${text}"""`,
  ].join("\n\n");
}

export function parseJobKeywordsJson(raw: string): JobSearchKeywords {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("Invalid JSON from job keywords response.");
  }

  const obj = data as Record<string, unknown>;
  const primaryKeywords = String(obj.primaryKeywords ?? "").trim();
  if (!primaryKeywords) {
    throw new Error("Missing primaryKeywords.");
  }

  const alt = Array.isArray(obj.alternateKeywords)
    ? obj.alternateKeywords.map(String).slice(0, 5)
    : [];
  const titles = Array.isArray(obj.suggestedTitles)
    ? obj.suggestedTitles.map(String).slice(0, 3)
    : [];

  const portalTips: Record<string, string> = {};
  if (obj.portalTips && typeof obj.portalTips === "object") {
    for (const [k, v] of Object.entries(
      obj.portalTips as Record<string, unknown>,
    )) {
      if (v) portalTips[k] = String(v);
    }
  }

  return { primaryKeywords, alternateKeywords: alt, suggestedTitles: titles, portalTips };
}
