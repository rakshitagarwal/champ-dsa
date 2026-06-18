import { NextResponse } from "next/server";
import { isMongoConfigured } from "@/lib/db/mongodb";
import {
  deleteQuestion,
  findQuestionById,
  updateQuestion,
} from "@/lib/db/question-repository";
import type { CreateQuestionInput } from "@/types/db";

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
    const question = await findQuestionById(id);
    if (!question) {
      return NextResponse.json({ error: "Question not found." }, { status: 404 });
    }
    return NextResponse.json({ question });
  } catch (err) {
    console.error("[api/questions/[id] GET]", err);
    return NextResponse.json(
      { error: "Failed to load question." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Set MONGODB_URI in .env.local." },
      { status: 503 },
    );
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<CreateQuestionInput>;
    const question = await updateQuestion(id, body);
    if (!question) {
      return NextResponse.json({ error: "Question not found." }, { status: 404 });
    }
    return NextResponse.json({ question });
  } catch (err) {
    console.error("[api/questions/[id] PATCH]", err);
    return NextResponse.json(
      { error: "Failed to update question." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured. Set MONGODB_URI in .env.local." },
      { status: 503 },
    );
  }

  try {
    const { id } = await context.params;
    const deleted = await deleteQuestion(id);
    if (!deleted) {
      return NextResponse.json({ error: "Question not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/questions/[id] DELETE]", err);
    return NextResponse.json(
      { error: "Failed to delete question." },
      { status: 500 },
    );
  }
}
