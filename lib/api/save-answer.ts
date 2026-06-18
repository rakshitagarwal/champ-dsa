type SaveAnswerInput = {
  questionId: string;
  code: string;
  passed?: boolean;
  notes?: string;
};

export async function saveAnswerToDb(input: SaveAnswerInput): Promise<boolean> {
  try {
    const res = await fetch(`/api/questions/${encodeURIComponent(input.questionId)}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: input.code,
        passed: input.passed ?? true,
        notes: input.notes,
        language: "javascript",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
