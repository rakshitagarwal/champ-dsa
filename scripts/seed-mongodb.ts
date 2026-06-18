import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { seedQuestionsFromStaticData } from "@/lib/db/seed";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

async function main() {
  const result = await seedQuestionsFromStaticData();
  console.log(`Seeded ${result.count} questions into MongoDB (champdsa).`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
