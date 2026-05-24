"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { PortalLink } from "@/types/job-search";

type Props = {
  portals: PortalLink[];
};

export function OpenAllPortalsButton({ portals }: Props) {
  const [open, setOpen] = useState(false);

  const openAll = () => {
    for (const portal of portals) {
      window.open(portal.url, "_blank", "noopener,noreferrer");
    }
    setOpen(false);
  };

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        <ExternalLink className="h-3.5 w-3.5" />
        Open all
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Open all job portals?"
        description={`This opens ${portals.length} tabs — one per portal. Your browser may ask to allow pop-ups.`}
      >
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={openAll}>
            Open {portals.length} tabs
          </Button>
        </div>
      </Dialog>
    </>
  );
}
