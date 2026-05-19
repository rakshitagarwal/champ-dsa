import Link from "next/link";
import { RoadmapGraph } from "@/components/learn/roadmap-graph";

export default function RoadmapPage() {
  return (
    <div className="w-full space-y-8 px-4 py-8 lg:px-10">
      <header className="max-w-3xl">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Learning roadmap
        </h1>
        <p className="mt-2 text-muted-foreground">
          Your main DSA path — from core array techniques through trees, DP, and
          graphs. Study each pattern, then practice. Need a quick refresh? Use{" "}
          <Link href="/patterns" className="text-primary hover:underline">
            pattern recap
          </Link>{" "}
          or{" "}
          <Link href="/notes" className="text-primary hover:underline">
            Notes
          </Link>
          .
        </p>
      </header>
      <RoadmapGraph />
    </div>
  );
}
