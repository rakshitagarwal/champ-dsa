import { loadEnvFiles } from "./load-env";

loadEnvFiles([".env", ".env.local"]);

async function main() {
  if (!process.env.MONGODB_URI?.trim()) {
    console.error(
      "MONGODB_URI is not set. Add it to .env or .env.local and retry.",
    );
    process.exit(1);
  }

  const { syncQuestionsAndAnswers } = await import("@/lib/db/sync");
  const result = await syncQuestionsAndAnswers();
  console.log(
    `Synced ${result.questions} questions and ${result.answers} reference answers into MongoDB.`,
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
