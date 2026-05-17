import { notFound } from "next/navigation";
import { getSheetQuestionById } from "@/data/questions";
import { QuestionDetail } from "@/components/bank/question-detail";

type Props = { params: Promise<{ questionId: string }> };

export default async function PracticeNotesPage({ params }: Props) {
  const { questionId } = await params;
  const question = getSheetQuestionById(questionId);
  if (!question) notFound();
  return <QuestionDetail question={question} />;
}
