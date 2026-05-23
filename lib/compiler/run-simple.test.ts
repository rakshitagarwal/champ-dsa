import { describe, expect, it } from "vitest";
import { runSimpleJavaScript } from "./run-simple";

describe("runSimpleJavaScript", () => {
  it("captures console.log output", async () => {
    const result = await runSimpleJavaScript('console.log("Hello, World!");', "");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.stdout).toBe("Hello, World!");
    }
  });

  it("exposes stdin as inputLines", async () => {
    const result = await runSimpleJavaScript(
      'console.log(inputLines.join(","));',
      "a\nb",
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.stdout).toBe("a,b");
    }
  });

  it("returns errors for invalid code", async () => {
    const result = await runSimpleJavaScript("syntax {{{", "");
    expect(result.ok).toBe(false);
  });

  it("waits for microtasks and setTimeout", async () => {
    const result = await runSimpleJavaScript(
      `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");`,
      "",
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.stdout).toBe("1\n4\n3\n2");
    }
  });
});
