"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  clearPatternAiExplanation,
  loadPatternAiExplanation,
  savePatternAiExplanation,
} from "@/lib/storage/pattern-ai-explain-cache";
import type { PatternAiExplanation } from "@/types/pattern-ai-explain";

type Props = {
  slug: string;
  patternName: string;
};

export function PatternAiExplain({ slug, patternName }: Props) {
  const [open, setOpen] = useState(false);
  const [explanation, setExplanation] = useState<PatternAiExplanation | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setExplanation(loadPatternAiExplanation(slug));
    setOpen(false);
    setError(null);
  }, [slug]);

  const fetchExplanation = useCallback(
    async (force = false) => {
      if (!force) {
        const cached = loadPatternAiExplanation(slug);
        if (cached) {
          setExplanation(cached);
          setOpen(true);
          return;
        }
      }

      setLoading(true);
      setError(null);
      setOpen(true);

      try {
        const res = await fetch("/api/ai/explain-pattern", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Could not generate explanation.");
          return;
        }
        const result = data as PatternAiExplanation;
        setExplanation(result);
        savePatternAiExplanation(slug, result);
      } catch {
        setError("Network error. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [slug],
  );

  const regenerate = () => {
    clearPatternAiExplanation(slug);
    setExplanation(null);
    void fetchExplanation(true);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={loading}
          onClick={() => void fetchExplanation(false)}
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          AI explain
        </Button>
        {explanation && !loading ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide deep dive" : "Show deep dive"}
          </Button>
        ) : null}
      </div>

      {open ? (
        <section className="rounded-xl border border-primary/30 bg-card">
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <div>
                <h2 className="text-sm font-semibold">AI deep dive</h2>
                <p className="text-xs text-muted-foreground">
                  Supplemental notes for {patternName}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 text-xs"
              disabled={loading}
              onClick={regenerate}
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <RefreshCw className="h-3.5 w-3.5" />
              )}
              Regenerate
            </Button>
          </header>

          <div className="px-4 py-5 sm:px-5">
            {loading && !explanation ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-sm text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Generating a detailed explanation…</p>
              </div>
            ) : explanation ? (
              <PatternAiExplainBody explanation={explanation} />
            ) : null}

            {error ? (
              <p className="mt-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PatternAiExplainBody({
  explanation,
}: {
  explanation: PatternAiExplanation;
}) {
  return (
    <article className="space-y-8 text-sm leading-relaxed text-foreground/90">
      <Block title="Deep dive" paragraphs={splitParagraphs(explanation.deepDive)} />
      <Block
        title="Mental model"
        paragraphs={splitParagraphs(explanation.mentalModel)}
      />
      <BulletBlock title="When you see it in a problem" items={explanation.whenYouSeeIt} />
      <OrderedBlock title="How to apply it step by step" items={explanation.howToApply} />
      <Block
        title="Example walkthrough"
        paragraphs={splitParagraphs(explanation.exampleWalkthrough)}
      />
      <BulletBlock title="Interview tips" items={explanation.interviewTips} />
      <BulletBlock title="Pitfalls (expanded)" items={explanation.pitfallsExpanded} />
      <Block
        title="When to pick something else"
        paragraphs={splitParagraphs(explanation.whenToPickSomethingElse)}
      />
    </article>
  );
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function Block({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <div className="mt-2 space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i} className="whitespace-pre-wrap">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function BulletBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function OrderedBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      <ol className="mt-2 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <span className="pt-0.5">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
