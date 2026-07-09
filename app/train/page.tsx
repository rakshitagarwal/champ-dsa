import { redirect } from "next/navigation";

/** Legacy Train (MCQ) route — replaced by Tips & Tricks. */
export default function TrainPage() {
  redirect("/tips");
}
