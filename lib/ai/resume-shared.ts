import type {
  ResumeReviewRequest,
  ResumeReviewResult,
} from "@/types/resume-review";

export const RESUME_REVIEW_SYSTEM = `You are an expert technical resume coach for software engineers in India.
Review resumes for full-stack, web, and MERN roles. Be honest, specific, and actionable.

Return ONLY valid JSON with this exact shape:
{
  "overallScore": number (0-100),
  "categories": [
    { "name": string, "score": number (0-100), "summary": string }
  ],
  "sections": [
    { "name": string, "score": number (0-100), "summary": string, "exampleFix": string }
  ],
  "topFixes": string[] (max 5, ordered by impact),
  "missingKeywords": string[],
  "strongPoints": string[],
  "oneLineVerdict": string,
  "scoreExplanation": string (a thorough analysis of at least 3 paragraphs with specific observations, strong points, weak areas, and clear recommendations — write it as if you carefully read every line),
  "lineFixes": [
    {
      "section": string (e.g. "Experience", "Projects", "Skills"),
      "originalLine": string (the problematic line from the resume),
      "suggestedLine": string (rewritten improved version),
      "reason": string (why the original is weak)
    }
  ] (max 5 specific lines that hurt the score the most, ordered by impact)
}

Required categories (use these exact names):
- ATS & readability
- Impact & metrics
- Skills match
- Structure & clarity
- Grammar & tone

Required sections (use these exact names):
- Experience
- Projects
- Skills
- Education
- Summary

Rules:
- Score relative to target experience level (fresher vs 3-6 YOE expectations differ).
- Penalize generic buzzwords without evidence.
- Reward quantified impact (%, latency, users, revenue).
- missingKeywords: role-relevant tech and domain terms absent from resume.
- topFixes: concrete edits, not vague advice.
- sections: score each resume section; exampleFix is one rewritten bullet or sentence.
- lineFixes: quote actual lines from the resume and show exactly how to rewrite them.
- Keep summaries to 1-2 sentences each.`;

const MAX_RESUME_CHARS = 14_000;

export function buildResumeReviewPrompt(req: ResumeReviewRequest): string {
  const text = req.resumeText.slice(0, MAX_RESUME_CHARS);
  const parts = [
    `Resume text:\n"""${text}"""`,
    req.jobTitle ? `Target job title: ${req.jobTitle}` : null,
    req.experienceLevel
      ? `Candidate experience level: ${req.experienceLevel}`
      : null,
  ].filter(Boolean);

  return parts.join("\n\n");
}

export function parseResumeReviewJson(raw: string): ResumeReviewResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("Groq returned invalid JSON for resume review.");
  }

  const obj = data as Record<string, unknown>;
  const overallScore = Number(obj.overallScore);
  if (!Number.isFinite(overallScore) || overallScore < 0 || overallScore > 100) {
    throw new Error("Invalid overallScore in resume review response.");
  }

  const categories = obj.categories;
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error("Missing categories in resume review response.");
  }

  const parsedCategories = categories.map((c) => {
    const cat = c as Record<string, unknown>;
    const score = Number(cat.score);
    if (!cat.name || !Number.isFinite(score)) {
      throw new Error("Invalid category in resume review response.");
    }
    return {
      name: String(cat.name),
      score: Math.min(100, Math.max(0, score)),
      summary: String(cat.summary ?? ""),
    };
  });

  const sectionsRaw = obj.sections;
  const parsedSections = Array.isArray(sectionsRaw)
    ? sectionsRaw.map((s) => {
        const sec = s as Record<string, unknown>;
        const score = Number(sec.score);
        if (!sec.name || !Number.isFinite(score)) {
          throw new Error("Invalid section in resume review response.");
        }
        return {
          name: String(sec.name),
          score: Math.min(100, Math.max(0, score)),
          summary: String(sec.summary ?? ""),
          exampleFix: String(sec.exampleFix ?? ""),
        };
      })
    : [];

  const strArr = (v: unknown, max: number) =>
    Array.isArray(v) ? v.slice(0, max).map(String) : [];

  const lineFixesRaw = obj.lineFixes;
  const parsedLineFixes = Array.isArray(lineFixesRaw)
    ? lineFixesRaw.slice(0, 5).map((lf) => {
        const fix = lf as Record<string, unknown>;
        return {
          section: String(fix.section ?? ""),
          originalLine: String(fix.originalLine ?? ""),
          suggestedLine: String(fix.suggestedLine ?? ""),
          reason: String(fix.reason ?? ""),
        };
      })
    : [];

  return {
    overallScore: Math.round(overallScore),
    categories: parsedCategories,
    sections: parsedSections,
    topFixes: strArr(obj.topFixes, 5),
    missingKeywords: strArr(obj.missingKeywords, 12),
    strongPoints: strArr(obj.strongPoints, 8),
    oneLineVerdict: String(obj.oneLineVerdict ?? ""),
    scoreExplanation: String(obj.scoreExplanation ?? ""),
    lineFixes: parsedLineFixes,
  };
}
