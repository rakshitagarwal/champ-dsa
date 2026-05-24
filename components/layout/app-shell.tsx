"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AppNav } from "./app-nav";
import { MinimalNav } from "./minimal-nav";
import { DesktopRequired } from "./desktop-required";
import { useViewportWidth } from "./viewport-gate";
import { isRouteAllowed, skipViewportGate } from "@/lib/layout/viewport-allow";

function AppShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const width = useViewportWidth();
  const [ready, setReady] = useState(false);

  const selfScrollRoute =
    pathname.startsWith("/notes") ||
    pathname.startsWith("/practice") ||
    pathname.startsWith("/compiler") ||
    pathname.startsWith("/visualizer") ||
    pathname.startsWith("/jobs");

  useEffect(() => {
    if (searchParams.get("desktop") === "1") {
      skipViewportGate();
    }
    setReady(true);
  }, [searchParams]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  const allowed = isRouteAllowed(pathname, width);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {allowed ? <AppNav /> : <MinimalNav />}
      <main
        className={
          selfScrollRoute
            ? "flex min-h-0 flex-1 flex-col overflow-hidden"
            : "min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
        }
      >
        {allowed ? children : <DesktopRequired width={width} />}
      </main>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
          Loading…
        </div>
      }
    >
      <AppShellInner>{children}</AppShellInner>
    </Suspense>
  );
}
