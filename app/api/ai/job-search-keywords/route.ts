import { NextResponse } from "next/server";
import { formatGroqError } from "@/lib/ai/groq-explain";
import { generateJobSearchKeywords } from "@/lib/ai/groq-job-keywords";
import { EXPERIENCE_LEVELS } from "@/types/job-search";
import type { ExperienceLevel } from "@/types/job-search";

export const maxDuration = 45;

type Body = {
  resumeText?: string;
  jobTitle?: string;
  experienceLevel?: ExperienceLevel;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const resumeText = body.resumeText?.trim() ?? "";
    const jobTitle = body.jobTitle?.trim() ?? "";

    if (!jobTitle) {
      return NextResponse.json(
        { error: "Job title is required." },
        { status: 400 },
      );
    }

    if (resumeText.length < 200) {
      return NextResponse.json(
        { error: "Resume text too short for keyword extraction." },
        { status: 400 },
      );
    }

    if (
      !body.experienceLevel ||
      !EXPERIENCE_LEVELS.includes(body.experienceLevel)
    ) {
      return NextResponse.json(
        { error: "Valid experience level is required." },
        { status: 400 },
      );
    }

    const keywords = await generateJobSearchKeywords({
      resumeText,
      jobTitle,
      experienceLevel: body.experienceLevel,
    });

    return NextResponse.json(keywords);
  } catch (err) {
    const message = formatGroqError(err);
    console.error("[api/ai/job-search-keywords] error");
    const status = message.includes("rate limit") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
