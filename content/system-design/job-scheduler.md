# Job Scheduler

> Cron for a whole company. The job is **run exactly once (or retry safely)** across many workers, not `crontab` on one VM.

## What they ask

Schedule jobs: once, cron, delayed. Thousands of jobs. Workers come and go. Don't run the billing cron twice.

## Requirements

**Functional:** register job, cron expression or `run_at`, cancel, see last status.

**Non-functional:** durable schedule, at-least-once execution with idempotent handlers, no thundering herd at `:00`.

## API

1. `POST /jobs` `{ name, cron, payload, timeout }`
2. `DELETE /jobs/{id}`
3. `GET /jobs/{id}/runs`
4. Workers pull or get pushed work

## Design

**Schedule table** in Postgres: `next_run_at`, `locked_by`, `locked_at`. A dispatcher every second: `SELECT … WHERE next_run_at <= now() FOR UPDATE SKIP LOCKED` → enqueue to SQS/Kafka → set `next_run_at` to the following tick.

**Workers** execute, then callback success/fail. Failures: retry with backoff, then DLQ.

**SKIP LOCKED** (or a lease in Redis + fencing token) is how two dispatchers don't double-enqueue.

**Don't** have 200 app pods each running `if (minute === 0) bill()`. That's a classic double-charge bug.

## Deep dive — exactly-once

You will **not** get exactly-once in a distributed system. You get:

1. Lease / lock so two workers don't start the same `run_id`
2. Idempotent job body (`run_id` unique in the billing table)
3. Heartbeats: if a worker dies mid-job, lease expires, another retries

**Missed ticks:** if the dispatcher was down for 10 minutes, catch up **once** or skip — say the policy (billing: catch up; email digest: skip).

**Hot :00:** jitter cron (`0-5 * * * *` random) or spread `next_run_at` so midnight isn't a thundering herd.

**Leadership:** optional — one dispatcher elected via [ZooKeeper](/system-design/zookeeper) / etcd; still use SKIP LOCKED as belt and suspenders.

## Extra probes

1. DAG of jobs (Airflow) — dependencies table; don't start B until A succeeded
2. Delayed messages: SQS delay / Redis sorted set
3. Timezones — store UTC, convert at the edge

**Phrase:** "Schedules live in the DB. Dispatch uses SKIP LOCKED and a run id. Workers are at-least-once; the job itself is idempotent. No crontab on random pods."
