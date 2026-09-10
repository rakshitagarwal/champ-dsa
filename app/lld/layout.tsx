import { LldMobileNav } from "@/components/lld/lld-mobile-nav";
import { LldSidebar } from "@/components/lld/lld-sidebar";
import { getAvailableLldDocs } from "@/lib/lld/loader";

export default function LldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAvailableLldDocs();

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <LldSidebar docs={docs} />
      <div className="flex h-full min-h-0 flex-col overflow-hidden lg:pl-60">
        <LldMobileNav
          docs={docs}
          className="shrink-0 border-b border-border px-4 py-3 lg:hidden"
        />
        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
