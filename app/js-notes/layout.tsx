import { JsNotesMobileNav } from "@/components/js-notes/js-notes-mobile-nav";
import { JsNotesSidebar } from "@/components/js-notes/js-notes-sidebar";

export default function JsNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full">
      <JsNotesSidebar className="hidden lg:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <JsNotesMobileNav className="border-b border-border px-4 py-3 lg:hidden" />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
