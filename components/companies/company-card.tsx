import type { Company } from "@/data/companies";
import { getCategoryLabel } from "@/data/companies";
import { ExternalLink, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  company: Company;
};

const CATEGORY_STYLES: Record<string, string> = {
  "global-tech": "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  "high-comp": "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  "indian-product": "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  fintech: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
  cybersecurity: "bg-red-500/15 text-red-700 dark:text-red-300",
  "dev-tools": "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  analytics: "bg-pink-500/15 text-pink-700 dark:text-pink-300",
  edtech: "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  engineering: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  "it-services": "bg-slate-500/15 text-slate-700 dark:text-slate-300",
};

export function CompanyCard({ company }: Props) {
  const initial = company.name.charAt(0);

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card transition-colors hover:border-primary/30 hover:shadow-sm">
      <div className="flex items-start gap-3 px-4 pt-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold">{company.name}</h3>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {company.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 pt-3">
        <span
          className={cn(
            "inline-block rounded-full px-2 py-0.5 text-[11px] font-medium",
            CATEGORY_STYLES[company.category] ?? "bg-muted text-muted-foreground",
          )}
        >
          {getCategoryLabel(company.category)}
        </span>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-border px-4 py-3">
        <a
          href={company.careerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Briefcase className="h-3.5 w-3.5" />
          View careers
          <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href={company.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          Website
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
