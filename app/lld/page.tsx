import { redirect } from "next/navigation";
import { getFirstLld } from "@/lib/lld/loader";

export const metadata = {
  title: "LLD",
  description:
    "Low-Level Design notes: concepts, design patterns, and interview problems.",
};

export default function LldIndexPage() {
  const first = getFirstLld();
  if (!first) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">LLD</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Low-Level Design notes coming soon.
        </p>
      </div>
    );
  }
  redirect(`/lld/${first.slug}`);
}
