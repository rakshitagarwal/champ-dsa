import type { NoteDocumentMeta } from "@/types/notes";

/**
 * Flat catalog — one sidebar item per markdown file in `content/notes/{slug}.md`.
 * Add a row here and drop the `.md` file to publish a new notes page.
 */
export const NOTE_CATALOG: NoteDocumentMeta[] = [
  {
    slug: "javascript",
    title: "JavaScript",
    description: "Interview revision — types, closures, event loop, promises, and more.",
  },
  {
    slug: "react",
    title: "React js",
    description:
      "Interview revision — Virtual DOM, hooks, state, reconciliation, and patterns.",
  },
  {
    slug: "node",
    title: "Node js",
    description:
      "Interview revision — event loop, streams, modules, Express, and the Node runtime.",
  },
  {
    slug: "next",
    title: "Next js",
    description: "Add content/notes/next.md to enable.",
  },
  {
    slug: "sql",
    title: "SQL basics",
    description:
      "Interview revision — joins, indexes, transactions, normalization, and query patterns.",
  },
  {
    slug: "html-css",
    title: "HTML & CSS",
    description:
      "Interview revision — HTML5 semantics, layout, Flexbox, Grid, and responsive CSS.",
  },
];
