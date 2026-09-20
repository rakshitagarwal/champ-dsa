import type { SdDocument } from "@/types/system-design";
import { NoteDocumentBody } from "@/components/notes/note-document-body";
import { parseNoteSegments } from "@/lib/notes/parse-markdown";

export function SdDocumentView({ doc }: { doc: SdDocument }) {
  const body = doc.markdown.replace(/^#\s+.+\n+/, "");
  const segments = parseNoteSegments(body, { enableRunnable: false });

  return (
    <article className="note-document scrollbar-hide h-full min-h-0 w-full overflow-y-auto overscroll-contain">
      <div className="w-full min-w-0 px-4 py-8 sm:px-5 lg:px-6">
        <header className="space-y-3 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              ChampDSA · HLD
            </p>
            {doc.core8 ? (
              <span className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                Core 8
              </span>
            ) : null}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
          {doc.description ? (
            <p className="text-muted-foreground">{doc.description}</p>
          ) : null}
        </header>
        <NoteDocumentBody segments={segments} />
      </div>
    </article>
  );
}
