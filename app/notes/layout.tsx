import { NotesMobileNav } from "@/components/notes/notes-mobile-nav";
import { NotesSidebar } from "@/components/notes/notes-sidebar";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full">
      <NotesSidebar className="hidden lg:flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <NotesMobileNav className="border-b border-border px-4 py-3 lg:hidden" />
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
