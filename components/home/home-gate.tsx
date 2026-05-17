"use client";

import { useEffect, useState } from "react";
import { hasLearningActivity } from "@/lib/storage/learning-store";
import { LEARNING_UPDATED_EVENT } from "@/lib/storage/learning-store";
import { LearningHub } from "./learning-hub";
import { MarketingLanding } from "@/components/home/marketing-landing";

export function HomeGate() {
  const [active, setActive] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setActive(hasLearningActivity());
    check();
    window.addEventListener(LEARNING_UPDATED_EVENT, check);
    return () => window.removeEventListener(LEARNING_UPDATED_EVENT, check);
  }, []);

  if (active === null) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return active ? <LearningHub /> : <MarketingLanding />;
}
