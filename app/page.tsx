import Link from "next/link";
import { BookOpen, Code2, PenLine, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        Understand WHY — not memorize solutions
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Learn DSA with{" "}
        <span className="text-primary">step-by-step visualization</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        ChampDSA helps you see variables, pointers, and recursion unfold — then
        revise by pattern with spaced repetition.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/visualizer"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Code2 className="h-4 w-4" />
          Open Visualizer
        </Link>
        <Link
          href="/learn"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-6 text-sm font-medium hover:bg-accent"
        >
          <BookOpen className="h-4 w-4" />
          Learn Patterns
        </Link>
        <Link
          href="/practice"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-6 text-sm font-medium hover:bg-accent"
        >
          <PenLine className="h-4 w-4" />
          Practice Sheet
        </Link>
      </div>
      <div className="mt-16 grid w-full gap-6 text-left sm:grid-cols-2">
        <Feature
          title="DSA Visualizer"
          body="Write JavaScript, run step-by-step, and watch arrays, variables, stack frames, and recursion trees update live."
        />
        <Feature
          title="Learn then practice"
          body="Study patterns on Learn, then solve the full DSA sheet on Practice with step-by-step animation and optional solutions."
        />
      </div>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
