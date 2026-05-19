"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NoteDocumentMeta } from "@/types/notes";
import { cn } from "@/lib/utils";

type Props = {
  notes: NoteDocumentMeta[];
  className?: string;
};

export function NotesSidebar({ notes, className }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-56 shrink-0 flex-col overflow-hidden border-r border-border bg-panel/50",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-4">
        <Link
          href="/notes"
          className={cn(
            "text-sm font-semibold",
            pathname === "/notes" || pathname.startsWith("/notes/")
              ? "text-primary"
              : "text-foreground hover:text-primary",
          )}
        >
          Notes
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">
          One page per topic — add a .md file to grow the list
        </p>
      </div>
      <nav className="shrink-0 px-2 py-3">
        <ul className="space-y-0.5">
          {notes.map((note) => {
            const href = `/notes/${note.slug}`;
            const active = pathname === href;
            return (
              <li key={note.slug}>
                <Link
                  href={href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-foreground hover:bg-accent/50",
                  )}
                >
                  {note.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
