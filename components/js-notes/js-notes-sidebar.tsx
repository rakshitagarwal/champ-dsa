"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getAllJsNoteTopics,
  getJsNoteCategories,
} from "@/data/js-notes";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function JsNotesSidebar({ className }: Props) {
  const pathname = usePathname();
  const topics = getAllJsNoteTopics();
  const categories = getJsNoteCategories();

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-border bg-panel/50",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-4">
        <Link
          href="/js-notes"
          className={cn(
            "text-sm font-semibold",
            pathname === "/js-notes"
              ? "text-primary"
              : "text-foreground hover:text-primary",
          )}
        >
          JavaScript notes
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">
          {topics.length} topics
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {categories.map((category) => {
          const items = topics.filter((t) => t.category === category);
          return (
            <div key={category} className="mb-4">
              <p className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {category}
              </p>
              <ul className="space-y-0.5">
                {items.map((topic) => {
                  const href = `/js-notes/${topic.slug}`;
                  const active = pathname === href;
                  return (
                    <li key={topic.slug}>
                      <Link
                        href={href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                          active
                            ? "bg-primary/15 font-medium text-primary"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold",
                            active
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {topic.order}
                        </span>
                        <span className="truncate">{topic.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
