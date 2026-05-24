import { describe, expect, it } from "vitest";
import { buildPortalLinks } from "@/lib/jobs/build-portal-links";

describe("buildPortalLinks", () => {
  const base = {
    jobTitle: "Full Stack Developer",
    experienceLevel: "3–6 years" as const,
    locations: ["Bangalore" as const],
  };

  it("returns 9 portal links", () => {
    const links = buildPortalLinks(base);
    expect(links).toHaveLength(9);
  });

  it("builds working Hirist URL without /k/ over-specific slug", () => {
    const links = buildPortalLinks(base);
    const hirist = links.find((l) => l.id === "hirist")!;
    expect(hirist.url).toBe(
      "https://www.hirist.tech/full-stack-jobs-in-bangalore",
    );
  });

  it("builds Instahyre location page URL", () => {
    const links = buildPortalLinks(base);
    const instahyre = links.find((l) => l.id === "instahyre")!;
    expect(instahyre.url).toBe("https://www.instahyre.com/jobs-in-bangalore/");
  });

  it("uses separate Noida slugs for Noida", () => {
    const links = buildPortalLinks({
      ...base,
      locations: ["Noida"],
    });
    expect(links.find((l) => l.id === "hirist")?.url).toContain(
      "full-stack-jobs-in-noida",
    );
    expect(links.find((l) => l.id === "instahyre")?.url).toContain(
      "jobs-in-noida",
    );
  });

  it("maps Gift City to Gandhinagar on Hirist", () => {
    const links = buildPortalLinks({
      ...base,
      locations: ["Gift City"],
    });
    expect(links.find((l) => l.id === "hirist")?.url).toContain(
      "gandhinagar",
    );
  });

  it("includes Foundit and Shine portals", () => {
    const links = buildPortalLinks(base);
    expect(links.some((l) => l.id === "foundit")).toBe(true);
    expect(links.some((l) => l.id === "shine")).toBe(true);
    expect(links.find((l) => l.id === "foundit")?.url).toContain(
      "foundit.in/srp/results",
    );
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

  it("uses Remote India as location fallback for Indeed", () => {
    const links = buildPortalLinks({
      ...base,
      locations: ["Remote India"],
    });
    const indeed = links.find((l) => l.id === "indeed")!;
    expect(indeed.url).toContain("l=India");
    expect(links.find((l) => l.id === "instahyre")?.url).toContain(
      "search-jobs",
    );
  });
});
