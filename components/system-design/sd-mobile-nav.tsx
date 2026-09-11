"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SD_GROUPS } from "@/data/system-design/catalog";
import type { SdDocumentMeta } from "@/types/system-design";
import { cn } from "@/lib/utils";

type Props = {
  docs: SdDocumentMeta[];
  className?: string;
};

export function SdMobileNav({ docs, className }: Props) {
  const pathname = usePathname();

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      {SD_GROUPS.flatMap((group) =>
        docs
          .filter((d) => d.group === group.id)
          .map((doc, idx) => {
            const href = `/hld/${doc.slug}`;
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
                {num}. {doc.title}
              </Link>
            );
          }),
      )}
    </div>
  );
}
