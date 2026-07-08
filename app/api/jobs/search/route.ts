import { NextResponse } from "next/server";
import type { JobListing, JobSearchResponse } from "@/types/job-listing";

export const maxDuration = 30;

type Body = {
  query?: string;
  location?: string;
  sources?: string[];
};

type JSearchJob = {
  job_id?: string;
  job_title?: string;
  employer_name?: string;
  job_city?: string;
  job_country?: string;
  job_description?: string;
  job_apply_link?: string;
  job_google_link?: string;
  job_posted_at_datetime_utc?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.JSEARCH_API_KEY;

  if (!apiKey) {
    const response: JobSearchResponse = { listings: [], enabled: false };
    return NextResponse.json(response);
  }

  try {
    const body = (await request.json()) as Body;
    const query = body.query?.trim() ?? "";
    const location = body.location?.trim() ?? "";

    if (!query) {
      return NextResponse.json(
        { error: "Query is required." },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({
      query: location ? `${query} in ${location}` : query,
      page: "1",
      num_pages: "1",
    });

    const res = await fetch(
      `https://jsearch.p.rapidapi.com/search?${params.toString()}`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      console.error("[api/jobs/search] JSearch error", res.status);
      return NextResponse.json({ listings: [], enabled: true });
    }

    const json = (await res.json()) as { data?: JSearchJob[] };
    const listings: JobListing[] = (json.data ?? []).slice(0, 10).map((job) => {
      const source = (job.job_apply_link ?? "").includes("linkedin")
        ? "linkedin"
        : (job.job_apply_link ?? "").includes("indeed")
          ? "indeed"
          : "jsearch";

      return {
        id: job.job_id ?? `${job.job_title}-${job.employer_name}`,
        title: job.job_title ?? "Untitled role",
        company: job.employer_name ?? "Unknown company",
        location: [job.job_city, job.job_country].filter(Boolean).join(", ") || location,
        source,
        url: job.job_apply_link ?? job.job_google_link ?? "#",
        postedAt: job.job_posted_at_datetime_utc,
        snippet: job.job_description?.slice(0, 200),
      };
    });

    const response: JobSearchResponse = { listings, enabled: true };
    return NextResponse.json(response);
  } catch (err) {
    console.error("[api/jobs/search] error", err);
    return NextResponse.json({ listings: [], enabled: true });
  }
}
