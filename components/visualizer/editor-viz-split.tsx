"use client";

import {
  Group,
  Panel,
  Separator,
  useDefaultLayout,
} from "react-resizable-panels";
import { CodeEditor } from "./code-editor";
import { EditorActionBar } from "./editor-action-bar";
import { VizPanel } from "./viz-panel";
import { cn } from "@/lib/utils";

type Props = {
  expectedOutput?: string;
  layout?: "document" | "viewport";
};

const PANEL_EDITOR = "editor";
const PANEL_VIZ = "viz";
const LAYOUT_ID = "champdsa-solve-editor-viz-v2";
const FALLBACK_LAYOUT = { [PANEL_EDITOR]: 63, [PANEL_VIZ]: 37 };

function DocumentEditorStack({
  expectedOutput,
}: {
  expectedOutput?: string;
}) {
  return (
    <div className="flex w-full flex-col">
      <section className="border-b border-border bg-editor/30">
        <EditorActionBar />
        <div
          className="h-[min(540px,58vh)] min-h-[360px] p-2"
        >
          <CodeEditor />
        </div>
      </section>
      <VizPanel expectedOutput={expectedOutput} layout="document" />
    </div>
  );
}

export function EditorVizSplit({
  expectedOutput,
  layout = "viewport",
}: Props) {
  if (layout === "document") {
    return <DocumentEditorStack expectedOutput={expectedOutput} />;
  }

  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: LAYOUT_ID,
    panelIds: [PANEL_EDITOR, PANEL_VIZ],
  });

  return (
    <Group
      orientation="vertical"
      className="flex h-full min-h-0 min-w-0"
      defaultLayout={defaultLayout ?? FALLBACK_LAYOUT}
      onLayoutChanged={onLayoutChanged}
    >
      <Panel
        id={PANEL_EDITOR}
        minSize={28}
        maxSize={88}
        defaultSize={63}
        className="flex min-h-[200px] min-w-0 flex-col overflow-hidden bg-editor/30"
      >
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
          <EditorActionBar />
          <div className="min-h-0 flex-1 p-2">
            <CodeEditor />
          </div>
        </div>
      </Panel>

      <Separator
        id="editor-viz-separator"
        className={cn(
          "relative z-10 flex h-2.5 w-full shrink-0 items-center justify-center",
          "bg-border/40 transition-colors",
          "cursor-row-resize hover:bg-primary/15 active:bg-primary/25",
          "before:absolute before:inset-x-4 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:rounded-full before:bg-border",
          "after:block after:h-1 after:w-8 after:rounded-full after:bg-muted-foreground/35 after:content-['']",
          "hover:after:bg-muted-foreground/55 active:after:bg-muted-foreground/70",
        )}
      />

      <Panel
        id={PANEL_VIZ}
        minSize={12}
        maxSize={72}
        defaultSize={37}
        className="flex min-h-[160px] min-w-0 flex-col overflow-hidden"
      >
        <VizPanel expectedOutput={expectedOutput} layout="viewport" />
      </Panel>
    </Group>
  );
}
