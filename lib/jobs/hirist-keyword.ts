/** Map job titles to Hirist slug segments (see hirist.tech/*-jobs-in-* URLs). */
const HIRIST_KEYWORD_ALIASES: Record<string, string> = {
  "full stack developer": "full-stack",
  "full stack engineer": "full-stack",
  "full stack": "full-stack",
  "mern developer": "mern",
  "mern stack developer": "mern",
  "react developer": "react",
  "react.js developer": "react",
  "node developer": "node-js",
  "nodejs developer": "node-js",
  "node.js developer": "node-js",
  "java developer": "java",
  "python developer": "python",
  "backend developer": "backend-development",
  "frontend developer": "frontend-development",
  "software engineer": "software-engineer",
  "software developer": "software-engineer",
  "data engineer": "data-engineering",
  "devops engineer": "devops",
  "android developer": "android",
  "ios developer": "ios",
};

export function toHiristKeyword(jobTitle: string): string {
  const normalized = jobTitle.toLowerCase().trim().replace(/\s+/g, " ");
  if (HIRIST_KEYWORD_ALIASES[normalized]) {
    return HIRIST_KEYWORD_ALIASES[normalized];
  }

  const simplified = normalized
    .replace(/\b(senior|junior|lead|principal|staff|sr|jr)\b/g, "")
    .replace(/\b(developer|engineer|programmer|specialist|analyst)\b/g, "")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!simplified) return "javascript";
  if (simplified.length > 24) {
    return simplified.split("-").slice(0, 2).join("-");
  }
  return simplified;
}
