import { redirect } from "next/navigation";
import { NOTE_SECTIONS } from "@/data/notes/manifest";

export default function NotesIndexPage() {
  const first = NOTE_SECTIONS[0];
  const page = first?.pages[0];
  if (!first || !page) {
    return null;
  }
  redirect(`/notes/${first.id}/${page.slug}`);
}
