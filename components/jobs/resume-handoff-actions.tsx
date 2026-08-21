"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadResumeOutline } from "@/lib/jobs/export-resume-outline";
import type { ResumeReviewResult } from "@/types/resume-review";

type Props = {
  result: ResumeReviewResult;
  jobTitle: string;
};

export function ResumeHandoffActions({ result, jobTitle }: Props) {
  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-card p-4">
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
