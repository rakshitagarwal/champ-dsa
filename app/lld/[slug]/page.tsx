import { notFound } from "next/navigation";
import { LldDocumentView } from "@/components/lld/lld-document";
import { getAllLldSlugs, getLldBySlug } from "@/lib/lld/loader";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllLldSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getLldBySlug(slug);
  if (!doc) return { title: "LLD" };
  return {
    title: `${doc.title} · LLD`,
    description: doc.title,
  };
}

export default async function LldTopicPage({ params }: Props) {
  const { slug } = await params;
  const doc = getLldBySlug(slug);
  if (!doc) notFound();
  return <LldDocumentView doc={doc} />;
}
