import { NextResponse } from "next/server";
import { isMongoConfigured } from "@/lib/db/mongodb";
import {
  createQuestion,
  listQuestions,
} from "@/lib/db/question-repository";
import type { CreateQuestionInput } from "@/types/db";

export async function GET() {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Set MONGODB_URI in .env.local." },
      { status: 503 },
    );
  }

  try {
    const questions = await listQuestions();
    return NextResponse.json({ questions });
  } catch (err) {
    console.error("[api/questions GET]", err);
    return NextResponse.json(
      { error: "Failed to load questions from MongoDB." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Set MONGODB_URI in .env.local." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as CreateQuestionInput;
    if (!body.id?.trim() || !body.title?.trim() || !body.starterCode?.trim()) {
      return NextResponse.json(
        { error: "id, title, and starterCode are required." },
        { status: 400 },
      );
    }

    const question = await createQuestion({
      ...body,
      patternSlug: body.patternSlug ?? "misc",
      patternName: body.patternName ?? "Misc",
      difficulty: body.difficulty ?? "medium",
      statement: body.statement ?? "",
      patternHints: body.patternHints ?? [],
      solutionCode: body.solutionCode ?? body.starterCode,
      sampleInput: body.sampleInput ?? "",
    });
    return NextResponse.json({ question }, { status: 201 });
  } catch (err) {
    console.error("[api/questions POST]", err);
    const message =
      err instanceof Error && err.message.includes("E11000")
        ? "A question with this id already exists."
        : "Failed to save question.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
