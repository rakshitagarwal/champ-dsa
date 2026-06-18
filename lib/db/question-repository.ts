import type { Question } from "@/types/question";
import type { CreateQuestionInput, QuestionDocument } from "@/types/db";
import { getDb } from "@/lib/db/mongodb";
import { COLLECTIONS } from "@/lib/db/collections";
import { ensureIndexes } from "@/lib/db/ensure-indexes";

function toQuestion(doc: QuestionDocument): Question {
  const { createdAt, updatedAt, ...question } = doc;
  void createdAt;
  void updatedAt;
  return question;
}

export async function listQuestions(): Promise<Question[]> {
  await ensureIndexes();
  const db = await getDb();
  const docs = await db
    .collection<QuestionDocument>(COLLECTIONS.questions)
    .find()
    .sort({ sheetNumber: 1, title: 1 })
    .toArray();
  return docs.map(toQuestion);
}

export async function findQuestionById(id: string): Promise<Question | null> {
  await ensureIndexes();
  const db = await getDb();
  const doc = await db
    .collection<QuestionDocument>(COLLECTIONS.questions)
    .findOne({ id });
  return doc ? toQuestion(doc) : null;
}

export async function createQuestion(
  input: CreateQuestionInput,
): Promise<Question> {
  await ensureIndexes();
  const now = new Date();
  const doc: QuestionDocument = {
    ...input,
    humanInput: input.humanInput ?? "",
    createdAt: now,
    updatedAt: now,
  };
  const db = await getDb();
  await db.collection<QuestionDocument>(COLLECTIONS.questions).insertOne(doc);
  return toQuestion(doc);
}

export async function updateQuestion(
  id: string,
  patch: Partial<CreateQuestionInput>,
): Promise<Question | null> {
  await ensureIndexes();
  const db = await getDb();
  const result = await db
    .collection<QuestionDocument>(COLLECTIONS.questions)
    .findOneAndUpdate(
      { id },
      { $set: { ...patch, updatedAt: new Date() } },
      { returnDocument: "after" },
    );
  return result ? toQuestion(result) : null;
}

export async function deleteQuestion(id: string): Promise<boolean> {
  await ensureIndexes();
  const db = await getDb();
  const result = await db
    .collection<QuestionDocument>(COLLECTIONS.questions)
    .deleteOne({ id });
  return result.deletedCount === 1;
}

export async function upsertQuestions(questions: Question[]): Promise<number> {
  await ensureIndexes();
  const db = await getDb();
  const now = new Date();
  const ops = questions.map((question) => ({
    updateOne: {
      filter: { id: question.id },
      update: {
        $set: { ...question, updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      upsert: true,
    },
  }));
  if (ops.length === 0) return 0;
  const result = await db
    .collection<QuestionDocument>(COLLECTIONS.questions)
    .bulkWrite(ops, { ordered: false });
  return result.upsertedCount + result.modifiedCount + result.matchedCount;
}
