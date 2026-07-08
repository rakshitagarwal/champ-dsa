"use client";

import { FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnalyzerStep = "upload" | "analyzing" | "report" | "jobs";

type Props = {
  activeStep: AnalyzerStep;
  hasReport: boolean;
  onStepClick?: (step: AnalyzerStep) => void;
};

const STEPS: { id: AnalyzerStep; label: string; requiresReport?: boolean }[] = [
  { id: "upload", label: "ATS scoring" },
  { id: "report", label: "Domain intelligence", requiresReport: true },
  { id: "jobs", label: "Job search", requiresReport: true },
];

export function CvAnalyzerHeader({
  activeStep,
  hasReport,
  onStepClick,
}: Props) {
  const resolvedActive =
    activeStep === "analyzing" ? "upload" : activeStep;

  return (
    <header className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileSearch className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            CV Analyzer & Job Finder
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload your resume, get an ATS score, then search jobs across top
            platforms.
          </p>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2">
        {STEPS.map((step) => {
          const disabled = step.requiresReport && !hasReport;
          const isActive =
            resolvedActive === step.id ||
            (activeStep === "analyzing" && step.id === "upload");
          return (
            <button
              key={step.id}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onStepClick?.(step.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : disabled
                    ? "cursor-not-allowed border-border text-muted-foreground/50"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {step.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
