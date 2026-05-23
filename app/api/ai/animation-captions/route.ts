import { NextResponse } from "next/server";
import {
  generateAnimationCaptions,
  type AnimationCaptionsRequest,
} from "@/lib/ai/groq-animation-captions";
import { formatGroqError } from "@/lib/ai/groq-explain";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnimationCaptionsRequest;

    if (!body.title || !body.patternName) {
      return NextResponse.json(
        { error: "Problem metadata is required." },
        { status: 400 },
      );
    }

    if (!body.steps?.length) {
      return NextResponse.json(
        { error: "At least one step is required." },
        { status: 400 },
      );
    }

    const captions = await generateAnimationCaptions({
      ...body,
      steps: body.steps.slice(0, 12),
    });

    return NextResponse.json({ captions });
  } catch (err) {
    const message = formatGroqError(err);
    console.error("[api/ai/animation-captions]", err);
    const status = message.includes("rate limit") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
