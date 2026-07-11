"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { StriverSectionMeta } from "@/types/dsa-sheet";
import { cn } from "@/lib/utils";

type Props = {
  sections: StriverSectionMeta[];
  totalCount: number;
  className?: string;
};

export function DsaSheetMobileNav({ sections, totalCount, className }: Props) {
  const searchParams = useSearchParams();
  const active = searchParams.get("section") ?? "all";

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      <Link
        href="/dsa-sheet"
        className={cn(
          "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
          active === "all"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        All ({totalCount})
      </Link>
      {sections.map((section) => (
        <Link
          key={section.id}
          href={`/dsa-sheet?section=${section.id}`}
          className={cn(
            "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            active === section.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}
        >
          {section.title.split(" ")[0]} ({section.questionIds.length})
        </Link>
      ))}
    </div>
  );
}
