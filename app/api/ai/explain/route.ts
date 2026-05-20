import { NextResponse } from "next/server";
import {
  formatGroqError,
  generateAiExplanation,
} from "@/lib/ai/groq-explain";

export const maxDuration = 60;

type Body = {
  title: string;
  statement: string;
  patternName: string;
  constraints?: string[];
  examples: { input: string; output: string }[];
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

    if (!body.title || !body.patternName) {
      return NextResponse.json(
        { error: "Problem metadata is required." },
        { status: 400 },
      );
    }

    if (!body.examples?.length || body.examples.length < 2) {
      return NextResponse.json(
        { error: "At least two passing examples are required." },
        { status: 400 },
      );
    }

    const explanation = await generateAiExplanation({
      title: body.title,
      statement: body.statement ?? "",
      patternName: body.patternName,
      constraints: body.constraints,
      examples: body.examples,
      code: body.code,
    });

    return NextResponse.json(explanation);
  } catch (err) {
    const message = formatGroqError(err);
    console.error("[api/ai/explain]", err);
    const status = message.includes("rate limit") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
