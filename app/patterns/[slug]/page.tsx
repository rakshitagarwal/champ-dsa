import { notFound } from "next/navigation";
import { getDsaNoteBySlug, getAllDsaSlugs } from "@/lib/dsa/loader";
import { DsaDocument } from "@/components/learn/dsa-document";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDsaSlugs().map((slug) => ({ slug }));
}

export default async function PatternDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDsaNoteBySlug(slug);
  if (!doc) notFound();
  return <DsaDocument doc={doc} />;
}
