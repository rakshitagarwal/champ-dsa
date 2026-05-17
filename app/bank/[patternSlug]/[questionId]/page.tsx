import { notFound } from "next/navigation";
import { getQuestionById } from "@/data/questions";
import { QuestionDetail } from "@/components/bank/question-detail";

type Props = {
  params: Promise<{ patternSlug: string; questionId: string }>;
};

export default async function QuestionPage({ params }: Props) {
  const { questionId } = await params;
  const question = getQuestionById(questionId);
  if (!question) notFound();
  return <QuestionDetail question={question} />;
}
