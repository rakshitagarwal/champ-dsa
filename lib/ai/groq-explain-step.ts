import type { StepViz } from "@/types/execution";
import { formatGroqError } from "@/lib/ai/groq-explain";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
] as const;

export type ExplainStepRequest = {
  problemTitle: string;
  patternName: string;
  line: number;
  lineSnippet: string | null;
  stepSummary: string;
  stepIndex: number;
  vizSnapshot?: StepViz;
};

const SYSTEM = `You are a DSA tutor explaining ONE execution step to a student who pasted working LeetCode-style code.

Rules:
- English only.
- 2-4 short sentences maximum.
- Explain what THIS step does and why, using the provided line and variable snapshot.
- Do not rewrite their full solution or suggest a different algorithm.
- Plain text only — no JSON, no markdown headings.`;

function resolveModels(): string[] {
  const fromEnv = process.env.GROQ_MODEL?.trim();
  const extras =
    process.env.GROQ_MODEL_FALLBACKS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  const ordered = fromEnv
    ? [fromEnv, ...extras, ...DEFAULT_MODELS]
    : [...DEFAULT_MODELS];
  return [...new Set(ordered)];
}

export async function generateStepExplanation(
  req: ExplainStepRequest,
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error(
      "GROQ_API_KEY is not configured on the server. Add it to .env.local.",
    );
  }

  const userPrompt = JSON.stringify(
    {
      problem: req.problemTitle,
      pattern: req.patternName,
      stepIndex: req.stepIndex,
      line: req.line,
      lineSnippet: req.lineSnippet,
      localSummary: req.stepSummary,
      viz: req.vizSnapshot ?? null,
    },
    null,
    2,
  );

  const errors: string[] = [];
  for (const modelId of resolveModels()) {
    try {
      const res = await fetch(GROQ_CHAT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelId,
          messages: [
            { role: "system", content: SYSTEM },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.35,
          max_tokens: 256,
        }),
      });

      const bodyText = await res.text();
      let data: {
        choices?: { message?: { content?: string } }[];
        error?: { message?: string };
      };
      try {
        data = JSON.parse(bodyText);
      } catch {
        throw new Error(`Groq returned non-JSON (${res.status})`);
      }

      if (!res.ok) {
        throw new Error(data.error?.message ?? bodyText.slice(0, 200));
      }

      const text = data.choices?.[0]?.message?.content?.trim();
      if (!text) throw new Error("Empty response from Groq.");
      return text;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${modelId}: ${msg.slice(0, 80)}`);
      if (!msg.includes("429") && !msg.includes("503")) {
        throw new Error(formatGroqError(err));
      }
    }
  }

  throw new Error(formatGroqError(new Error(errors.join(" | "))));
}
