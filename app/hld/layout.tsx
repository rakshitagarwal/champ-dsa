import { SdMobileNav } from "@/components/system-design/sd-mobile-nav";
import { SdSidebar } from "@/components/system-design/sd-sidebar";
import { getAvailableSdDocs } from "@/lib/system-design/loader";

export default function SystemDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getAvailableSdDocs();

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <SdSidebar docs={docs} />
      <div className="flex h-full min-h-0 flex-col overflow-hidden lg:pl-60">
        <SdMobileNav
          docs={docs}
          className="shrink-0 border-b border-border px-4 py-3 lg:hidden"
        />
        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
