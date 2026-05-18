import { getStore } from "@/lib/storage/learning-store";

const VIZ_KEY = "champdsa-used-visualizer";
const DISMISS_KEY = "champdsa-onboarding-dismissed";

export type ChecklistItem = {
  id: string;
  label: string;
  href: string;
  done: boolean;
};

export function markVisualizerUsed(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VIZ_KEY, "1");
}

export function isOnboardingDismissed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DISMISS_KEY) === "1";
}

export function dismissOnboarding(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DISMISS_KEY, "1");
}

export function getOnboardingChecklist(): ChecklistItem[] {
  const store = getStore();
  const readPattern = Object.values(store.patterns).some((p) => p.conceptDone);
  const solvedPractice = Object.values(store.questions).some(
    (q) => q.status === "solved",
  );
  const triedVisualizer =
    typeof window !== "undefined" && localStorage.getItem(VIZ_KEY) === "1";

  return [
    {
      id: "pattern",
      label: "Read one DSA pattern concept",
      href: "/roadmap",
      done: readPattern,
    },
    {
      id: "visualizer",
      label: "Run a solution and view the walkthrough",
      href: "/practice",
      done: triedVisualizer,
    },
    {
      id: "practice",
      label: "Solve one practice problem",
      href: "/practice",
      done: solvedPractice,
    },
  ];
}

export function isOnboardingComplete(): boolean {
  return getOnboardingChecklist().every((i) => i.done);
}

export function shouldShowOnboarding(): boolean {
  if (isOnboardingDismissed()) return false;
  return !isOnboardingComplete();
}
