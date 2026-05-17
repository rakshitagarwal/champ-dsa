"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getPatternBySlug } from "@/data/patterns";
import { stdinToHuman } from "@/lib/io/human-input";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { VizWorkspace } from "./viz-workspace";

export function VisualizerShell() {
  const searchParams = useSearchParams();
  const loadFreePlayground = useVisualizerStore((s) => s.loadFreePlayground);
  const setCode = useVisualizerStore((s) => s.setCode);
  const setStdin = useVisualizerStore((s) => s.setStdin);

  useEffect(() => {
    const demo = searchParams.get("demo");
    const imported = sessionStorage.getItem("champdsa-viz-import");

    if (imported) {
      try {
        const { code, stdin } = JSON.parse(imported) as {
          code: string;
          stdin: string;
        };
        loadFreePlayground();
        setCode(code);
        setStdin(stdin);
        sessionStorage.removeItem("champdsa-viz-import");
        return;
      } catch {
        sessionStorage.removeItem("champdsa-viz-import");
      }
    }

    if (demo) {
      const pattern = getPatternBySlug(demo);
      if (pattern) {
        loadFreePlayground();
        setCode(pattern.fundamentals.exampleCode);
        setStdin(stdinToHuman(pattern.fundamentals.exampleInput));
        return;
      }
    }

    loadFreePlayground();
  }, [searchParams, loadFreePlayground, setCode, setStdin]);

  return <VizWorkspace mode="free" />;
}
