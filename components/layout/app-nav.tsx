"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  Table2,
  FileText,
  Map,
  Moon,
  PenLine,
  Sun,
  BarChart3,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const learnLinks = [
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/practice", label: "Solve", icon: PenLine },
  { href: "/cheatsheet", label: "Cheat sheet", icon: Table2 },
  { href: "/js-compiler", label: "JS compiler", icon: Code2 },
] as const;

const recapLinks = [
  { href: "/patterns", label: "Pattern recap", icon: BookOpen },
  { href: "/notes", label: "Notes", icon: FileText },
] as const;

export function AppNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const linkClass = (href: string) =>
    cn(
      "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
      pathname === href || pathname.startsWith(`${href}/`)
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">
            C
          </span>
          <span className="hidden sm:inline">ChampDSA</span>
        </Link>

        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          <span className="hidden shrink-0 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground lg:inline">
            Learn DSA
          </span>
          {learnLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}

          <span className="mx-1 hidden h-5 w-px shrink-0 bg-border lg:block" />

          <span className="hidden shrink-0 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground lg:inline">
            Recap
          </span>
          {recapLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}

          <Link
            href="/progress"
            className={cn(linkClass("/progress"), "ml-auto lg:ml-0")}
            title="Progress"
          >
            <BarChart3 className="h-4 w-4 shrink-0" />
            <span className="hidden xl:inline">Progress</span>
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}
