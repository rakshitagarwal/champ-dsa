"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { RoadmapNode, RoadmapPhase } from "@/types/dsa-sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  countLeaves,
  countPhaseSubtopics,
} from "@/lib/dsa-sheet/roadmap-utils";
import { cn } from "@/lib/utils";

type Props = {
  phase: RoadmapPhase;
  phases: RoadmapPhase[];
};

function cleanTopicTitle(title: string) {
  return title.replace(/^\d+\.\s*/, "");
}

function SubtopicList({ nodes, depth = 0 }: { nodes: RoadmapNode[]; depth?: number }) {
  return (
    <ul className={cn("space-y-1", depth > 0 && "mt-2 border-l border-border/70 pl-3")}>
      {nodes.map((node) => (
        <li key={node.id}>
          <div
            className={cn(
              "rounded-md px-2.5 py-1.5 text-sm",
              node.children?.length
                ? "font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            {node.title}
          </div>
          {node.children?.length ? (
            <SubtopicList nodes={node.children} depth={depth + 1} />
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function DsaSheetPhaseView({ phase, phases }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const topicFromUrl = searchParams.get("topic");
  const [openTopic, setOpenTopic] = useState<string | null>(
    topicFromUrl && phase.topics.some((t) => t.id === topicFromUrl)
      ? topicFromUrl
      : phase.topics[0]?.id ?? null,
  );

  useEffect(() => {
    if (topicFromUrl && phase.topics.some((t) => t.id === topicFromUrl)) {
      setOpenTopic(topicFromUrl);
      requestAnimationFrame(() => {
        document.getElementById(topicFromUrl)?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      });
    }
  }, [topicFromUrl, phase.topics]);

  function handleOpenChange(id: string | null) {
    setOpenTopic(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("topic", id);
    else params.delete("topic");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const phaseIndex = phases.findIndex((p) => p.id === phase.id);
  const prev = phaseIndex > 0 ? phases[phaseIndex - 1] : null;
  const next =
    phaseIndex >= 0 && phaseIndex < phases.length - 1
      ? phases[phaseIndex + 1]
      : null;

  return (
    <div className="w-full min-w-0 px-4 py-8 sm:px-5 lg:px-8">
      <div className="mb-6">
        <Link
          href="/dsa-sheet"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-3.5" />
          All phases
        </Link>
      </div>

      <header className="mb-8 max-w-3xl space-y-3 border-b border-border pb-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Phase {phase.phase}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {phase.title}
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {phase.description}
        </p>
        <p className="text-sm text-muted-foreground">
          {phase.topics.length} topics · {countPhaseSubtopics(phase)} subtopics
          — click a topic to expand its list
        </p>
      </header>

      <Accordion
        open={openTopic}
        onOpenChange={handleOpenChange}
        className="mx-auto max-w-3xl space-y-2"
      >
        {phase.topics.map((topic, index) => {
          const leaves = countLeaves(topic);
          return (
            <AccordionItem
              key={topic.id}
              id={topic.id}
              className="rounded-xl border-border/80 bg-background/60"
            >
              <AccordionTrigger id={topic.id} className="px-4 py-3.5 sm:px-5">
                <span className="flex min-w-0 flex-1 items-baseline gap-3">
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {index + 1}.
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block font-semibold tracking-tight">
                      {cleanTopicTitle(topic.title)}
                    </span>
                    <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                      {leaves} subtopic{leaves === 1 ? "" : "s"}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent id={topic.id} className="px-4 pb-4 pt-1 sm:px-5">
                {topic.children?.length ? (
                  <SubtopicList nodes={topic.children} />
                ) : (
                  <p className="px-2.5 py-1.5 text-sm text-muted-foreground">
                    No subtopics listed yet.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <nav className="mx-auto mt-10 flex max-w-3xl items-center justify-between gap-4 border-t border-border pt-6">
        {prev ? (
          <Link
            href={`/dsa-sheet/${prev.id}`}
            className="group min-w-0 flex-1 rounded-xl border border-border px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent/30"
          >
            <span className="block text-xs text-muted-foreground">Previous</span>
            <span className="mt-0.5 block truncate text-sm font-medium group-hover:text-primary">
              Phase {prev.phase}: {prev.shortTitle}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/dsa-sheet/${next.id}`}
            className="group min-w-0 flex-1 rounded-xl border border-border px-4 py-3 text-right transition-colors hover:border-primary/40 hover:bg-accent/30"
          >
            <span className="block text-xs text-muted-foreground">Next</span>
            <span className="mt-0.5 block truncate text-sm font-medium group-hover:text-primary">
              Phase {next.phase}: {next.shortTitle}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  );
}
