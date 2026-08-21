import { redirect } from "next/navigation";
import { getFirstSd } from "@/lib/system-design/loader";

export const metadata = {
  title: "System Design",
  description:
    "Key technologies and Hello Interview–style question breakdowns for system design interviews.",
};

export default function SystemDesignIndexPage() {
  const first = getFirstSd();
  if (!first) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">System Design</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add markdown files to{" "}
          <code className="text-xs">content/system-design/</code>.
        </p>
      </div>
    );
  }
  redirect(`/system-design/${first.slug}`);
}
