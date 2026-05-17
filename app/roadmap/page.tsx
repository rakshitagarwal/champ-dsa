import Link from "next/link";
import { RoadmapGraph } from "@/components/learn/roadmap-graph";

export default function RoadmapPage() {
  return (
    <div className="w-full space-y-8 px-4 py-8 lg:px-10">
      <header className="max-w-3xl">
        <Link
          href="/patterns"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Patterns
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Learning roadmap
        </h1>
        <p className="mt-2 text-muted-foreground">
          Follow this path from core array techniques through trees, DP, and
          graphs. Complete prerequisites to unlock each step.
        </p>
      </header>
      <RoadmapGraph />
    </div>
  );
}
