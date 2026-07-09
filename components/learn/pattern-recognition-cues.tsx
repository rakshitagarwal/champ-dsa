import { Lightbulb } from "lucide-react";
import { getRecognitionCues } from "@/lib/dsa/recognition-cues";

type Props = {
  slug: string;
};

export function PatternRecognitionCues({ slug }: Props) {
  const cues = getRecognitionCues(slug);
  if (cues.length === 0) return null;

  return (
    <section className="rounded-lg border border-primary/25 bg-primary/5 px-4 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Lightbulb className="h-4 w-4 shrink-0" />
        Recognition cues
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        If the problem says… think this pattern:
      </p>
      <ul className="mt-3 space-y-1.5">
        {cues.map((cue) => (
          <li key={cue} className="flex items-start gap-2 text-sm text-foreground/90">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {cue}
          </li>
        ))}
      </ul>
    </section>
  );
}
