import type { Question } from "@/types/question";

export type QuestionDocument = Question & {
  createdAt: Date;
  updatedAt: Date;
};

export type AnswerDocument = {
  questionId: string;
  code: string;
  passed: boolean;
  language?: "javascript";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateQuestionInput = Omit<
  Question,
  "humanInput" | "progressiveHints" | "aiExplanation"
> & {
  humanInput?: string;
};

export type CreateAnswerInput = {
  questionId: string;
  code: string;
  passed?: boolean;
  language?: "javascript";
  notes?: string;
};
