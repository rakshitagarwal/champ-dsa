import { cn } from "@/lib/utils";

function ScrollArea({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("overflow-auto", className)}>{children}</div>
  );
}

export { ScrollArea };
