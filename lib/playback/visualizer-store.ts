"use client";

import { create } from "zustand";
import type {
  ExecutionEvent,
  ExecutionTrace,
} from "@/types/execution";
import type { ProgressiveHint, QuestionExample } from "@/types/question";
import type { AiAnimationResult } from "@/types/ai-animation";
import type { AiExplainCommentary, ExampleRunResult } from "@/types/ai-explain";
import type { VizProfile } from "@/types/viz-profile";
import type { VizScene } from "@/types/viz-scene";
import type { PlaybackStep } from "@/lib/viz/playback-step";
import {
  buildPlaybackTimeline,
  playbackStepsToCompat,
} from "@/lib/viz/build-playback-timeline";
import { buildDefaultVizProfile } from "@/lib/viz/default-viz-profile";
import { compactTimeline } from "@/lib/viz/scene/compact-steps";
import { runCode } from "@/lib/tracer/run";
import { validateExamples } from "@/lib/run/validate-examples";
import { getFirstTwoRunExamples } from "@/lib/questions/run-examples";
import { getManualTracerMeta } from "@/lib/tracer/manual/registry";
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
  savedAiExplanation: AiExplainCommentary | null;
  solutionExplanationVisible: boolean;
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
  playbackSteps: PlaybackStep[];
  traceCode: string;
  traceStepIndex: number;
  isTracePlaying: boolean;
  traceSpeed: number;
  playerMode: "trace" | "scene";
  aiAnimation: AiAnimationResult | null;
  aiAnimationLoading: boolean;
  aiAnimationError: string | null;
  aiAnimationMode: "ai" | "trace";
  aiAnimStepIndex: number;
  isAiAnimPlaying: boolean;
  currentPlaybackStep: () => PlaybackStep | null;
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
    aiExplanation?: AiExplainCommentary | null;
  } | null) => void;
  setQuestionContext: (ctx: QuestionContext | null) => void;
  resetToStarter: () => void;
  revealSolution: () => void;
  clearTrace: () => void;
  loadFreePlayground: () => void;
  run: () => Promise<void>;
  fetchAiExplain: () => Promise<void>;
  explainAgainWithGroq: () => Promise<void>;
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
  setTraceStep: (n: number) => void;
  traceStepNext: () => void;
  traceStepPrev: () => void;
  traceTogglePlay: () => void;
  setTraceSpeed: (s: number) => void;
  pauseTrace: () => void;
  canOpenExplain: () => boolean;
  showSolutionExplanation: () => void;
  hideSolutionExplanation: () => void;
  canOpenVisualize: () => boolean;
  openVisualizeModal: () => void;
  fetchAiAnimation: () => Promise<void>;
  fetchAnimationCaptions: () => Promise<void>;
  animationCaptionsLoading: boolean;
  clearAiAnimation: () => void;
  setAiAnimStep: (n: number) => void;
  aiAnimStepNext: () => void;
  aiAnimStepPrev: () => void;
  aiAnimTogglePlay: () => void;
  pauseAiAnim: () => void;
  aiAnimStepCount: () => number;
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
    solutionExplanationVisible: false,
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
    playbackSteps: [],
    traceCode: "",
    traceStepIndex: 0,
    isTracePlaying: false,
    traceSpeed: 1,
    playerMode: "scene" as const,
    aiHintLevel: 0 as 0 | 1 | 2 | 3,
    aiAnimation: null,
    aiAnimationLoading: false,
    aiAnimationError: null,
    aiAnimationMode: "trace" as const,
    aiAnimStepIndex: 0,
    isAiAnimPlaying: false,
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
  savedAiExplanation: null,
  solutionExplanationVisible: false,
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
  playbackSteps: [],
  traceCode: "",
  traceStepIndex: 0,
  isTracePlaying: false,
  traceSpeed: 1,
  playerMode: "scene",
  aiHintLevel: 0,
  aiAnimation: null,
  aiAnimationLoading: false,
  aiAnimationError: null,
  aiAnimationMode: "trace",
  aiAnimStepIndex: 0,
  isAiAnimPlaying: false,
  animationCaptionsLoading: false,

  currentPlaybackStep: () => {
    const { playbackSteps, traceStepIndex } = get();
    return playbackSteps[traceStepIndex] ?? null;
  },

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
      savedAiExplanation: p?.aiExplanation ?? null,
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

    const state = get();
    const { trace, patternName, patternSlug } = state;
    const sampleRaw = state.problemHumanInput ?? state.stdin;
    const manualMeta = getManualTracerMeta(
      questionContext.questionId,
      patternSlug,
    );

    const profile = trace ? buildDefaultVizProfile(trace, patternName) : null;
    const playbackSteps = buildPlaybackTimeline({
      trace,
      profile,
      curated: true,
      questionId: questionContext.questionId,
      patternSlug,
      sampleRaw,
    });
    const timeline = playbackStepsToCompat(playbackSteps);
    set({
      vizProfile: profile,
      vizProfileSource: "fallback",
      vizSetupLoading: false,
      stepIndex: 0,
      traceStepIndex: 0,
      isTracePlaying: false,
      playbackSteps,
      traceCode: manualMeta?.traceCode ?? questionContext.solutionCode,
      playerMode: playbackSteps.length > 0 ? "trace" : "scene",
      aiAnimationMode: "trace",
      solutionExplanationVisible: false,
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
      solutionFilled,
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

    const profile = buildDefaultVizProfile(
      result.trace,
      get().patternName,
    );
    const timeline = rebuildTimeline(result.trace, profile, solutionFilled);
    const playbackSteps =
      solutionFilled && questionContext
        ? buildPlaybackTimeline({
            trace: result.trace,
            profile,
            curated: true,
            questionId: questionContext.questionId,
            sampleRaw: problemHumanInput ?? stdin,
          })
        : [];
    const pbCompat = playbackStepsToCompat(playbackSteps);

    set({
      isRunning: false,
      trace: result.trace,
      stepIndex: 0,
      traceStepIndex: 0,
      isTracePlaying: false,
      error: null,
      exampleResults,
      allExamplesPass,
      hasTwoExamples: runExamples.length >= 2,
      vizProfile: profile,
      vizProfileSource: "fallback",
      vizSetupError: null,
      playbackSteps,
      traceCode: questionContext?.solutionCode ?? "",
      playerMode: playbackSteps.length > 0 ? "trace" : "scene",
      compactedScenes: pbCompat.compactedScenes,
      compactedEventIndices: pbCompat.compactedEventIndices,
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
    const {
      trace,
      vizProfile,
      solutionFilled,
      patternName,
      questionContext,
      problemHumanInput,
      stdin,
    } = get();
    const profile =
      vizProfile ?? (trace ? buildDefaultVizProfile(trace, patternName) : null);
    if (!profile) return;
    const playbackSteps =
      solutionFilled && questionContext
        ? buildPlaybackTimeline({
            trace,
            profile,
            curated: solutionFilled,
            questionId: questionContext.questionId,
            sampleRaw: problemHumanInput ?? stdin,
          })
        : [];
    const timeline = playbackStepsToCompat(playbackSteps);
    set({
      vizProfile: profile,
      stepIndex: 0,
      traceStepIndex: 0,
      playbackSteps,
      traceCode: questionContext?.solutionCode ?? get().traceCode,
      playerMode: playbackSteps.length > 0 ? "trace" : "scene",
      ...timeline,
    });
  },

  fetchAiExplain: async () => {
    await get().explainAgainWithGroq();
  },

  explainAgainWithGroq: async () => {
    const {
      code,
      solutionFilled,
      problemTitle,
      problemStatement,
      patternName,
      problemConstraints,
      problemExamples,
      problemDescription,
      problemHumanInput,
      problemSampleOutput,
    } = get();

    if (!solutionFilled || !code?.trim()) {
      set({ aiExplainError: "Fill the solution first." });
      return;
    }
    if (!problemTitle || !patternName) {
      set({ aiExplainError: "Load a practice problem to use AI Explain." });
      return;
    }

    let runExamples = getFirstTwoRunExamples(
      problemExamples,
      problemDescription,
      problemHumanInput,
      problemSampleOutput,
    );
    if (runExamples.length === 0 && problemHumanInput && problemSampleOutput) {
      runExamples = [
        { input: problemHumanInput, output: problemSampleOutput },
      ];
    }
    if (runExamples.length === 0) {
      set({ aiExplainError: "This problem has no examples for AI Explain." });
      return;
    }
    if (runExamples.length === 1) {
      runExamples = [...runExamples, runExamples[0]!];
    }

    set({
      aiExplainLoading: true,
      aiExplainError: null,
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
          examples: runExamples.slice(0, 2).map((e) => ({
            input: e.input,
            output: e.output,
          })),
          code,
          detailed: true,
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
    const idx = Math.min(Math.max(0, i), max);
    set({
      stepIndex: idx,
      traceStepIndex:
        get().playbackSteps.length > 0 ? idx : get().traceStepIndex,
      isPlaying: false,
      isTracePlaying: false,
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
  restart: () =>
    set({
      stepIndex: 0,
      traceStepIndex: 0,
      isPlaying: false,
      isTracePlaying: false,
    }),

  setSpeed: (speedMs) => set({ speedMs }),

  setTraceStep: (n) => {
    const max = Math.max(0, get().playbackSteps.length - 1);
    const idx = Math.min(Math.max(0, n), max);
    set({
      traceStepIndex: idx,
      stepIndex: idx,
      isTracePlaying: false,
      isPlaying: false,
    });
  },

  traceStepNext: () => {
    const { traceStepIndex, playbackSteps } = get();
    if (traceStepIndex >= playbackSteps.length - 1) {
      set({ isTracePlaying: false });
      return;
    }
    const next = traceStepIndex + 1;
    set({ traceStepIndex: next, stepIndex: next });
  },

  traceStepPrev: () =>
    set((s) => {
      const prev = Math.max(0, s.traceStepIndex - 1);
      return {
        traceStepIndex: prev,
        stepIndex: prev,
        isTracePlaying: false,
        isPlaying: false,
      };
    }),

  traceTogglePlay: () => {
    const { traceStepIndex, playbackSteps, isTracePlaying } = get();
    if (traceStepIndex >= playbackSteps.length - 1) {
      set({ isTracePlaying: true, traceStepIndex: 0 });
      return;
    }
    set({ isTracePlaying: !isTracePlaying });
  },

  setTraceSpeed: (traceSpeed) => set({ traceSpeed }),

  pauseTrace: () => set({ isTracePlaying: false }),

  canOpenExplain: () => {
    const { solutionFilled, savedAiExplanation } = get();
    return solutionFilled && !!savedAiExplanation;
  },

  showSolutionExplanation: () => {
    const { savedAiExplanation } = get();
    if (!savedAiExplanation) return;
    markVisualizerUsed();
    set({
      solutionExplanationVisible: true,
      aiExplain: null,
      aiExplainError: null,
      aiExplainLoading: false,
    });
  },

  hideSolutionExplanation: () =>
    set({
      solutionExplanationVisible: false,
      aiExplain: null,
      aiExplainError: null,
      aiExplainLoading: false,
    }),

  canOpenVisualize: () => {
    const { solutionFilled, traceCode, questionContext, playbackSteps } = get();
    const code = traceCode || questionContext?.solutionCode;
    return (
      solutionFilled &&
      (!!code?.trim() || playbackSteps.length > 0)
    );
  },

  openVisualizeModal: () => {
    set({
      aiAnimationMode: "trace",
      traceStepIndex: get().stepIndex,
      aiAnimationError: null,
    });
  },

  fetchAiAnimation: async () => {
    const { traceCode, questionContext, playbackSteps } = get();
    const code = traceCode || questionContext?.solutionCode;
    if (!code?.trim()) {
      set({
        aiAnimationError: "Fill Solution first to visualize.",
        aiAnimationMode: "trace",
        aiAnimationLoading: false,
      });
      return;
    }

    set({
      aiAnimationLoading: true,
      aiAnimationError: null,
      aiAnimation: null,
      aiAnimStepIndex: 0,
      isAiAnimPlaying: false,
      aiAnimationMode: playbackSteps.length > 0 ? "trace" : "trace",
    });

    try {
      const res = await fetch("/api/ai/generate-animation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "AI animation failed.");
      }

      set({
        aiAnimation: data as AiAnimationResult,
        aiAnimationMode: "ai",
        aiAnimationLoading: false,
        aiAnimationError: null,
        aiAnimStepIndex: 0,
        isAiAnimPlaying: false,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "AI animation failed.";
      set({
        aiAnimationLoading: false,
        aiAnimationMode: "trace",
        aiAnimationError: message,
        aiAnimation: null,
      });
    }
  },

  clearAiAnimation: () =>
    set({
      aiAnimation: null,
      aiAnimationLoading: false,
      aiAnimationError: null,
      aiAnimationMode: "trace",
      aiAnimStepIndex: 0,
      isAiAnimPlaying: false,
    }),

  aiAnimStepCount: () => {
    const { aiAnimation } = get();
    if (!aiAnimation?.steps.length) return 0;
    return Math.min(
      aiAnimation.steps.length,
      aiAnimation.totalSteps ?? aiAnimation.steps.length,
    );
  },

  setAiAnimStep: (n) => {
    const max = Math.max(0, get().aiAnimStepCount() - 1);
    set({
      aiAnimStepIndex: Math.min(Math.max(0, n), max),
      isAiAnimPlaying: false,
    });
  },

  aiAnimStepNext: () => {
    const { aiAnimStepIndex } = get();
    const max = get().aiAnimStepCount() - 1;
    if (aiAnimStepIndex >= max) {
      set({ isAiAnimPlaying: false });
      return;
    }
    set({ aiAnimStepIndex: aiAnimStepIndex + 1 });
  },

  aiAnimStepPrev: () =>
    set((s) => ({
      aiAnimStepIndex: Math.max(0, s.aiAnimStepIndex - 1),
      isAiAnimPlaying: false,
    })),

  aiAnimTogglePlay: () => {
    const { aiAnimStepIndex } = get();
    const max = get().aiAnimStepCount() - 1;
    if (aiAnimStepIndex >= max) {
      set({ isAiAnimPlaying: true, aiAnimStepIndex: 0 });
      return;
    }
    set({ isAiAnimPlaying: !get().isAiAnimPlaying });
  },

  pauseAiAnim: () => set({ isAiAnimPlaying: false }),

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

  fetchAnimationCaptions: async () => {
    const {
      playbackSteps,
      problemTitle,
      patternName,
      traceCode,
      questionContext,
    } = get();
    if (playbackSteps.length === 0 || !problemTitle || !patternName) return;

    set({ animationCaptionsLoading: true, aiAnimationError: null });

    try {
      const res = await fetch("/api/ai/animation-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: problemTitle,
          patternName,
          code: traceCode || questionContext?.solutionCode || "",
          steps: playbackSteps.slice(0, 12).map((s, i) => ({
            index: i,
            line: s.line,
            description: s.description,
            structureKinds: s.scene.structures.map((st) => st.kind),
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Caption enhancement failed.");
      }
      const captions = data.captions as string[] | undefined;
      if (!captions?.length) return;

      const updated = playbackSteps.map((step, i) => ({
        ...step,
        description: captions[i]?.trim() || step.description,
        scene: {
          ...step.scene,
          caption: captions[i]?.trim() || step.scene.caption,
        },
      }));
      const timeline = playbackStepsToCompat(updated);
      set({
        playbackSteps: updated,
        animationCaptionsLoading: false,
        ...timeline,
      });
    } catch (err) {
      set({
        animationCaptionsLoading: false,
        aiAnimationError:
          err instanceof Error ? err.message : "Caption enhancement failed.",
      });
    }
  },

  currentScene: () => {
    const { playbackSteps, traceStepIndex, compactedScenes, stepIndex } = get();
    const idx =
      playbackSteps.length > 0 ? traceStepIndex : stepIndex;
    return (
      playbackSteps[idx]?.scene ??
      compactedScenes[idx] ??
      null
    );
  },

  compactedStepCount: () => {
    const { playbackSteps, compactedScenes, trace } = get();
    if (playbackSteps.length > 0) return playbackSteps.length;
    if (compactedScenes.length > 0) return compactedScenes.length;
    return trace?.events.length ?? 0;
  },
}));
