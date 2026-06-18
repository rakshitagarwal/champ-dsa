import { NextResponse } from "next/server";
import { isMongoConfigured } from "@/lib/db/mongodb";
import {
  createAnswer,
  listAnswersForQuestion,
} from "@/lib/db/answer-repository";
import type { CreateAnswerInput } from "@/types/db";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Set MONGODB_URI in .env.local." },
      { status: 503 },
    );
  }

  try {
    const { id } = await context.params;
    const answers = await listAnswersForQuestion(id);
    return NextResponse.json({ answers });
  } catch (err) {
    console.error("[api/questions/[id]/answers GET]", err);
    return NextResponse.json(
      { error: "Failed to load answers." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Set MONGODB_URI in .env.local." },
      { status: 503 },
    );
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as Omit<CreateAnswerInput, "questionId">;

    if (!body.code?.trim()) {
      return NextResponse.json({ error: "code is required." }, { status: 400 });
    }

    const answer = await createAnswer({
      questionId: id,
      code: body.code,
      passed: body.passed,
      language: body.language,
      notes: body.notes,
    });
    return NextResponse.json({ answer }, { status: 201 });
  } catch (err) {
    console.error("[api/questions/[id]/answers POST]", err);
    return NextResponse.json(
      { error: "Failed to save answer." },
      { status: 500 },
    );
  }
}
