"use client";

import type { NoteSegment } from "@/lib/notes/parse-markdown";
import { NoteCodeBlock } from "@/components/notes/note-code-block";

type Props = {
  segments: NoteSegment[];
};

export function NoteDocumentBody({ segments }: Props) {
  return (
    <div className="note-prose mt-8 space-y-4">
      {segments.map((seg, index) => {
        if (seg.type === "code") {
          return <NoteCodeBlock key={`code-${index}`} code={seg.code} />;
        }
        return (
          <div
            key={`html-${index}`}
            dangerouslySetInnerHTML={{ __html: seg.html }}
          />
        );
      })}
    </div>
  );
}
