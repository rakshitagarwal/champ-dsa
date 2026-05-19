import { notFound } from "next/navigation";
import { NoteDocument } from "@/components/notes/note-document";
import { getAllNotePages, getNotePage } from "@/lib/notes/loader";

type Props = {
  params: Promise<{ section: string; page: string }>;
};

export function generateStaticParams() {
  return getAllNotePages().map(({ sectionId, slug }) => ({
    section: sectionId,
    page: slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { section, page: pageSlug } = await params;
  const note = getNotePage(section, pageSlug);
  if (!note) return { title: "Notes" };
  return {
    title: `${note.title} · ${note.sectionTitle}`,
    description: note.description,
  };
}

export default async function NotePageRoute({ params }: Props) {
  const { section, page: pageSlug } = await params;
  const note = getNotePage(section, pageSlug);
  if (!note) notFound();
  return <NoteDocument page={note} />;
}
