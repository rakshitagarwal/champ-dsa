import Link from "next/link";

export function MinimalNav() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">
            C
          </span>
          ChampDSA
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline"
        >
          Back to home
        </Link>
      </div>
    </header>
  );
}
