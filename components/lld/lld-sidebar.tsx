"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lightbulb, MapPin } from "lucide-react";
import { LLD_GROUPS } from "@/data/lld/topics";
import type { LldTopicWithNum } from "@/data/lld/topics";
import { cn } from "@/lib/utils";

type Props = {
  docs: LldTopicWithNum[];
  className?: string;
};

export function LldSidebar({ docs, className }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 z-30 hidden h-[calc(100dvh-3.5rem)] w-60 flex-col overflow-hidden border-r border-border bg-panel/50 lg:flex",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-4">
        <Link
          href="/lld"
          className="text-sm font-semibold text-foreground hover:text-primary"
        >
          Low Level Design
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">
          Patterns, concepts, and interview problems
        </p>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 scrollbar-hide">
        {LLD_GROUPS.map((group) => {
          const items = docs.filter((d) => d.group === group.id);
          if (items.length === 0) return null;
          const Icon =
            group.id === "patterns" ? Lightbulb : group.id === "questions" ? MapPin : null;
          return (
            <section key={group.id} className="mb-5">
              <p className="mb-2 flex items-center gap-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {Icon ? <Icon className="h-3.5 w-3.5 text-primary" /> : null}
                {group.title}
              </p>
              <ul
                className={cn(
                  group.id === "intro"
                    ? "space-y-0.5"
                    : "relative ml-2 space-y-0.5 border-l border-border/80 pl-3",
                )}
              >
                {items.map((doc, idx) => {
                  const href = `/lld/${doc.slug}`;
                  const active = pathname === href;
                  const num = String(idx + 1).padStart(2, "0");
                  return (
                    <li key={doc.slug} className="relative">
                      <span
                        className={cn(
                          "absolute -left-[19px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border bg-background text-[9px] font-mono tabular-nums",
                          active
                            ? "border-primary text-primary"
                            : "border-muted-foreground/30 text-muted-foreground/70",
                        )}
                        aria-hidden
                      >
                        {num}
                      </span>
                      <Link
                        href={href}
                        title={doc.title}
                        className={cn(
                          "block truncate rounded-md px-2 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-primary/15 font-medium text-primary"
                            : "text-foreground hover:bg-accent/50",
                        )}
                      >
                        {doc.short}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
