import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Analyzer",
  description:
    "Upload your resume for an ATS score, keyword gaps, and line-level rewrites.",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
