"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { COMPANIES, CATEGORIES, type CompanyCategory } from "@/data/companies";
import { CompanyCard } from "./company-card";
import { cn } from "@/lib/utils";

export function CompanyGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CompanyCategory | "all">("all");

  const filtered = useMemo(() => {
    return COMPANIES.filter((c) => {
      if (activeCategory !== "all" && c.category !== activeCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [search, activeCategory]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">IT Companies</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse 200+ top IT companies and jump directly to their career pages
          to find your next opportunity.
        </p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search companies…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border">
          <p className="text-sm text-muted-foreground">
            No companies match your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Showing {filtered.length} of {COMPANIES.length} companies
      </p>
    </div>
  );
}
