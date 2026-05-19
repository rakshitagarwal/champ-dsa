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
};

const PANEL_EDITOR = "editor";
const PANEL_VIZ = "viz";
const LAYOUT_ID = "champdsa-solve-editor-viz";

const FALLBACK_LAYOUT = { [PANEL_EDITOR]: 42, [PANEL_VIZ]: 58 };

export function EditorVizSplit({ expectedOutput }: Props) {
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
        minSize={18}
        maxSize={75}
        defaultSize={42}
        className="flex min-h-0 flex-col overflow-hidden bg-editor/30"
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
        minSize={22}
        maxSize={82}
        defaultSize={58}
        className="flex min-h-0 min-w-0 flex-col overflow-hidden"
      >
        <VizPanel expectedOutput={expectedOutput} />
      </Panel>
    </Group>
  );
}
