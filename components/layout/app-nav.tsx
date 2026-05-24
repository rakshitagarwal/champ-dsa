"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  Code2,
  FileText,
  Map,
  Moon,
  PenLine,
  Sun,
  Table2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks: {
  href: string;
  label: string;
  icon: typeof Map;
  exact?: boolean;
}[] = [
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/practice", label: "Solve", icon: PenLine },
  { href: "/cheatsheet", label: "Cheatsheet", icon: Table2 },
  { href: "/compiler", label: "Compiler", icon: Code2 },
  { href: "/patterns", label: "DSA Patterns", icon: BookOpen },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/jobs", label: "Job search", icon: Briefcase },
];

function isNavActive(pathname: string, href: string, exact?: boolean): boolean {
  if (pathname === href) return true;
  if (exact) return false;
  return pathname.startsWith(`${href}/`);
}

export function AppNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const linkClass = (href: string, exact?: boolean) =>
    cn(
      "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
      isNavActive(pathname, href, exact)
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
          {navLinks.map(({ href, label, icon: Icon, exact }) => (
            <Link key={href} href={href} className={linkClass(href, exact)}>
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
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
