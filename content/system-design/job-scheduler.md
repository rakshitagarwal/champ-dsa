# Job Scheduler

> Cron for a whole company. The job is **run exactly once (or retry safely)** across many workers, not `crontab` on one VM.

> Jobs durable in Postgres, dispatch with SKIP LOCKED, workers at-least-once with idempotent handlers + `run_id` dedup.

## What they ask

**Scenario:** Register jobs at a timestamp, on cron, or with delay. Thousands fire per second; workers crash mid-run. **`charge_monthly` must not run twice** because five dispatchers and twenty workers are alive.

**What the interviewer really tests:**
- Distributed leasing without SPOF
- Durable schedule vs in-memory cron
- Retry, backoff, DLQ, missed-tick policy
- Thundering herd at `:00` and timezones

## Requirements

**Functional:** Register job (cron / `run_at` / delay, payload, timeout, retry policy, queue). Cancel/pause/resume. List runs (PENDING, RUNNING, SUCCESS, FAILED, DLQ). Ad-hoc trigger. DAG (v2).

**Non-functional:** Survives dispatcher crash; at-least-once + idempotent handlers; no double-enqueue when dispatchers scale; 100k jobs, second granularity; observable.

**Clarify:** Cron fields + timezone per job? Missed tick — catch-up or skip? Webhook vs internal worker? Job duration range?

**Out of scope (v1):** Full Airflow UI, per-job code deploy, visual DAG editor.

## Scale estimation

| Metric | Result |
|--------|--------|
| Job defs | ~50k × 500 B → ~25 MB metadata |
| Run history | ~55 GB/year before TTL/archive |
| Dispatch | ~1k–5k/sec peak; index on `next_run_at` |
| Queue | ~5 MB/s to [Kafka](/hld/message-queue) — trivial |

Bottleneck: **contention on dispatch poll**, not raw throughput.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/jobs` | Create job |
| `GET` | `/api/v1/jobs/{id}` | Job + next run |
| `DELETE` | `/api/v1/jobs/{id}` | Cancel |
| `POST` | `/api/v1/jobs/{id}/pause` | Pause |
| `POST` | `/api/v1/jobs/{id}/trigger` | Ad-hoc run |
| `GET` | `/api/v1/jobs/{id}/runs` | Run history |
| `POST` | `/internal/workers/callback` | Success/fail + heartbeat |

**Create:** `{ name, cron?, timezone, payload, timeoutMs, retryPolicy, queue }` → `{ jobId, nextRunAt, status: ACTIVE }`. Worker: poll queue or Kafka consume; callback with `X-Run-Id`.

## High-Level Design (HLD)

![Job scheduler: job store, ticker, workers, DLQ](/images/hld/job-scheduler-architecture.svg)

- **Job Service:** validate cron, store UTC `next_run_at` — never client clock.
- **Dispatcher (3–5 replicas):** every ~1s: `SELECT … WHERE next_run_at <= now() AND status=ACTIVE ORDER BY next_run_at LIMIT 500 FOR UPDATE SKIP LOCKED` → insert `job_runs`, advance `next_run_at`, enqueue `{ job_id, run_id, payload }`.
- **Queue:** [Kafka](/hld/message-queue)/SQS per `queue` name; partition by `jobId` if ordering matters.
- **Workers:** autoscale per queue depth; heartbeat every 10s; idempotent side effects keyed by **`run_id`**.
- **DLQ:** after `maxRetries`; manual replay endpoint.
- **Redis (optional):** lease/fencing token cache.

**Register:** compute `next_run_at` → INSERT `jobs`.

**Execute:** consume → handler checks dedup table for `run_id` → run → callback SUCCESS/FAILED.

## Deep dive — exactly-once is a lie

**At-least-once + idempotent handlers + dedup.** Dispatcher: `SKIP LOCKED` + unique `run_id`. Worker: `if billing_ledger has run_id → noop success`. Heartbeat extends lease; reaper re-enqueues expired RUNNING.

**Never** 200 pods each running `if (minute===0) bill()` — name that double-charge bug.

Missed ticks: policy `SKIP` (one digest) vs `CATCH_UP_ONCE` (billing). **Midnight herd:** jitter `next_run_at` on create or shard dispatchers. Store UTC; DST gaps at scheduling edge.

## Deep dive — delayed jobs and leases

Delayed = `run_at = now()+delay` or SQS delay / Redis `ZADD jobs:delayed`. DAG (v2): dependency table — enqueue child when parent SUCCESS.

Transactional outbox if enqueue must match DB commit. Poison pill → DLQ + alert on depth.

## Failures and scale

- Dispatcher crash: peers continue via `SKIP LOCKED`.
- Worker crash mid-job: lease expiry → retry; handler idempotency prevents double charge.
- Queue down: runs stay PENDING in DB; retry enqueue with circuit breaker.
- Clock skew: DB `now()` as truth; NTP on hosts.
- Scale: ~10 dispatchers linear; partition queues; archive old `job_runs` to S3.
- Observability: per-queue lag, run latency, DLQ alerts, trace `run_id`.

**Phrase:** Schedules live in the DB. Dispatch uses SKIP LOCKED and a run id. Workers are at-least-once; the job itself is idempotent. No crontab on random pods.

**Remember:** SKIP LOCKED dispatch → unique run_id → worker dedup table → heartbeat lease → jitter midnight → DLQ after max retries.
