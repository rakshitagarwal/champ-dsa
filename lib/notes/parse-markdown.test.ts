import { describe, expect, it } from "vitest";
import { parseNoteSegments } from "@/lib/notes/parse-markdown";

describe("parseNoteSegments runnable fences", () => {
  it("marks js runnable blocks as interactive code segments", () => {
    const md = "```js runnable\nconsole.log(1);\n```";
    const segments = parseNoteSegments(md, { enableRunnable: true });
    expect(segments).toHaveLength(1);
    expect(segments[0]).toMatchObject({
      type: "code",
      runnable: true,
      code: "console.log(1);",
    });
  });

  it("keeps plain js fences as static html", () => {
    const md = "```js\nconsole.log(1);\n```";
    const segments = parseNoteSegments(md);
    expect(segments).toHaveLength(1);
    expect(segments[0]?.type).toBe("html");
  });

  it("ignores runnable tag when enableRunnable is false", () => {
    const md = "```js runnable\nconsole.log(1);\n```";
    const segments = parseNoteSegments(md, { enableRunnable: false });
    expect(segments[0]?.type).toBe("html");
  });
});
