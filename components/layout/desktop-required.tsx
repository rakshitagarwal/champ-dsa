import Link from "next/link";
import { Monitor, Tablet } from "lucide-react";
import { canAccessJsNotesOnTablet } from "@/lib/layout/viewport-allow";

type Props = {
  width: number;
};

export function DesktopRequired({ width }: Props) {
  const showJsNotes = canAccessJsNotesOnTablet(width);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Monitor className="h-7 w-7" />
      </div>
      <h1 className="mt-6 max-w-md text-2xl font-bold tracking-tight">
        ChampDSA is built for desktop
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Solving problems and the split-panel walkthrough need a wide screen.
        Open this site on a laptop or desktop for the full learning experience.
      </p>
      {showJsNotes ? (
        <p className="mt-4 flex max-w-md items-center justify-center gap-2 text-sm text-muted-foreground">
          <Tablet className="h-4 w-4 shrink-0 text-primary" />
          On tablet, you can still read{" "}
          <Link href="/js-notes" className="font-medium text-primary hover:underline">
            JS notes
          </Link>
          .
        </p>
      ) : null}
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Back to homepage
      </Link>
    </div>
  );
}
