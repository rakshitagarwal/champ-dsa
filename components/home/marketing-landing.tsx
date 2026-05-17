import Link from "next/link";
import { BookOpen, FileText, Map, Sparkles } from "lucide-react";

export function MarketingLanding() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 text-center sm:py-20">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        For developers leveling up from junior to senior
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Learn DSA with{" "}
        <span className="text-primary">step-by-step visualization</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        See the why behind each line — not just memorized answers. Use the main
        path to learn DSA; jump to recap sections when you need a quick refresh.
      </p>

      <div className="mt-12 grid w-full max-w-3xl gap-4 text-left">
        <LaneCard
          primary
          href="/roadmap"
          icon={<Map className="h-5 w-5" />}
          title="Start learning DSA"
          body="Follow the roadmap, study patterns, practice on the sheet, and step through code in the visualizer."
          cta="Open roadmap"
        />
        <LaneCard
          href="/patterns"
          icon={<BookOpen className="h-5 w-5" />}
          title="Recap DSA patterns"
          body="Forgot what sliding window or two pointers mean? Short explanations for working developers."
          cta="Pattern recap"
        />
        <LaneCard
          href="/js-notes"
          icon={<FileText className="h-5 w-5" />}
          title="Recap JavaScript"
          body="Closures, promises, this, and more — plain English notes when fundamentals need a refresh."
          cta="JS notes"
        />
      </div>

      <p className="mt-10 max-w-lg text-xs text-muted-foreground">
        Practice and the visualizer work best on a desktop screen (1024px or
        wider). JS notes are available on tablet too.
      </p>
    </div>
  );
}

function LaneCard({
  primary,
  href,
  icon,
  title,
  body,
  cta,
}: {
  primary?: boolean;
  href: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "block rounded-xl border-2 border-primary/40 bg-primary/5 p-6 transition-colors hover:bg-primary/10"
          : "block rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-accent/30"
      }
    >
      <div className="flex items-start gap-4">
        <span
          className={
            primary
              ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              : "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary"
          }
        >
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {body}
          </p>
          <span
            className={
              primary
                ? "mt-3 inline-block text-sm font-medium text-primary"
                : "mt-3 inline-block text-sm font-medium text-foreground"
            }
          >
            {cta} →
          </span>
        </div>
      </div>
    </Link>
  );
}
