"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/jobs", label: "Find jobs" },
  { href: "/jobs/resume", label: "Resume review" },
] as const;

export function JobsSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 rounded-lg border border-border bg-muted/30 p-1">
      {links.map(({ href, label }) => {
        const active =
          href === "/jobs"
            ? pathname === "/jobs"
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
