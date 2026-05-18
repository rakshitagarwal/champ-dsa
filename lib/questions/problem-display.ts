import type { Question } from "@/types/question";

type BodyInput = {
  title: string;
  statement: string;
  description?: string;
  constraints?: string[];
};

/** HTML body for the problem panel (LeetCode content or fallback). */
export function formatProblemBody(input: BodyInput): string {
  if (input.description?.trim()) {
    return input.description.trim();
  }

  const base = input.statement.trim();
  const title = input.title.trim();
  const lead = base.endsWith(".") ? base : `${base}.`;
  let html = `<p>${escapeHtml(lead)}</p><p>Solve <strong>${escapeHtml(title)}</strong>. Implement <code>function solve(...)</code> for the examples below.</p>`;

  if (input.constraints?.length) {
    html += `<p><strong>Constraints:</strong></p><ul>${input.constraints.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>`;
  }

  return html;
}

/** @deprecated Use formatProblemBody */
export function formatProblemStatement(question: Question): string {
  const html = formatProblemBody({
    title: question.title,
    statement: question.statement,
    description: question.description,
    constraints: question.constraints,
  });
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** LeetCode-style single-line output for the problem panel and run feedback. */
export function formatSampleOutput(raw: string | undefined): string {
  if (!raw) return "—";
  const trimmed = raw.trim();
  if (!trimmed) return "—";

  try {
    return JSON.stringify(JSON.parse(trimmed));
  } catch {
    return trimmed.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim();
  }
}

export function difficultyLabel(d: Question["difficulty"]): string {
  return d.charAt(0).toUpperCase() + d.slice(1);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
