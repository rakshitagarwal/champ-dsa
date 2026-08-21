import type { DsaDocument as DsaDocumentType } from "@/lib/dsa/loader";
import {
  extractH2Headings,
  parseNoteSegments,
} from "@/lib/notes/parse-markdown";
import { NoteDocumentBody } from "@/components/notes/note-document-body";
import { PatternRecognitionCues } from "@/components/learn/pattern-recognition-cues";
import { Badge } from "@/components/ui/badge";
import { TIER_LABELS } from "@/data/dsa/manifest";
import { cn } from "@/lib/utils";

export function DsaDocument({ doc }: { doc: DsaDocumentType }) {
  const body = doc.markdown.replace(/^#\s+.+\n+/, "");
  const segments = parseNoteSegments(body);
  const headings = extractH2Headings(body);

  return (
    <>
      <article
        className={cn(
          "scrollbar-hide h-full min-h-0 w-full overflow-y-auto overscroll-contain",
          headings.length > 0 && "lg:pr-52",
        )}
      >
        <div className="w-full min-w-0 px-4 py-8 sm:px-5 lg:px-6">
          <header className="space-y-3 border-b border-border pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
              <Badge variant="secondary" className="text-xs">
                {TIER_LABELS[doc.tier]}
              </Badge>
            </div>
            {doc.description ? (
              <p className="text-muted-foreground">{doc.description}</p>
            ) : null}
          </header>
          <div className="mt-6 space-y-8">
            <PatternRecognitionCues slug={doc.slug} />
            <NoteDocumentBody segments={segments} />
          </div>
        </div>
      </article>

      {headings.length > 0 ? (
        <aside
          aria-label="On this page"
          className="fixed right-0 top-14 z-30 hidden h-[calc(100dvh-3.5rem)] w-52 flex-col overflow-hidden border-l border-border bg-panel/30 lg:flex"
        >
          <nav className="flex h-full flex-col overflow-hidden px-4 py-8">
            <p className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <ul className="scrollbar-hide mt-3 min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-contain border-l border-border pl-3">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="block py-1 text-xs leading-snug text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {h.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      ) : null}
    </>
  );
}
