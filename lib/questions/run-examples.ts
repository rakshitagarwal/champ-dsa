import type { QuestionExample } from "@/types/question";
import { formatSampleOutput } from "@/lib/questions/problem-display";

/** Parse LeetCode-style Example 1/2 blocks from HTML description. */
export function parseExamplesFromDescription(
  html: string,
): QuestionExample[] {
  const results: QuestionExample[] = [];
  const blockRe =
    /<strong[^>]*>\s*Example\s+(\d+)\s*:\s*<\/strong>[\s\S]*?<pre[^>]*>([\s\S]*?)<\/pre>/gi;

  let match: RegExpExecArray | null;
  while ((match = blockRe.exec(html)) !== null) {
    const body = match[2]
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const io = body.match(
      /Input:\s*(.+?)\s*Output:\s*(.+?)(?:\s*Explanation|$)/i,
    );
    if (!io) continue;

    results.push({
      input: io[1].trim(),
      output: formatSampleOutput(io[2].trim()),
    });
  }

  return results;
}

/** First two test cases for Run validation (Example 1 & 2). */
export function getFirstTwoRunExamples(
  examples: QuestionExample[] | null | undefined,
  description: string | null | undefined,
  humanInput: string | null | undefined,
  sampleOutput: string | null | undefined,
): QuestionExample[] {
  const merged: QuestionExample[] = [];

  const pushUnique = (ex: QuestionExample) => {
    if (merged.length >= 2) return;
    const key = `${ex.input}::${ex.output}`;
    if (merged.some((e) => `${e.input}::${e.output}` === key)) return;
    merged.push({
      input: ex.input.trim(),
      output: formatSampleOutput(ex.output),
    });
  };

  for (const ex of examples ?? []) {
    pushUnique(ex);
  }

  if (merged.length < 2 && description) {
    for (const ex of parseExamplesFromDescription(description)) {
      pushUnique(ex);
    }
  }

  if (merged.length === 0 && humanInput && sampleOutput) {
    pushUnique({ input: humanInput, output: sampleOutput });
  }

  return merged.slice(0, 2);
}
