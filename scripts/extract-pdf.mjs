import fs from "fs";
import { PDFParse } from "pdf-parse";

const path =
  process.argv[2] ||
  "c:/Users/Rakshit/Documents/bosscoder notes/bosscoder-dsa-sheet.pdf";
const out = process.argv[3] || "scripts/sheet-extracted.txt";

const buf = fs.readFileSync(path);
const parser = new PDFParse({ data: buf });
const result = await parser.getText();
const text = result?.text ?? "";
await parser.destroy();
fs.mkdirSync("scripts", { recursive: true });
fs.writeFileSync(out, text);
console.log("Wrote", out, "chars:", text.length);
