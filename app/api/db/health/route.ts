import { NextResponse } from "next/server";
import { isMongoConfigured } from "@/lib/db/mongodb";
import { syncQuestionsAndAnswers } from "@/lib/db/sync";

export async function GET() {
  if (!isMongoConfigured()) {
    return NextResponse.json(
      { ok: false, error: "MongoDB is not configured." },
      { status: 503 },
    );
  }

  try {
    const client = await import("@/lib/db/mongodb").then((m) => m.default());
    await client.db().admin().ping();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/db/health]", err);
    return NextResponse.json(
      { ok: false, error: "MongoDB connection failed." },
      { status: 503 },
    );
  }
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production." }, { status: 403 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { error: "MongoDB is not configured." },
      { status: 503 },
    );
  }

  try {
    const result = await syncQuestionsAndAnswers();
    return NextResponse.json({
      ok: true,
      message: `Synced ${result.questions} questions and ${result.answers} reference answers into MongoDB.`,
      ...result,
    });
  } catch (err) {
    console.error("[api/db/seed]", err);
    return NextResponse.json(
      { error: "Failed to seed MongoDB." },
      { status: 500 },
    );
  }
}
