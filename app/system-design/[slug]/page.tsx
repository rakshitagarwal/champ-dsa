import { notFound } from "next/navigation";
import { SdDocumentView } from "@/components/system-design/sd-document";
import { getAllSdSlugs, getSdBySlug } from "@/lib/system-design/loader";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSdSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getSdBySlug(slug);
  if (!doc) return { title: "HLD" };
  return {
    title: `${doc.title} · HLD`,
    description: doc.description,
  };
}

export default async function SystemDesignPage({ params }: Props) {
  const { slug } = await params;
  const doc = getSdBySlug(slug);
  if (!doc) notFound();
  return <SdDocumentView doc={doc} />;
}
