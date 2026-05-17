import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getSheetQuestionById } from "@/data/questions";
import { PracticeWorkspace } from "@/components/practice/practice-workspace";

type Props = { params: Promise<{ questionId: string }> };

export default async function PracticeQuestionPage({ params }: Props) {
  const { questionId } = await params;
  const question = getSheetQuestionById(questionId);
  if (!question) notFound();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex items-center gap-3 border-b border-border bg-panel px-4 py-2 text-sm">
        <Link
          href="/practice"
          className="text-muted-foreground hover:text-foreground"
        >
          ← Practice sheet
        </Link>
        <span className="font-medium">{question.title}</span>
        <Link
          href={`/patterns/${question.patternSlug}`}
          className="ml-auto text-primary hover:underline"
        >
          Learn: {question.patternName}
        </Link>
      </div>
      <div className="min-h-0 flex-1">
        <Suspense fallback={<p className="p-4 text-sm">Loading workspace…</p>}>
          <PracticeWorkspace question={question} />
        </Suspense>
      </div>
    </div>
  );
}
