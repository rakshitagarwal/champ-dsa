"use client";

import { Pin } from "lucide-react";
import { PORTAL_IDS, PORTAL_LABELS } from "@/lib/jobs/build-portal-links";
import { cn } from "@/lib/utils";

type Props = {
  favorites: string[];
  onToggle: (id: string) => void;
};

export function PortalFavorites({ favorites, onToggle }: Props) {
  return (
    <div>
      <p className="text-sm font-medium">Pinned portals</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Pin up to 3 — they appear first in results.
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {PORTAL_IDS.map((id) => {
          const pinned = favorites.includes(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => onToggle(id)}
              className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                pinned
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              <Pin className={cn("h-3 w-3", pinned && "fill-current")} />
              {PORTAL_LABELS[id]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
