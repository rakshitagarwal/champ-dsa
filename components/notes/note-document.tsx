import Link from "next/link";
import type { NoteDocument } from "@/types/notes";
import { extractH2Headings, parseMarkdown } from "@/lib/notes/parse-markdown";

const proseClass = "note-prose mt-8 space-y-4";

export function NoteDocument({ doc }: { doc: NoteDocument }) {
  const body = doc.markdown.replace(/^#\s+.+\n+/, "");
  const html = parseMarkdown(body);
  const headings = extractH2Headings(body);

  return (
    <div className="flex h-full min-h-0 w-full">
      <article className="note-document min-h-0 min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
          <header className="space-y-3 border-b border-border pb-6">
            <Link
              href="/notes"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Notes
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
            {doc.description ? (
              <p className="text-muted-foreground">{doc.description}</p>
            ) : null}
          </header>
          <div
            className={`mt-8 ${proseClass}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>

      {headings.length > 0 ? (
        <aside
          aria-label="On this page"
          className="hidden h-full w-52 shrink-0 border-l border-border bg-panel/30 lg:block"
        >
          <nav className="flex h-full flex-col px-4 py-8">
            <p className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <ul className="mt-3 min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-contain border-l border-border pl-3 [scrollbar-width:thin]">
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
    </div>
  );
}
