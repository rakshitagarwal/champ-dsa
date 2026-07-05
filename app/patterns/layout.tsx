import { DsaPatternsMobileNav } from "@/components/learn/dsa-patterns-mobile-nav";
import { DsaPatternsSidebar } from "@/components/learn/dsa-patterns-sidebar";
import { getAllPatterns } from "@/data/patterns";

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const patterns = getAllPatterns();

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <DsaPatternsSidebar patterns={patterns} />
      <div className="flex h-full min-h-0 flex-col overflow-hidden lg:pl-56">
        <DsaPatternsMobileNav
          patterns={patterns}
          className="shrink-0 border-b border-border px-4 py-3 lg:hidden"
        />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
