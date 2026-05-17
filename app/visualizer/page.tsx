import { Suspense } from "react";
import { VisualizerShell } from "@/components/visualizer/visualizer-shell";

export default function VisualizerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center text-muted-foreground">
          Loading visualizer…
        </div>
      }
    >
      <VisualizerShell />
    </Suspense>
  );
}
