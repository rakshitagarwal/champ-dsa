"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LLD_GROUPS } from "@/data/lld/topics";
import type { LldTopicWithNum } from "@/data/lld/topics";
import { cn } from "@/lib/utils";

type Props = {
  docs: LldTopicWithNum[];
  className?: string;
};

export function LldMobileNav({ docs, className }: Props) {
  const pathname = usePathname();

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      {LLD_GROUPS.flatMap((group) =>
        docs
          .filter((d) => d.group === group.id)
          .map((doc, idx) => {
            const href = `/lld/${doc.slug}`;
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
                {num}. {doc.short}
              </Link>
            );
          }),
      )}
    </div>
  );
}
