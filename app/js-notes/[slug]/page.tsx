import { notFound } from "next/navigation";
import { getJsNoteTopicBySlug } from "@/data/js-notes";
import { JsNoteTopicView } from "@/components/js-notes/topic-view";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { getAllJsNoteTopics } = await import("@/data/js-notes");
  return getAllJsNoteTopics().map((t) => ({ slug: t.slug }));
}

export default async function JsNoteTopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getJsNoteTopicBySlug(slug);
  if (!topic) notFound();
  return <JsNoteTopicView topic={topic} />;
}
