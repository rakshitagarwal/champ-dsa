import { describe, expect, it } from "vitest";
import { runSimpleJavaScript } from "./run-simple";

describe("runSimpleJavaScript", () => {
  it("captures console.log output", () => {
    const result = runSimpleJavaScript('console.log("Hello, World!");', "");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.stdout).toBe("Hello, World!");
    }
  });

  it("exposes stdin as inputLines", () => {
    const result = runSimpleJavaScript(
      'console.log(inputLines.join(","));',
      "a\nb",
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.stdout).toBe("a,b");
    }
  });

  it("returns errors for invalid code", () => {
    const result = runSimpleJavaScript("syntax {{{", "");
    expect(result.ok).toBe(false);
  });
});
