import Link from "next/link";

const SECTIONS = [
  {
    href: "/patterns",
    title: "DSA patterns",
    description: "Pattern notes with examples.",
  },
  {
    href: "/practice",
    title: "Practice",
    description: "LeetCode problems grouped by pattern.",
  },
  {
    href: "/notes",
    title: "Notes",
    description: "JavaScript, TypeScript, React, Node, SQL, and more.",
  },
  {
    href: "/companies",
    title: "Companies",
    description: "IT companies with career page links.",
  },
  {
    href: "/hld",
    title: "HLD",
    description: "High-level design concepts, technologies, and breakdowns.",
  },
  {
    href: "/lld",
    title: "LLD",
    description: "Low-Level Design notes coming soon.",
  },
  {
    href: "/jobs",
    title: "CV Analyzer",
    description: "Resume ATS score and suggestions.",
  },
  {
    href: "/tips",
    title: "Tips & Tricks",
    description: "Resume, LinkedIn, and interview prep notes.",
  },
  {
    href: "/compiler",
    title: "Compiler",
    description: "Run JavaScript snippets.",
  },
] as const;

export function PersonalHome() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        ChampDSA
      </h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        A personal project by{" "}
        <span className="font-medium text-foreground">Rakshit Agarwal</span>{" "}
        for interview preparation.
      </p>

      <ul className="mt-10 space-y-2">
        {SECTIONS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40"
            >
              <span className="font-medium">{item.title}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted-foreground">
        Built by Rakshit Agarwal.
      </p>
    </div>
  );
}
