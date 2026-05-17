"use client";

import { create } from "zustand";
import type { ExecutionEvent, ExecutionTrace } from "@/types/execution";
import { runCode } from "@/lib/tracer/run";
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
  questionContext: QuestionContext | null;
  setCode: (code: string) => void;
  setStdin: (stdin: string) => void;
  setProblem: (p: {
    title: string;
    statement: string;
    patternName: string;
  } | null) => void;
  setQuestionContext: (ctx: QuestionContext | null) => void;
  resetToStarter: () => void;
  revealSolution: () => void;
  clearTrace: () => void;
  loadFreePlayground: () => void;
  run: () => Promise<void>;
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
  questionContext: null,

  setCode: (code) => set({ code }),
  setStdin: (stdin) => set({ stdin }),
  setProblem: (p) =>
    set({
      problemTitle: p?.title ?? null,
      problemStatement: p?.statement ?? null,
      patternName: p?.patternName ?? null,
    }),
  setQuestionContext: (ctx) => set({ questionContext: ctx }),
  resetToStarter: () => {
    const { questionContext } = get();
    if (!questionContext) return;
    set({
      code: questionContext.starterCode,
      questionContext: { ...questionContext, solutionRevealed: false },
      trace: null,
      stepIndex: 0,
      isPlaying: false,
      error: null,
    });
  },
  revealSolution: () => {
    const { questionContext } = get();
    if (!questionContext) return;
    set({
      code: questionContext.solutionCode,
      questionContext: { ...questionContext, solutionRevealed: true },
      trace: null,
      stepIndex: 0,
      isPlaying: false,
      error: null,
    });
  },
  clearTrace: () =>
    set({ trace: null, stepIndex: 0, isPlaying: false, error: null }),
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
      questionContext: null,
    }),

  run: async () => {
    const { code, stdin, questionContext } = get();
    const started = Date.now();
    set({ isRunning: true, error: null, isPlaying: false });
    const result = await runCode(code, stdin);
    if (!result.ok) {
      set({ isRunning: false, error: result.error, trace: null });
      return;
    }
    if (questionContext) {
      recordQuestionAttempt(questionContext.questionId, Date.now() - started);
    }
    set({
      isRunning: false,
      trace: result.trace,
      stepIndex: 0,
      error: null,
    });
  },

  setStepIndex: (i) => {
    const { trace } = get();
    if (!trace) return;
    const max = Math.max(0, trace.events.length - 1);
    set({ stepIndex: Math.min(Math.max(0, i), max), isPlaying: false });
  },

  stepNext: () => {
    const { stepIndex, trace } = get();
    if (!trace) return;
    get().setStepIndex(Math.min(stepIndex + 1, trace.events.length - 1));
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
    const { trace, stepIndex } = get();
    if (!trace || trace.events.length === 0) return null;
    return trace.events[stepIndex] ?? null;
  },

  previousEvent: () => {
    const { trace, stepIndex } = get();
    if (!trace || stepIndex <= 0) return null;
    return trace.events[stepIndex - 1] ?? null;
  },
}));
