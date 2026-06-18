"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  open: string | null;
  setOpen: (id: string | null) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

export function Accordion({
  children,
  className,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: string | null;
  open?: string | null;
  onOpenChange?: (id: string | null) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<string | null>(
    defaultOpen ?? null,
  );
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = React.useCallback(
    (id: string | null) => {
      if (!isControlled) setUncontrolledOpen(id);
      onOpenChange?.(id);
    },
    [isControlled, onOpenChange],
  );
  return (
    <AccordionContext.Provider value={{ open, setOpen }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionContext)!;
  const isOpen = ctx.open === id;
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(isOpen ? null : id)}
      className={cn(
        "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/40",
        className,
      )}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
}

export function AccordionContent({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionContext)!;
  if (ctx.open !== id) return null;
  return (
    <div className={cn("border-t border-border px-4 pb-4 pt-2", className)}>
      {children}
    </div>
  );
}
