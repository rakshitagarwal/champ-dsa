"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import type { RoadmapNode } from "@/data/roadmap";
import { getPatternBySlug } from "@/data/patterns";
import { getPatternMastery, isPatternDone } from "@/lib/storage/learning-store";
import { getQuestionsByPattern } from "@/lib/learning/pattern-questions";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  node: RoadmapNode;
  locked: boolean;
};

export function RoadmapNodeCard({ node, locked }: Props) {
  const pattern = getPatternBySlug(node.slug);
  const qIds = getQuestionsByPattern()[node.slug] ?? [];
  const mastery = getPatternMastery(node.slug, qIds);
  const done = isPatternDone(node.slug);

  if (!pattern) return null;

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-card p-4 transition-shadow",
        locked ? "opacity-60" : "hover:shadow-md",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{pattern.name}</h3>
            {locked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{pattern.summary}</p>
        </div>
        <Badge variant="secondary">{node.difficulty}</Badge>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span>{node.estimatedMinutes} min</span>
        {done && <span className="text-primary">Concept done</span>}
        <span>{mastery}% mastery</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${mastery}%` }}
        />
      </div>
      {!locked && (
        <Link
          href={`/patterns/${node.slug}`}
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          Study pattern →
        </Link>
      )}
    </div>
  );
}
