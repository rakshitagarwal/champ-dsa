"use client";

import { JOB_LOCATIONS, type JobLocation } from "@/types/job-search";
import { cn } from "@/lib/utils";

type Props = {
  selected: JobLocation[];
  onChange: (locations: JobLocation[]) => void;
  className?: string;
};

export function LocationChips({ selected, onChange, className }: Props) {
  const toggle = (loc: JobLocation) => {
    if (selected.includes(loc)) {
      onChange(selected.filter((l) => l !== loc));
    } else {
      onChange([...selected, loc]);
    }
  };

  return (
    <div
      className={cn(
        "max-h-40 overflow-y-auto overscroll-contain pr-1",
        className,
      )}
    >
      <div className="flex flex-wrap gap-2">
      {JOB_LOCATIONS.map((loc) => {
        const active = selected.includes(loc);
        return (
          <button
            key={loc}
            type="button"
            onClick={() => toggle(loc)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              active
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40",
            )}
          >
            {loc}
          </button>
        );
      })}
      </div>
    </div>
  );
}
