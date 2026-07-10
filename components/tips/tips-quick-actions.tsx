"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { TipsTabSlug } from "@/data/tips/manifest";
import { cn } from "@/lib/utils";
import { Briefcase, Building2, BookOpen, Code2, UserPlus, ExternalLink } from "lucide-react";

type QuickAction = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const ACTIONS: Record<TipsTabSlug, QuickAction[]> = {
  resume: [{ label: "Open ATS scorer", href: "/jobs", icon: Briefcase }],
  linkedin: [
    { label: "Browse companies", href: "/companies", icon: Building2 },
    { label: "CV & Jobs", href: "/jobs", icon: Briefcase },
  ],
  projects: [
    { label: "DSA Patterns", href: "/patterns", icon: BookOpen },
    { label: "Score my resume", href: "/jobs", icon: Briefcase },
  ],
  interview: [
    { label: "DSA Patterns", href: "/patterns", icon: BookOpen },
    { label: "Solve problems", href: "/practice", icon: Code2 },
  ],
  email: [
    { label: "Browse companies", href: "/companies", icon: Building2 },
    { label: "CV & Jobs", href: "/jobs", icon: Briefcase },
  ],
  referral: [
    { label: "Browse companies", href: "/companies", icon: Building2 },
    { label: "LinkedIn tips", href: "/tips?tab=linkedin", icon: ExternalLink },
  ],
};

type TipsQuickActionsProps = {
  slug: TipsTabSlug;
};

export function TipsQuickActions({ slug }: TipsQuickActionsProps) {
  const actions = ACTIONS[slug];
  if (!actions.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={`${slug}-${action.label}`}
            href={action.href}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            <Icon className="size-3.5" />
            {action.label}
          </Link>
        );
      })}
    </div>
  );
}
