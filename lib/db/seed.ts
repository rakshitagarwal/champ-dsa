import { getAllQuestions } from "@/data/questions";
import { upsertQuestions } from "@/lib/db/question-repository";
import { ensureIndexes } from "@/lib/db/ensure-indexes";

export async function seedQuestionsFromStaticData(): Promise<{
  count: number;
}> {
  await ensureIndexes();
  const questions = getAllQuestions();
  await upsertQuestions(questions);
  return { count: questions.length };
}
