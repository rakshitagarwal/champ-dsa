import { formatGroqError } from "@/lib/ai/groq-explain";
import { generateGroqAnimation } from "@/lib/ai/groq-animation";
import {
  formatGrokError,
  generateGrokAnimation,
} from "@/lib/ai/grok-animation";
import type { AiAnimationResult } from "@/types/ai-animation";

export type AnimationProvider = "grok" | "groq" | "none";

export function getAnimationProvider(): AnimationProvider {
  if (process.env.GROK_API_KEY?.trim()) return "grok";
  if (process.env.GROQ_API_KEY?.trim()) return "groq";
  return "none";
}

export function formatAnimationError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (
    raw.includes("GROQ") ||
    raw.includes("Groq") ||
    (getAnimationProvider() === "groq" && !raw.includes("GROK"))
  ) {
    return formatGroqError(err);
  }
  return formatGrokError(err);
}

/** Prefer Grok (x.ai); fall back to Groq when GROK_API_KEY is unset. */
export async function generateAnimation(
  code: string,
): Promise<AiAnimationResult> {
  const provider = getAnimationProvider();
  if (provider === "grok") {
    return generateGrokAnimation(code);
  }
  if (provider === "groq") {
    return generateGroqAnimation(code);
  }
  throw new Error(
    "No AI provider for animation. Set GROK_API_KEY (https://console.x.ai/) or GROQ_API_KEY (https://console.groq.com/keys) in .env.local, then restart the dev server.",
  );
}
