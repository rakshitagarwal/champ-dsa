import Link from "next/link";
import type { JsNoteTopic } from "@/types/js-note";
import { Badge } from "@/components/ui/badge";

export function JsNoteTopicView({ topic }: { topic: JsNoteTopic }) {
  const { content } = topic;

  return (
    <article className="w-full space-y-8 px-4 py-6 lg:px-8 lg:py-8 xl:px-10">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{topic.category}</Badge>
          <span className="text-xs text-muted-foreground">
            Topic {topic.order}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
          {topic.title}
        </h1>
        <p className="mt-2 max-w-4xl text-lg leading-relaxed text-muted-foreground">
          {topic.summary}
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        <SimpleCallout title="In simple English">{content.simple}</SimpleCallout>

        <Section title="Go a bit deeper">
          <div className="space-y-4">
            {content.deepDive.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-relaxed text-foreground/90"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      </div>

      <Section title="How to explain this to someone else">
        <p className="mb-3 text-sm text-muted-foreground">
          If you can teach it out loud, you own it. Try these talking points:
        </p>
        <ul className="grid gap-2 md:grid-cols-2">
          {content.teachBack.map((tip) => (
            <li
              key={tip}
              className="flex gap-3 rounded-lg bg-muted/40 px-4 py-3 text-sm leading-relaxed"
            >
              <span className="mt-0.5 shrink-0 text-primary">→</span>
              {tip}
            </li>
          ))}
        </ul>
      </Section>

      {content.practiceLinks && content.practiceLinks.length > 0 && (
        <Section title="Practice problems">
          <p className="mb-3 text-sm text-muted-foreground">
            From your notes — try these on paper first, then in practice.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {content.practiceLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="shrink-0 text-primary">↗</span>
                  <span>{link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Examples">
        <div className="grid gap-6 lg:grid-cols-2">
          {content.examples.map((ex) => (
            <div
              key={ex.title}
              className="rounded-lg border border-border/60 bg-muted/20 p-4"
            >
              <h3 className="mb-2 font-medium">{ex.title}</h3>
              <pre className="overflow-x-auto rounded-lg border border-border bg-editor p-4 font-mono text-sm leading-relaxed">
                {ex.code}
              </pre>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {ex.explanation}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <Link
          href="/practice"
          className="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Open practice
        </Link>
      </div>
    </article>
  );
}

function SimpleCallout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full rounded-xl border-l-4 border-primary bg-primary/5 px-6 py-5">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <p className="mt-2 text-base leading-relaxed text-foreground/90">
        {children}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 lg:p-8">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

