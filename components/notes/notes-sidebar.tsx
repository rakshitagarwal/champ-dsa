"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOTE_SECTIONS } from "@/data/notes/manifest";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function NotesSidebar({ className }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex w-56 shrink-0 flex-col border-r border-border bg-panel/50",
        className,
      )}
    >
      <div className="border-b border-border px-4 py-4">
        <Link
          href="/notes"
          className={cn(
            "text-sm font-semibold",
            pathname === "/notes"
              ? "text-primary"
              : "text-foreground hover:text-primary",
          )}
        >
          Notes
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">
          Revision sheets for working devs
        </p>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {NOTE_SECTIONS.map((section) => {
            const sectionHref = `/notes/${section.id}/${section.pages[0]?.slug ?? ""}`;
            const sectionActive =
              pathname === `/notes/${section.id}` ||
              pathname.startsWith(`/notes/${section.id}/`);
            const expanded = sectionActive;

            return (
              <li key={section.id}>
                <Link
                  href={sectionHref}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    sectionActive
                      ? "bg-primary/15 text-primary"
                      : "text-foreground hover:bg-accent/50",
                  )}
                >
                  {section.title}
                </Link>
                {expanded ? (
                  <ul className="mb-2 ml-2 mt-0.5 space-y-0.5 border-l border-border pl-2">
                    {section.pages.map((page) => {
                      const href = `/notes/${section.id}/${page.slug}`;
                      const pageActive = pathname === href;
                      return (
                        <li key={page.slug}>
                          <Link
                            href={href}
                            className={cn(
                              "block rounded-md px-2 py-1.5 text-xs transition-colors",
                              pageActive
                                ? "font-medium text-primary"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {page.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
