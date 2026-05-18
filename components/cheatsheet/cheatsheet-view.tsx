"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  CHEATSHEET_SECTIONS,
  type CheatsheetCategory,
} from "@/data/cheatsheet/algorithms";
import { cn } from "@/lib/utils";

export function CheatsheetView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CheatsheetCategory | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHEATSHEET_SECTIONS.filter(
      (s) => category === "all" || s.id === category,
    )
      .map((section) => ({
        ...section,
        entries: section.entries.filter((e) => {
          if (!q) return true;
          const hay = `${e.name} ${e.time} ${e.space} ${e.notes ?? ""} ${section.title}`.toLowerCase();
          return hay.includes(q);
        }),
      }))
      .filter((s) => s.entries.length > 0);
  }, [query, category]);

  const totalShown = filtered.reduce((n, s) => n + s.entries.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search algorithms, e.g. dijkstra, merge sort..."
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
            aria-label="Search cheat sheet"
          />
        </div>
        <p className="shrink-0 text-xs text-muted-foreground sm:text-sm">
          {totalShown} {totalShown === 1 ? "entry" : "entries"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <CategoryPill
          active={category === "all"}
          onClick={() => setCategory("all")}
          label="All"
        />
        {CHEATSHEET_SECTIONS.map((s) => (
          <CategoryPill
            key={s.id}
            active={category === s.id}
            onClick={() => setCategory(s.id)}
            label={s.title}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          No matches. Try another keyword or category.
        </p>
      ) : (
        <div className="space-y-8">
          {filtered.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="mb-3">
                <h2 className="text-lg font-semibold tracking-tight">
                  {section.title}
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>

              <div className="hidden overflow-hidden rounded-xl border border-border md:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-3 font-semibold">Algorithm</th>
                      <th className="px-4 py-3 font-semibold">Time</th>
                      <th className="px-4 py-3 font-semibold">Space</th>
                      <th className="px-4 py-3 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.entries.map((entry) => (
                      <tr
                        key={entry.name}
                        className="border-b border-border/60 last:border-0 hover:bg-muted/20"
                      >
                        <td className="px-4 py-3 font-medium">{entry.name}</td>
                        <td className="px-4 py-3 font-mono text-xs text-foreground/90">
                          {entry.time}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-foreground/90">
                          {entry.space}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {entry.notes ?? "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 md:hidden">
                {section.entries.map((entry) => (
                  <div
                    key={entry.name}
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <p className="font-medium">{entry.name}</p>
                    <dl className="mt-2 grid gap-1.5 text-xs">
                      <div className="flex gap-2">
                        <dt className="w-12 shrink-0 text-muted-foreground">
                          Time
                        </dt>
                        <dd className="font-mono">{entry.time}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-12 shrink-0 text-muted-foreground">
                          Space
                        </dt>
                        <dd className="font-mono">{entry.space}</dd>
                      </div>
                      {entry.notes ? (
                        <div className="flex gap-2">
                          <dt className="w-12 shrink-0 text-muted-foreground">
                            Notes
                          </dt>
                          <dd className="text-muted-foreground">{entry.notes}</dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
