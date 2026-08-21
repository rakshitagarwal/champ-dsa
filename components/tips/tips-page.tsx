"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TipsTabs } from "@/components/tips/tips-tabs";
import { TipsDocument } from "@/components/tips/tips-document";
import {
  DEFAULT_TIPS_TAB,
  isTipsTabSlug,
} from "@/data/tips/manifest";
import type { TipsDocument as TipsDoc } from "@/lib/tips/loader";
import { markTipsVisited } from "@/lib/onboarding/checklist";
import { Sparkles } from "lucide-react";

type TipsPageProps = {
  tips: TipsDoc[];
};

function TipsPageContent({ tips }: TipsPageProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeSlug = isTipsTabSlug(tabParam) ? tabParam : DEFAULT_TIPS_TAB;
  const activeDoc = tips.find((t) => t.slug === activeSlug) ?? tips[0];

  useEffect(() => {
    markTipsVisited();
  }, []);

  if (!activeDoc) {
    return (
      <p className="text-muted-foreground">No tips content available yet.</p>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm">
        <Sparkles
          className="mt-0.5 size-4 shrink-0 text-primary"
          aria-hidden
        />
        <p>
          <strong className="font-medium text-foreground">
            Senior loops reward a pipeline, not a perfect PDF.
          </strong>{" "}
          Pick one action from this tab and do it in the next 15 minutes.
        </p>
      </div>

      <TipsTabs activeSlug={activeSlug} />
      <div className="mt-6 pb-8">
        <TipsDocument doc={activeDoc} />
      </div>
    </>
  );
}

export function TipsPage({ tips }: TipsPageProps) {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading tips…</p>}>
      <TipsPageContent tips={tips} />
    </Suspense>
  );
}
