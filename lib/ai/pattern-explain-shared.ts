import { getDeveloperFraming } from "@/data/patterns/developer-framing";
import { getPatternBySlug } from "@/data/patterns/index";
import {
  getPatternEnrichment,
  mergePatternLists,
} from "@/data/patterns/pattern-enrichment";
import type { PatternAiExplanation } from "@/types/pattern-ai-explain";

export const PATTERN_EXPLAIN_SYSTEM = `You are an expert DSA interview coach writing supplemental study notes.
The user already has concise pattern notes on the page. Your job is a SECOND, richer layer:
more descriptive, interview-oriented, with concrete examples and mental models.

Return ONLY valid JSON with this exact shape:
{
  "deepDive": string (2-4 paragraphs, plain text with newlines between paragraphs),
  "mentalModel": string (1-2 paragraphs: invariant, what you visualize while coding),
  "whenYouSeeIt": string[] (4-7 bullets: problem phrases, constraints, data shapes),
  "howToApply": string[] (5-8 numbered-style steps as strings, each one actionable),
  "exampleWalkthrough": string (2-3 paragraphs tracing the reference code on sample input),
  "interviewTips": string[] (3-5 bullets: what to say aloud, edge cases to mention),
  "pitfallsExpanded": string[] (3-5 bullets: mistakes beyond the basics),
  "whenToPickSomethingElse": string (1 short paragraph: adjacent patterns and when to switch)
}

Rules:
- Teach the SAME pattern as the lesson — do not introduce a different technique.
- Use clear, accessible language; avoid fluff and buzzwords.
- Be specific to the pattern name and category.
- exampleWalkthrough must reference the provided example code and sample input.
- Do not mention AI, Groq, or that this is generated.
- Arrays in JSON must be non-empty.`;

export function buildPatternExplainPrompt(slug: string): string {
  const pattern = getPatternBySlug(slug);
  if (!pattern) {
    throw new Error(`Unknown pattern slug: ${slug}`);
  }

  const f = pattern.fundamentals;
  const enrich = getPatternEnrichment(slug);
  const dev = getDeveloperFraming(slug);
  const whenToUse = mergePatternLists(f.whenToUse, enrich?.whenToUse);
  const approach = mergePatternLists(f.approach, enrich?.approach);
  const pitfalls = mergePatternLists(f.pitfalls, enrich?.pitfalls);
  const summary = dev?.summary ?? pattern.summary;

  const blocks = [
    `Pattern: ${pattern.name} (${pattern.slug})`,
    `Category: ${pattern.category}`,
    pattern.difficulty ? `Difficulty: ${pattern.difficulty}` : null,
    `Summary: ${summary}`,
    dev ? `Why it matters: ${dev.hook}` : null,
    dev ? `Recognition: ${dev.recognize}` : null,
    `\nOverview:\n${f.overview}`,
    `\nIntuition:\n${f.intuition}`,
    `\nWhen to use:\n${whenToUse.map((x) => `- ${x}`).join("\n")}`,
    `\nApproach:\n${approach.map((x, i) => `${i + 1}. ${x}`).join("\n")}`,
    `\nComplexity: ${f.complexity}`,
    `\nExample code:\n\`\`\`javascript\n${f.exampleCode}\n\`\`\``,
    `\nExample input: ${f.exampleInput}`,
    `\nPitfalls:\n${pitfalls.map((x) => `- ${x}`).join("\n")}`,
  ].filter(Boolean);

  return blocks.join("\n");
}

function asStringArray(value: unknown, field: string, min = 1): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Missing ${field} in pattern explain response.`);
  }
  const items = value
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean);
  if (items.length < min) {
    throw new Error(`Invalid ${field} in pattern explain response.`);
  }
  return items;
}

function asString(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing ${field} in pattern explain response.`);
  }
  return value.trim();
}

export function parsePatternExplainJson(raw: string): PatternAiExplanation {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("Invalid JSON for pattern explanation.");
  }

  const obj = data as Record<string, unknown>;

  return {
    deepDive: asString(obj.deepDive, "deepDive"),
    mentalModel: asString(obj.mentalModel, "mentalModel"),
    whenYouSeeIt: asStringArray(obj.whenYouSeeIt, "whenYouSeeIt", 3),
    howToApply: asStringArray(obj.howToApply, "howToApply", 4),
    exampleWalkthrough: asString(obj.exampleWalkthrough, "exampleWalkthrough"),
    interviewTips: asStringArray(obj.interviewTips, "interviewTips", 2),
    pitfallsExpanded: asStringArray(obj.pitfallsExpanded, "pitfallsExpanded", 2),
    whenToPickSomethingElse: asString(
      obj.whenToPickSomethingElse,
      "whenToPickSomethingElse",
    ),
  };
}
