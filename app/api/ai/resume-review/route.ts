import { NextResponse } from "next/server";
import { formatGroqError } from "@/lib/ai/groq-explain";
import { generateResumeReview } from "@/lib/ai/groq-resume-review";
import { EXPERIENCE_LEVELS } from "@/types/job-search";
import type { ExperienceLevel } from "@/types/job-search";

export const maxDuration = 60;

const MIN_RESUME_LENGTH = 200;
const MAX_RESUME_LENGTH = 20_000;

type Body = {
  resumeText?: string;
  jobTitle?: string;
  experienceLevel?: ExperienceLevel;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const resumeText = body.resumeText?.trim() ?? "";

    if (resumeText.length < MIN_RESUME_LENGTH) {
      return NextResponse.json(
        {
          error: `Resume text too short. Need at least ${MIN_RESUME_LENGTH} characters after extraction.`,
        },
        { status: 400 },
      );
    }

    if (resumeText.length > MAX_RESUME_LENGTH) {
      return NextResponse.json(
        { error: "Resume text exceeds maximum length." },
        { status: 400 },
      );
    }

    if (
      body.experienceLevel &&
      !EXPERIENCE_LEVELS.includes(body.experienceLevel)
    ) {
      return NextResponse.json(
        { error: "Invalid experience level." },
        { status: 400 },
      );
    }

    const result = await generateResumeReview({
      resumeText,
      jobTitle: body.jobTitle?.trim(),
      experienceLevel: body.experienceLevel,
    });

    return NextResponse.json(result);
  } catch (err) {
    const message = formatGroqError(err);
    console.error("[api/ai/resume-review] error");
    const status = message.includes("rate limit") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
