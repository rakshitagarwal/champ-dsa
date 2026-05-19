# Ops & debugging

## Logging

Structured JSON logs (`pino`) with `requestId`, `userId`, duration. Correlate across services.

## Graceful shutdown

```js
process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
```

Stop accepting, drain in-flight, then exit. K8s sends SIGTERM before kill.

## Health checks

`/health` liveness (process up) vs `/ready` (DB reachable). Don't hit DB on liveness if expensive.

## Profiling

`node --inspect`, CPU flame graphs, `clinic.js` for event loop delay. Memory: heap snapshots diff.

## Secrets

12-factor: env vars, not repo. Rotate keys; never log tokens.

## Uncaught handlers

`unhandledRejection` / `uncaughtException` — log and exit in production (let orchestrator restart) vs undefined state.
