import Link from "next/link";
import { notFound } from "next/navigation";
import { getPatternBySlug } from "@/data/patterns";
import { getQuestionsByPatternSlug } from "@/data/questions";
import { PracticeQuestionRow } from "@/components/bank/practice-question-row";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export default async function PatternPracticePage({ params }: Props) {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  if (!pattern) notFound();

  const questions = getQuestionsByPatternSlug(slug);
  const f = pattern.fundamentals;

  return (
    <div className="w-full space-y-10 px-4 py-8 lg:px-10">
      <header className="max-w-4xl">
        <Link
          href="/bank"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Question Bank
        </Link>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{pattern.category}</Badge>
          <Link
            href={`/bank/patterns/${slug}/concept`}
            className="text-sm text-primary hover:underline"
          >
            ← Back to fundamentals
          </Link>
        </div>
        <h1 className="mt-3 text-4xl font-bold">{pattern.name} — Practice</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          {pattern.summary}
        </p>
      </header>

      <section className="rounded-xl border border-primary/20 bg-primary/5 p-6 lg:p-8">
        <h2 className="text-lg font-semibold">Before you practice</h2>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {f.intuition} Each problem below includes plain hints so you know why
          it fits this pattern. Click Solve on any problem — run your code on
          the fixed example input, then step through the visualization below
          your editor.
        </p>
        <Link
          href={`/bank/patterns/${slug}/concept`}
          className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        >
          Re-read the full lesson →
        </Link>
      </section>

      {questions.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {questions.length} problem{questions.length === 1 ? "" : "s"} for
            this pattern
          </p>
          {questions.map((q) => (
            <PracticeQuestionRow key={q.id} question={q} />
          ))}
        </div>
      ) : (
        <section className="rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-lg text-muted-foreground">
            We are still adding practice problems for this pattern.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            For now, animate the teaching example to build intuition.
          </p>
          <Link
            href={`/bank/patterns/${slug}/concept`}
            className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Read pattern lesson
          </Link>
        </section>
      )}
    </div>
  );
}
