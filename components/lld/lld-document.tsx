import type { LldTopicWithNum } from "@/data/lld/topics";
import { NoteDocumentBody } from "@/components/notes/note-document-body";
import { parseNoteSegments } from "@/lib/notes/parse-markdown";
import { cn } from "@/lib/utils";

export function LldDocumentView({ doc }: { doc: LldTopicWithNum }) {
  const segments = parseNoteSegments(doc.body, { enableRunnable: false });

  return (
    <article className="note-document scrollbar-hide h-full min-h-0 w-full overflow-y-auto overscroll-contain">
      <div className="w-full min-w-0 px-4 py-8 sm:px-6 lg:px-10">
        <header className="space-y-3 border-b border-border pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            ChampDSA · LLD
          </p>
          <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
          <p
            className={cn(
              "inline-block rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground",
            )}
          >
            {doc.tag}
          </p>
        </header>
        <NoteDocumentBody segments={segments} />
      </div>
    </article>
  );
}
