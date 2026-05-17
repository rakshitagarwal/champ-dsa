import { notFound } from "next/navigation";
import { getPatternBySlug } from "@/data/patterns";
import { PatternConceptView } from "@/components/bank/pattern-concept-view";

type Props = { params: Promise<{ slug: string }> };

export default async function LearnPatternPage({ params }: Props) {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  if (!pattern) notFound();
  return (
    <div className="w-full">
      <PatternConceptView pattern={pattern} />
    </div>
  );
}
