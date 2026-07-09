import { NoteDocumentBody } from "@/components/notes/note-document-body";
import { TipsQuickActions } from "@/components/tips/tips-quick-actions";
import { parseNoteSegments } from "@/lib/notes/parse-markdown";
import type { TipsDocument as TipsDoc } from "@/lib/tips/loader";

type TipsDocumentProps = {
  doc: TipsDoc;
};

export function TipsDocument({ doc }: TipsDocumentProps) {
  const body = doc.markdown.replace(/^#\s+.+\n+/, "");
  const segments = parseNoteSegments(body);

  return (
    <article className="w-full min-w-0">
      <header className="mb-6 space-y-3 border-b border-border/60 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {doc.title}
        </h1>
        {doc.description ? (
          <p className="text-muted-foreground">{doc.description}</p>
        ) : null}
        <TipsQuickActions slug={doc.slug} />
      </header>
      <NoteDocumentBody segments={segments} />
    </article>
  );
}
