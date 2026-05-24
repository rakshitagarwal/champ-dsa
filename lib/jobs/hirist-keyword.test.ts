import { describe, expect, it } from "vitest";
import { toHiristKeyword } from "@/lib/jobs/hirist-keyword";

describe("toHiristKeyword", () => {
  it("maps full stack developer to full-stack", () => {
    expect(toHiristKeyword("Full Stack Developer")).toBe("full-stack");
  });

  it("maps react developer to react", () => {
    expect(toHiristKeyword("React Developer")).toBe("react");
  });
});
