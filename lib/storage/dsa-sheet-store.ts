const STORAGE_KEY = "champdsa-dsa-sheet-v1";
export const DSA_SHEET_UPDATED_EVENT = "champdsa-dsa-sheet-updated";

type DsaSheetStoreData = {
  version: number;
  completed: Record<string, boolean>;
};

function defaultStore(): DsaSheetStoreData {
  return { version: 1, completed: {} };
}

function notify() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(DSA_SHEET_UPDATED_EVENT));
}

export function getDsaSheetStore(): DsaSheetStoreData {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw) as DsaSheetStoreData;
    return { ...defaultStore(), ...parsed, completed: parsed.completed ?? {} };
  } catch {
    return defaultStore();
  }
}

function saveStore(store: DsaSheetStoreData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  notify();
}

export function isStriverQuestionDone(id: string): boolean {
  return Boolean(getDsaSheetStore().completed[id]);
}

export function setStriverQuestionDone(id: string, done: boolean) {
  const store = getDsaSheetStore();
  if (done) store.completed[id] = true;
  else delete store.completed[id];
  saveStore(store);
}

export function getCompletedCount(ids?: string[]): number {
  const store = getDsaSheetStore();
  if (!ids) return Object.keys(store.completed).length;
  return ids.filter((id) => store.completed[id]).length;
}

export function toggleStriverQuestionDone(id: string) {
  setStriverQuestionDone(id, !isStriverQuestionDone(id));
}
