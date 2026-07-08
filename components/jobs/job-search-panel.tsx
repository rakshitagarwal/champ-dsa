"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import { LocationChips } from "@/components/jobs/location-chips";
import { OpenAllPortalsButton } from "@/components/jobs/open-all-portals-button";
import { PortalFavorites } from "@/components/jobs/portal-favorites";
import { PortalJobCard } from "@/components/jobs/portal-job-card";
import { JobListingsFeed } from "@/components/jobs/job-listings-feed";
import { ExperienceSelect } from "@/components/jobs/experience-select";
import { Button } from "@/components/ui/button";
import { buildPortalLinks } from "@/lib/jobs/build-portal-links";
import {
  loadJobSearchPrefs,
  loadPortalFavorites,
  saveJobSearchPrefs,
  sortPortalsByFavorites,
  togglePortalFavorite,
} from "@/lib/jobs/job-search-storage";
import type {
  ExperienceLevel,
  JobLocation,
  JobSearchKeywords,
  PortalLink,
} from "@/types/job-search";

type Props = {
  resumeText: string;
  initialJobTitle?: string;
  initialExperience?: ExperienceLevel;
  initialKeywords?: string[];
  initialSuggestedTitles?: string[];
};

export function JobSearchPanel({
  resumeText,
  initialJobTitle = "",
  initialExperience = "3–6 years",
  initialKeywords = [],
  initialSuggestedTitles = [],
}: Props) {
  const prefs = loadJobSearchPrefs();
  const [jobTitle, setJobTitle] = useState(
    initialJobTitle || prefs?.jobTitle || "",
  );
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    initialExperience || prefs?.experienceLevel || "3–6 years",
  );
  const [locations, setLocations] = useState<JobLocation[]>(
    prefs?.locations?.length ? prefs.locations : ["Bangalore"],
  );
  const [favorites, setFavorites] = useState<string[]>(loadPortalFavorites());
  const [portals, setPortals] = useState<PortalLink[]>([]);
  const [keywords, setKeywords] = useState<JobSearchKeywords | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const runSearch = useCallback(async () => {
    const title = jobTitle.trim();
    if (!title) {
      setError("Enter a target job title to search.");
      return;
    }
    if (locations.length === 0) {
      setError("Select at least one location.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      saveJobSearchPrefs({ jobTitle: title, experienceLevel, locations });

      let aiKeywords: JobSearchKeywords | null = null;
      if (resumeText.length >= 200) {
        const res = await fetch("/api/ai/job-search-keywords", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText, jobTitle: title, experienceLevel }),
        });
        const data = await res.json();
        if (res.ok) {
          aiKeywords = data as JobSearchKeywords;
          setKeywords(aiKeywords);
        }
      }

      const effectiveTitle =
        title ||
        aiKeywords?.suggestedTitles[0] ||
        initialSuggestedTitles[0] ||
        "Software Engineer";

      const extraKeywords = [
        ...(aiKeywords?.primaryKeywords
          ? [aiKeywords.primaryKeywords]
          : initialKeywords.slice(0, 1)),
        ...(aiKeywords?.alternateKeywords ?? initialKeywords.slice(1, 3)),
      ].filter(Boolean);

      const links = buildPortalLinks(
        {
          jobTitle: effectiveTitle,
          experienceLevel,
          locations,
          extraKeywords,
        },
        aiKeywords?.portalTips,
      );

      setPortals(sortPortalsByFavorites(links, favorites));
      setSearched(true);
    } catch {
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  }, [
    jobTitle,
    experienceLevel,
    locations,
    resumeText,
    favorites,
    initialKeywords,
    initialSuggestedTitles,
  ]);

  useEffect(() => {
    if (initialJobTitle && resumeText.length >= 200) {
      void runSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleFavorite = (id: string) => {
    const next = togglePortalFavorite(id);
    setFavorites(next);
    setPortals((prev) => sortPortalsByFavorites(prev, next));
  };

  const feedQuery =
    keywords?.primaryKeywords ||
    [jobTitle.trim(), ...initialKeywords].filter(Boolean).join(" ");

  const feedLocation = locations[0] ?? "Bangalore";

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-lg font-semibold">Find jobs across platforms</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Search Greenhouse, Lever, Naukri, Internshala, LinkedIn, Indeed, Reed
          UK, Seek AU, and more — tailored to your resume.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="search-title" className="text-sm font-medium">
              Job title
            </label>
            <input
              id="search-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {initialSuggestedTitles.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {initialSuggestedTitles.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setJobTitle(t)}
                    className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  >
                    {t}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="search-exp" className="text-sm font-medium">
              Experience
            </label>
            <ExperienceSelect
              id="search-exp"
              value={experienceLevel}
              onChange={setExperienceLevel}
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium">Locations</p>
          <LocationChips
            selected={locations}
            onChange={setLocations}
            className="mt-2"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            disabled={loading}
            onClick={() => void runSearch()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Build search links
          </Button>
          {searched && portals.length > 0 ? (
            <OpenAllPortalsButton portals={portals} />
          ) : null}
        </div>

        {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
      </section>

      <PortalFavorites favorites={favorites} onToggle={handleToggleFavorite} />

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border py-12 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Extracting keywords from your resume…
        </div>
      ) : searched && portals.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portals.map((portal) => (
            <PortalJobCard
              key={portal.id}
              portal={portal}
              pinned={favorites.includes(portal.id)}
            />
          ))}
        </div>
      ) : searched ? (
        <p className="text-sm text-muted-foreground">
          No portals match your location selection.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          <Search className="h-8 w-8 text-muted-foreground/50" />
          <p>Enter a job title and click Build search links to get started.</p>
        </div>
      )}

      {searched && feedQuery ? (
        <JobListingsFeed query={feedQuery} location={feedLocation} />
      ) : null}
    </div>
  );
}
