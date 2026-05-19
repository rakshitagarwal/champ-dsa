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
    description: "Add content/notes/react.md to enable.",
  },
  {
    slug: "node",
    title: "Node js",
    description: "Add content/notes/node.md to enable.",
  },
  {
    slug: "next",
    title: "Next js",
    description: "Add content/notes/next.md to enable.",
  },
  {
    slug: "sql",
    title: "SQL basics",
    description: "Add content/notes/sql.md to enable.",
  },
  {
    slug: "css",
    title: "CSS essentials",
    description: "Add content/notes/css.md to enable.",
  },
];
