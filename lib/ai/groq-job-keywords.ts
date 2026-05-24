import { generateGroqJson } from "@/lib/ai/groq-json-chat";
import { formatGroqError } from "@/lib/ai/groq-explain";
import {
  buildJobKeywordsPrompt,
  JOB_KEYWORDS_SYSTEM,
  parseJobKeywordsJson,
  type JobKeywordsRequest,
} from "@/lib/ai/job-keywords-shared";
import type { JobSearchKeywords } from "@/types/job-search";

export async function generateJobSearchKeywords(
  req: JobKeywordsRequest,
): Promise<JobSearchKeywords> {
  try {
    return await generateGroqJson(
      {
        systemPrompt: JOB_KEYWORDS_SYSTEM,
        userPrompt: buildJobKeywordsPrompt(req),
        temperature: 0.3,
        maxTokens: 2048,
      },
      parseJobKeywordsJson,
    );
  } catch (err) {
    throw new Error(formatGroqError(err));
  }
}
