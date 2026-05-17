"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, X } from "lucide-react";
import {
  dismissOnboarding,
  getOnboardingChecklist,
  shouldShowOnboarding,
} from "@/lib/onboarding/checklist";
import { LEARNING_UPDATED_EVENT } from "@/lib/storage/learning-store";

export function OnboardingChecklist() {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState(getOnboardingChecklist);

  const refresh = () => {
    setItems(getOnboardingChecklist());
    setVisible(shouldShowOnboarding());
  };

  useEffect(() => {
    refresh();
    window.addEventListener(LEARNING_UPDATED_EVENT, refresh);
    window.addEventListener("champdsa-visualizer-used", refresh);
    return () => {
      window.removeEventListener(LEARNING_UPDATED_EVENT, refresh);
      window.removeEventListener("champdsa-visualizer-used", refresh);
    };
  }, []);

  if (!visible) return null;

  return (
    <section className="rounded-xl border border-primary/30 bg-primary/5 p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold">Getting started</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Three steps to get value from ChampDSA — no account needed.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            dismissOnboarding();
            setVisible(false);
          }}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Dismiss checklist"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm transition-colors hover:bg-background"
            >
              {item.done ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-muted-foreground/50" />
              )}
              <span className={item.done ? "text-muted-foreground line-through" : ""}>
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
