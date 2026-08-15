"use client";

import { useState, useMemo } from "react";
import { Search, ExternalLink, MapPin } from "lucide-react";
import { COMPANIES, AHMEDABAD_IT, CATEGORIES, getCategoryLabel, type CompanyCategory, getCompanyProfile } from "@/data/companies";
import { cn } from "@/lib/utils";

function LinkedInCell({ href, tone }: { href?: string; tone: "sky" | "pink" }) {
  if (!href) return <span className="text-muted-foreground">—</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
        tone === "sky"
          ? "bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 dark:text-sky-400"
          : "bg-pink-500/10 text-pink-600 hover:bg-pink-500/20 dark:text-pink-400",
      )}
    >
      LinkedIn
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export function CompanyGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CompanyCategory | "all">("all");
  const [ahmedabadOnly, setAhmedabadOnly] = useState(false);

  const source = ahmedabadOnly ? AHMEDABAD_IT : COMPANIES;

  const filtered = useMemo(() => {
    return source.filter((c) => {
      if (!ahmedabadOnly && activeCategory !== "all" && c.category !== activeCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !getCategoryLabel(c.category).toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [search, activeCategory, ahmedabadOnly, source]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {ahmedabadOnly
              ? `Browse ${AHMEDABAD_IT.length} top IT companies in Ahmedabad — jump to their career pages.`
              : `Browse ${COMPANIES.length} top tech companies — jump to their career pages or reach out to a recruiter or engineer via LinkedIn.`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAhmedabadOnly((v) => !v)}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            ahmedabadOnly
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-background text-foreground hover:bg-accent",
          )}
        >
          <MapPin className="h-4 w-4" />
          Ahmedabad only
        </button>
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
        {!ahmedabadOnly && (
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
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border">
          <p className="text-sm text-muted-foreground">
            No companies match your search.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="w-10 px-3 py-3 text-xs font-medium text-muted-foreground">#</th>
                <th className="px-3 py-3 text-xs font-medium text-muted-foreground">Company</th>
                {!ahmedabadOnly && (
                  <th className="hidden px-3 py-3 text-xs font-medium text-muted-foreground md:table-cell">Category</th>
                )}
                <th className="px-3 py-3 text-xs font-medium text-muted-foreground">Career Page</th>
                <th className="px-3 py-3 text-xs font-medium text-muted-foreground">Recruiter</th>
                {ahmedabadOnly && (
                  <>
                    <th className="px-3 py-3 text-xs font-medium text-muted-foreground">Recruiter 2</th>
                    <th className="px-3 py-3 text-xs font-medium text-muted-foreground">Recruiter 3</th>
                  </>
                )}
                <th className="px-3 py-3 text-xs font-medium text-muted-foreground">Software Engineer</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((company, i) => {
                const profile = getCompanyProfile(company.name);
                return (
                  <tr key={company.id} className="border-b border-border transition-colors hover:bg-muted/30">
                    <td className="px-3 py-3 text-xs text-muted-foreground">{i + 1}</td>
                    <td className="px-3 py-3 font-medium">{company.name}</td>
                    {!ahmedabadOnly && (
                      <td className="hidden px-3 py-3 md:table-cell">
                        <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                          {getCategoryLabel(company.category)}
                        </span>
                      </td>
                    )}
                    <td className="px-3 py-3">
                      <a
                        href={company.careerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        Career Page
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                    <td className="px-3 py-3">
                      <LinkedInCell href={profile.recruiter} tone="sky" />
                    </td>
                    {ahmedabadOnly && (
                      <>
                        <td className="px-3 py-3">
                          <LinkedInCell href={profile.recruiter2} tone="sky" />
                        </td>
                        <td className="px-3 py-3">
                          <LinkedInCell href={profile.recruiter3} tone="sky" />
                        </td>
                      </>
                    )}
                    <td className="px-3 py-3">
                      <LinkedInCell href={profile.swe} tone="pink" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Showing {filtered.length} of {source.length} companies
        {ahmedabadOnly ? " in Ahmedabad" : ""}
      </p>
    </div>
  );
}
