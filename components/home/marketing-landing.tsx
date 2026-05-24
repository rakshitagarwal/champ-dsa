import Link from "next/link";
import { BookOpen, Briefcase, FileText, Map, Sparkles } from "lucide-react";

export function MarketingLanding() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 text-center sm:py-20">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        For developers leveling up from junior to senior
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Learn DSA with{" "}
        <span className="text-primary">clear explanations</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Solve BossCoder sheet problems LeetCode-style, fill in reference solutions,
        and read revision-focused explanations — then review your resume and find
        roles on top India job portals when you are ready to apply.
      </p>

      <div className="mt-12 grid w-full max-w-3xl gap-4 text-left">
        <LaneCard
          primary
          href="/roadmap"
          icon={<Map className="h-5 w-5" />}
          title="Start learning DSA"
          body="Follow the roadmap, solve sheet problems in the editor, run against examples, and open Explain to revise each approach."
          cta="Open roadmap"
        />
        <LaneCard
          href="/patterns"
          icon={<BookOpen className="h-5 w-5" />}
          title="DSA Patterns"
          body="Forgot what sliding window or two pointers mean? Short explanations for working developers."
          cta="DSA Patterns"
        />
        <LaneCard
          href="/notes"
          icon={<FileText className="h-5 w-5" />}
          title="Recap JavaScript"
          body="Closures, promises, this, and more — plain English notes when fundamentals need a refresh."
          cta="Notes"
        />
        <LaneCard
          href="/jobs/resume"
          icon={<Briefcase className="h-5 w-5" />}
          title="Improve resume & find jobs"
          body="Groq scores your resume with actionable fixes, then opens pre-filled searches on LinkedIn, Naukri, Indeed, and more."
          cta="Resume review"
          secondaryHref="/jobs"
          secondaryCta="Find jobs"
        />
      </div>

      <p className="mt-10 max-w-lg text-xs text-muted-foreground">
        Solving problems works best on a desktop screen (1024px or wider). Notes
        and the compiler are available on tablet too.
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
  secondaryHref,
  secondaryCta,
}: {
  primary?: boolean;
  href: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
  secondaryHref?: string;
  secondaryCta?: string;
}) {
  const cardClass = primary
    ? "rounded-xl border-2 border-primary/40 bg-primary/5 p-6"
    : "rounded-xl border border-border bg-card p-6";

  return (
    <div className={cardClass}>
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
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href={href}
              className={
                primary
                  ? "text-sm font-medium text-primary hover:underline"
                  : "text-sm font-medium text-foreground hover:underline"
              }
            >
              {cta} →
            </Link>
            {secondaryHref && secondaryCta ? (
              <Link
                href={secondaryHref}
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
              >
                {secondaryCta} →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
