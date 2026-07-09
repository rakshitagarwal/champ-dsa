import { getAllTipsDocuments } from "@/lib/tips/loader";
import { TipsPage } from "@/components/tips/tips-page";

export const metadata = {
  title: "Tips & Tricks",
  description:
    "Action-oriented job search playbooks: resume, LinkedIn, projects, interviews, and cold email.",
};

export default function Page() {
  const tips = getAllTipsDocuments();
  return (
    <div className="w-full py-8 pl-6 pr-4 sm:pl-8 sm:pr-5 lg:pl-10 lg:pr-6">
      <TipsPage tips={tips} />
    </div>
  );
}
