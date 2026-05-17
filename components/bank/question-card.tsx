"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Question } from "@/types/question";
import { Badge } from "@/components/ui/badge";
import { isDue, getProgress } from "@/lib/storage/progress";

export function QuestionCard({ question }: { question: Question }) {
  const [due, setDue] = useState(false);

  useEffect(() => {
    setDue(isDue(getProgress(question.id)));
  }, [question.id]);

  return (
    <Link
      href={`/bank/${question.patternSlug}/${question.id}`}
      className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/5"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-medium">{question.title}</h3>
        {due && <Badge variant="warning">Review due</Badge>}
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{question.patternName}</Badge>
        <Badge variant="outline">{question.difficulty}</Badge>
      </div>
    </Link>
  );
}
