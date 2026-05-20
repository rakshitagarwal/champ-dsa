import { runCode } from "@/lib/tracer/run";
import { outputsMatch } from "@/lib/run/compare-output";
import { formatSampleOutput } from "@/lib/questions/problem-display";
import type { QuestionExample } from "@/types/question";
import type { ExampleRunResult } from "@/types/ai-explain";

export async function validateExamples(
  code: string,
  examples: QuestionExample[],
): Promise<ExampleRunResult[]> {
  const results: ExampleRunResult[] = [];

  for (let i = 0; i < examples.length; i++) {
    const ex = examples[i];
    const label = `Example ${i + 1}`;
    const run = await runCode(code, ex.input);
    if (!run.ok) {
      results.push({
        index: i,
        label,
        input: ex.input,
        expected: ex.output,
        actual: "",
        pass: false,
        error: run.error,
      });
      continue;
    }

    const actual = formatSampleOutput(run.trace.stdout.trim());
    results.push({
      index: i,
      label,
      input: ex.input,
      expected: ex.output,
      actual,
      pass: outputsMatch(actual, ex.output),
    });
  }

  return results;
}
