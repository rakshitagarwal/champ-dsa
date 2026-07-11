import { DsaSheetShell } from "@/components/dsa-sheet/dsa-sheet-shell";
import {
  getStriverQuestions,
  getStriverSections,
} from "@/lib/dsa-sheet/loader";

export const metadata = {
  title: "DSA Sheet",
  description:
    "Striver A2Z DSA Sheet — LeetCode problems with topic filters and progress tracking.",
};

export default function DsaSheetPage() {
  const sections = getStriverSections();
  const questions = getStriverQuestions();

  return <DsaSheetShell sections={sections} questions={questions} />;
}
