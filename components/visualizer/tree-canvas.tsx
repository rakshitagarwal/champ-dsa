"use client";

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  values: (number | null)[];
};

/** Level-order tree layout (compact MVP). */
export function TreeCanvas({ name, values }: Props) {
  if (values.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">Empty tree</p>
    );
  }

  const levels: (number | null)[][] = [];
  let i = 0;
  let width = 1;
  while (i < values.length) {
    levels.push(values.slice(i, i + width));
    i += width;
    width *= 2;
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 overflow-x-auto py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {name}
      </p>
      {levels.map((row, levelIdx) => (
        <div
          key={levelIdx}
          className="flex justify-center gap-3"
          style={{ minWidth: row.length * 52 }}
        >
          {row.map((val, idx) => (
            <div
              key={idx}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-sm",
                val === null
                  ? "border-transparent opacity-0"
                  : "border-emerald-500/50 bg-emerald-500/15 text-foreground",
              )}
            >
              {val === null ? "" : val}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
