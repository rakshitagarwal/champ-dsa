"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { TipsTabSlug } from "@/data/tips/manifest";
import { cn } from "@/lib/utils";
import {
  Building2,
  BookOpen,
  Code2,
  ExternalLink,
  Network,
} from "lucide-react";

type QuickAction = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const ACTIONS: Record<TipsTabSlug, QuickAction[]> = {
  resume: [],
  linkedin: [{ label: "Browse companies", href: "/companies", icon: Building2 }],
  projects: [
    { label: "DSA Patterns", href: "/patterns", icon: BookOpen },
    { label: "HLD", href: "/hld", icon: Network },
  ],
  interview: [
    { label: "DSA Patterns", href: "/patterns", icon: BookOpen },
    { label: "DSA Sheet", href: "/practice", icon: Code2 },
    { label: "HLD", href: "/hld", icon: Network },
  ],
  email: [{ label: "Browse companies", href: "/companies", icon: Building2 }],
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
