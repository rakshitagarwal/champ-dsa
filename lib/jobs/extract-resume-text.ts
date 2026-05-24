"use client";

const MAX_FILE_BYTES = 2 * 1024 * 1024;

export type ExtractResult =
  | { ok: true; text: string; fileName: string }
  | { ok: false; error: string };

function extension(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  if (typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  }

  const buffer = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const line = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    pages.push(line);
  }

  return pages.join("\n").replace(/\s+/g, " ").trim();
}

async function extractDocxText(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value.replace(/\s+/g, " ").trim();
}

export async function extractResumeText(file: File): Promise<ExtractResult> {
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: "File must be 2 MB or smaller." };
  }

  const ext = extension(file.name);
  try {
    let text = "";
    if (ext === "pdf") {
      text = await extractPdfText(file);
    } else if (ext === "docx") {
      text = await extractDocxText(file);
    } else {
      return {
        ok: false,
        error: "Upload a PDF or DOCX file.",
      };
    }

    if (text.length < 50) {
      return {
        ok: false,
        error: "Could not extract enough text. Try a text-based PDF or DOCX.",
      };
    }

    return { ok: true, text, fileName: file.name };
  } catch {
    return {
      ok: false,
      error: "Failed to read the file. Try exporting your resume again.",
    };
  }
}
