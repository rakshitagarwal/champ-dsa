import Link from "next/link";
import type { NoteDocument } from "@/types/notes";
import { extractH2Headings, parseMarkdown } from "@/lib/notes/parse-markdown";
import { cn } from "@/lib/utils";

const proseClass = "note-prose mt-8 space-y-4";

export function NoteDocument({ doc }: { doc: NoteDocument }) {
  const body = doc.markdown.replace(/^#\s+.+\n+/, "");
  const html = parseMarkdown(body);
  const headings = extractH2Headings(body);

  return (
    <>
      <article
        className={cn(
          "note-document scrollbar-hide h-full min-h-0 overflow-y-auto overscroll-contain",
          headings.length > 0 && "lg:pr-52",
        )}
      >
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
