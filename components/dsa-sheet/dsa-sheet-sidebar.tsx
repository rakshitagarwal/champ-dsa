"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { StriverSectionMeta } from "@/types/dsa-sheet";
import { cn } from "@/lib/utils";
import { getCompletedCount } from "@/lib/storage/dsa-sheet-store";

type Props = {
  sections: StriverSectionMeta[];
  totalCount: number;
  className?: string;
};

export function DsaSheetSidebar({ sections, totalCount, className }: Props) {
  const searchParams = useSearchParams();
  const active = searchParams.get("section") ?? "all";
  const completedAll = getCompletedCount();

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
          Striver A2Z — LeetCode only
        </p>
        <p className="mt-2 text-xs font-medium text-primary">
          {completedAll} / {totalCount} done
        </p>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3 scrollbar-hide">
        <ul className="space-y-0.5">
          <li>
            <Link
              href="/dsa-sheet"
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active === "all"
                  ? "bg-primary/15 text-primary"
                  : "text-foreground hover:bg-accent/50",
              )}
            >
              All problems ({totalCount})
            </Link>
          </li>
          {sections.map((section) => {
            const done = getCompletedCount(section.questionIds);
            const href = `/dsa-sheet?section=${section.id}`;
            const isActive = active === section.id;
            return (
              <li key={section.id}>
                <Link
                  href={href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary/15 font-medium text-primary"
                      : "text-foreground hover:bg-accent/50",
                  )}
                >
                  <span className="line-clamp-2">{section.title}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {done}/{section.questionIds.length}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
