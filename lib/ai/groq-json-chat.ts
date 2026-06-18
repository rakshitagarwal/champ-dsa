const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

/** Models with reliable JSON output on Groq (see console.groq.com/docs/structured-outputs). */
const DEFAULT_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
] as const;

function resolveModelCandidates(): string[] {
  const fromEnv = process.env.GROQ_MODEL?.trim();
  const extras =
    process.env.GROQ_MODEL_FALLBACKS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  const ordered = fromEnv
    ? [fromEnv, ...extras, ...DEFAULT_MODELS]
    : [...DEFAULT_MODELS];

  return [...new Set(ordered)];
}

function isRetryableModelError(status: number, body: string): boolean {
  return (
    status === 429 ||
    status === 503 ||
    status === 502 ||
    body.toLowerCase().includes("overloaded") ||
    body.toLowerCase().includes("unavailable")
  );
}

function isJsonModeFailure(msg: string): boolean {
  const lower = msg.toLowerCase();
  return (
    lower.includes("failed to generate json") ||
    lower.includes("failed_generation") ||
    lower.includes("json_validate")
  );
}

function isFatalGroqError(status: number, msg: string): boolean {
  if (status === 401 || status === 403) return true;
  const lower = msg.toLowerCase();
  return (
    lower.includes("invalid api key") ||
    lower.includes("permission denied") ||
    lower.includes("insufficient")
  );
}

function shouldTryAnotherAttempt(status: number, msg: string): boolean {
  return (
    isRetryableModelError(status, msg) ||
    isJsonModeFailure(msg) ||
    status === 400
  );
}

export function extractJsonPayload(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return trimmed;

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);

  return trimmed;
}

type GroqChatResponse = {
  choices?: { message?: { content?: string } }[];
  error?: { message?: string };
};

export type GroqJsonOptions = {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
};

async function requestGroqCompletion(
  apiKey: string,
  modelId: string,
  options: GroqJsonOptions,
  jsonMode: boolean,
): Promise<{ ok: boolean; status: number; text: string; errorMsg: string }> {
  const body: Record<string, unknown> = {
    model: modelId,
    messages: [
      { role: "system", content: options.systemPrompt },
      { role: "user", content: options.userPrompt },
    ],
    temperature: options.temperature ?? 0.35,
    max_tokens: options.maxTokens ?? 4096,
  };

  if (jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const bodyText = await res.text();
  let data: GroqChatResponse;
  try {
    data = JSON.parse(bodyText) as GroqChatResponse;
  } catch {
    return {
      ok: false,
      status: res.status,
      text: "",
      errorMsg: "non-JSON response from Groq",
    };
  }

  if (!res.ok) {
    const msg = data.error?.message ?? bodyText.slice(0, 300);
    return { ok: false, status: res.status, text: "", errorMsg: msg };
  }

  const text = data.choices?.[0]?.message?.content?.trim() ?? "";
  return { ok: true, status: res.status, text, errorMsg: "" };
}

export async function generateGroqJson<T>(
  options: GroqJsonOptions,
  parse: (raw: string) => T,
): Promise<T> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error(
      "GROQ_API_KEY is not configured on the server. Add it to .env.local and restart the dev server.",
    );
  }

  const models = resolveModelCandidates();
  const errors: string[] = [];

  for (const modelId of models) {
    for (const jsonMode of [true, false] as const) {
      const modeLabel = jsonMode ? "json" : "text";
      const result = await requestGroqCompletion(
        apiKey,
        modelId,
        options,
        jsonMode,
      );

      if (!result.ok) {
        const msg = result.errorMsg;
        errors.push(`${modelId} (${modeLabel}): ${msg.slice(0, 120)}`);
        if (isFatalGroqError(result.status, msg)) {
          throw new Error(errors.join(" | "));
        }
        if (!shouldTryAnotherAttempt(result.status, msg)) break;
        continue;
      }

      if (!result.text) {
        errors.push(`${modelId} (${modeLabel}): empty response`);
        continue;
      }

      const payload = extractJsonPayload(result.text);
      try {
        return parse(payload);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        errors.push(`${modelId} (${modeLabel}): parse error ${msg.slice(0, 80)}`);
      }
    }
  }

  throw new Error(errors.join(" | ") || "Groq request failed.");
}
