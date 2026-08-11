"use client";

import { Suspense } from "react";
import { DsaSheetSidebar } from "@/components/dsa-sheet/dsa-sheet-sidebar";
import { DsaSheetMobileNav } from "@/components/dsa-sheet/dsa-sheet-mobile-nav";
import type { RoadmapPhase } from "@/types/dsa-sheet";

type ShellProps = {
  phases: RoadmapPhase[];
  children: React.ReactNode;
};

export function DsaSheetShell({ phases, children }: ShellProps) {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <Suspense fallback={null}>
        <DsaSheetSidebar phases={phases} />
      </Suspense>
      <div className="flex h-full min-h-0 flex-col overflow-hidden lg:pl-56">
        <Suspense fallback={null}>
          <DsaSheetMobileNav
            phases={phases}
            className="shrink-0 border-b border-border px-4 py-3 lg:hidden"
          />
        </Suspense>
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </main>
      </div>
    </div>
  );
}
