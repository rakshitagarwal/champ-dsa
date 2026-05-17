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
import { Button } from "@/components/ui/button";

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
    const onSolved = () => setSolved(getProgress(question.id).status === "solved");
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
      <div className="flex h-full min-h-0 flex-col">
        {!solved && (
          <div className="flex shrink-0 items-center justify-end gap-2 border-b border-border bg-panel px-4 py-2">
            <Button size="sm" onClick={handleMarkSolved}>
              Mark as solved
            </Button>
          </div>
        )}
        <div className="min-h-0 flex-1">
          <VizWorkspace
            mode="practice"
            hints={question.patternHints}
            progressiveHints={question.progressiveHints}
            questionId={question.id}
            fillParent
          />
        </div>
      </div>
      {showConfidence && (
        <ConfidencePrompt
          questionId={question.id}
          onDone={() => setShowConfidence(false)}
        />
      )}
    </>
  );
}
