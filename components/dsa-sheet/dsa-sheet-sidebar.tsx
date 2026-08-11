"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { RoadmapPhase } from "@/types/dsa-sheet";
import { cn } from "@/lib/utils";

type Props = {
  phases: RoadmapPhase[];
  className?: string;
};

function cleanTopicTitle(title: string) {
  return title.replace(/^\d+\.\s*/, "");
}

export function DsaSheetSidebar({ phases, className }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTopic = searchParams.get("topic");
  const isOverview = pathname === "/dsa-sheet";

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-30 hidden h-[calc(100dvh-3.5rem)] w-56 flex-col overflow-hidden border-r border-border bg-panel/50 lg:flex",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-4">
        <Link
          href="/dsa-sheet"
          className="text-sm font-semibold text-foreground hover:text-primary"
        >
          DSA Sheet
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">
          14-phase interview roadmap
        </p>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3 scrollbar-hide">
        <ul className="space-y-0.5">
          <li>
            <Link
              href="/dsa-sheet"
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isOverview
                  ? "bg-primary/15 text-primary"
                  : "text-foreground hover:bg-accent/50",
              )}
            >
              All phases
            </Link>
          </li>
          {phases.map((phase) => {
            const href = `/dsa-sheet/${phase.id}`;
            const isActive = pathname === href;
            const highlightedTopic =
              isActive &&
              (activeTopic && phase.topics.some((t) => t.id === activeTopic)
                ? activeTopic
                : phase.topics[0]?.id);
            return (
              <li key={phase.id}>
                <Link
                  href={href}
                  title={`Phase ${phase.phase}: ${phase.shortTitle}`}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary/15 font-medium text-primary"
                      : "text-foreground hover:bg-accent/50",
                  )}
                >
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                    {phase.phase}
                  </span>
                  <span className="min-w-0 truncate">{phase.shortTitle}</span>
                </Link>
                {isActive ? (
                  <ul className="mb-1 ml-3 mt-0.5 space-y-0.5 border-l border-border/70 pl-2">
                    {phase.topics.map((topic, index) => {
                      const topicHref = `${href}?topic=${topic.id}`;
                      const isTopicActive = highlightedTopic === topic.id;
                      const n = index + 1;
                      return (
                        <li key={topic.id}>
                          <Link
                            href={topicHref}
                            title={cleanTopicTitle(topic.title)}
                            className={cn(
                              "flex items-baseline gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors",
                              isTopicActive
                                ? "bg-primary/10 font-medium text-primary"
                                : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
                            )}
                          >
                            <span className="shrink-0 font-mono tabular-nums opacity-70">
                              {n}.
                            </span>
                            <span className="min-w-0 truncate">
                              {cleanTopicTitle(topic.title)}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
