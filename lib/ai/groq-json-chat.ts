const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODELS = [
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
    const res = await fetch(GROQ_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { role: "system", content: options.systemPrompt },
          { role: "user", content: options.userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: options.temperature ?? 0.35,
        max_tokens: options.maxTokens ?? 4096,
      }),
    });

    const bodyText = await res.text();
    let data: GroqChatResponse;
    try {
      data = JSON.parse(bodyText) as GroqChatResponse;
    } catch {
      errors.push(`${modelId}: non-JSON response`);
      continue;
    }

    if (!res.ok) {
      const msg = data.error?.message ?? bodyText.slice(0, 300);
      errors.push(`${modelId}: ${msg.slice(0, 120)}`);
      if (!isRetryableModelError(res.status, msg)) break;
      continue;
    }

    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) {
      errors.push(`${modelId}: empty response`);
      continue;
    }

    try {
      return parse(text);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${modelId}: parse error ${msg.slice(0, 80)}`);
    }
  }

  throw new Error(errors.join(" | ") || "Groq request failed.");
}
