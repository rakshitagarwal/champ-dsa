import { getSheetQuestions } from "@/data/questions";
import { SheetAccordion } from "@/components/practice/sheet-accordion";
import { Badge } from "@/components/ui/badge";

export default function PracticePage() {
  const count = getSheetQuestions().length;

  return (
    <div className="w-full space-y-10 px-4 py-8 lg:px-10">
      <header className="max-w-4xl">
        <div className="mt-4">
          <Badge>Practice</Badge>
        </div>
        <h1 className="mt-3 text-4xl font-bold">Practice ({count} problems)</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Study solutions for all 211 problems. Each page shows the problem, a
          reference solution, and a breakdown of the DSA pattern used.
        </p>
      </header>

      <SheetAccordion />
    </div>
  );
}
