"use client";

import { useCallback, useState } from "react";
import { FileText, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractResumeText } from "@/lib/jobs/extract-resume-text";
import { cn } from "@/lib/utils";

type Props = {
  onTextExtracted: (text: string, fileName: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
};

export function ResumeUploadZone({
  onTextExtracted,
  onClear,
  disabled,
  className,
}: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      setLoading(true);
      setError(null);
      const result = await extractResumeText(file);
      setLoading(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setFileName(result.fileName);
      onTextExtracted(result.text, result.fileName);
    },
    [onTextExtracted],
  );

  const clear = () => {
    setFileName(null);
    setError(null);
    onClear?.();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) void handleFile(file);
        }}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        {loading ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        ) : (
          <Upload className="h-8 w-8 text-muted-foreground" />
        )}
        <p className="mt-3 text-sm font-medium">
          Drop PDF or DOCX here, or browse
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Max 2 MB · not stored</p>
        <input
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={disabled || loading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {fileName ? (
        <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
          <span className="flex items-center gap-2 truncate">
            <FileText className="h-4 w-4 shrink-0 text-primary" />
            {fileName}
          </span>
          <Button type="button" variant="ghost" size="icon" onClick={clear}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
