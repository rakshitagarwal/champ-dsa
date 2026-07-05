"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DsaPattern } from "@/types/pattern";
import { cn } from "@/lib/utils";

type Props = {
  patterns: DsaPattern[];
  className?: string;
};

export function DsaPatternsMobileNav({ patterns, className }: Props) {
  const pathname = usePathname();

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      <Link
        href="/patterns"
        className={cn(
          "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
          pathname === "/patterns"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        Overview
      </Link>
      {patterns.map((pattern) => {
        const href = `/patterns/${pattern.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={pattern.slug}
            href={href}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {pattern.name}
          </Link>
        );
      })}
    </div>
  );
}
