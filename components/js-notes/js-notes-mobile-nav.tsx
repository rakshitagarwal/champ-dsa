"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAllJsNoteTopics } from "@/data/js-notes";
import { cn } from "@/lib/utils";

export function JsNotesMobileNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const topics = getAllJsNoteTopics();
  const current =
    topics.find((t) => pathname === `/js-notes/${t.slug}`)?.title ?? "All topics";

  return (
    <div className={cn("bg-panel/80", className)}>
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        Topic: <span className="text-foreground">{current}</span>
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Link
          href="/js-notes"
          className={cn(
            "shrink-0 rounded-full border px-3 py-1 text-xs font-medium",
            pathname === "/js-notes"
              ? "border-primary bg-primary/15 text-primary"
              : "border-border text-muted-foreground",
          )}
        >
          All
        </Link>
        {topics.map((t) => {
          const href = `/js-notes/${t.slug}`;
          return (
            <Link
              key={t.slug}
              href={href}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium",
                pathname === href
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground",
              )}
            >
              {t.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
