const SKIP_GATE_KEY = "champdsa-skip-viewport-gate";

export function isViewportGateSkipped(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SKIP_GATE_KEY) === "1";
}

export function skipViewportGate(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SKIP_GATE_KEY, "1");
}

/** Tiered desktop-first rules for route access by viewport width (px). */
export function isRouteAllowed(pathname: string, width: number): boolean {
  if (isViewportGateSkipped()) return true;

  if (pathname === "/") return true;

  if (width >= 1024) return true;

  if (width >= 768) {
    return (
      pathname === "/notes" ||
      pathname.startsWith("/notes/") ||
      pathname === "/compiler" ||
      pathname.startsWith("/compiler/") ||
      pathname === "/js-compiler" ||
      pathname.startsWith("/js-compiler/")
    );
  }

  return false;
}

export function canAccessJsNotesOnTablet(width: number): boolean {
  return width >= 768;
}
