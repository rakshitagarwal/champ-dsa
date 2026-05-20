import { formatGroqError } from "@/lib/ai/groq-explain";
import {
  buildDefaultVizProfile,
  sanitizeVizProfile,
} from "@/lib/viz/default-viz-profile";
import type { ExecutionTrace } from "@/types/execution";
import type { TraceSummary, VizProfile, VizSetupRequest } from "@/types/viz-profile";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
] as const;

const SYSTEM = `You configure a DSA code visualizer. Return ONLY valid JSON matching this schema — no markdown, no commentary:

{
  "version": 1,
  "structures": [{ "variable": "exactNameFromCode", "kind": "array|linkedList|tree|stack|graph|heap", "label": "optional", "priority": 0 }],
  "pointers": [{ "variable": "exactName", "kind": "arrayIndex|listNode|treeNode|graphNode", "attachesTo": "structureVariableName" }],
  "highlights": [{ "variable": "name", "style": "scalar|window|visitedSet" }],
  "showCallStack": boolean,
  "compaction": "aggressive|normal"
}

Rules:
- Use ONLY variable names that appear in the provided trace variable list.
- Map the student's exact identifiers (e.g. if they use "l" and "r" instead of "left" and "right", use "l" and "r").
- Include every array/list/tree/stack variable that should animate.
- pointers: index vars (i,j,left,right,slow,fast) and node refs (head,node,cur).
- priority: 0 = most prominent structure.
- Do not invent variables.`;

function resolveModels(): string[] {
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

function extractJson(text: string): string {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return fence[1]!.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

function parseProfile(raw: string): VizProfile | null {
  try {
    const parsed = JSON.parse(extractJson(raw)) as VizProfile;
    if (parsed.version !== 1 || !Array.isArray(parsed.structures)) return null;
    return {
      version: 1,
      structures: parsed.structures.map((s, i) => ({
        variable: String(s.variable),
        kind: s.kind,
        label: s.label ?? String(s.variable),
        priority: typeof s.priority === "number" ? s.priority : i,
      })),
      pointers: (parsed.pointers ?? []).map((p) => ({
        variable: String(p.variable),
        kind: p.kind,
        attachesTo: p.attachesTo,
      })),
      highlights: parsed.highlights,
      showCallStack: parsed.showCallStack,
      compaction: parsed.compaction ?? "aggressive",
    };
  } catch {
    return null;
  }
}

export async function generateVizProfile(
  req: VizSetupRequest,
): Promise<{ profile: VizProfile; source: "groq" | "fallback" }> {
  const allowed = new Set(req.traceSummary.variableNames);
  const fallback = () => ({
    profile: sanitizeVizProfile(
      buildDefaultVizProfileFromSummary(req),
      allowed,
    ),
    source: "fallback" as const,
  });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey?.trim()) return fallback();

  const userPrompt = JSON.stringify(
    {
      problem: req.problemTitle ?? "Practice",
      pattern: req.patternName ?? "General",
      code: req.code.slice(0, 8000),
      stdin: req.stdin ?? "",
      trace: req.traceSummary,
    },
    null,
    2,
  );

  const errors: string[] = [];
  for (const modelId of resolveModels()) {
    try {
      const res = await fetch(GROQ_CHAT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelId,
          messages: [
            { role: "system", content: SYSTEM },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.2,
          max_tokens: 1024,
          response_format: { type: "json_object" },
        }),
      });

      const bodyText = await res.text();
      let data: {
        choices?: { message?: { content?: string } }[];
        error?: { message?: string };
      };
      try {
        data = JSON.parse(bodyText);
      } catch {
        throw new Error(`Groq returned non-JSON (${res.status})`);
      }

      if (!res.ok) {
        throw new Error(data.error?.message ?? bodyText.slice(0, 200));
      }

      const text = data.choices?.[0]?.message?.content?.trim();
      if (!text) throw new Error("Empty response from Groq.");

      let profile = parseProfile(text);
      if (!profile) {
        profile = parseProfile(text + "}");
      }
      if (!profile || profile.structures.length === 0) {
        throw new Error("Invalid VizProfile JSON from Groq.");
      }

      return {
        profile: sanitizeVizProfile(profile, allowed),
        source: "groq",
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${modelId}: ${msg.slice(0, 80)}`);
      if (!msg.includes("429") && !msg.includes("503")) {
        console.warn("[groq-viz-profile]", formatGroqError(err));
        return fallback();
      }
    }
  }

  console.warn("[groq-viz-profile] all models failed:", errors.join(" | "));
  return fallback();
}

function buildDefaultVizProfileFromSummary(req: VizSetupRequest): VizProfile {
  const fakeTrace = {
    events: req.traceSummary.sampleSteps.map((s) => ({
      step: s.stepIndex,
      line: s.line,
      type: s.type as "statement",
      variables: Object.fromEntries(s.variableKeys.map((k) => [k, 0])),
      callStack: [],
    })),
    stdout: "",
    lineMap: {},
  } as ExecutionTrace;
  return buildDefaultVizProfile(fakeTrace, req.patternName);
}

export type { TraceSummary };
