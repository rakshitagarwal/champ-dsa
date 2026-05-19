"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "champdsa-solve-problem-code-pct-v3";
const DEFAULT_CODE_PCT = 64;
const MIN_CODE_PCT = 48;
const MAX_CODE_PCT = 78;

type Props = {
  problem: ReactNode;
  code: ReactNode;
};

function readStoredPct(): number {
  if (typeof window === "undefined") return DEFAULT_CODE_PCT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CODE_PCT;
    const n = Number(raw);
    if (Number.isFinite(n) && n >= MIN_CODE_PCT && n <= MAX_CODE_PCT) return n;
  } catch {
    /* ignore */
  }
  return DEFAULT_CODE_PCT;
}

/** Two columns that grow with content; drag handle adjusts width only (no viewport lock). */
export function DocumentColumns({ problem, code }: Props) {
  const [codePct, setCodePct] = useState(DEFAULT_CODE_PCT);
  const containerRef = useRef<HTMLDivElement>(null);
  const codePctRef = useRef(DEFAULT_CODE_PCT);
  const dragging = useRef(false);

  useEffect(() => {
    const stored = readStoredPct();
    setCodePct(stored);
    codePctRef.current = stored;
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const fromRight = rect.right - e.clientX;
    const pct = (fromRight / rect.width) * 100;
    const clamped = Math.min(MAX_CODE_PCT, Math.max(MIN_CODE_PCT, pct));
    codePctRef.current = clamped;
    setCodePct(clamped);
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      localStorage.setItem(STORAGE_KEY, String(codePctRef.current));
    } catch {
      /* ignore */
    }
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const problemPct = 100 - codePct;

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col items-stretch lg:flex-row lg:items-start"
    >
      <div
        className="min-w-0 shrink-0 border-b border-border lg:border-b-0 lg:border-r"
        style={{ flex: `0 0 ${problemPct}%` }}
      >
        {problem}
      </div>

      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={codePct}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "relative z-10 hidden w-2 shrink-0 cursor-col-resize lg:block",
          "bg-border/40 transition-colors hover:bg-primary/15 active:bg-primary/25",
          "before:absolute before:inset-y-4 before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-border",
          "after:absolute after:left-1/2 after:top-1/2 after:h-8 after:w-1 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-muted-foreground/35 after:content-['']",
        )}
      />

      <div className="min-w-0 flex-1">{code}</div>
    </div>
  );
}
