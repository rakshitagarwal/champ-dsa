import Link from "next/link";
import type { DsaDocument } from "@/lib/dsa/loader";
import { parseNoteSegments } from "@/lib/notes/parse-markdown";
import { NoteDocumentBody } from "@/components/notes/note-document-body";

export function DsaDocument({ doc }: { doc: DsaDocument }) {
  const body = doc.markdown.replace(/^#\s+.+\n+/, "");
  const segments = parseNoteSegments(body);

  return (
    <article className="scrollbar-hide h-full min-h-0 overflow-y-auto overscroll-contain">
      <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
        <header className="space-y-3 border-b border-border pb-6">
          <Link
            href="/patterns"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Patterns
          </Link>
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
