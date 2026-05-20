"use client";

import { create } from "zustand";
import type { ExecutionEvent, ExecutionTrace } from "@/types/execution";
import type { ProgressiveHint, QuestionExample } from "@/types/question";
import type { AiExplainCommentary, ExampleRunResult } from "@/types/ai-explain";
import type { VizProfile } from "@/types/viz-profile";
import type { VizScene } from "@/types/viz-scene";
import { buildDefaultVizProfile } from "@/lib/viz/default-viz-profile";
import { compactTimeline } from "@/lib/viz/scene/compact-steps";
import { runCode } from "@/lib/tracer/run";
import { validateExamples } from "@/lib/run/validate-examples";
import { getFirstTwoRunExamples } from "@/lib/questions/run-examples";
import { markVisualizerUsed } from "@/lib/onboarding/checklist";
import { recordQuestionAttempt } from "@/lib/storage/learning-store";

export const DEFAULT_CODE = `function solve(nums, target) {
  let left = 0;
  let sum = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum > target && left <= right) {
      sum -= nums[left];
      left++;
    }
  }
  return sum;
}`;

export const DEFAULT_STDIN = `nums = [2, 1, 5, 1, 3, 2]
target = 8`;

export type QuestionContext = {
  questionId: string;
  starterCode: string;
  solutionCode: string;
  solutionRevealed: boolean;
  entryFunction?: string;
};

type VisualizerState = {
  code: string;
  stdin: string;
  trace: ExecutionTrace | null;
  stepIndex: number;
  isPlaying: boolean;
  speedMs: number;
  isRunning: boolean;
  error: string | null;
  problemTitle: string | null;
  problemStatement: string | null;
  patternName: string | null;
  patternSlug: string | null;
  patternHints: string[] | null;
  progressiveHints: ProgressiveHint | null;
  problemDifficulty: "easy" | "medium" | "hard" | null;
  problemHumanInput: string | null;
  problemSampleOutput: string | null;
  problemDescription: string | null;
  problemExamples: QuestionExample[] | null;
  problemConstraints: string[] | null;
  problemLeetcodeUrl: string | null;
  problemEntryFunction: string | null;
  questionContext: QuestionContext | null;
  stdinLocked: boolean;
  exampleResults: ExampleRunResult[] | null;
  allExamplesPass: boolean;
  hasTwoExamples: boolean;
  aiExplain: AiExplainCommentary | null;
  aiExplainLoading: boolean;
  aiExplainError: string | null;
  aiExplainModalOpen: boolean;
  stepExplainText: string | null;
  stepExplainLoading: boolean;
  stepExplainError: string | null;
  vizProfile: VizProfile | null;
  vizProfileSource: "groq" | "fallback" | null;
  vizSetupLoading: boolean;
  vizSetupError: string | null;
  compactedScenes: VizScene[];
  compactedEventIndices: number[];
  solutionFilled: boolean;
  aiHintLevel: 0 | 1 | 2 | 3;
  fillSolution: () => Promise<void>;
  advanceAiHint: () => void;
  resetAiHint: () => void;
  prepareVizSetup: () => Promise<void>;
  rebuildCompactedTimeline: () => void;
  setCode: (code: string) => void;
  setStdin: (stdin: string) => void;
  setProblem: (p: {
    title: string;
    statement: string;
    patternName: string;
    patternSlug?: string | null;
    patternHints?: string[] | null;
    progressiveHints?: ProgressiveHint | null;
    difficulty?: "easy" | "medium" | "hard";
    humanInput?: string;
    sampleOutput?: string;
    description?: string;
    examples?: QuestionExample[];
    constraints?: string[];
    leetcodeUrl?: string;
    entryFunction?: string;
  } | null) => void;
  setQuestionContext: (ctx: QuestionContext | null) => void;
  resetToStarter: () => void;
  revealSolution: () => void;
  clearTrace: () => void;
  loadFreePlayground: () => void;
  run: () => Promise<void>;
  fetchAiExplain: () => Promise<void>;
  clearAiExplain: () => void;
  clearStepExplain: () => void;
  currentScene: () => VizScene | null;
  compactedStepCount: () => number;
  setAiExplainModalOpen: (open: boolean) => void;
  setStepIndex: (i: number) => void;
  stepNext: () => void;
  stepPrev: () => void;
  play: () => void;
  pause: () => void;
  restart: () => void;
  setSpeed: (ms: number) => void;
  formatCode: () => void;
  registerFormatCode: (fn: (() => void) | null) => void;
  currentEvent: () => ExecutionEvent | null;
  previousEvent: () => ExecutionEvent | null;
};

