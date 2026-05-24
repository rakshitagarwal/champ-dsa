"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Copy, Loader2, Search } from "lucide-react";
import { ExperienceSelect } from "@/components/jobs/experience-select";
import { LocationChips } from "@/components/jobs/location-chips";
import { OpenAllPortalsButton } from "@/components/jobs/open-all-portals-button";
import { PortalFavorites } from "@/components/jobs/portal-favorites";
import { PortalJobCard } from "@/components/jobs/portal-job-card";
import { ResumeUploadZone } from "@/components/jobs/resume-upload-zone";
import { SuggestedTitleChips } from "@/components/jobs/suggested-title-chips";
import { Button } from "@/components/ui/button";
import { buildPortalLinks } from "@/lib/jobs/build-portal-links";
import {
  consumeJobsHandoff,
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

export default function FindJobsPage() {
  const [jobTitle, setJobTitle] = useState("Full Stack Developer");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("3–6 years");
  const [locations, setLocations] = useState<JobLocation[]>([
    "Bangalore",
    "Remote India",
  ]);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [portals, setPortals] = useState<PortalLink[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<JobSearchKeywords | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [handoffNote, setHandoffNote] = useState<string | null>(null);
  const initialized = useRef(false);

  const runSearch = useCallback(
    async (titleOverride?: string, resumeOverride?: string | null) => {
      const title = (titleOverride ?? jobTitle).trim();
      const activeResume = resumeOverride ?? resumeText;
      if (!title) {
        setError("Enter a job title.");
        return;
      }
      if (locations.length === 0) {
        setError("Select at least one location.");
        return;
      }

      setError(null);
      setLoading(true);
      if (titleOverride) setJobTitle(titleOverride);

      let extraKeywords: string[] = [];
      let tips: Record<string, string> | undefined;
      let searchTitle = title;

      if (activeResume && activeResume.length >= 200) {
        try {
          const res = await fetch("/api/ai/job-search-keywords", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resumeText: activeResume,
              jobTitle: title,
              experienceLevel,
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error ?? "Keyword extraction failed.");
            setLoading(false);
            return;
          }
          const kw = data as JobSearchKeywords;
          setKeywords(kw);
          extraKeywords = [
            kw.primaryKeywords,
            ...kw.alternateKeywords,
          ].filter(Boolean);
          tips = kw.portalTips;
          if (kw.suggestedTitles[0]) {
            searchTitle = kw.suggestedTitles[0];
          }
        } catch {
          setError("Could not extract keywords from resume.");
          setLoading(false);
          return;
        }
      } else {
        setKeywords(null);
      }

      const links = sortPortalsByFavorites(
        buildPortalLinks(
          {
            jobTitle: searchTitle,
            experienceLevel,
            locations,
            extraKeywords,
          },
          tips,
        ),
        loadPortalFavorites(),
      );

      saveJobSearchPrefs({ jobTitle: title, experienceLevel, locations });
      setPortals(links);
      setLoading(false);
    },
    [jobTitle, experienceLevel, locations, resumeText],
  );

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const prefs = loadJobSearchPrefs();
    if (prefs) {
      setJobTitle(prefs.jobTitle);
      setExperienceLevel(prefs.experienceLevel);
      setLocations(prefs.locations);
    }

    setFavorites(loadPortalFavorites());

    const handoff = consumeJobsHandoff();
    if (!handoff) return;

    if (handoff.jobTitle) setJobTitle(handoff.jobTitle);
    if (handoff.experienceLevel) setExperienceLevel(handoff.experienceLevel);
    if (handoff.resumeText) setResumeText(handoff.resumeText);
    setHandoffNote(
      handoff.fromReview
        ? "Loaded from resume review — resume and target role pre-filled."
        : "Previous session restored.",
    );

    if (handoff.fromReview && handoff.resumeText) {
      void runSearch(
        handoff.jobTitle ?? prefs?.jobTitle ?? "Full Stack Developer",
        handoff.resumeText,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  const handleToggleFavorite = (id: string) => {
    const next = togglePortalFavorite(id);
    setFavorites(next);
    setPortals((prev) =>
      prev ? sortPortalsByFavorites(prev, next) : null,
    );
  };

  const copyAllLinks = () => {
    if (!portals) return;
    const text = portals.map((p) => `${p.name}: ${p.url}`).join("\n");
    void navigator.clipboard.writeText(text);
  };

  const favoriteSet = new Set(favorites);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Job search
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Open pre-filled searches on nine India job portals in one click.
          Optional resume upload tailors keywords to your profile.
        </p>
      </header>

      {handoffNote ? (
        <p className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary">
          {handoffNote}
        </p>
      ) : null}

      <div className="rounded-xl border border-border bg-card p-3 sm:p-4">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(9rem,0.55fr)_auto] sm:items-end">
          <div className="min-w-0">
            <label htmlFor="job-title" className="text-sm font-medium">
              Job title
            </label>
            <input
              id="job-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. MERN Developer"
              className="mt-1.5 h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="min-w-0">
            <label htmlFor="exp-jobs" className="text-sm font-medium">
              Experience
            </label>
            <ExperienceSelect
              id="exp-jobs"
              value={experienceLevel}
              onChange={setExperienceLevel}
              className="mt-1.5"
            />
          </div>
          <Button
            type="button"
            className="h-10 w-full shrink-0 sm:w-auto"
            onClick={() => void runSearch()}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Search jobs
          </Button>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,220px)_1fr] lg:items-start">
          <div className="min-w-0">
            <p className="text-sm font-medium">Resume (optional)</p>
            <ResumeUploadZone
              className="mt-1.5"
              variant="compact"
              onTextExtracted={(text) => {
                setResumeText(text);
                setError(null);
              }}
              onClear={() => setResumeText(null)}
              disabled={loading}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium">Locations</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Delhi, Noida, and Gurgaon are separate.
            </p>
            <LocationChips
              className="mt-1.5"
              selected={locations}
              onChange={setLocations}
            />
          </div>
        </div>

        <div className="mt-3 border-t border-border pt-3">
          <PortalFavorites
            favorites={favorites}
            onToggle={handleToggleFavorite}
          />
        </div>

        {error ? (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        ) : null}
      </div>

      <section className="relative w-full min-h-[200px] space-y-3">
        {loading ? (
          <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>
              Building portal links
              {resumeText && resumeText.length >= 200
                ? " and matching resume keywords"
                : ""}
              …
            </p>
          </div>
        ) : null}

        {keywords ? (
          <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-3 text-sm">
            <p className="font-medium text-primary">Resume keywords</p>
            <p className="text-muted-foreground">
              Primary: {keywords.primaryKeywords}
            </p>
            <SuggestedTitleChips
              titles={keywords.suggestedTitles}
              activeTitle={jobTitle}
              onSelect={(title) => void runSearch(title)}
              disabled={loading}
            />
          </div>
        ) : null}

        {portals ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-muted-foreground">
                {portals.length} portals · opens in new tab
                {favorites.length > 0 ? " · pinned first" : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                <OpenAllPortalsButton portals={portals} />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyAllLinks}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy all links
                </Button>
              </div>
            </div>
            <ul className="space-y-2">
              {portals.map((portal) => (
                <li key={portal.id}>
                  <PortalJobCard
                    portal={portal}
                    pinned={favoriteSet.has(portal.id)}
                    layout="row"
                  />
                </li>
              ))}
            </ul>
          </>
        ) : !loading ? (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            <Search className="mb-3 h-10 w-10 opacity-40" />
            <p>Enter a job title and click Search jobs.</p>
            <p className="mt-2">
              <Link href="/jobs/resume" className="text-primary hover:underline">
                Review your resume
              </Link>{" "}
              first for better keyword matches.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
