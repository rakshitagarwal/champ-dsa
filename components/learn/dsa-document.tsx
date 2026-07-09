import type { DsaDocument } from "@/lib/dsa/loader";
import { parseNoteSegments } from "@/lib/notes/parse-markdown";
import { NoteDocumentBody } from "@/components/notes/note-document-body";
import { PatternRecognitionCues } from "@/components/learn/pattern-recognition-cues";
import { Badge } from "@/components/ui/badge";
import { TIER_LABELS } from "@/data/dsa/manifest";

export function DsaDocument({ doc }: { doc: DsaDocument }) {
  const body = doc.markdown.replace(/^#\s+.+\n+/, "");
  const segments = parseNoteSegments(body);

  return (
    <article className="scrollbar-hide h-full min-h-0 w-full overflow-y-auto overscroll-contain">
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
  );
}
