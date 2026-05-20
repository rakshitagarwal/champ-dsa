# Solutions bank (211 problems)

## Source of truth

Edit solutions in [`scripts/sheet-solutions-data.mjs`](../../scripts/sheet-solutions-data.mjs).

Each entry includes:

- `starterCode` / `solutionCode` (wrapped as `function solve(...)`)
- `humanInput` / `sampleInput`
- `patternHints`
- `expectedOutput` (when used by the verifier)

## Regenerate practice questions

After changing solutions:

```bash
npm run generate:sheet
```

This updates [`data/questions/sheet-questions.ts`](../questions/sheet-questions.ts), which powers the practice UI (`solutionCode` on each `Question`).

## Verify all solutions

```bash
npm run verify:solutions
```

## Practice flow

1. **Fill Solution** — loads `question.solutionCode` from the generated sheet, runs the tracer, builds a curated compacted timeline (no Groq).
2. **Visualize** — opens the split modal (code + animation).
3. **AI Hint** — static 3-step ladder (pattern → hint → fill solution).
