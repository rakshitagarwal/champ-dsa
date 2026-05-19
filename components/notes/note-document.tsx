import Link from "next/link";
import type { NotePage } from "@/types/notes";
import { parseMarkdown } from "@/lib/notes/parse-markdown";
import { Badge } from "@/components/ui/badge";

export function NoteDocument({ page }: { page: NotePage }) {
  const body = page.markdown.replace(/^#\s+.+\n+/, "");
  const html = parseMarkdown(body);

  return (
    <article className="note-document mx-auto w-full max-w-3xl px-4 py-8 lg:px-8">
      <header className="space-y-3 border-b border-border pb-6">
        <Link
          href="/notes"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Notes
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{page.sectionTitle}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{page.title}</h1>
        {page.description ? (
          <p className="text-muted-foreground">{page.description}</p>
        ) : null}
      </header>
      <div
        className="note-prose mt-8 space-y-4 text-[15px] leading-relaxed text-foreground [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_hr]:my-8 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:text-muted-foreground [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/50 [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
