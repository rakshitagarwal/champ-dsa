import Link from "next/link";
import type { NoteDocument } from "@/types/notes";
import { extractH2Headings, parseMarkdown } from "@/lib/notes/parse-markdown";

const proseClass =
  "note-prose space-y-4 text-[15px] leading-relaxed text-foreground [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:scroll-mt-6 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_hr]:my-8 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:text-muted-foreground [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/50 [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted/50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_ul]:list-disc [&_ul]:pl-6 [&_.note-table-wrap]:my-4 [&_.note-table-wrap]:overflow-x-auto";

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
