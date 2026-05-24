import type { Metadata } from "next";
import { JobsSubNav } from "@/components/jobs/jobs-sub-nav";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Review your resume with Groq AI and open pre-filled job searches on Naukri, Indeed, Instahyre, Hirist, and more.",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-10">
        <JobsSubNav />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
