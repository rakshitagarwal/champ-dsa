import { notFound } from "next/navigation";
import { NoteDocument } from "@/components/notes/note-document";
import { getAllNoteSlugs, getNoteBySlug } from "@/lib/notes/loader";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getNoteBySlug(slug);
  if (!doc) return { title: "Notes" };
  return {
    title: `${doc.title} · Notes`,
    description: doc.description,
  };
}

export default async function NotePageRoute({ params }: Props) {
  const { slug } = await params;
  const doc = getNoteBySlug(slug);
  if (!doc) notFound();
  return <NoteDocument doc={doc} />;
}
