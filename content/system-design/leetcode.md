# LeetCode

> Online judge. The scary part is **running stranger's code** without torching your cluster, plus fair queues when a contest starts.

## What they ask

User submits code. You run hidden tests. Return pass/fail, runtime, maybe a score. Contests: thundering herd at t=0.

## Requirements

**Functional:** submit, poll/stream result, see tests failed, contests (optional).

**Non-functional:** isolate untrusted code, bound CPU/memory/time, no leaked hidden tests, contest fairness.

**Clarify:** languages supported; interactive problems or not.

## API

1. `POST /submissions` `{ problemId, lang, source }` → `{ id }`
2. `GET /submissions/{id}` `{ status, passed, logs? }`
3. `GET /problems/{id}` — prompt, not hidden tests

## Design

**API** stores submission in Postgres (`queued`). Publishes to a **queue per language** (SQS / Rabbit / Kafka with more workers).

**Workers** pull jobs. Each job runs in a **sandbox**: container (gVisor/Firecracker) or VM. No network. Disk quota. `ulimit` + wall clock. Kill on timeout.

**Judge:** worker fetches test cases from an internal store (not the public problem JSON). Compare stdout. Write results. User polls or WS.

**Never** run `eval` on the API box. Never mount the hidden tests as world-readable.

## Deep dive — isolation and contests

**Isolation:** one submission per sandbox. Drop capabilities. Read-only root. Seccomp. Assume the code is malware.

**Cheating:** don't return full hidden tests on fail; return a hashed summary or a small public sample.

**Contest start:** 50k submits in a minute. Queue absorbs. Show `position in queue`. Scale workers. Idempotent judge (same source+problem → cache result) to squash duplicates.

**Shared libraries / caching:** warm language images. Cold start is why Firecracker exists.

## Extra probes

1. Custom checkers (floats, multiple answers)
2. Flaky tests — retry once
3. Store source in object storage if large; DB keeps metadata
4. Rate limit submit — [rate limiter](/system-design/rate-limiter)

**Phrase:** "API only enqueues. A sandboxed worker with no network grades against private tests. Contests are a queue + more workers, not a bigger web server."
