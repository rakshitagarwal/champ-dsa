import type { AnswerDocument, CreateAnswerInput } from "@/types/db";
import { getDb } from "@/lib/db/mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { ensureIndexes } from "@/lib/db/ensure-indexes";

export type Answer = Omit<AnswerDocument, "createdAt" | "updatedAt"> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

function toAnswer(doc: AnswerDocument & { _id: { toString(): string } }): Answer {
  return {
    id: doc._id.toString(),
    questionId: doc.questionId,
    code: doc.code,
    passed: doc.passed,
    language: doc.language,
    notes: doc.notes,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function listAnswersForQuestion(
  questionId: string,
): Promise<Answer[]> {
  await ensureIndexes();
  const db = await getDb();
  const docs = await db
    .collection<AnswerDocument>(COLLECTIONS.answers)
    .find({ questionId })
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map((doc) =>
    toAnswer(doc as AnswerDocument & { _id: { toString(): string } }),
  );
}

export async function createAnswer(input: CreateAnswerInput): Promise<Answer> {
  await ensureIndexes();
  const now = new Date();
  const doc: AnswerDocument = {
    questionId: input.questionId,
    code: input.code,
    passed: input.passed ?? false,
    language: input.language ?? "javascript",
    notes: input.notes,
    createdAt: now,
    updatedAt: now,
  };
  const db = await getDb();
  const result = await db
    .collection<AnswerDocument>(COLLECTIONS.answers)
    .insertOne(doc);
  return toAnswer({
    ...doc,
    _id: result.insertedId,
  } as AnswerDocument & { _id: { toString(): string } });
}

export async function findLatestAnswer(
  questionId: string,
): Promise<Answer | null> {
  const answers = await listAnswersForQuestion(questionId);
  return answers[0] ?? null;
}
