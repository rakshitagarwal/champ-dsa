export const COMPILER_PREFILL_KEY = "champdsa-compiler-prefill";

export function saveCompilerPrefill(code: string, language: "javascript" | "python" = "javascript") {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    COMPILER_PREFILL_KEY,
    JSON.stringify({ code, language }),
  );
}

export function consumeCompilerPrefill(): {
  code: string;
  language: "javascript" | "python";
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(COMPILER_PREFILL_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(COMPILER_PREFILL_KEY);
    const data = JSON.parse(raw) as { code?: string; language?: string };
    if (!data.code) return null;
    return {
      code: data.code,
      language: data.language === "python" ? "python" : "javascript",
    };
  } catch {
    return null;
  }
}
