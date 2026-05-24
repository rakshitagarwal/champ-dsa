import type { Metadata } from "next";
import { JobsSubNav } from "@/components/jobs/jobs-sub-nav";

export const metadata: Metadata = {
  title: "Get hired",
  description:
    "Review your resume with Groq AI and open pre-filled job searches on LinkedIn, Naukri, Indeed, and more.",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 lg:px-10">
      <JobsSubNav />
      {children}
    </div>
  );
}
