import type { Metadata } from "next";
import { JsCompilerWorkspace } from "@/components/js-compiler/js-compiler-workspace";

export const metadata: Metadata = {
  title: "JS Compiler · ChampDSA",
  description: "Run and format JavaScript with console output.",
};

export default function JsCompilerPage() {
  return <JsCompilerWorkspace />;
}
