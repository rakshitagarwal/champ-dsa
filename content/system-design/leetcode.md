# LeetCode

> Online judge. The scary part is **running stranger's code** without torching your cluster, plus fair queues when a contest starts.

> Isolate untrusted code in Docker/gVisor, queue per language, workers grade against private tests — rate limits + sandbox mandatory.

## What they ask

**Scenario:** Design LeetCode — submit code, run hidden tests, return pass/fail, runtime, score. Contests: thundering herd at t=0.

**What the interviewer really tests:**
- **Isolate untrusted code** (containers, no network, seccomp, CPU/memory quotas).
- Decouple **API from execution** via queues per language and elastic workers.
- **Hidden tests private** — never in public JSON or world-readable storage.
- **Contest fairness** — queue absorbs spike, position feedback, warm images.

**Example scale:** 1M DAU, 5M submissions/day (~58/s avg, 500/s peak, 5k/s contest minute). Avg run ~1s CPU, 128 MB, 10 cases.

## Requirements

**Functional:** Browse problems (public samples only). Submit `{ problemId, lang, source }` → poll/stream result. Judge hidden cases (exact or custom checker). Contests + leaderboard. Submission history.

**Non-functional:** Sandbox escape impossible; CPU/memory/wall-time limits; contest FCFS with queue visibility; p50 judge < 2s easy, p95 < 5s; don't leak full hidden I/O on fail.

**Clarify:** Languages? stdin/stdout vs function signature? Custom checkers? Contest scoring? Dedup identical source? Max source size?

**Out of scope (v1):** Pair programming IDE, AI plagiarism, full discussion forum.

## Scale estimation

| Metric | Result |
|--------|--------|
| Submissions | ~58/s avg, ~500/s peak, **5k/s contest burst** |
| Sandbox capacity | 5k × ~1.5s → need queue + autoscale, not static fleet |
| Source storage | ~2 KB × 5M/day → ~10 GB/day (S3 if large) |
| Hidden tests | ~3 GB total — tiny, access-controlled |

Steady state is modest; **contest burst is 100×** — queue + elastic workers.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/problems/{id}` | Prompt + public samples (no hidden tests) |
| `POST` | `/v1/submissions` | Submit code |
| `GET` | `/v1/submissions/{id}` | Poll result |
| `WS` | `/v1/submissions/{id}/stream` | Status/logs (optional) |
| `POST` | `/v1/contests/{id}/enter` | Enter contest |

**Submit (202):** `{ problemId, lang, source }` → `{ id, status: "queued", queuePosition }`. **Poll:** `status` = queued|judging|accepted|wrong_answer|tle|mle|…; truncated `failedCase` only. `Idempotency-Key` on submit.

## High-Level Design (HLD)

![LeetCode architecture: judge API, queue, sandbox fleet, results](/images/hld/leetcode-architecture.svg)

- **API Gateway:** auth, [rate limiter](/hld/rate-limiter) on submissions/min.
- **API Service:** Postgres metadata + S3 for large source; enqueue only — never runs user code inline.
- **Queues per language:** `queue.python`, `queue.java`, … — isolates compile storms; contest burst buffered here.
- **Worker fleet (autoscaled):** pull job → fetch source + **private** tests (IAM) → sandbox → write result.
- **Sandbox:** Docker + gVisor/Firecracker — `--network none`, read-only root, tmpfs, cgroups, kill on timeout/OOM.
- **Test store:** private S3 + DB metadata — separate from public problem CDN JSON.
- **Redis:** dedup `hash(lang+problemId+source)` → cached result; contest leaderboard ZSET.

**Submit flow:** validate → `INSERT queued` → publish `queue.{lang}` → 202. Worker → `judging` → sandbox per case → `UPDATE` result → poll/WS.

**Poll flow:** Postgres or Redis `sub:{id}`; progress via Redis pub/sub optional.

## Deep dive — isolation and contests

Treat every submission as malware: **one sandbox per run**, destroyed after. Hidden tests compared **outside** sandbox; sandbox sees input only. Warm language images (cold pull kills contest SLA).

**Contest:** 50k submits/min → show queue position; pre-warm workers before `starts_at`; language queues prevent Java compile blocking Python; dedup cache squashes identical spam.

## Deep dive — hidden tests and fairness

Never return full hidden input/output — `failedCase: 3/10` or truncated preview. Staff-only JSON for hidden cases.

Weighted fair polling across language queues. Firecracker warm pools (~125ms) vs Docker (~500ms) at 5k/s. Worker crash: visibility timeout + **idempotent** `UPDATE … WHERE status=queued`.

## Failures and scale

- Worker crash: at-least-once redelivery; conditional status updates prevent double grade.
- Sandbox OOM/timeout → MLE/TLE; log syscall violations (gVisor trace).
- Shard submissions by `userId` or time partition; S3 keys by content hash.
- Rate limit submits 20/min/user; burst higher for contest entrants via token bucket.
- Test store down: fail closed (don't judge without tests); API still accepts queue.
- Scale workers on queue depth (KEDA/HPA); min pool for steady state.

**Phrase:** API only enqueues. A sandboxed worker with no network grades against private tests. Contests are a queue + more workers, not a bigger web server.

**Remember:** Per-language queues → gVisor sandbox, no network → hidden tests on private S3 → dedup hash → contest = position + warm pool.
