"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import type { JobListing, JobSearchResponse } from "@/types/job-listing";
import { Badge } from "@/components/ui/badge";

type Props = {
  query: string;
  location: string;
};

function JobListingCard({ job }: { job: JobListing }) {
  return (
    <article className="flex flex-col gap-2 rounded-lg border border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium">{job.title}</p>
          <Badge variant="secondary" className="text-xs capitalize">
            {job.source}
          </Badge>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {job.company} · {job.location}
        </p>
        {job.snippet ? (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {job.snippet}
          </p>
        ) : null}
      </div>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
      >
        Apply
        <ExternalLink className="h-3 w-3" />
      </a>
    </article>
  );
}

export function JobListingsFeed({ query, location }: Props) {
  const [data, setData] = useState<JobSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void fetch("/api/jobs/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, location }),
    })
      .then((res) => res.json())
      .then((json: JobSearchResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData({ listings: [], enabled: false });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, location]);

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold">Live results from Indeed & LinkedIn</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Aggregated listings when JSearch API is configured.
      </p>

      {loading ? (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Checking for live listings…
        </div>
      ) : !data?.enabled ? (
        <p className="mt-4 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
          Coming soon — add <code className="text-xs">JSEARCH_API_KEY</code> to
          your environment to enable in-app Indeed & LinkedIn results.
        </p>
      ) : data.listings.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No live listings found for this query. Try the portal links above.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {data.listings.map((job) => (
            <li key={job.id}>
              <JobListingCard job={job} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
