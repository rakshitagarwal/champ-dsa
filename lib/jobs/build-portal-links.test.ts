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

  it("URL-encodes keywords and location for LinkedIn", () => {
    const links = buildPortalLinks({
      ...base,
      jobTitle: "MERN Developer",
    });
    const linkedIn = links.find((l) => l.id === "linkedin")!;
    expect(linkedIn.url).toContain("linkedin.com/jobs/search");
    expect(linkedIn.url).toContain("keywords=MERN");
    expect(linkedIn.url).toContain("f_E=3%2C4");
  });

  it("includes extra keywords in query", () => {
    const links = buildPortalLinks({
      ...base,
      extraKeywords: ["React", "Node.js"],
    });
    const google = links.find((l) => l.id === "google")!;
    expect(decodeURIComponent(google.url)).toMatch(/React/);
  });

  it("attaches portal tips when provided", () => {
    const links = buildPortalLinks(base, {
      naukri: "Also try Payments keyword",
    });
    expect(links.find((l) => l.id === "naukri")?.tip).toBe(
      "Also try Payments keyword",
    );
  });

  it("uses Remote India as location fallback", () => {
    const links = buildPortalLinks({
      ...base,
      locations: ["Remote India"],
    });
    expect(links[0].url).toContain("location=India");
  });
});
