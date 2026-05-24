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
    <div className="relative h-full min-h-0 w-full overflow-hidden">
      <NotesSidebar notes={notes} />
      <div className="flex h-full min-h-0 flex-col overflow-hidden lg:pl-56">
        <NotesMobileNav
          notes={notes}
          className="shrink-0 border-b border-border px-4 py-3 lg:hidden"
        />
        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
