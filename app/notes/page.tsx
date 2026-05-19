import { redirect } from "next/navigation";
import { getFirstNote } from "@/lib/notes/loader";

export default function NotesIndexPage() {
  const first = getFirstNote();
  if (!first) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">Notes</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add markdown files to <code className="text-xs">content/notes/</code>{" "}
          and register them in <code className="text-xs">data/notes/manifest.ts</code>.
        </p>
      </div>
    );
  }
  redirect(`/notes/${first.slug}`);
}
