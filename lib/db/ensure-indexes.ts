import { getDb } from "@/lib/db/mongodb";
import { COLLECTIONS } from "@/lib/db/collections";

let indexesReady: Promise<void> | null = null;

export function ensureIndexes(): Promise<void> {
  if (!indexesReady) {
    indexesReady = (async () => {
      const db = await getDb();
      await db
        .collection(COLLECTIONS.questions)
        .createIndex({ id: 1 }, { unique: true });
      await db
        .collection(COLLECTIONS.answers)
        .createIndex({ questionId: 1, createdAt: -1 });
    })();
  }
  return indexesReady;
}
