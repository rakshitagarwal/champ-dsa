"use client";

import { Download, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { downloadResumeOutline } from "@/lib/jobs/export-resume-outline";
import { saveJobsHandoff } from "@/lib/jobs/job-search-storage";
import type { ExperienceLevel } from "@/types/job-search";
import type { ResumeReviewResult } from "@/types/resume-review";

type Props = {
  result: ResumeReviewResult;
  resumeText: string;
  jobTitle: string;
  experienceLevel: ExperienceLevel;
};

export function ResumeHandoffActions({
  result,
  resumeText,
  jobTitle,
  experienceLevel,
}: Props) {
  const router = useRouter();

  const findJobs = () => {
    saveJobsHandoff({
      fromReview: true,
      resumeText,
      jobTitle: jobTitle.trim() || undefined,
      experienceLevel,
      missingKeywords: result.missingKeywords,
      suggestedTitles: jobTitle.trim()
        ? [jobTitle.trim()]
        : undefined,
      primaryKeywords: result.missingKeywords.slice(0, 3).join(" "),
    });
    router.push("/jobs");
  };

  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-primary/30 bg-primary/5 p-4">
      <Button type="button" size="sm" onClick={findJobs}>
        <Search className="h-3.5 w-3.5" />
        Find jobs with this resume
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() =>
          downloadResumeOutline(result, jobTitle.trim() || undefined)
        }
      >
        <Download className="h-3.5 w-3.5" />
        Download checklist
      </Button>
    </div>
  );
}
