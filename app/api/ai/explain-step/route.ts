import { NextResponse } from "next/server";
import { formatGroqError } from "@/lib/ai/groq-explain";
import { generateStepExplanation } from "@/lib/ai/groq-explain-step";
import type { StepViz } from "@/types/execution";

export const maxDuration = 30;

type Body = {
  problemTitle: string;
  patternName: string;
  line: number;
  lineSnippet?: string | null;
  stepSummary: string;
  stepIndex: number;
  vizSnapshot?: StepViz;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;

    if (!body.problemTitle || !body.patternName) {
      return NextResponse.json(
        { error: "Problem metadata is required." },
        { status: 400 },
      );
    }

    if (!body.stepSummary?.trim()) {
      return NextResponse.json(
        { error: "Step summary is required." },
        { status: 400 },
      );
    }

    const explanation = await generateStepExplanation({
      problemTitle: body.problemTitle,
      patternName: body.patternName,
      line: body.line ?? 0,
      lineSnippet: body.lineSnippet ?? null,
      stepSummary: body.stepSummary,
      stepIndex: body.stepIndex ?? 0,
      vizSnapshot: body.vizSnapshot,
    });

    return NextResponse.json({ explanation });
  } catch (err) {
    const message = formatGroqError(err);
    console.error("[api/ai/explain-step]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
