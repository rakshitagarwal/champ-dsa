"use client";

import DOMPurify from "isomorphic-dompurify";
import type { AiAnimationStep } from "@/types/ai-animation";

type Props = {
  title: string;
  step: AiAnimationStep;
};

function sanitizeSvg(svg: string): string {
  return DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
  });
}

export function AiAnimationPanel({ title, step }: Props) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#161b22] p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      <div
        className="flex flex-1 items-center justify-center overflow-auto"
        dangerouslySetInnerHTML={{ __html: sanitizeSvg(step.svg) }}
      />
      <p className="mt-4 text-center text-sm text-gray-400">{step.label}</p>
    </div>
  );
}
