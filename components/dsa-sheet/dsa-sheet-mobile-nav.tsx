"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RoadmapPhase } from "@/types/dsa-sheet";
import { cn } from "@/lib/utils";

type Props = {
  phases: RoadmapPhase[];
  className?: string;
};

export function DsaSheetMobileNav({ phases, className }: Props) {
  const pathname = usePathname();
  const isOverview = pathname === "/dsa-sheet";

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      <Link
        href="/dsa-sheet"
        className={cn(
          "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
          isOverview
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        All
      </Link>
      {phases.map((phase) => {
        const href = `/dsa-sheet/${phase.id}`;
        const isActive = pathname === href;
        return (
          <Link
            key={phase.id}
            href={href}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {phase.phase}. {phase.shortTitle}
          </Link>
        );
      })}
    </div>
  );
}
