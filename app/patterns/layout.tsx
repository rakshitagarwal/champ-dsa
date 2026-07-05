import { DsaPatternsMobileNav } from "@/components/learn/dsa-patterns-mobile-nav";
import { DsaPatternsSidebar } from "@/components/learn/dsa-patterns-sidebar";
import { getAvailableDsaNotes } from "@/lib/dsa/loader";

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notes = getAvailableDsaNotes();

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <DsaPatternsSidebar notes={notes} />
      <div className="flex h-full min-h-0 flex-col overflow-hidden lg:pl-56">
        <DsaPatternsMobileNav
          notes={notes}
          className="shrink-0 border-b border-border px-4 py-3 lg:hidden"
        />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
