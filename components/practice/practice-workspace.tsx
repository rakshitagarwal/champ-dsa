"use client";

import { useEffect } from "react";
import type { Question } from "@/types/question";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { VizWorkspace } from "@/components/visualizer/viz-workspace";

export function PracticeWorkspace({ question }: { question: Question }) {
  const setCode = useVisualizerStore((s) => s.setCode);
  const setStdin = useVisualizerStore((s) => s.setStdin);
  const setProblem = useVisualizerStore((s) => s.setProblem);
  const setQuestionContext = useVisualizerStore((s) => s.setQuestionContext);
  const clearTrace = useVisualizerStore((s) => s.clearTrace);

  useEffect(() => {
    setCode(question.starterCode);
    setStdin(question.humanInput);
    setProblem({
      title: question.title,
      statement: question.statement,
      patternName: question.patternName,
    });
    setQuestionContext({
      questionId: question.id,
      starterCode: question.starterCode,
      solutionCode: question.solutionCode,
      solutionRevealed: false,
    });
    clearTrace();

    return () => {
      setQuestionContext(null);
    };
  }, [
    question,
    setCode,
    setStdin,
    setProblem,
    setQuestionContext,
    clearTrace,
  ]);

  return (
    <VizWorkspace
      mode="practice"
      hints={question.patternHints}
      fillParent
    />
  );
}
