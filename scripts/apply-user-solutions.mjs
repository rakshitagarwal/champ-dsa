import { USER_SOLUTION_OVERRIDES } from "./user-solution-overrides.mjs";

function detectEntryFunction(code) {
  const varFn = code.match(/var\s+(\w+)\s*=\s*function\s*\(/);
  if (varFn) return varFn[1];
  const fnDecl = code.match(/function\s+(\w+)\s*\(/);
  if (fnDecl) return fnDecl[1];
  return undefined;
}

/** Apply imported user solutions onto SHEET_SOLUTIONS entries (BossCoder sheet numbers). */
export function applyUserSolutionOverrides(sheetSolutions) {
  for (const [numStr, override] of Object.entries(USER_SOLUTION_OVERRIDES)) {
    const num = Number(numStr);
    const entry = sheetSolutions[num];
    if (!entry || !override?.solutionCode?.trim()) continue;

    entry.solutionCode = override.solutionCode.trim();
    if (override.starterCode) entry.starterCode = override.starterCode;
    if (override.sampleInput) entry.sampleInput = override.sampleInput;
    if (override.entryFunction) entry.entryFunction = override.entryFunction;
    else {
      const fn = detectEntryFunction(entry.solutionCode);
      if (fn) entry.entryFunction = fn;
    }
  }
}
