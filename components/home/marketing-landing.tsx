import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Building2,
  CheckCircle2,
  Code2,
  FileCheck,
  FileText,
  Globe,
  Layers,
  PenLine,
  Play,
  Sparkles,
  Table2,
  Zap,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EXPLORE = [
  {
    href: "/patterns",
    title: "DSA patterns",
    description: "17 core patterns with LeetCode practice links for revision.",
    icon: BookOpen,
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    href: "/practice",
    title: "Practice",
    description: "Study solutions for 211 problems with pattern explanations.",
    icon: PenLine,
    accent: "from-violet-500/20 to-violet-500/5",
  },
  {
    href: "/notes",
    title: "Notes",
    description: "JavaScript, React, Node, and system design interview notes.",
    icon: FileText,
    accent: "from-amber-500/20 to-amber-500/5",
  },
  {
    href: "/companies",
    title: "Companies",
    description: "Browse 214 IT companies with career page links and recruiter info.",
    icon: Building2,
    accent: "from-blue-500/20 to-blue-500/5",
  },
  {
    href: "/resources",
    title: "Resources",
    description: "Curated learning links for DSA, system design, languages, and DevOps.",
    icon: Bookmark,
    accent: "from-teal-500/20 to-teal-500/5",
  },
  {
    href: "/jobs",
    title: "CV & Jobs",
    description: "Upload your resume for an ATS score, then search jobs on LinkedIn, Naukri, Greenhouse, and more.",
    icon: FileCheck,
    accent: "from-rose-500/20 to-rose-500/5",
  },
  {
    href: "/cheatsheet",
    title: "Cheatsheet",
    description: "Time and space complexity tables for sorting, searching, and more.",
    icon: Table2,
    accent: "from-orange-500/20 to-orange-500/5",
  },
  {
    href: "/compiler",
    title: "Compiler",
    description: "Run JavaScript snippets without leaving the app.",
    icon: Code2,
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
] as const;

const EXPERIENCE = [
  {
    num: "01",
    title: "DSA pattern guides",
    body: "Read recognition cues and pattern notes first, then apply them on the practice sheet.",
    icon: Play,
  },
  {
    num: "02",
    title: "Study mode practice",
    body: "Every problem shows a read-only solution with AI explanations — understand the why, not just the answer.",
    icon: Layers,
  },
  {
    num: "03",
    title: "Company directory",
    body: "214 IT companies organized by category with direct career page links and optional recruiter contacts.",
    icon: Globe,
  },
  {
    num: "04",
    title: "Resource hub",
    body: "15 curated learning links across JavaScript, React, system design, DevOps, and more.",
    icon: CheckCircle2,
  },
] as const;

export function MarketingLanding() {
  return (
    <div className="relative w-full min-h-0">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,hsl(var(--primary)/0.2),transparent_70%)]"
        aria-hidden
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-3 pb-16 pt-10 sm:px-4 sm:pt-14 lg:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Practice, explore, apply — one platform
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          Master interviews.
          <br />
          <span className="text-primary">Land the role.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          From DSA patterns to resume scoring to company research — ChampDSA
          is your all-in-one interview prep toolkit with no account required.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/patterns"
            className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-6")}
          >
            Learn DSA patterns
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/practice"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-6",
            )}
          >
            Solve problems
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          No account required · Desktop recommended
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value="17" label="DSA patterns" />
          <Stat value="211" label="Practice problems" />
          <Stat value="214" label="Companies listed" />
          <Stat value="15" label="Learning resources" />
        </div>
      </section>

      {/* Explore — feature grid */}
      <section className="border-y border-border bg-muted/25 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
          <SectionHeading
            eyebrow="Explore"
            title="Your all-in-one interview toolkit"
            subtitle="Every feature connects to getting interview-ready — no account, no friction."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {EXPLORE.map((item) => (
              <li key={item.href}>
                <ExploreCard {...item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Patterns section */}
      <section className="mx-auto max-w-6xl px-3 py-14 sm:px-4 sm:py-16 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Patterns"
              title="Master patterns, not just problems"
              subtitle="Stop solving randomly. Learn the ideas that repeat across coding rounds, then apply with confidence."
              align="left"
            />
            <Link
              href="/patterns"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Browse all patterns
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              DSA patterns available
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Two pointers</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Sliding window</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Prefix sum</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Binary search</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">BFS / DFS</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Backtracking</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Dynamic programming</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Greedy</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Hashing</span></li>
              <li><span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">Stacks & queues</span></li>
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Each pattern links to practice problems and revision notes with
              LeetCode links opening in a new tab.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-muted/20 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="From first problem to first callback"
            subtitle="Four steps that mirror how strong candidates actually prepare."
            center
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              step="1"
              title="Build skill"
              body="Study DSA patterns, review solutions with AI explanations, and use the resource hub for deeper learning."
              href="/practice"
              cta="Start practicing"
            />
            <StepCard
              step="2"
              title="Check CV & Jobs"
              body="Upload your resume for an ATS score, then search jobs across Naukri, LinkedIn, Greenhouse, Lever, and more."
              href="/jobs"
              cta="Score my resume"
            />
            <StepCard
              step="3"
              title="Browse companies"
              body="Explore 214 IT companies organized by category with direct career page links and recruiter contacts."
              href="/companies"
              cta="Find companies"
            />
            <StepCard
              step="4"
              title="Explore resources"
              body="Access curated learning links for DSA, system design, frontend, backend, DevOps, and more."
              href="/resources"
              cta="Browse resources"
            />
          </div>
        </div>
      </section>

      {/* Experience highlights */}
      <section className="mx-auto max-w-6xl px-3 py-14 sm:px-4 sm:py-16 lg:px-6">
        <SectionHeading
          eyebrow="Built for focus"
          title="Everything you need, in one place"
          subtitle="No LeetCode tabs, no scattered bookmarks — study, score, search, and apply from a single dashboard."
          center
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {EXPERIENCE.map((item) => (
            <li
              key={item.num}
              className="flex gap-4 rounded-xl border border-border bg-card p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                {item.num}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary/5 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-3 text-center sm:px-4 lg:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            One platform for skills and job search
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Stop juggling LeetCode, Medium blogs, resume checkers, and company lists.
            Start with one problem today — your next job is closer than you think.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/practice" className={buttonVariants({ size: "lg" })}>
              Solve a problem
            </Link>
          <Link
            href="/jobs"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Score my resume
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  align = center ? "center" : "left",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  center?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
      <p
        className={cn(
          "mt-2 text-muted-foreground",
          align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
        )}
      >
        {subtitle}
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/90 px-3 py-4 text-center backdrop-blur-sm">
      <p className="text-2xl font-bold tabular-nums text-primary sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ExploreCard({
  href,
  title,
  description,
  icon: Icon,
  accent,
}: (typeof EXPLORE)[number]) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-colors",
        "hover:border-primary/40 hover:bg-card/80",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br",
          accent,
        )}
      >
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mt-3 font-semibold group-hover:text-primary">{title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
        Explore
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function StepCard({
  step,
  title,
  body,
  href,
  cta,
}: {
  step: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-6">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
        {step}
      </span>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
