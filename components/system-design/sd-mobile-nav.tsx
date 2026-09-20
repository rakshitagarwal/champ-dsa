"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SD_GROUPS } from "@/data/system-design/catalog";
import type { SdDocumentMeta } from "@/types/system-design";
import { cn } from "@/lib/utils";

type Props = {
  docs: SdDocumentMeta[];
  className?: string;
};

export function SdMobileNav({ docs, className }: Props) {
  const pathname = usePathname();
  const [core8Only, setCore8Only] = useState(false);

  const visibleDocs = SD_GROUPS.flatMap((group) => {
    let items = docs.filter((d) => d.group === group.id);
    if (group.id === "questions" && core8Only) {
      items = items.filter((d) => d.core8);
    }
    return items.map((doc, idx) => ({ doc, idx, groupId: group.id }));
  });

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <button
        type="button"
        onClick={() => setCore8Only((v) => !v)}
        className={cn(
          "self-start rounded-full border px-3 py-1 text-xs font-medium transition-colors",
          core8Only
            ? "border-primary/40 bg-primary text-primary-foreground"
            : "border-border bg-muted text-muted-foreground",
        )}
        aria-pressed={core8Only}
      >
        {core8Only ? "Core 8 on" : "Core 8"}
      </button>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {visibleDocs.map(({ doc, idx }) => {
          const href = `/hld/${doc.slug}`;
          const active = pathname === href;
          const num = String(idx + 1).padStart(2, "0");
          return (
            <Link
              key={doc.slug}
              href={href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {num}. {doc.title}
              {doc.core8 ? " · Core" : ""}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
