import { getAllQuestions } from "@/data/questions";
import { upsertQuestions } from "@/lib/db/question-repository";
import { upsertReferenceAnswers } from "@/lib/db/answer-repository";
import { ensureIndexes } from "@/lib/db/ensure-indexes";

export type SyncMongoResult = {
  questions: number;
  answers: number;
};

export async function syncQuestionsAndAnswers(): Promise<SyncMongoResult> {
  await ensureIndexes();

  const questions = getAllQuestions();
  await upsertQuestions(questions);

  const referenceAnswers = questions
    .filter((q) => q.solutionCode?.trim())
    .map((q) => ({
      questionId: q.id,
      code: q.solutionCode.trim(),
    }));

  await upsertReferenceAnswers(referenceAnswers);

  return {
    questions: questions.length,
    answers: referenceAnswers.length,
  };
}

/** @deprecated Use syncQuestionsAndAnswers */
export async function seedQuestionsFromStaticData(): Promise<{ count: number }> {
  const result = await syncQuestionsAndAnswers();
  return { count: result.questions };
}
