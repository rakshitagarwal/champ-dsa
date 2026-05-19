import Link from "next/link";
import { PatternStats } from "@/components/bank/pattern-stats";
import { PatternList } from "@/components/learn/pattern-list";

export default function PatternsPage() {
  return (
    <div className="w-full space-y-8 px-4 py-8 lg:px-10">
      <header className="max-w-4xl">
        <p className="text-sm text-muted-foreground">
          Recap lane —{" "}
          <Link href="/roadmap" className="font-medium text-primary hover:underline">
            Main learning path (roadmap)
          </Link>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
          Learn DSA patterns
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Structured lessons with clear overviews, when to use each technique,
          step-by-step approaches, and reference code — similar to visual
          interview prep guides. New to the sheet? Start on the{" "}
          <Link href="/roadmap" className="font-medium text-primary hover:underline">
            roadmap
          </Link>
          , then practice on the{" "}
          <Link href="/practice" className="font-medium text-primary hover:underline">
            practice sheet
          </Link>
          .
        </p>
      </header>

      <PatternStats />
      <PatternList />
    </div>
  );
}
