"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Question } from "@/types/question";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  getProgress,
  markForgot,
  markRemembered,
  saveNotes,
  touchQuestion,
} from "@/lib/storage/progress";
import { MiniVizPreview } from "./mini-viz-preview";

export function QuestionDetail({ question }: { question: Question }) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    touchQuestion(question.id);
    setNotes(getProgress(question.id).notes);
  }, [question.id]);

  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <div>
        <Link
          href={`/practice/${question.id}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to practice
        </Link>
        <h1 className="mt-2 text-2xl font-bold">{question.title}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge>{question.patternName}</Badge>
          <Badge variant="outline">{question.difficulty}</Badge>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="mb-2 font-semibold">Problem</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {question.statement}
        </p>
      </section>

      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="mb-2 font-semibold">Pattern recognition</h2>
        <p className="mb-3 text-sm">
          Pattern: <strong>{question.patternName}</strong>
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {question.patternHints.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      {question.miniVizPreview && (
        <MiniVizPreview preview={question.miniVizPreview} />
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/practice/${question.id}`}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Open practice
        </Link>
        <Button variant="outline" onClick={() => markRemembered(question.id)}>
          I remember this
        </Button>
        <Button variant="secondary" onClick={() => markForgot(question.id)}>
          I forgot this
        </Button>
      </div>

      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="mb-2 font-semibold">Revision notes</h2>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => saveNotes(question.id, notes)}
          placeholder="Tricks, edge cases, intuition…"
          className="min-h-[120px]"
        />
      </section>
    </article>
  );
}
