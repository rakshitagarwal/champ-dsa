"use client";

import { useEffect, useRef } from "react";

type Props = {
  code: string;
  highlightedLine?: number;
  description: string;
};

export function CodePanel({ code, highlightedLine, description }: Props) {
  const lines = code.split("\n");
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedLine === undefined) return;
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [highlightedLine]);

  return (
    <div className="flex h-full flex-col bg-[#161b22]">
      <div className="flex-1 overflow-auto p-4">
        <pre className="font-mono text-sm">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isActive =
              highlightedLine !== undefined && lineNum === highlightedLine;
            return (
              <div
                key={idx}
                ref={isActive ? activeRef : undefined}
                className={`flex rounded px-2 py-0.5 transition-colors duration-150 ${
                  isActive
                    ? "border-l-2 border-blue-400 bg-blue-500/20"
                    : "border-l-2 border-transparent"
                }`}
              >
                <span className="mr-4 w-8 shrink-0 select-none text-right text-gray-600">
                  {lineNum}
                </span>
                <span className={isActive ? "text-white" : "text-gray-300"}>
                  {line || " "}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
      <div className="border-t border-gray-800 bg-[#0d1117] px-4 py-3">
        <p className="font-mono text-xs text-blue-400">// {description}</p>
      </div>
    </div>
  );
}
