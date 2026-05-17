"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  getAllJsNoteTopics,
  getJsNoteCategories,
} from "@/data/js-notes";

export function JsNotesTopicList() {
  const topics = getAllJsNoteTopics();
  const categories = getJsNoteCategories();

  return (
    <div className="space-y-10">
      {categories.map((category) => {
        const items = topics.filter((t) => t.category === category);
        return (
          <section key={category} className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {category}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/js-notes/${topic.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary">
                      {topic.order}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug group-hover:text-primary">
                        {topic.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {topic.summary}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
