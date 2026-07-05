import { redirect } from "next/navigation";
import { getAllPatterns } from "@/data/patterns";

export default function PatternsPage() {
  const patterns = getAllPatterns();
  if (patterns.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">DSA Patterns</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          No patterns available yet.
        </p>
      </div>
    );
  }
  redirect(`/patterns/${patterns[0].slug}`);
}
