import Link from "next/link";
import { CheatsheetView } from "@/components/cheatsheet/cheatsheet-view";

export default function CheatsheetPage() {
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
          DSA complexity cheat sheet
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Time and space complexity for sorting, searching, graphs, trees, and
          more. Search or filter by topic when you need a quick refresh before
          interviews or practice.
        </p>
      </header>

      <CheatsheetView />
    </div>
  );
}
