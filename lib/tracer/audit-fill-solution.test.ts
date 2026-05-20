import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { runCodeSync } from "./run-sync";
import { detectEntryFunction } from "./detect-entry";
import { buildDefaultVizProfile } from "@/lib/viz/default-viz-profile";
import { compactTimeline } from "@/lib/viz/scene/compact-steps";
import { sheetQuestions } from "@/data/questions/sheet-questions";
// @ts-expect-error generated mjs module
import { SHEET_SOLUTIONS } from "../../scripts/sheet-solutions-data.mjs";

type AuditRow = {
  num: number;
  id: string;
  title: string;
  entryFunction: string;
  status: "ok" | "error" | "heavy";
  error?: string;
  rawTraceSteps: number;
  uiSteps: number;
  patternName: string;
};

describe("audit fill-solution runs", () => {
  it("runs all 211 saved solutions and records UI step counts", () => {
    const byNum = new Map(
      sheetQuestions
        .filter((q) => q.sheetNumber != null)
        .map((q) => [q.sheetNumber!, q]),
    );

    const rows: AuditRow[] = [];

    for (const numStr of Object.keys(SHEET_SOLUTIONS).sort(
      (a, b) => Number(a) - Number(b),
    )) {
      const num = Number(numStr);
      const entry = SHEET_SOLUTIONS[num] as {
        solutionCode: string;
        sampleInput: string;
        entryFunction?: string;
      };
      const q = byNum.get(num);
      const entryFn =
        entry.entryFunction ?? detectEntryFunction(entry.solutionCode);

      const result = runCodeSync(entry.solutionCode, entry.sampleInput, {
        leetcodeFunctionName: entryFn,
      });

      if (!result.ok) {
        const heavy = new Set([98, 99, 100, 179]);
        const isHeavy =
          heavy.has(num) &&
          (result.error.includes("Max steps") ||
            result.error.includes("Maximum call stack"));
        rows.push({
          num,
          id: q?.id ?? `sheet-${num}`,
          title: q?.title ?? `Problem ${num}`,
          entryFunction: entryFn,
          status: isHeavy ? "heavy" : "error",
          error: result.error,
          rawTraceSteps: 0,
          uiSteps: 0,
          patternName: q?.patternName ?? "",
        });
        continue;
      }

      const profile = buildDefaultVizProfile(result.trace, q?.patternName);
      const { scenes } = compactTimeline(result.trace.events, profile, {
        curated: true,
      });

      rows.push({
        num,
        id: q?.id ?? `sheet-${num}`,
        title: q?.title ?? `Problem ${num}`,
        entryFunction: entryFn,
        status: "ok",
        rawTraceSteps: result.trace.events.length,
        uiSteps: scenes.length,
        patternName: q?.patternName ?? "",
      });
    }

    const ok = rows.filter((r) => r.status === "ok");
    const err = rows.filter((r) => r.status === "error");
    const heavy = rows.filter((r) => r.status === "heavy");

    const report = {
      generatedAt: new Date().toISOString(),
      total: rows.length,
      ok: ok.length,
      error: err.length,
      heavy: heavy.length,
      uiSteps: {
        min: ok.length ? Math.min(...ok.map((r) => r.uiSteps)) : 0,
        max: ok.length ? Math.max(...ok.map((r) => r.uiSteps)) : 0,
        avg: ok.length
          ? Math.round(
              ok.reduce((s, r) => s + r.uiSteps, 0) / ok.length,
            )
          : 0,
      },
      rows,
    };

    const outDir = path.join(process.cwd(), "scripts");
    const jsonPath = path.join(outDir, "fill-solution-audit.json");
    const mdPath = path.join(outDir, "fill-solution-audit.md");
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

    const mdLines = [
      "# Fill Solution audit (all 211)",
      "",
      `Generated: ${report.generatedAt}`,
      "",
      "| Status | Count |",
      "|--------|-------|",
      `| OK (visualize steps) | ${report.ok} |`,
      `| Error | ${report.error} |`,
      `| Heavy (max steps / stack) | ${report.heavy} |`,
      "",
      `UI steps (curated): min ${report.uiSteps.min}, avg ${report.uiSteps.avg}, max ${report.uiSteps.max}`,
      "",
      "## Errors",
      "",
      ...err.map(
        (r) =>
          `- **#${r.num}** ${r.title} (\`${r.entryFunction}\`): ${r.error}`,
      ),
      ...(heavy.length
        ? [
            "",
            "## Heavy (timeout / max steps)",
            "",
            ...heavy.map(
              (r) =>
                `- **#${r.num}** ${r.title}: ${r.error}`,
            ),
          ]
        : []),
      "",
      "## Working — UI step count",
      "",
      "| # | Title | Entry | UI steps | Raw trace |",
      "|---|-------|-------|----------|-----------|",
      ...ok
        .sort((a, b) => a.num - b.num)
        .map(
          (r) =>
            `| ${r.num} | ${r.title.replace(/\|/g, "/")} | ${r.entryFunction} | ${r.uiSteps} | ${r.rawTraceSteps} |`,
        ),
    ];
    fs.writeFileSync(mdPath, mdLines.join("\n"));

    console.log("\n=== Fill Solution Audit ===");
    console.log(`OK: ${report.ok} | Errors: ${report.error} | Heavy: ${report.heavy}`);
    console.log(`UI steps — min: ${report.uiSteps.min}, avg: ${report.uiSteps.avg}, max: ${report.uiSteps.max}`);
    console.log(`Wrote ${jsonPath}`);
    console.log(`Wrote ${mdPath}`);
    if (err.length) {
      console.log("\nErrors:");
      for (const r of err) {
        console.log(`  #${r.num} ${r.title}: ${r.error}`);
      }
    }

    expect(rows.length).toBe(211);
  });
});
