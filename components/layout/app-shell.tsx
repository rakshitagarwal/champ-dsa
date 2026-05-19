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
    <>
      {allowed ? <AppNav /> : <MinimalNav />}
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {allowed ? children : <DesktopRequired width={width} />}
      </main>
    </>
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
