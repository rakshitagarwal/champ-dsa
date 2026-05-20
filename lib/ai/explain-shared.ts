import type { AiExplainCommentary } from "@/types/ai-explain";

export type ExplainRequest = {
  title: string;
  statement: string;
  patternName: string;
  constraints?: string[];
  examples: { input: string; output: string }[];
  code: string;
};

export const EXPLAIN_SYSTEM_INSTRUCTION = `You are an expert DSA tutor for ChampDSA. The student submitted JavaScript that already passes the problem's sample test cases.

Your job: explain in clear English WHY this code solves the problem. The student may have written the code themselves or pasted a working solution — treat both the same.

Rules:
- Respond with valid JSON only, matching the schema exactly.
- Write in English only.
- Do NOT rewrite, optimize, or replace their code. Comment on what they submitted.
- Do NOT suggest a different algorithm unless their code would fail the given examples (it should pass).
- Do NOT mention UI, fullscreen, visualization, or stepping through a debugger.
- Tie explanations to the provided LeetCode-style examples.
- Be pedagogical: intuition first, then how the code implements it.`;

export function buildExplainUserPrompt(req: ExplainRequest): string {
  return JSON.stringify(
    {
      problem: {
        title: req.title,
        statement: req.statement,
        pattern: req.patternName,
        constraints: req.constraints ?? [],
        examples: req.examples,
      },
      studentCode: req.code,
      responseSchema: {
        summary:
          "string — 2-3 sentences: what algorithm/approach this code uses",
        whyItWorks:
          "string — 2-4 paragraphs: why this code is correct for the problem (plain English)",
        howExamplesAreSatisfied:
          "string — 1-2 paragraphs: how the code produces the expected outputs for each example",
        keyIdeas: [
          "string — 3-6 short bullet points of concepts the student should remember",
        ],
      },
    },
    null,
    2,
  );
}

export function isValidExplainResponse(
  data: unknown,
): data is AiExplainCommentary {
  if (!data || typeof data !== "object") return false;
  const o = data as AiExplainCommentary;
  return (
    typeof o.summary === "string" &&
    typeof o.whyItWorks === "string" &&
    typeof o.howExamplesAreSatisfied === "string" &&
    Array.isArray(o.keyIdeas) &&
    o.keyIdeas.every((k) => typeof k === "string")
  );
}

export function parseExplainJson(text: string): AiExplainCommentary {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("AI returned invalid JSON.");
  }
  if (!isValidExplainResponse(parsed)) {
    throw new Error("AI response did not match the expected schema.");
  }
  return parsed;
}
