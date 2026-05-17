import Link from "next/link";
import { getSheetQuestions } from "@/data/questions";
import { SheetAccordion } from "@/components/practice/sheet-accordion";
import { Badge } from "@/components/ui/badge";

export default function PracticePage() {
  const count = getSheetQuestions().length;

  return (
    <div className="w-full space-y-10 px-4 py-8 lg:px-10">
      <header className="max-w-4xl">
        <Link
          href="/learn"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Learn patterns
        </Link>
        <div className="mt-4">
          <Badge>DSA Sheet</Badge>
        </div>
        <h1 className="mt-3 text-4xl font-bold">Practice ({count} problems)</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Solve problems in sheet order. Each opens with an empty{" "}
          <code className="rounded bg-muted px-1">solve</code> function — use{" "}
          <strong>Run</strong> and <strong>Next</strong> to animate your code, or
          reveal the <strong>Solution</strong> when you are stuck.
        </p>
      </header>

      <SheetAccordion />
    </div>
  );
}
