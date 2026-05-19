import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function JsNoteLegacyTopicPage() {
  redirect("/notes/javascript");
}
