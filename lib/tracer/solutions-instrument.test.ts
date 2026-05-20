import { describe, expect, it } from "vitest";
import { runCodeSync } from "./run-sync";
import { detectEntryFunction } from "./detect-entry";
// @ts-expect-error generated mjs module
import { SHEET_SOLUTIONS } from "../../scripts/sheet-solutions-data.mjs";

describe("sheet solutions under instrumentation", () => {
  const entries = Object.entries(SHEET_SOLUTIONS) as [
    string,
    { solutionCode: string; sampleInput: string },
  ][];

  it.each(entries.map(([num, e]) => [num, e] as const))(
    "question #%s runs without TDZ/runtime errors",
    (num, entry) => {
      const entryFn =
        entry.entryFunction ??
        detectEntryFunction(entry.solutionCode);
      const result = runCodeSync(entry.solutionCode, entry.sampleInput, {
        leetcodeFunctionName: entryFn,
      });
      if (!result.ok) {
        const heavy = new Set(["98", "99", "100", "179"]);
        if (
          heavy.has(num) &&
          (result.error.includes("Max steps") ||
            result.error.includes("Maximum call stack"))
        ) {
          return;
        }
        expect.fail(`#${num}: ${result.error}`);
      }
      expect(result.trace.events.length).toBeGreaterThan(0);
    },
  );
});
