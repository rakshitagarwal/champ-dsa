import type { Metadata } from "next";
import { JobsSubNav } from "@/components/jobs/jobs-sub-nav";

export const metadata: Metadata = {
  title: "Job search",
  description:
    "Open pre-filled job searches on Naukri, Indeed, Foundit, Shine, Instahyre, Hirist, and more.",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
      <div className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-4 lg:px-5">
        <JobsSubNav />
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
