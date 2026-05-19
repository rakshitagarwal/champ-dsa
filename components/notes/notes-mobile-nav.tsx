"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOTE_SECTIONS } from "@/data/notes/manifest";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function NotesMobileNav({ className }: Props) {
  const pathname = usePathname();
  const activeSection = NOTE_SECTIONS.find((s) =>
    pathname.startsWith(`/notes/${s.id}`),
  );

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {NOTE_SECTIONS.map((section) => {
          const href = `/notes/${section.id}/${section.pages[0]?.slug ?? ""}`;
          const active = pathname.startsWith(`/notes/${section.id}`);
          return (
            <Link
              key={section.id}
              href={href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {section.title}
            </Link>
          );
        })}
      </div>
      {activeSection ? (
        <div className="flex gap-2 overflow-x-auto">
          {activeSection.pages.map((page) => {
            const href = `/notes/${activeSection.id}/${page.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={page.slug}
                href={href}
                className={cn(
                  "shrink-0 rounded-md px-2 py-1 text-xs transition-colors",
                  active
                    ? "font-medium text-primary"
                    : "text-muted-foreground",
                )}
              >
                {page.title}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
