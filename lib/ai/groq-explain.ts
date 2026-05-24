import type { AiExplainCommentary } from "@/types/ai-explain";
import {
  buildExplainUserPrompt,
  DETAILED_EXPLAIN_SYSTEM_INSTRUCTION,
  EXPLAIN_SYSTEM_INSTRUCTION,
  parseExplainJson,
  type ExplainRequest,
} from "@/lib/ai/explain-shared";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
] as const;

function resolveModelCandidates(): string[] {
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

export function formatGroqError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (raw.includes("429") || raw.toLowerCase().includes("rate limit")) {
    const retry = raw.match(/retry.*?(\d+(?:\.\d+)?)\s*s/i);
    if (retry) {
      return `Groq rate limit hit. Wait about ${Math.ceil(Number(retry[1]))} seconds and try again.`;
    }
    return "Groq rate limit exceeded. Wait a minute and try again.";
  }
  if (raw.includes("401") || raw.toLowerCase().includes("invalid api key")) {
    return "Invalid GROQ_API_KEY. Create a key at https://console.groq.com/keys";
  }
  if (raw.includes("503") || raw.toLowerCase().includes("unavailable")) {
    return "Groq is temporarily unavailable. Try again in a moment or set GROQ_MODEL_FALLBACKS in .env.local.";
  }
  if (raw.includes("GROQ_API_KEY is not configured")) {
    return raw;
  }
  return raw.length > 280 ? `${raw.slice(0, 280)}…` : raw;
}

function isRetryableModelError(status: number, body: string): boolean {
  return (
    status === 429 ||
    status === 503 ||
    status === 502 ||
    body.toLowerCase().includes("overloaded") ||
    body.toLowerCase().includes("unavailable")
  );
}

type GroqChatResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

async function generateWithModel(
  apiKey: string,
  modelId: string,
  userPrompt: string,
  detailed: boolean,
): Promise<AiExplainCommentary> {
  const res = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        {
          role: "system",
          content: detailed
            ? DETAILED_EXPLAIN_SYSTEM_INSTRUCTION
            : EXPLAIN_SYSTEM_INSTRUCTION,
        },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: detailed ? 0.35 : 0.4,
      max_tokens: detailed ? 6144 : 4096,
    }),
  });

  const bodyText = await res.text();
  let data: GroqChatResponse;
  try {
    data = JSON.parse(bodyText) as GroqChatResponse;
  } catch {
    throw new Error(
      `Groq returned non-JSON (${res.status}): ${bodyText.slice(0, 200)}`,
    );
  }

  if (!res.ok) {
    const msg = data.error?.message ?? bodyText.slice(0, 300);
    const err = new Error(`Groq ${res.status}: ${msg}`);
    if (isRetryableModelError(res.status, msg)) {
      (err as Error & { retryable?: boolean }).retryable = true;
    }
    throw err;
  }

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Empty response from Groq.");

  return parseExplainJson(text);
}

export async function generateAiExplanation(
  req: ExplainRequest,
): Promise<AiExplainCommentary> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error(
      "GROQ_API_KEY is not configured on the server. Add it to .env.local and restart the dev server.",
    );
  }

  const userPrompt = buildExplainUserPrompt(req);
  const models = resolveModelCandidates();
  const errors: string[] = [];

  for (const modelId of models) {
    try {
      return await generateWithModel(
        apiKey,
        modelId,
        userPrompt,
        !!req.detailed,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${modelId}: ${msg.slice(0, 120)}`);
      const retryable =
        (err as Error & { retryable?: boolean }).retryable ||
        msg.includes("429") ||
        msg.includes("503") ||
        msg.includes("502");
      if (!retryable) {
        throw new Error(formatGroqError(err));
      }
    }
  }

  throw new Error(formatGroqError(new Error(errors.join(" | "))));
}
