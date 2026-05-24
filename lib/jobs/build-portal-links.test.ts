import { describe, expect, it } from "vitest";
import { buildPortalLinks } from "@/lib/jobs/build-portal-links";

describe("buildPortalLinks", () => {
  const base = {
    jobTitle: "Full Stack Developer",
    experienceLevel: "3–6 years" as const,
    locations: ["Bangalore" as const],
  };

  it("returns 7 portal links", () => {
    const links = buildPortalLinks(base);
    expect(links).toHaveLength(7);
  });

  it("does not include LinkedIn", () => {
    const links = buildPortalLinks(base);
    expect(links.some((l) => l.id === "linkedin")).toBe(false);
  });

  it("URL-encodes keywords for Indeed", () => {
    const links = buildPortalLinks({
      ...base,
      jobTitle: "MERN Developer",
    });
    const indeed = links.find((l) => l.id === "indeed")!;
    expect(indeed.url).toContain("in.indeed.com/jobs");
    expect(indeed.url).toContain("q=MERN");
  });

  it("builds Hirist URL with experience filters", () => {
    const links = buildPortalLinks(base);
    const hirist = links.find((l) => l.id === "hirist")!;
    expect(hirist.url).toContain("hirist.tech/k/");
    expect(hirist.url).toContain("minexp=3");
    expect(hirist.url).toContain("maxexp=6");
  });

  it("includes extra keywords in query", () => {
    const links = buildPortalLinks({
      ...base,
      extraKeywords: ["React", "Node.js"],
    });
    const indeed = links.find((l) => l.id === "indeed")!;
    expect(decodeURIComponent(indeed.url)).toMatch(/React/);
  });

  it("attaches portal tips when provided", () => {
    const links = buildPortalLinks(base, {
      naukri: "Also try Payments keyword",
    });
    expect(links.find((l) => l.id === "naukri")?.tip).toBe(
      "Also try Payments keyword",
    );
  });

  it("uses Remote India as location fallback for Indeed", () => {
    const links = buildPortalLinks({
      ...base,
      locations: ["Remote India"],
    });
    const indeed = links.find((l) => l.id === "indeed")!;
    expect(indeed.url).toContain("l=India");
  });
});
