"use client";

import type { AiExplainCommentary } from "@/types/ai-explain";

type Props = {
  explanation: AiExplainCommentary;
  title?: string | null;
};

export function SolutionExplanationPanel({ explanation, title }: Props) {
  return (
    <article className="space-y-4 p-4 text-sm leading-relaxed text-foreground/95">
      {title ? (
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
      ) : null}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Summary
        </h3>
        <p className="mt-2">{explanation.summary}</p>
      </section>
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Why this code works
        </h3>
        <p className="mt-2 whitespace-pre-wrap">{explanation.whyItWorks}</p>
      </section>
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          How the examples are satisfied
        </h3>
        <p className="mt-2 whitespace-pre-wrap">
          {explanation.howExamplesAreSatisfied}
        </p>
      </section>
      {explanation.keyIdeas.length > 0 ? (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Key ideas
          </h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            {explanation.keyIdeas.map((idea, i) => (
              <li key={i}>{idea}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