let formatCodeFn: (() => void) | null = null;

function clearRunState() {
  return {
    trace: null,
    stepIndex: 0,
    isPlaying: false,
    error: null,
    exampleResults: null,
    allExamplesPass: false,
    aiExplain: null,
    aiExplainError: null,
    aiExplainModalOpen: false,
    stepExplainText: null,
    stepExplainLoading: false,
    stepExplainError: null,
    vizProfile: null,
    vizProfileSource: null,
    vizSetupLoading: false,
    vizSetupError: null,
    compactedScenes: [],
    compactedEventIndices: [],
    solutionFilled: false,
    aiHintLevel: 0 as 0 | 1 | 2 | 3,
  };
}

function rebuildTimeline(
  trace: ExecutionTrace | null,
  profile: VizProfile | null,
  curated = false,
): { compactedScenes: VizScene[]; compactedEventIndices: number[] } {
  if (!trace || !profile || trace.events.length === 0) {
    return { compactedScenes: [], compactedEventIndices: [] };
  }
  const { scenes, eventIndices } = compactTimeline(
    trace.events,
    profile,
    { curated },
  );
  return { compactedScenes: scenes, compactedEventIndices: eventIndices };
}

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  code: DEFAULT_CODE,
  stdin: DEFAULT_STDIN,
  trace: null,
  stepIndex: 0,
  isPlaying: false,
  speedMs: 600,
  isRunning: false,
  error: null,
  problemTitle: null,
  problemStatement: null,
  patternName: null,
  patternSlug: null,
  patternHints: null,
  progressiveHints: null,
  problemDifficulty: null,
  problemHumanInput: null,
  problemSampleOutput: null,
  problemDescription: null,
  problemExamples: null,
  problemConstraints: null,
  problemLeetcodeUrl: null,
  problemEntryFunction: null,
  questionContext: null,
  stdinLocked: false,
  exampleResults: null,
  allExamplesPass: false,
  hasTwoExamples: false,
  aiExplain: null,
  aiExplainLoading: false,
  aiExplainError: null,
  aiExplainModalOpen: false,
  stepExplainText: null,
  stepExplainLoading: false,
  stepExplainError: null,
  vizProfile: null,
  vizProfileSource: null,
  vizSetupLoading: false,
  vizSetupError: null,
  compactedScenes: [],
  compactedEventIndices: [],
  solutionFilled: false,
  aiHintLevel: 0,

  setCode: (code) =>
    set({
      code,
      ...clearRunState(),
    }),
  setStdin: (stdin) => {
    if (get().stdinLocked) return;
    set({ stdin, ...clearRunState() });
  },
  setProblem: (p) => {
    const runExamples = getFirstTwoRunExamples(
      p?.examples,
      p?.description,
      p?.humanInput,
      p?.sampleOutput,
    );
    set({
      problemTitle: p?.title ?? null,
      problemStatement: p?.statement ?? null,
      patternName: p?.patternName ?? null,
      patternSlug: p?.patternSlug ?? null,
      patternHints: p?.patternHints ?? null,
      progressiveHints: p?.progressiveHints ?? null,
      problemDifficulty: p?.difficulty ?? null,
      problemHumanInput: p?.humanInput ?? null,
      problemSampleOutput: p?.sampleOutput ?? null,
      problemDescription: p?.description ?? null,
      problemExamples: p?.examples ?? null,
      problemConstraints: p?.constraints ?? null,
      problemLeetcodeUrl: p?.leetcodeUrl ?? null,
      problemEntryFunction: p?.entryFunction ?? null,
      stdin: p?.humanInput ?? get().stdin,
      stdinLocked: !!p?.humanInput,
      hasTwoExamples: runExamples.length >= 2,
      ...clearRunState(),
    });
  },
  setQuestionContext: (ctx) =>
    set({
      questionContext: ctx,
      ...clearRunState(),
    }),
  resetToStarter: () => {
    const { questionContext } = get();
    if (!questionContext) return;
    set({
      code: questionContext.starterCode,
      questionContext: { ...questionContext, solutionRevealed: false },
      ...clearRunState(),
    });
  },
  revealSolution: () => {
    const { questionContext } = get();
    if (!questionContext) return;
    set({
      code: questionContext.solutionCode,
      questionContext: { ...questionContext, solutionRevealed: true },
      ...clearRunState(),
    });
  },
  fillSolution: async () => {
    const { questionContext, problemHumanInput, stdinLocked, stdin } = get();
    if (!questionContext?.solutionCode) return;

    set({
      code: questionContext.solutionCode,
      questionContext: { ...questionContext, solutionRevealed: true },
      stdin: stdinLocked ? stdin : (problemHumanInput ?? stdin),
      ...clearRunState(),
      solutionFilled: true,
    });

    await get().run();

    const { trace, patternName } = get();
    if (!trace) return;

    const profile = buildDefaultVizProfile(trace, patternName);
    const timeline = rebuildTimeline(trace, profile, true);
    set({
      vizProfile: profile,
      vizProfileSource: "fallback",
      vizSetupLoading: false,
      stepIndex: 0,
      ...timeline,
    });
  },
  advanceAiHint: () => {
    const level = get().aiHintLevel;
    if (level >= 3) return;
    const next = (level + 1) as 1 | 2 | 3;
    set({ aiHintLevel: next });
    if (next === 3) void get().fillSolution();
  },
  resetAiHint: () => set({ aiHintLevel: 0 }),
  clearTrace: () => set(clearRunState()),
  clearAiExplain: () =>
    set({
      aiExplain: null,
      aiExplainError: null,
      aiExplainLoading: false,
      aiExplainModalOpen: false,
    }),
  clearStepExplain: () =>
    set({
      stepExplainText: null,
      stepExplainError: null,
      stepExplainLoading: false,
    }),
  setAiExplainModalOpen: (open) => set({ aiExplainModalOpen: open }),
  loadFreePlayground: () =>
    set({
      code: DEFAULT_CODE,
      stdin: DEFAULT_STDIN,
      trace: null,
      stepIndex: 0,
      isPlaying: false,
      error: null,
      problemTitle: null,
      problemStatement: null,
      patternName: null,
      problemDifficulty: null,
      problemHumanInput: null,
      problemSampleOutput: null,
      problemDescription: null,
      problemExamples: null,
      problemConstraints: null,
      problemLeetcodeUrl: null,
      problemEntryFunction: null,
      questionContext: null,
      stdinLocked: false,
      exampleResults: null,
      allExamplesPass: false,
      hasTwoExamples: false,
      aiExplain: null,
      aiExplainLoading: false,
      aiExplainError: null,
      aiExplainModalOpen: false,
    }),

  run: async () => {
    const {
      code,
      stdin,
      questionContext,
      problemExamples,
      problemDescription,
      problemHumanInput,
      problemSampleOutput,
    } = get();
    const started = Date.now();
    set({
      isRunning: true,
      error: null,
      isPlaying: false,
      aiExplain: null,
      aiExplainError: null,
      exampleResults: null,
      allExamplesPass: false,
      stepExplainText: null,
      stepExplainError: null,
    });

    const entryFn =
      questionContext?.entryFunction ??
      get().problemEntryFunction ??
      undefined;
    const result = await runCode(code, stdin, {
      leetcodeFunctionName: entryFn,
    });
    if (!result.ok) {
      set({ isRunning: false, error: result.error, trace: null });
      return;
    }

    const runExamples = getFirstTwoRunExamples(
      problemExamples,
      problemDescription,
      problemHumanInput,
      problemSampleOutput,
    );

    let exampleResults: ExampleRunResult[] | null = null;
    let allExamplesPass = false;

    if (runExamples.length > 0) {
      exampleResults = await validateExamples(code, runExamples);
      allExamplesPass = exampleResults.every((r) => r.pass);
    }

    if (questionContext) {
      recordQuestionAttempt(questionContext.questionId, Date.now() - started);
    }
    markVisualizerUsed();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("champdsa-visualizer-used"));
    }

    const { solutionFilled } = get();
    const profile = buildDefaultVizProfile(
      result.trace,
      get().patternName,
    );
    const timeline = rebuildTimeline(result.trace, profile, solutionFilled);

    set({
      isRunning: false,
      trace: result.trace,
      stepIndex: 0,
      error: null,
      exampleResults,
      allExamplesPass,
      hasTwoExamples: runExamples.length >= 2,
      vizProfile: profile,
      vizProfileSource: "fallback",
      vizSetupError: null,
      ...timeline,
    });
  },

  prepareVizSetup: async () => {
    const { trace, patternName, vizProfile, solutionFilled, questionContext } =
      get();

    if (!trace || trace.events.length === 0) {
      set({ vizSetupError: "Fill solution first to visualize." });
      return;
    }

    if (vizProfile && get().compactedScenes.length > 0) {
      return;
    }

    const profile = buildDefaultVizProfile(trace, patternName);
    const timeline = rebuildTimeline(trace, profile, solutionFilled);
    set({
      vizSetupLoading: false,
      vizProfile: profile,
      vizProfileSource: "fallback",
      vizSetupError: questionContext && !solutionFilled
        ? "Use Fill Solution before Visualize."
        : null,
      stepIndex: 0,
      ...timeline,
    });
  },

  rebuildCompactedTimeline: () => {
    const { trace, vizProfile, solutionFilled, patternName } = get();
    const profile =
      vizProfile ?? (trace ? buildDefaultVizProfile(trace, patternName) : null);
    if (!profile) return;
    const timeline = rebuildTimeline(trace, profile, solutionFilled);
    set({ vizProfile: profile, stepIndex: 0, ...timeline });
  },

  fetchAiExplain: async () => {
    const {
      code,
      trace,
      allExamplesPass,
      hasTwoExamples,
      problemTitle,
      problemStatement,
      patternName,
      problemConstraints,
      problemExamples,
      problemDescription,
      problemHumanInput,
      problemSampleOutput,
    } = get();

    if (!trace || !allExamplesPass || !hasTwoExamples) return;
    if (!problemTitle || !patternName) {
      set({ aiExplainError: "Load a practice problem to use AI Explain." });
      return;
    }

    const runExamples = getFirstTwoRunExamples(
      problemExamples,
      problemDescription,
      problemHumanInput,
      problemSampleOutput,
    );
    if (runExamples.length < 2) return;

    set({
      aiExplainLoading: true,
      aiExplainError: null,
      aiExplainModalOpen: true,
    });

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: problemTitle,
          statement: problemStatement ?? "",
          patternName,
          constraints: problemConstraints ?? [],
          examples: runExamples.map((e) => ({
            input: e.input,
            output: e.output,
          })),
          code,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "AI explanation failed.");
      }

      set({
        aiExplain: data as AiExplainCommentary,
        aiExplainLoading: false,
      });
    } catch (err) {
      set({
        aiExplainLoading: false,
        aiExplainError:
          err instanceof Error ? err.message : "AI explanation failed.",
      });
    }
  },

  setStepIndex: (i) => {
    const max = Math.max(0, get().compactedStepCount() - 1);
    set({
      stepIndex: Math.min(Math.max(0, i), max),
      isPlaying: false,
    });
  },

  stepNext: () => {
    const { stepIndex } = get();
    const max = get().compactedStepCount() - 1;
    get().setStepIndex(Math.min(stepIndex + 1, max));
  },

  stepPrev: () => {
    const { stepIndex } = get();
    get().setStepIndex(Math.max(0, stepIndex - 1));
  },

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  restart: () => set({ stepIndex: 0, isPlaying: false }),

  setSpeed: (speedMs) => set({ speedMs }),

  registerFormatCode: (fn) => {
    formatCodeFn = fn;
  },

  formatCode: () => {
    formatCodeFn?.();
  },

  currentEvent: () => {
    const { trace, stepIndex, compactedEventIndices } = get();
    if (!trace || trace.events.length === 0) return null;
    const rawIdx = compactedEventIndices[stepIndex] ?? stepIndex;
    return trace.events[rawIdx] ?? null;
  },

  previousEvent: () => {
    const { trace, stepIndex, compactedEventIndices } = get();
    if (!trace || stepIndex <= 0) return null;
    const rawIdx = compactedEventIndices[stepIndex - 1] ?? stepIndex - 1;
    return trace.events[rawIdx] ?? null;
  },

  currentScene: () => {
    const { compactedScenes, stepIndex } = get();
    return compactedScenes[stepIndex] ?? null;
  },

  compactedStepCount: () => {
    const { compactedScenes, trace } = get();
    if (compactedScenes.length > 0) return compactedScenes.length;
    return trace?.events.length ?? 0;
  },
}));
