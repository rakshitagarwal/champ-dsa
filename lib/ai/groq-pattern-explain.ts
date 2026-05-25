import { generateGroqJson } from "@/lib/ai/groq-json-chat";
import { formatGroqError } from "@/lib/ai/groq-explain";
import {
  buildPatternExplainPrompt,
  parsePatternExplainJson,
  PATTERN_EXPLAIN_SYSTEM,
} from "@/lib/ai/pattern-explain-shared";
import type { PatternAiExplanation } from "@/types/pattern-ai-explain";

export async function generatePatternExplanation(
  slug: string,
): Promise<PatternAiExplanation> {
  try {
    return await generateGroqJson(
      {
        systemPrompt: PATTERN_EXPLAIN_SYSTEM,
        userPrompt: buildPatternExplainPrompt(slug),
        temperature: 0.4,
        maxTokens: 4096,
      },
      parsePatternExplainJson,
    );
  } catch (err) {
    throw new Error(formatGroqError(err));
  }
}
