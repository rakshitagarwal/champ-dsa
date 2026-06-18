"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { sheetSections } from "@/data/questions/sheet-meta";
import { getQuestionById, getSheetQuestions } from "@/data/questions";
import { stripSheetSectionNumber } from "@/lib/sheet-display";
import {
  loadPracticeExpandedSub,
  findSubsectionIdForQuestion,
  savePracticeExpandedSub,
  scrollPracticeSubsectionIntoView,
} from "@/lib/storage/practice-list-state";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

function sectionOpenForSub(
  section: (typeof sheetSections)[number],
  expandedSubId: string | null,
): string | null {
  if (!expandedSubId) return null;
  return section.subsections.some((sub) => sub.id === expandedSubId)
    ? expandedSubId
    : null;
}

function onQuestionNavigate(questionId: string) {
  const subsectionId = findSubsectionIdForQuestion(questionId);
  if (subsectionId) savePracticeExpandedSub(subsectionId);
}

export function SheetAccordion() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [expandedSubId, setExpandedSubId] = useState<string | null>(() =>
    loadPracticeExpandedSub(),
  );

  useEffect(() => {
    if (pathname !== "/practice") return;
    const saved = loadPracticeExpandedSub();
    if (!saved) return;
    setExpandedSubId(saved);
    const frame = requestAnimationFrame(() => {
      scrollPracticeSubsectionIntoView(saved);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return getSheetQuestions().filter((question) =>
      question.title.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex max-w-md flex-col gap-1.5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by problem name…"
            className="h-9 w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-sm outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
            aria-label="Search problems by name"
          />
        </div>
        {searchResults ? (
          <p className="text-xs text-muted-foreground">
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "match" : "matches"}
          </p>
        ) : null}
      </div>

      {searchResults ? (
        searchResults.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            No problems match &ldquo;{query.trim()}&rdquo;. Try another name.
          </p>
        ) : (
          <ul className="space-y-2">
            {searchResults.map((q) => (
              <li key={q.id}>
                <Link
                  href={`/practice/${q.id}`}
                  onClick={() => onQuestionNavigate(q.id)}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="font-medium">{q.title}</span>
                  <Badge variant="outline" className="shrink-0">
                    {q.difficulty}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="space-y-10">
          {sheetSections.map((section) => (
            <section key={section.id} className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight">
                {stripSheetSectionNumber(section.title)}
              </h2>
              <Accordion
                open={sectionOpenForSub(section, expandedSubId)}
                onOpenChange={(id) => {
                  if (id) {
                    savePracticeExpandedSub(id);
                    setExpandedSubId(id);
                  } else if (expandedSubId && sectionOpenForSub(section, expandedSubId)) {
                    setExpandedSubId(null);
                  }
                }}
              >
                {section.subsections.map((sub) => (
                  <AccordionItem key={sub.id} id={sub.id}>
                    <AccordionTrigger id={sub.id}>
                      <div className="flex flex-1 items-center justify-between gap-2 pr-2">
                        <span className="font-medium">{sub.title}</span>
                        <Badge variant="outline">
                          {sub.questionIds.length}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent id={sub.id}>
                      <ul className="space-y-2">
                        {sub.questionIds.map((qid) => {
                          const q = getQuestionById(qid);
                          if (!q) return null;
                          return (
                            <li key={qid}>
                              <Link
                                href={`/practice/${qid}`}
                                onClick={() => onQuestionNavigate(qid)}
                                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                              >
                                <span className="font-medium">{q.title}</span>
                                <Badge variant="outline" className="shrink-0">
                                  {q.difficulty}
                                </Badge>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
