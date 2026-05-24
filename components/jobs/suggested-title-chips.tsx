"use client";

import { cn } from "@/lib/utils";

type Props = {
  titles: string[];
  activeTitle: string;
  onSelect: (title: string) => void;
  disabled?: boolean;
};

export function SuggestedTitleChips({
  titles,
  activeTitle,
  onSelect,
  disabled,
}: Props) {
  if (titles.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">
        Also try:
      </span>
      {titles.map((title) => (
        <button
          key={title}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(title)}
          className={cn(
            "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors disabled:opacity-50",
            activeTitle === title
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground hover:text-foreground",
          )}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
