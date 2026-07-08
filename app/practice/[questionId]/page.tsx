import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSheetQuestionById, getSheetQuestions } from "@/data/questions";
import { SolutionView } from "@/components/practice/solution-view";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ questionId: string }> };

export default async function PracticeQuestionPage({ params }: Props) {
  const { questionId } = await params;
  const question = getSheetQuestionById(questionId);
  if (!question) notFound();

  const allQuestions = getSheetQuestions();
  const idx = allQuestions.findIndex((q) => q.id === questionId);
  const prev = idx > 0 ? allQuestions[idx - 1] : null;
  const next = idx < allQuestions.length - 1 ? allQuestions[idx + 1] : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <header className="shrink-0 border-b border-border bg-background">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-sm">
          <Link
            href="/practice"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Practice sheet
          </Link>
          <span className="hidden text-muted-foreground sm:inline">/</span>
          <span className="font-medium">{question.title}</span>
          <div className="ml-auto flex items-center gap-1">
            {prev ? (
              <Link
                href={`/practice/${prev.id}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-1",
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden md:inline max-w-[120px] truncate">
                  {prev.title}
                </span>
                <span className="md:hidden">Prev</span>
              </Link>
            ) : (
              <span
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-1 pointer-events-none opacity-40",
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </span>
            )}
            {next ? (
              <Link
                href={`/practice/${next.id}`}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-1",
                )}
              >
                <span className="hidden md:inline max-w-[120px] truncate">
                  {next.title}
                </span>
                <span className="md:hidden">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-1 pointer-events-none opacity-40",
                )}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden">
        <SolutionView question={question} />
      </div>
    </div>
  );
}
