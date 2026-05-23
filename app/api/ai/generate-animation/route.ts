import { NextResponse } from "next/server";
import {
  formatAnimationError,
  generateAnimation,
  getAnimationProvider,
} from "@/lib/ai/generate-animation";

export const maxDuration = 60;

type Body = {
  code: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;

    if (!body.code?.trim()) {
      return NextResponse.json(
        { error: "Code is required." },
        { status: 400 },
      );
    }

    const provider = getAnimationProvider();
    if (provider === "none") {
      return NextResponse.json(
        {
          error:
            "No AI provider configured. Set GROK_API_KEY or GROQ_API_KEY in .env.local and restart the dev server.",
        },
        { status: 503 },
      );
    }

    const animation = await generateAnimation(body.code.trim());
    return NextResponse.json({ ...animation, provider });
  } catch (err) {
    const message = formatAnimationError(err);
    if (!message.includes("rate limit")) {
      console.error("[api/ai/generate-animation]", err);
    }
    const status = message.includes("rate limit") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
