"use client";

import Link from "next/link";
import { sheetSections } from "@/data/questions/sheet-meta";
import { getQuestionById } from "@/data/questions";
import { stripSheetSectionNumber } from "@/lib/sheet-display";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function SheetAccordion() {
  return (
    <div className="space-y-10">
      {sheetSections.map((section) => (
        <section key={section.id} className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">
            {stripSheetSectionNumber(section.title)}
          </h2>
          <Accordion>
            {section.subsections.map((sub) => (
              <AccordionItem key={sub.id} id={sub.id}>
                <AccordionTrigger id={sub.id}>
                  <div className="flex flex-1 items-center justify-between gap-2 pr-2">
                    <span className="font-medium">{sub.title}</span>
                    <Badge variant="outline">{sub.questionIds.length}</Badge>
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
  );
}
