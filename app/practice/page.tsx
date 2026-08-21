import { getPracticeProblemCount } from "@/data/practice/leetcode-sheet";
import { SheetAccordion } from "@/components/practice/sheet-accordion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PracticePage() {
  const count = getPracticeProblemCount();

  return (
    <div className="w-full space-y-10 px-4 py-8 lg:px-10">
      <header className="max-w-4xl">
        <div className="mt-4">
          <Badge>Solve</Badge>
        </div>
        <h1 className="mt-3 text-4xl font-bold">LeetCode sheet ({count})</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Popular interview problems, grouped like the DSA pattern notes. Open a
          problem on LeetCode. For how the pattern works — with JS examples —
          use{" "}
          <Link href="/patterns" className="text-primary hover:underline">
            DSA Patterns
          </Link>
          .
        </p>
      </header>

      <SheetAccordion />
    </div>
  );
}
