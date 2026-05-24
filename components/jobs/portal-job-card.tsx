"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PortalLink } from "@/types/job-search";

const PORTAL_COLORS: Record<string, string> = {
  naukri: "bg-[#4A90D9]/10 text-[#2563EB]",
  indeed: "bg-[#2164F3]/10 text-[#2164F3]",
  foundit: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  shine: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  instahyre: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  wellfound: "bg-black/10 text-foreground",
  hirist: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  uplers: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  weekday: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

type Props = {
  portal: PortalLink;
  pinned?: boolean;
};

export function PortalJobCard({ portal, pinned }: Props) {
  const badgeClass = PORTAL_COLORS[portal.id] ?? "bg-muted text-muted-foreground";

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className={badgeClass}>
          {portal.name}
        </Badge>
        {pinned ? (
          <Badge variant="outline" className="text-xs">
            Pinned
          </Badge>
        ) : null}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{portal.description}</p>
      <p className="mt-2 text-xs font-medium text-foreground/80">
        {portal.querySummary}
      </p>
      {portal.tip ? (
        <p className="mt-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
          {portal.tip}
        </p>
      ) : null}
      <a
        href={portal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex h-8 w-full items-center justify-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
      >
        Open on {portal.name.split(" ")[0]}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}
