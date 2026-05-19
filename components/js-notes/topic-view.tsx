import Link from "next/link";
import type { JsNoteTopic } from "@/types/js-note";
import { Badge } from "@/components/ui/badge";
import { getJsArticleBody } from "@/lib/js-notes/article-bodies";
import { cn } from "@/lib/utils";

export function JsNoteTopicView({ topic }: { topic: JsNoteTopic }) {
  const article = getJsArticleBody(topic.slug);

  return (
    <article className="w-full px-4 py-6 lg:px-8 lg:py-8 xl:px-10">
      <header className="mx-auto max-w-3xl space-y-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{topic.category}</Badge>
          <span className="text-xs text-muted-foreground">
            Topic {topic.order}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
          {topic.title}
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          {topic.summary}
        </p>
        {article?.sourceUrls?.length ? (
          <p className="text-sm text-muted-foreground">
            Full lesson from{" "}
            {article.sourceUrls.map((url, i) => (
              <span key={url}>
                {i > 0 ? ", " : null}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  javascript.info
                </a>
              </span>
            ))}
            . Content © javascript.info contributors (tutorial license).
          </p>
        ) : null}
      </header>

      {article?.html ? (
        <div
          className={cn(
            "js-note-article mx-auto mt-8 max-w-3xl",
            "text-base leading-[1.75] text-foreground/90",
            "[&_h1]:mb-4 [&_h1]:mt-10 [&_h1]:text-2xl [&_h1]:font-bold",
            "[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold",
            "[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold",
            "[&_p]:mb-4",
            "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
            "[&_pre.js-note-code]:my-4 [&_pre.js-note-code]:overflow-x-auto [&_pre.js-note-code]:rounded-lg [&_pre.js-note-code]:border [&_pre.js-note-code]:border-border [&_pre.js-note-code]:bg-editor [&_pre.js-note-code]:p-4 [&_pre.js-note-code]:font-mono [&_pre.js-note-code]:text-sm",
            "[&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline",
            "[&_blockquote.js-note-callout]:my-4 [&_blockquote.js-note-callout]:border-l-4 [&_blockquote.js-note-callout]:border-primary/50 [&_blockquote.js-note-callout]:bg-primary/5 [&_blockquote.js-note-callout]:px-4 [&_blockquote.js-note-callout]:py-3 [&_blockquote.js-note-callout]:text-sm",
            "[&_hr.js-note-hr]:my-10 [&_hr.js-note-hr]:border-border",
          )}
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      ) : (
        <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          <p>
            Full javascript.info content is not cached yet for this topic.
          </p>
          <p className="mt-2">
            Run{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              npm run fetch:jsinfo
            </code>{" "}
            to import the lesson.
          </p>
        </div>
      )}

      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-3 border-t border-border pt-8">
        <Link
          href="/practice"
          className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Open practice
        </Link>
        {article?.sourceUrls?.[0] ? (
          <a
            href={article.sourceUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-md border border-border px-5 text-sm font-medium hover:bg-accent"
          >
            Read on javascript.info ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}
