import type { Question } from "@/types/question";
import { ProblemPanel } from "@/components/visualizer/problem-panel";
import { DocumentColumns } from "@/components/visualizer/document-columns";
import { SolutionPanel } from "./solution-panel";

type Props = {
  question: Question;
};

export function SolutionView({ question }: Props) {
  const problemPanel = (
    <ProblemPanel
      title={question.title}
      patternName={question.patternName}
      difficulty={question.difficulty}
      statement={question.statement}
      description={question.description}
      examples={question.examples}
      constraints={question.constraints}
      leetcodeUrl={question.leetcodeUrl}
      humanInput={question.humanInput}
      sampleOutput={question.sampleOutput}
      layout="document"
    />
  );

  const codeColumn = (
    <SolutionPanel
      solutionCode={question.solutionCode}
      aiExplanation={question.aiExplanation}
    />
  );

  return <DocumentColumns problem={problemPanel} code={codeColumn} />;
}
