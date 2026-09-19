import { CompilerWorkspace } from "@/components/compiler/compiler-workspace";

export const metadata = {
  title: "Compiler · ChampDSA",
  description: "Run JavaScript or Python with stdin and stdout — separate from the DSA Sheet.",
};

export default function CompilerPage() {
  return <CompilerWorkspace />;
}
