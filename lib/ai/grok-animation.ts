import { ANIMATION_SYSTEM_PROMPT } from "@/lib/ai/animation-prompt";
import type { AiAnimationResult } from "@/types/ai-animation";

const GROK_CHAT_URL = "https://api.x.ai/v1/chat/completions";
const DEFAULT_MODEL = "grok-3";
const MAX_STEPS = 8;

const RETRY_USER_MESSAGE =
  "Return ONLY valid JSON. No markdown or backticks.";

export type AnimationChatMessage = {
  role: string;
  content: string;
};

type GrokChatResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

export function extractJson(text: string): string {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return fence[1]!.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

export function parseAnimationJson(raw: string): AiAnimationResult | null {
  try {
    const parsed = JSON.parse(extractJson(raw)) as {
      title?: string;
      steps?: { label?: string; svg?: string }[];
      totalSteps?: number;
    };

    if (!parsed.steps || !Array.isArray(parsed.steps) || parsed.steps.length === 0) {
      return null;
    }

    const steps = parsed.steps
      .slice(0, MAX_STEPS)
      .map((s) => ({
        label: String(s.label ?? "").trim() || "Step",
        svg: String(s.svg ?? "").trim(),
      }))
      .filter((s) => s.svg.toLowerCase().includes("<svg"));

    if (steps.length === 0) return null;

    const totalSteps =
      typeof parsed.totalSteps === "number" && parsed.totalSteps > 0
        ? Math.min(parsed.totalSteps, steps.length)
        : steps.length;

    return {
      title: String(parsed.title ?? "Algorithm").trim() || "Algorithm",
      steps,
      totalSteps,
    };
  } catch {
    return null;
  }
}

export function formatGrokError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (raw.includes("429") || raw.toLowerCase().includes("rate limit")) {
    const retry = raw.match(/retry.*?(\d+(?:\.\d+)?)\s*s/i);
    if (retry) {
      return `Grok rate limit hit. Wait about ${Math.ceil(Number(retry[1]))} seconds and try again.`;
    }
    return "Grok rate limit exceeded. Wait a minute and try again.";
  }
  if (raw.includes("401") || raw.toLowerCase().includes("invalid api key")) {
    return "Invalid GROK_API_KEY. Create a key at https://console.x.ai/";
  }
  if (raw.includes("GROK_API_KEY is not configured")) {
    return raw;
  }
  if (raw.includes("503") || raw.toLowerCase().includes("unavailable")) {
    return "Grok is temporarily unavailable. Try again in a moment.";
  }
  return raw.length > 280 ? `${raw.slice(0, 280)}…` : raw;
}

async function chatCompletion(
  apiKey: string,
  model: string,
  messages: AnimationChatMessage[],
): Promise<string> {
  const res = await fetch(GROK_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      messages,
    }),
  });

  const body = (await res.json()) as GrokChatResponse;

  if (!res.ok) {
    const msg =
      body.error?.message ?? `Grok API error (${res.status})`;
    throw new Error(msg);
  }

  const content = body.choices?.[0]?.message?.content;
  if (!content?.trim()) {
    throw new Error("Grok returned an empty response.");
  }

  return content;
}

export async function generateGrokAnimation(
  code: string,
): Promise<AiAnimationResult> {
  const apiKey = process.env.GROK_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      "GROK_API_KEY is not configured. Add it to .env.local and restart the dev server.",
    );
  }

  const model = process.env.GROK_MODEL?.trim() || DEFAULT_MODEL;
  const userContent = `Animate this code:\n\n${code}`;

  const messages: AnimationChatMessage[] = [
    { role: "system", content: ANIMATION_SYSTEM_PROMPT },
    { role: "user", content: userContent },
  ];

  let raw = await chatCompletion(apiKey, model, messages);
  let result = parseAnimationJson(raw);

  if (!result) {
    messages.push({
      role: "user",
      content: `${RETRY_USER_MESSAGE} Previous response was invalid JSON.`,
    });
    raw = await chatCompletion(apiKey, model, messages);
    result = parseAnimationJson(raw);
  }

  if (!result) {
    throw new Error(
      "Could not parse animation JSON from Grok. Try Visualize again.",
    );
  }

  return result;
}
