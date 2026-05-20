/**
 * Gemini provider — disabled. Use @/lib/ai/groq-explain instead.
 *
 * To re-enable: uncomment the block below, set GEMINI_* in .env.local,
 * and point app/api/ai/explain/route.ts at this module.
 */

/*
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AiExplainCommentary } from "@/types/ai-explain";
import {
  buildExplainUserPrompt,
  EXPLAIN_SYSTEM_INSTRUCTION,
  isValidExplainResponse,
  type ExplainRequest,
} from "@/lib/ai/explain-shared";

export type { ExplainRequest };

const DEFAULT_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-2.5-flash",
] as const;

const BLOCKED_MODELS = new Set([
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-2.0-flash",
]);

function resolveModelCandidates(): string[] {
  const fromEnv = process.env.GEMINI_MODEL?.trim();
  const extras =
    process.env.GEMINI_MODEL_FALLBACKS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const ordered = fromEnv
    ? [fromEnv, ...extras, ...DEFAULT_MODELS]
    : [...DEFAULT_MODELS];

  return [...new Set(ordered)].filter((m) => !BLOCKED_MODELS.has(m));
}

export function formatGeminiError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (raw.includes("429") || raw.includes("Too Many Requests")) {
    if (raw.includes("limit: 0") || raw.includes("free_tier")) {
      return (
        "Gemini free-tier quota is not available for the configured model. " +
        "Set GEMINI_MODEL=gemini-2.5-flash-lite in .env.local and restart the dev server."
      );
    }
    const retry = raw.match(/retry in (\d+(?:\.\d+)?)s/i);
    if (retry) {
      return `Gemini rate limit hit. Wait about ${Math.ceil(Number(retry[1]))} seconds and try again.`;
    }
    return "Gemini rate limit exceeded. Wait a minute and try again.";
  }
  if (raw.includes("404") || raw.includes("not found")) {
    return (
      "That Gemini model is not available. Set GEMINI_MODEL=gemini-2.5-flash-lite in .env.local."
    );
  }
  if (raw.includes("API key not valid") || raw.includes("API_KEY_INVALID")) {
    return "Invalid GEMINI_API_KEY. Create a new key at https://aistudio.google.com/apikey";
  }
  return raw.length > 280 ? `${raw.slice(0, 280)}…` : raw;
}

function isRetryableModelError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes("429") ||
    msg.includes("404") ||
    msg.includes("not found") ||
    msg.includes("quota") ||
    msg.includes("Quota")
  );
}

async function generateWithModel(
  apiKey: string,
  modelId: string,
  prompt: string,
): Promise<AiExplainCommentary> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: EXPLAIN_SYSTEM_INSTRUCTION,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
      maxOutputTokens: 4096,
    },
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  if (!text) throw new Error("Empty response from Gemini.");

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Gemini returned invalid JSON.");
  }

  if (!isValidExplainResponse(parsed)) {
    throw new Error("Gemini response did not match the expected schema.");
  }

  return parsed;
}

export async function generateAiExplanation(
  req: ExplainRequest,
): Promise<AiExplainCommentary> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  const prompt = buildExplainUserPrompt(req);
  const models = resolveModelCandidates();
  const errors: string[] = [];

  for (const modelId of models) {
    try {
      return await generateWithModel(apiKey, modelId, prompt);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${modelId}: ${msg.slice(0, 120)}`);
      if (!isRetryableModelError(err)) {
        throw new Error(formatGeminiError(err));
      }
    }
  }

  throw new Error(formatGeminiError(new Error(errors.join(" | "))));
}
*/
