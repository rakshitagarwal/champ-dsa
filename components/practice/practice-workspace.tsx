"use client";

import { useEffect, useState } from "react";
import type { Question } from "@/types/question";
import { useVisualizerStore } from "@/lib/playback/visualizer-store";
import { VizWorkspace } from "@/components/visualizer/viz-workspace";
import { ConfidencePrompt } from "@/components/practice/confidence-prompt";
import {
  touchQuestion,
  getProgress,
  markQuestionSolved,
  setLastVisited,
  LEARNING_UPDATED_EVENT,
} from "@/lib/storage/learning-store";

export function PracticeWorkspace({ question }: { question: Question }) {
  const setCode = useVisualizerStore((s) => s.setCode);
  const setStdin = useVisualizerStore((s) => s.setStdin);
  const setProblem = useVisualizerStore((s) => s.setProblem);
  const setQuestionContext = useVisualizerStore((s) => s.setQuestionContext);
  const clearTrace = useVisualizerStore((s) => s.clearTrace);
  const [showConfidence, setShowConfidence] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setCode(question.starterCode);
    setStdin(question.humanInput);
    setProblem({
      title: question.title,
      statement: question.statement,
      patternName: question.patternName,
      difficulty: question.difficulty,
      humanInput: question.humanInput,
      sampleOutput: question.sampleOutput,
      description: question.description,
      examples: question.examples,
      constraints: question.constraints,
      leetcodeUrl: question.leetcodeUrl,
    });
    setQuestionContext({
      questionId: question.id,
      starterCode: question.starterCode,
      solutionCode: question.solutionCode,
      solutionRevealed: false,
    });
    clearTrace();
    touchQuestion(question.id);
    setLastVisited({ type: "question", slugOrId: question.id });
    setSolved(getProgress(question.id).status === "solved");

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

  useEffect(() => {
    const onSolved = () =>
      setSolved(getProgress(question.id).status === "solved");
    window.addEventListener(LEARNING_UPDATED_EVENT, onSolved);
    return () => window.removeEventListener(LEARNING_UPDATED_EVENT, onSolved);
  }, [question.id]);

  const handleMarkSolved = () => {
    const prog = getProgress(question.id);
    markQuestionSolved(question.id, {
      firstAttempt: prog.attempts <= 1,
      independent: prog.hintsUsed <= 2,
    });
    setSolved(true);
    setShowConfidence(true);
  };

  return (
    <>
      <VizWorkspace
        layout="document"
        hints={question.patternHints}
        progressiveHints={question.progressiveHints}
        questionId={question.id}
        onMarkSolved={!solved ? handleMarkSolved : undefined}
      />
      {showConfidence && (
        <ConfidencePrompt
          questionId={question.id}
          onDone={() => setShowConfidence(false)}
        />
      )}
    </>
  );
}
