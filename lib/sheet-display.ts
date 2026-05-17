/** Strip leading sheet index (e.g. "01 ARRAYS" → "ARRAYS", "10 Greedy" → "Greedy"). */
export function stripSheetSectionNumber(title: string): string {
  return title.replace(/^\d{1,2}\s+/, "").trim();
}
