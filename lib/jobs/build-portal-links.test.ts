import { describe, expect, it } from "vitest";
import {
  buildPortalLinks,
  filterPortalsByRegion,
} from "@/lib/jobs/build-portal-links";

describe("buildPortalLinks", () => {
  const base = {
    jobTitle: "Full Stack Developer",
    experienceLevel: "3–6 years" as const,
    locations: ["Bangalore" as const],
  };

  it("returns 13 portal links for India (excludes Reed UK and Seek AU)", () => {
    const links = buildPortalLinks(base);
    expect(links).toHaveLength(13);
    expect(links.some((l) => l.id === "reed")).toBe(false);
    expect(links.some((l) => l.id === "seek")).toBe(false);
  });

  it("includes LinkedIn and Greenhouse portals", () => {
    const links = buildPortalLinks(base);
    const linkedin = links.find((l) => l.id === "linkedin")!;
    expect(linkedin.url).toContain("linkedin.com/jobs/search");
    expect(linkedin.url).toContain("keywords=");
    const greenhouse = links.find((l) => l.id === "greenhouse")!;
    expect(greenhouse.url).toContain("job-boards.greenhouse.io");
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

  it("builds Internshala URL for fresher roles", () => {
    const links = buildPortalLinks({
      ...base,
      experienceLevel: "Fresher",
    });
    const internshala = links.find((l) => l.id === "internshala")!;
    expect(internshala.url).toContain("internshala.com/internships");
  });

  it("builds Lever search URL", () => {
    const links = buildPortalLinks(base);
    const lever = links.find((l) => l.id === "lever")!;
    expect(lever.url).toContain("jobs.lever.co");
    expect(lever.url).toContain("search=");
  });

  it("shows Reed UK for London and hides Indian-only portals", () => {
    const links = buildPortalLinks({
      ...base,
      locations: ["London"],
    });
    expect(links.some((l) => l.id === "reed")).toBe(true);
    expect(links.some((l) => l.id === "naukri")).toBe(false);
    expect(links.some((l) => l.id === "internshala")).toBe(false);
    const reed = links.find((l) => l.id === "reed")!;
    expect(reed.url).toContain("reed.co.uk/jobs");
  });

  it("shows Seek AU for Sydney and hides Reed UK", () => {
    const links = buildPortalLinks({
      ...base,
      locations: ["Sydney"],
    });
    expect(links.some((l) => l.id === "seek")).toBe(true);
    expect(links.some((l) => l.id === "reed")).toBe(false);
    const seek = links.find((l) => l.id === "seek")!;
    expect(seek.url).toContain("seek.com.au");
  });

  it("uses UK Indeed for London", () => {
    const links = buildPortalLinks({
      ...base,
      locations: ["London"],
    });
    const indeed = links.find((l) => l.id === "indeed")!;
    expect(indeed.url).toContain("uk.indeed.com");
  });
});

describe("filterPortalsByRegion", () => {
  const allPortals = buildPortalLinks({
    jobTitle: "Engineer",
    experienceLevel: "3–6 years",
    locations: ["Bangalore"],
  });

  it("filters UK-only portals for India region", () => {
    const filtered = filterPortalsByRegion(allPortals, "india");
    expect(filtered.some((p) => p.id === "reed")).toBe(false);
    expect(filtered.some((p) => p.id === "seek")).toBe(false);
  });
});
