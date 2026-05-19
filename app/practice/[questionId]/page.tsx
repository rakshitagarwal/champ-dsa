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
    <div className="w-full pb-10">
      <header className="border-b border-border bg-background">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-sm">
          <Link
            href="/practice"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Practice sheet
          </Link>
          <span className="hidden text-muted-foreground sm:inline">/</span>
          <span className="font-medium">{question.title}</span>
          <Link
            href={`/patterns/${question.patternSlug}`}
            className="ml-auto text-primary hover:underline"
          >
            Learn: {question.patternName}
          </Link>
        </div>
      </header>

      <Suspense fallback={<p className="p-4 text-sm">Loading workspace…</p>}>
        <PracticeWorkspace question={question} />
      </Suspense>
    </div>
  );
}
