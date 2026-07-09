"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DsaNoteMeta } from "@/data/dsa/manifest";
import { TIER_LABELS } from "@/data/dsa/manifest";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  notes: DsaNoteMeta[];
  className?: string;
};

function tierBadgeClass(tier: DsaNoteMeta["tier"]): string {
  switch (tier) {
    case "foundation":
      return "bg-muted text-muted-foreground";
    case "core":
      return "bg-primary/10 text-primary";
    case "optional":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  }
}

export function DsaPatternsSidebar({ notes, className }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-30 hidden h-[calc(100dvh-3.5rem)] w-56 flex-col overflow-hidden border-r border-border bg-panel/50 lg:flex",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-4">
        <Link
          href="/patterns"
          className={cn(
            "text-sm font-semibold",
            pathname === "/patterns" || pathname.startsWith("/patterns/")
              ? "text-primary"
              : "text-foreground hover:text-primary",
          )}
        >
          DSA Patterns
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">
          Learn patterns, solve problems
        </p>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3 scrollbar-hide">
        <ul className="space-y-0.5">
          {notes.map((note) => {
            const href = `/patterns/${note.slug}`;
            const active = pathname === href;
            return (
              <li key={note.slug}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center justify-between gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-foreground hover:bg-accent/50",
                  )}
                >
                  <span className="min-w-0 truncate">{note.title}</span>
                  <Badge
                    variant="secondary"
                    className={cn("shrink-0 px-1.5 py-0 text-[10px]", tierBadgeClass(note.tier))}
                  >
                    {TIER_LABELS[note.tier]}
                  </Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
