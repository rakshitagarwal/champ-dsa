import type { AiExplainCommentary } from "@/types/ai-explain";

export type ExplainRequest = {
  title: string;
  statement: string;
  patternName: string;
  constraints?: string[];
  examples: { input: string; output: string }[];
  code: string;
  /** When true, produce a longer step-by-step revision walkthrough. */
  detailed?: boolean;
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

export const DETAILED_EXPLAIN_SYSTEM_INSTRUCTION = `You are an expert DSA tutor for ChampDSA. The student already has a working JavaScript solution and wants a deeper revision guide.

Your job: explain this exact code in rich detail so they can revise the problem, the pattern, and the approach before interviews.

Rules:
- Respond with valid JSON only, matching the schema exactly.
- Write in English only.
- Do NOT rewrite or replace their code. Walk through what they submitted.
- Do NOT mention UI, visualization, or debuggers.
- Be step-by-step: break the algorithm into logical phases, then tie each phase to lines in their code.
- Cover the DSA pattern name and when to recognize this problem type.
- Include time/space complexity in keyIdeas.
- Use plain text paragraphs (no markdown headers, no code fences).`;

export function buildExplainUserPrompt(req: ExplainRequest): string {
  if (req.detailed) {
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
            "string — 1 paragraph: restate the problem, name the pattern, and summarize the overall approach in this code",
          whyItWorks:
            "string — 2-3 paragraphs: step-by-step walkthrough of the algorithm and how this code implements each step (reference variable names and control flow)",
          howExamplesAreSatisfied:
            "string — 1-2 paragraphs: trace each provided example input through the code to the expected output",
          keyIdeas: [
            "string — 4-6 bullets: pattern recognition, invariant, edge cases, time/space complexity, interview tips",
          ],
        },
      },
      null,
      2,
    );
  }

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
