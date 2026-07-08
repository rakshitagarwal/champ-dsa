export type JobListingSource = "indeed" | "linkedin" | "jsearch";

export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  source: JobListingSource;
  url: string;
  postedAt?: string;
  snippet?: string;
};

export type JobSearchResponse = {
  listings: JobListing[];
  enabled: boolean;
};
