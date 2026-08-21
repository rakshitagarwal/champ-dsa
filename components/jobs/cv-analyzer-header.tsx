"use client";

import { FileSearch } from "lucide-react";

export function CvAnalyzerHeader() {
  return (
    <header className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <FileSearch className="h-5 w-5" />
      </span>
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          CV Analyzer
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a PDF or DOCX. Get an ATS score, keyword gaps, and line-level
          rewrites. Nothing is stored on a server.
        </p>
      </div>
    </header>
  );
}
