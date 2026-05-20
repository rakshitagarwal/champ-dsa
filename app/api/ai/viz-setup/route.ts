import { NextResponse } from "next/server";
import { formatGroqError } from "@/lib/ai/groq-explain";
import { generateVizProfile } from "@/lib/ai/groq-viz-profile";
import type { TraceSummary } from "@/types/viz-profile";

export const maxDuration = 30;

type Body = {
  code: string;
  problemTitle?: string;
  patternName?: string;
  stdin?: string;
  traceSummary: TraceSummary;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;

    if (!body.code?.trim()) {
      return NextResponse.json({ error: "Code is required." }, { status: 400 });
    }

    if (!body.traceSummary?.variableNames) {
      return NextResponse.json(
        { error: "Trace summary is required." },
        { status: 400 },
      );
    }

    const { profile, source } = await generateVizProfile({
      code: body.code,
      problemTitle: body.problemTitle,
      patternName: body.patternName,
      stdin: body.stdin,
      traceSummary: body.traceSummary,
    });

    return NextResponse.json({ profile, source });
  } catch (err) {
    const message = formatGroqError(err);
    console.error("[api/ai/viz-setup]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
