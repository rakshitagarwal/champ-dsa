import { formatGroqError } from "@/lib/ai/groq-explain";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
] as const;

export type AnimationCaptionsRequest = {
  title: string;
  patternName: string;
  code: string;
  steps: {
    index: number;
    line: number;
    description: string;
    structureKinds: string[];
  }[];
};

const SYSTEM = `You improve step labels for a DSA algorithm visualizer.

Return ONLY valid JSON:
{ "captions": ["...", "..."] }

Rules:
- One caption per step, same order as input.
- Each caption: 6-14 words, past tense, what changed visually.
- English only. No markdown.`;

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

export async function generateAnimationCaptions(
  req: AnimationCaptionsRequest,
): Promise<string[]> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured. Add it to .env.local.",
    );
  }

  const userPrompt = JSON.stringify(
    {
      problem: req.title,
      pattern: req.patternName,
      codePreview: req.code.split("\n").slice(0, 40).join("\n"),
      steps: req.steps,
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
          temperature: 0.3,
          max_tokens: 1024,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM },
            { role: "user", content: userPrompt },
          ],
        }),
      });

      const bodyText = await res.text();
      if (!res.ok) {
        errors.push(`${modelId}: ${bodyText.slice(0, 80)}`);
        continue;
      }

      const data = JSON.parse(bodyText) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = data.choices?.[0]?.message?.content?.trim();
      if (!text) continue;

      const parsed = JSON.parse(text) as { captions?: string[] };
      if (Array.isArray(parsed.captions) && parsed.captions.length > 0) {
        return parsed.captions.map((c) => String(c).trim());
      }
    } catch (err) {
      errors.push(
        `${modelId}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  throw new Error(formatGroqError(new Error(errors.join(" | "))));
}
