import { NextResponse } from "next/server";
import { formatGroqError } from "@/lib/ai/groq-explain";
import { generatePatternExplanation } from "@/lib/ai/groq-pattern-explain";
import { getPatternBySlug } from "@/data/patterns/index";

export const maxDuration = 60;

type Body = {
  slug?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const slug = body.slug?.trim() ?? "";

    if (!slug) {
      return NextResponse.json({ error: "Pattern slug is required." }, { status: 400 });
    }

    if (!getPatternBySlug(slug)) {
      return NextResponse.json({ error: "Unknown pattern." }, { status: 400 });
    }

    const result = await generatePatternExplanation(slug);
    return NextResponse.json(result);
  } catch (err) {
    const message = formatGroqError(err);
    console.error("[api/ai/explain-pattern] error");
    const status = message.includes("rate limit") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
