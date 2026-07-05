import { ExternalLink } from "lucide-react";
import { RESOURCES } from "@/data/resources";

export function ResourcesView() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Curated learning resources across languages, frontend, backend, DevOps,
          and computer science.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Topic
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {RESOURCES.map((r) => (
              <tr
                key={r.id}
                className="transition-colors hover:bg-accent/30"
              >
                <td className="px-4 py-3 font-medium">{r.topic}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {r.description}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {r.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Visit
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {RESOURCES.length} resources — bookmark this page for quick access.
      </p>
    </div>
  );
}
