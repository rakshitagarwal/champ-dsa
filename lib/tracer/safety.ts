const FORBIDDEN =
  /\b(import\s|export\s|require\s*\(|fetch\s*\(|eval\s*\(|Function\s*\(|process\.|globalThis\.|window\.|document\.|setTimeout|setInterval|Promise\.|async\s+function|\bawait\b|class\s+\w)/;

export function validateCodeSafety(code: string): string | null {
  if (FORBIDDEN.test(code)) {
    return "Unsupported syntax: imports, async/await, classes, timers, fetch, or eval are not allowed in MVP.";
  }
  return null;
}

export const MAX_STEPS = 30000;
export const RUN_TIMEOUT_MS = 3000;
