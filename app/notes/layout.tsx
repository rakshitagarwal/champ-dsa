import { NotesMobileNav } from "@/components/notes/notes-mobile-nav";
import { NotesSidebar } from "@/components/notes/notes-sidebar";
import { getAvailableNotes } from "@/lib/notes/loader";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notes = getAvailableNotes();

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      <NotesSidebar notes={notes} className="hidden h-full shrink-0 lg:flex" />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <NotesMobileNav
          notes={notes}
          className="shrink-0 border-b border-border px-4 py-3 lg:hidden"
        />
        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
