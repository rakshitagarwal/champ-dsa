import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Code2,
  FileText,
  Layers,
  Map,
  PenLine,
  Play,
  Sparkles,
  Table2,
  Target,
  Zap,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EXPLORE = [
  {
    href: "/roadmap",
    title: "Roadmap",
    description: "Pattern order, prerequisites, and what to solve next.",
    icon: Map,
    accent: "from-blue-500/20 to-blue-500/5",
  },
  {
    href: "/practice",
    title: "Practice",
    description: "BossCoder-style sheet with a LeetCode-like editor.",
    icon: PenLine,
    accent: "from-violet-500/20 to-violet-500/5",
  },
  {
    href: "/patterns",
    title: "DSA patterns",
    description: "Sliding window, graphs, DP — theory when you need it.",
    icon: BookOpen,
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    href: "/notes",
    title: "Notes",
    description: "JavaScript and interview fundamentals, fast to skim.",
    icon: FileText,
    accent: "from-amber-500/20 to-amber-500/5",
  },
  {
    href: "/compiler",
    title: "Compiler",
    description: "Run snippets without leaving the app.",
    icon: Code2,
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    href: "/cheatsheet",
    title: "Cheatsheet",
    description: "Quick pattern reminders before a round.",
    icon: Table2,
    accent: "from-orange-500/20 to-orange-500/5",
  },
  {
    href: "/jobs/resume",
    title: "Resume review",
    description: "Score, ATS gaps, and section-level fixes.",
    icon: Target,
    accent: "from-rose-500/20 to-rose-500/5",
  },
  {
    href: "/jobs",
    title: "Job search",
    description: "Nine India portals — one click each, your city pre-filled.",
    icon: Briefcase,
    accent: "from-primary/25 to-primary/5",
  },
] as const;

const PATTERN_CHIPS = [
  "Two pointers",
  "Sliding window",
  "Prefix sum",
  "Binary search",
  "BFS / DFS",
  "Backtracking",
  "Dynamic programming",
  "Greedy",
  "Hashing",
  "Stacks & queues",
] as const;

const EXPERIENCE = [
  {
    num: "01",
    title: "Visualize solutions",
    body: "Step through code with animations and explanations — understand the why, not just the answer.",
    icon: Play,
  },
  {
    num: "02",
    title: "Runnable JS notes",
    body: "Copy, run, and revise interview fundamentals inline — no context switching.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Resume → job search",
    body: "Score your resume, fix ATS gaps, then open Naukri, Hirist, Instahyre, and more with keywords pre-filled.",
    icon: Layers,
  },
  {
    num: "04",
    title: "India-first locations",
    body: "Delhi, Noida, Gurgaon, Bangalore, remote — separate deep links per city and portal.",
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
          Practice, polish, apply — one platform
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          Master interviews.
          <br />
          <span className="text-primary">Land the role.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          ChampDSA is your all-in-one path from DSA practice to resume-ready
          applications — structured learning, visual explanations, and India job
          portals in a single flow.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/roadmap"
            className={cn(buttonVariants({ size: "lg" }), "h-11 gap-2 px-6")}
          >
            Start learning free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/jobs"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-6",
            )}
          >
            Search jobs
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          No account required · Desktop recommended for solving & visualizing
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value="15+" label="DSA patterns" />
          <Stat value="200+" label="Practice problems" />
          <Stat value="9" label="Job portals" />
          <Stat value="1" label="Resume-to-search flow" />
        </div>
      </section>

      {/* Explore — GFG-style grid */}
      <section className="border-y border-border bg-muted/25 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
          <SectionHeading
            eyebrow="Explore"
            title="Your all-in-one learning portal"
            subtitle="Pick where you want to go — everything connects back to getting interview-ready."
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

      {/* Patterns — AlgoMaster-style */}
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
              On the roadmap
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {PATTERN_CHIPS.map((name) => (
                <li key={name}>
                  <span className="inline-block rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Each pattern links to practice problems, notes, and visual
              walkthroughs when you need a deeper explanation.
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
            subtitle="Three steps that mirror how strong candidates actually prepare."
            center
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StepCard
              step="1"
              title="Build skill"
              body="Follow the roadmap, solve on the sheet, and use the visualizer when a solution clicks but the intuition does not."
              href="/practice"
              cta="Start practicing"
            />
            <StepCard
              step="2"
              title="Polish your resume"
              body="Upload for a score, ATS keyword gaps, and section fixes. Re-upload after edits to track improvement."
              href="/jobs/resume"
              cta="Review resume"
            />
            <StepCard
              step="3"
              title="Apply everywhere"
              body="Open Naukri, Indeed, Hirist, Instahyre, Foundit, Shine, and more — pre-filled for your role, experience, and city."
              href="/jobs"
              cta="Job search"
            />
          </div>
        </div>
      </section>

      {/* Experience highlights */}
      <section className="mx-auto max-w-6xl px-3 py-14 sm:px-4 sm:py-16 lg:px-6">
        <SectionHeading
          eyebrow="Built for focus"
          title="Interactive learning, not passive reading"
          subtitle="Inspired by the best interview prep sites — but tailored for how ChampDSA actually works today."
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
            One solution for skills and job search
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Stop juggling LeetCode, random blogs, resume checkers, and nine job
            tabs. Start with one problem today — your next application is already
            wired in.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/practice" className={buttonVariants({ size: "lg" })}>
              Solve a problem
            </Link>
            <Link
              href="/jobs/resume"
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
