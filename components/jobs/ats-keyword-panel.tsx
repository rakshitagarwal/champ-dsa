"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  keywords: string[];
  jobTitle?: string;
};

export function AtsKeywordPanel({ keywords, jobTitle }: Props) {
  const [copied, setCopied] = useState(false);

  if (keywords.length === 0) return null;

  const copyAll = async () => {
    await navigator.clipboard.writeText(keywords.join(", "));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="rounded-xl border-2 border-amber-500/40 bg-amber-500/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            ATS keywords to add
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {jobTitle
              ? `Weave these into your resume for ${jobTitle} roles.`
              : "Add a target job title for more tailored keywords."}
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => void copyAll()}>
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy all"}
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-md border border-amber-500/30 bg-background px-2.5 py-1 text-xs font-medium"
          >
            {kw}
          </span>
        ))}
      </div>
    </section>
  );
}
