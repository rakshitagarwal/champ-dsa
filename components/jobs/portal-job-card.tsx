"use client";

import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PortalLink } from "@/types/job-search";

const PORTAL_COLORS: Record<string, string> = {
  linkedin: "bg-[#0A66C2]/10 text-[#0A66C2]",
  naukri: "bg-[#4A90D9]/10 text-[#2563EB]",
  indeed: "bg-[#2164F3]/10 text-[#2164F3]",
  instahyre: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  wellfound: "bg-black/10 text-foreground",
  cutshort: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  google: "bg-red-500/10 text-red-600 dark:text-red-400",
};

type Props = {
  portal: PortalLink;
};

export function PortalJobCard({ portal }: Props) {
  const badgeClass = PORTAL_COLORS[portal.id] ?? "bg-muted text-muted-foreground";

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
      <Badge variant="secondary" className={badgeClass}>
        {portal.name}
      </Badge>
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
