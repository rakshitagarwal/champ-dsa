import Link from "next/link";
import { PatternStats } from "@/components/bank/pattern-stats";
import { PatternList } from "@/components/learn/pattern-list";

export default function PatternsPage() {
  return (
    <div className="w-full space-y-8 px-4 py-8 lg:px-10">
      <header className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          DSA Patterns
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Study each technique in plain English — intuition, when to use it, and
          a small example. When you are ready to solve problems, go to{" "}
          <Link href="/practice" className="font-medium text-primary hover:underline">
            Practice
          </Link>
          . For a guided path, see the{" "}
          <Link href="/roadmap" className="font-medium text-primary hover:underline">
            Roadmap
          </Link>
          .
        </p>
      </header>

      <PatternStats />
      <PatternList />
    </div>
  );
}
