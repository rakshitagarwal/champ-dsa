import Link from "next/link";
import { getAllJsNoteTopics } from "@/data/js-notes";

export default function JsNotesPage() {
  const topics = getAllJsNoteTopics();
  const first = topics[0];

  return (
    <div className="w-full px-4 py-8 lg:px-8 xl:px-10">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          JavaScript notes
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
          Recap lane for JavaScript fundamentals — pick a topic from the left
          panel to read explanations and examples. Building interview skills?{" "}
          <Link href="/roadmap" className="font-medium text-primary hover:underline">
            Start with the DSA roadmap
          </Link>
          .
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">How to use this section</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">1.</strong> Choose a topic in
              the sidebar — order is beginner-friendly.
            </li>
            <li>
              <strong className="text-foreground">2.</strong> Read the simple
              explanation, then the deeper notes and examples.
            </li>
            <li>
              <strong className="text-foreground">3.</strong> Try the “explain
              to someone else” bullets — that is when it really sticks.
            </li>
          </ul>
        </div>
        {first ? (
          <Link
            href={`/js-notes/${first.slug}`}
            className="flex flex-col justify-center rounded-xl border border-primary/30 bg-primary/5 p-6 transition-colors hover:bg-primary/10"
          >
            <p className="text-sm font-medium text-primary">Start here</p>
            <p className="mt-2 text-xl font-semibold">{first.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{first.summary}</p>
          </Link>
        ) : null}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        {topics.length} topics across fundamentals, functions, async, browser,
        and OOP.
      </p>
    </div>
  );
}
