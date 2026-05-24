import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Review your resume with Groq AI and open pre-filled job searches on LinkedIn, Naukri, Indeed, and more.",
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-10">{children}</div>
  );
}
