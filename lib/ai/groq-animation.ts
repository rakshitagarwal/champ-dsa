import { ANIMATION_SYSTEM_PROMPT } from "@/lib/ai/animation-prompt";
import { formatGroqError } from "@/lib/ai/groq-explain";
import {
  parseAnimationJson,
  type AnimationChatMessage,
} from "@/lib/ai/grok-animation";
import type { AiAnimationResult } from "@/types/ai-animation";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
] as const;

const RETRY_USER_MESSAGE =
  "Return ONLY valid JSON. No markdown or backticks.";

type GroqChatResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

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

function isRetryable(status: number, body: string): boolean {
  return (
    status === 429 ||
    status === 503 ||
    status === 502 ||
    body.toLowerCase().includes("overloaded") ||
    body.toLowerCase().includes("unavailable")
  );
}

async function chatWithModel(
  apiKey: string,
  model: string,
  messages: AnimationChatMessage[],
): Promise<string> {
  const res = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      max_tokens: 4096,
      response_format: { type: "json_object" },
      messages,
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
    if (isRetryable(res.status, msg)) {
      (err as Error & { retryable?: boolean }).retryable = true;
    }
    throw err;
  }

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Empty response from Groq.");
  return text;
}

const MAX_CODE_LINES = 80;

function truncateCode(code: string): string {
  const lines = code.split("\n");
  if (lines.length <= MAX_CODE_LINES) return code;
  return (
    lines.slice(0, MAX_CODE_LINES).join("\n") +
    "\n// … (truncated for animation request)"
  );
}

async function generateWithModel(
  apiKey: string,
  model: string,
  code: string,
): Promise<AiAnimationResult> {
  const userContent = `Animate this code:\n\n${truncateCode(code)}`;
  const messages: AnimationChatMessage[] = [
    { role: "system", content: ANIMATION_SYSTEM_PROMPT },
    { role: "user", content: userContent },
  ];

  let raw = await chatWithModel(apiKey, model, messages);
  let result = parseAnimationJson(raw);

  if (!result) {
    messages.push({
      role: "user",
      content: `${RETRY_USER_MESSAGE} Previous response was invalid JSON.`,
    });
    raw = await chatWithModel(apiKey, model, messages);
    result = parseAnimationJson(raw);
  }

  if (!result) {
    throw new Error(
      "Could not parse animation JSON from Groq. Try Visualize again.",
    );
  }

  return result;
}

export async function generateGroqAnimation(
  code: string,
): Promise<AiAnimationResult> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured. Add it to .env.local and restart the dev server.",
    );
  }

  const models = resolveModels();
  const errors: string[] = [];

  for (const modelId of models) {
    try {
      return await generateWithModel(apiKey, modelId, code);
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
