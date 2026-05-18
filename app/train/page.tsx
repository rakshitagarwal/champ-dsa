import { redirect } from "next/navigation";

/** Legacy Train (MCQ) route — replaced by complexity cheat sheet. */
export default function TrainPage() {
  redirect("/cheatsheet");
}
