"use client";

import { Suspense, useEffect, useState } from "react";
import { DsaSheetSidebar } from "@/components/dsa-sheet/dsa-sheet-sidebar";
import { DsaSheetMobileNav } from "@/components/dsa-sheet/dsa-sheet-mobile-nav";
import { DsaSheetList } from "@/components/dsa-sheet/dsa-sheet-list";
import type { StriverQuestion, StriverSectionMeta } from "@/types/dsa-sheet";
import { DSA_SHEET_UPDATED_EVENT, getCompletedCount } from "@/lib/storage/dsa-sheet-store";

type ShellProps = {
  sections: StriverSectionMeta[];
  questions: StriverQuestion[];
};

function SidebarWithProgress({ sections, totalCount }: { sections: StriverSectionMeta[]; totalCount: number }) {
  const [, tick] = useState(0);
  useEffect(() => {
    const refresh = () => tick((n) => n + 1);
    window.addEventListener(DSA_SHEET_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(DSA_SHEET_UPDATED_EVENT, refresh);
  }, []);
  void getCompletedCount();
  return <DsaSheetSidebar sections={sections} totalCount={totalCount} />;
}

export function DsaSheetShell({ sections, questions }: ShellProps) {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <Suspense fallback={null}>
        <SidebarWithProgress sections={sections} totalCount={questions.length} />
      </Suspense>
      <div className="flex h-full min-h-0 flex-col overflow-hidden lg:pl-56">
        <Suspense fallback={null}>
          <DsaSheetMobileNav
            sections={sections}
            totalCount={questions.length}
            className="shrink-0 border-b border-border px-4 py-3 lg:hidden"
          />
        </Suspense>
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <Suspense fallback={<p className="p-8 text-muted-foreground">Loading…</p>}>
            <DsaSheetList questions={questions} sections={sections} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
