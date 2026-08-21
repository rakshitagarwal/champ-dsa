import { generateGroqJson } from "@/lib/ai/groq-json-chat";
import { formatGroqError } from "@/lib/ai/groq-explain";
import {
  buildResumeReviewPrompt,
  parseResumeReviewJson,
  RESUME_REVIEW_SYSTEM,
} from "@/lib/ai/resume-shared";
import type {
  ResumeReviewRequest,
  ResumeReviewResult,
} from "@/types/resume-review";

export async function generateResumeReview(
  req: ResumeReviewRequest,
): Promise<ResumeReviewResult> {
  try {
    return await generateGroqJson(
      {
        systemPrompt: RESUME_REVIEW_SYSTEM,
        userPrompt: buildResumeReviewPrompt(req),
        temperature: 0.35,
        // Groq free/on_demand TPM for gpt-oss is 8k and counts input + max_tokens.
        // 8192 reserved output tokens alone already exceeds that cap.
        maxTokens: 2048,
      },
      parseResumeReviewJson,
    );
  } catch (err) {
    throw new Error(formatGroqError(err));
  }
}
