import { describe, expect, it } from "vitest";
import { isRouteAllowed } from "./viewport-allow";

describe("isRouteAllowed", () => {
  it("allows home on phone", () => {
    expect(isRouteAllowed("/", 375)).toBe(true);
  });

  it("blocks practice on phone", () => {
    expect(isRouteAllowed("/practice", 375)).toBe(false);
  });

  it("allows js-notes on tablet", () => {
    expect(isRouteAllowed("/js-notes/closures", 800)).toBe(true);
  });

  it("blocks visualizer on tablet", () => {
    expect(isRouteAllowed("/visualizer", 800)).toBe(false);
  });

  it("allows all routes on desktop", () => {
    expect(isRouteAllowed("/visualizer", 1280)).toBe(true);
  });
});
