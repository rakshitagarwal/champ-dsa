"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { TIPS_CATALOG, type TipsTabMeta } from "@/data/tips/manifest";
import { FileText, UserRound, FolderGit2, MessageCircle, Mail, Handshake } from "lucide-react";

const ICONS = {
  resume: FileText,
  linkedin: UserRound,
  projects: FolderGit2,
  interview: MessageCircle,
  email: Mail,
  referral: Handshake,
} as const;

type TipsTabsProps = {
  activeSlug: string;
};

export function TipsTabs({ activeSlug }: TipsTabsProps) {
  return (
    <div className="sticky top-0 z-10 -ml-6 border-b border-border/60 bg-background/95 pl-6 pr-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:-ml-8 sm:pl-8 sm:pr-5 lg:-ml-10 lg:pl-10 lg:pr-6">
      <nav
        className="flex gap-1 overflow-x-auto pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Tips and tricks topics"
      >
        {TIPS_CATALOG.map((tip: TipsTabMeta) => {
          const Icon = ICONS[tip.slug];
          const isActive = tip.slug === activeSlug;
          return (
            <Link
              key={tip.slug}
              href={`/tips?tab=${tip.slug}`}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-t-lg border-b-2 px-3 py-2.5 text-sm font-medium transition-colors sm:px-4",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              <span className="whitespace-nowrap">{tip.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
