# LeetCode

> Online judge. The scary part is **running stranger's code** without torching your cluster, plus fair queues when a contest starts.

## What they ask

**Scenario:** "Design LeetCode — user submits code, you run hidden tests, return pass/fail, runtime, maybe a score. Contests: thundering herd at t=0."

**What the interviewer really tests:**
- Can you **isolate untrusted code** (containers/gVisor/Firecracker, no network, seccomp, quotas)?
- How you decouple **API from execution** via queues per language and scale workers?
- Whether you keep **hidden tests private** (never in public JSON, not world-readable).
- How you handle **contest fairness** — queue absorbs spike, position feedback, warm images.

**Example scale:** 1M DAU, 5M submissions/day (~58/s avg, 500/s peak, 5k/s at contest start minute). Avg run 1s CPU, 128 MB, 10 test cases.

## Requirements

**Functional:**
- Browse problems: prompt, examples, constraints (public), not hidden tests.
- Submit: `{ problemId, lang, source }` → `{ submissionId }`. Poll/stream result.
- Judge: run against hidden test cases, compare stdout (or custom checker for floats/multiple answers), return `passed, failedCase, runtimeMs, memoryKb, logs`.
- Contests: timed window, leaderboard, thundering herd at start.
- History: list past submissions, per-user stats.

**Non-functional:**
- **Isolation:** untrusted code cannot escape, access network, or read hidden tests/other submissions.
- **Resource bounds:** CPU, memory, wall time, disk, no fork bomb. Kill on timeout/OOM.
- **Fairness:** contest queue FCFS with visibility (position in queue), no starvation for language X.
- **Latency:** p50 judge < 2s for easy problem, p95 < 5s; contest queue wait transparent.
- **Correctness:** don't leak hidden tests in response; only summary (first failed case or hashed).

**Clarify — questions to ask:**
- Languages supported? (Python, Java, C++, Go, JS …)
- Interactive problems (stdin/stdout vs function signature)?
- Custom checkers (float epsilon, multiple valid outputs)?
- Contest scoring — pass/fail, partial credit, time penalty?
- Need to cache identical submissions (same source+problem) to dedup?
- Max source size, test count per problem?

**Out of scope (v1):**
- In-browser collaborative editing or pair interview mode.
- AI code review / plagiarism detection (async addon).
- Full discussion forum / editorial system.

## Scale estimation

| Metric | Assumption | Math | Result |
|--------|-----------|------|--------|
| Submissions | 5M/day | 5M/86400 | ~58/s avg, ~500/s peak hour, 5k/s contest burst (60s) |
| Avg judge time | 1s CPU + 0.5s overhead | 5k * 1.5s | Need 7.5k concurrent sandbox slots for contest burst (or queue) |
| Workers | Each worker handles 1 job at a time | 7.5k slots / 4 per host | ~1.9k hosts burst — so queue + autoscale, not static fleet |
| Source storage | Avg 2 KB per submission | 5M*2KB | ~10 GB/day, ~3.6 TB/year — S3 if large |
| Test storage | 100 cases/problem * 10KB avg * 3k problems | 3k*100*10KB | ~3 GB — tiny, but access-controlled |
| Queue depth | Contest 50k submits in 1 min, workers 500/s | 50k-30k | 20k queued → avg wait 40s (show position) |
| Bandwidth | Source upload 2KB*58/s | 58*2KB | ~116 KB/s — negligible |

**Takeaway:** steady state modest; contest burst is 100x — queue + elastic workers, not over-provisioned API.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/problems` | List problems (paginated, filter by difficulty/tag) |
| `GET` | `/v1/problems/{id}` | Problem prompt + public samples |
| `POST` | `/v1/submissions` | Submit code |
| `GET` | `/v1/submissions/{id}` | Poll result |
| `GET` | `/v1/submissions?problemId=&userId=` | History |
| `WS` | `/v1/submissions/{id}/stream` | Stream status/logs (optional) |
| `POST` | `/v1/contests/{id}/enter` | Enter contest |

**Submit:**
```json
POST /v1/submissions
Authorization: Bearer <token>
{
  "problemId": "prob_123",
  "lang": "python",
  "source": "def solve(a,b): return a+b"
}
→ 202 { "id": "sub_789", "status": "queued", "queuePosition": 42 }
```

**Poll:**
```json
GET /v1/submissions/sub_789
→ 200 {
    "id": "sub_789",
    "status": "judging", // queued|judging|accepted|wrong_answer|tle|mle|runtime_error|compile_error
    "passed": 3,
    "total": 10,
    "failedCase": { "input": "2 3", "expected": "5", "actual": "4" }, // only public or truncated hidden
    "runtimeMs": 87,
    "memoryKb": 12400,
    "logs": "Traceback..."
  }
```

**Problem (no hidden tests):**
```json
GET /v1/problems/prob_123
→ 200 {
    "id": "prob_123",
    "title": "Two Sum",
    "difficulty": "easy",
    "prompt": "...",
    "samples": [{ "input":"...", "output":"..." }],
    "constraints": "n <= 1e5"
    // hiddenTests absent
  }
```

Idempotency: `POST /submissions` with `Idempotency-Key` — retry returns same `sub_789`.

## High-Level Design (HLD)

```
Client (Web/IDE)
  |
 CDN (problem statements)
  |
 L4 LB → API Gateway (auth, [rate limiter](/system-design/rate-limiter): submissions/min)
  |
 API Service → Postgres (problems, submissions metadata) → S3 (source if large)
  |     `--> publish to Queue per language → [SQS / Rabbit / Kafka partitioned]
  |
  +-- Queue per language: queue.python, queue.java, queue.cpp ...
  |        | (contest burst buffered here)
  |
  +-- Worker Fleet (autoscaled)
  |     |-- Fetches job → pulls source + test cases (internal, auth'd)
  |     |-- Spawns Sandbox (Docker + gVisor / Firecracker microVM)
  |     |     |-- No network, read-only root, tmpfs 64MB, ulimit, cgroups
  |     |     |-- Runs: compile (if needed) → execute per test case → compare
  |     |     `--> Kill on timeout (wall clock + CPU)
  |     `--> Writes result → Postgres + S3 logs → notifies via Poll/WS
  |
  +-- Test Case Store (private S3 + metadata DB) — NOT the public problem JSON
  |
  +-- Cache (Redis) — identical submission dedup: hash(source+problemId+lang) → result
  |
  +-- Leaderboard Service (contest: Redis sorted set)
```

**Component roles:**
- **API Service:** validates `lang`, stores `submissions(status=queued)` in Postgres, uploads source to S3 if > few KB, enqueues to language-specific queue, returns `submissionId`. Serves polls from Postgres/Redis cache.
- **Queue per language:** isolates blast radius — Java OOM doesn't block Python. SQS/Rabbit with visibility timeout; Kafka if you need replay. Priority queue for contests (contest jobs get dedicated workers or weighted fair queue).
- **Workers:** stateless, pull jobs (long-poll). Each job: fetch source + hidden tests (internal credentials only), run in **sandbox**. One submission per sandbox, destroyed after. Reports `runtime`, `memory`, `passed` counts.
- **Sandbox:** container with **gVisor** (user-space kernel) or **Firecracker** microVM. Seccomp (block syscalls), AppArmor, no network (`--network none`), read-only root, `cgroups` for CPU/memory, `ulimit -t`, wall-clock killer. Drop all capabilities.
- **Judge:** compares stdout exactly or via **custom checker** (e.g., float `abs(a-b) < 1e-6`, or validator program for multiple answers). Don't return full hidden input on fail — return truncated or `failedCase=1/10`.
- **Cache / dedup:** `sha256(lang+problemId+source)` → if recent result exists, return immediately without judging (squashes duplicate spam during contest).

**Write flow (submit):** `POST /submissions` → API validates → `INSERT submissions(queued)` → `PUBLISH queue.{lang} {submissionId}` → 202. Worker `RECEIVE` → `UPDATE submissions(judging)` → sandbox → write `UPDATE submissions(done, passed, runtime)` → client polls `GET /submissions/{id}` (or WS push).

**Read flow (poll):** `GET /submissions/{id}` → API reads Postgres (or Redis `sub:{id}→result` cache). For live progress, `WS /stream` subscribes to worker's status updates via Redis pub/sub.

## Low-Level Design (LLD)

**Database schema (Postgres):**
```sql
CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  handle        VARCHAR(64) UNIQUE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE problems (
  id            VARCHAR(32) PRIMARY KEY, -- prob_123
  title         VARCHAR(255) NOT NULL,
  difficulty    VARCHAR(16) NOT NULL, -- easy|medium|hard
  tags          VARCHAR(32)[] NOT NULL,
  prompt        TEXT NOT NULL,
  samples       JSONB NOT NULL, -- public examples
  time_limit_ms INT NOT NULL DEFAULT 2000,
  memory_limit_kb INT NOT NULL DEFAULT 262144,
  checker_type  VARCHAR(16) DEFAULT 'exact', -- exact|float|custom
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE test_cases (
  id            BIGSERIAL PRIMARY KEY,
  problem_id    VARCHAR(32) REFERENCES problems(id),
  seq           INT NOT NULL,
  input_key     VARCHAR(512) NOT NULL, -- S3 key (private bucket)
  output_key    VARCHAR(512) NOT NULL, -- S3 key
  is_hidden     BOOLEAN DEFAULT true,
  UNIQUE (problem_id, seq)
);

CREATE TABLE submissions (
  id            VARCHAR(32) PRIMARY KEY, -- sub_789
  user_id       BIGINT REFERENCES users(id),
  problem_id    VARCHAR(32) REFERENCES problems(id),
  lang          VARCHAR(16) NOT NULL,
  source_key    VARCHAR(512), -- S3 if large, else inline source TEXT
  source_hash   CHAR(64) NOT NULL, -- sha256 for dedup
  status        VARCHAR(16) NOT NULL DEFAULT 'queued',
  passed        INT,
  total         INT,
  runtime_ms    INT,
  memory_kb     INT,
  logs          TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  judged_at     TIMESTAMPTZ
);
CREATE INDEX idx_submissions_user_problem ON submissions(user_id, problem_id, created_at DESC);
CREATE INDEX idx_submissions_status_created ON submissions(status, created_at);

CREATE TABLE contests (
  id            VARCHAR(32) PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  starts_at     TIMESTAMPTZ NOT NULL,
  ends_at       TIMESTAMPTZ NOT NULL
);

CREATE TABLE contest_submissions (
  contest_id    VARCHAR(32) REFERENCES contests(id),
  submission_id VARCHAR(32) REFERENCES submissions(id),
  PRIMARY KEY (contest_id, submission_id)
);
```

**Key classes:**
```python
class APIService:
    def submit(self, user_id, problem_id, lang, source) -> Submission: ... # enqueue
    def get_result(self, submission_id) -> Submission: ...
    def idempotency_check(self, key) -> Optional[Submission]: ...

class Queue:
    def publish(self, lang, job: Job): ...
    def consume(self, lang) -> Job: ... # long poll

class Worker:
    def run_job(self, job: Job): ...
    def fetch_tests(self, problem_id) -> List[TestCase]: ... # internal auth
    def judge(self, source, tests, checker) -> Result: ...

class Sandbox:
    def compile(self, source, lang) -> CompileResult: ... # javac, g++ inside sandbox
    def execute(self, binary, test_input, limits) -> ExecResult: ... # no network
    def kill_on_timeout(self, pid, wall_ms): ...

class Checker:
    def compare(self, actual, expected, checker_type) -> bool: ... # exact, float eps, custom binary

class Leaderboard:
    def update(self, contest_id, user_id, score): ... # Redis ZADD
    def rank(self, contest_id, user_id) -> int: ...
```

**Algorithms / concurrency:**
- **Isolation:** spawn per submission: `docker run --network none --read-only --tmpfs /tmp:rw,size=64m --pids-limit 64 --memory 512m --cpus 1 --cap-drop ALL --security-opt seccomp=profile.json image:lang`. gVisor `runsc` or Firecracker for stronger isolation. Wall clock: `timeout 5s ./a.out < input > output`.
- **Custom checker:** `checker = compile(checker.cpp)` then `checker input output actual` returns 0/1 — handles multiple valid outputs, floats.
- **Dedup cache:** `key = sha256(lang + problemId + source)`; `GET cache:{key}` → if hit and `judged_at > now()-1h`, return cached result immediately, still `INSERT` submission with `status=accepted (cached)`.
- **Idempotency:** `submissions` unique on `(userId, problemId, source_hash, created_at bucket)` or via `Idempotency-Key` header table.

**Patterns:** Producer-Consumer (queue), Sandbox/Isolation, Strategy (Checker), Cache-Aside (dedup), Circuit Breaker (test store).

## Deep dive — isolation and contests

**Assume code is malware.** Mitigations:
- One sandbox per submission, destroyed after (no reuse across users).
- No network (`iptables DENY` + `--network none`), read-only root, ephemeral `/tmp` only.
- `seccomp` blocks `socket, ptrace, mount, ...`; `cgroups` for `cpu.max`, `memory.max`, `pids.max` (anti-fork bomb).
- Wall clock + CPU time both enforced; `ulimit -t 5`, `timeout` kills.
- Hidden tests fetched by **worker**, not mounted into sandbox; sandbox sees only `input.txt`, not `output.txt` (compare outside).
- Warm language images (pre-pulled `python:3.11-slim`, `openjdk:17`, `gcc:13`) — cold pull is why Firecracker/gVisor warm pools exist.

**Contest start — 50k submits in 60s:**
- Queue absorbs burst; don't scale API, scale **workers** (HPA on queue depth). Show `position in queue` via `queue_position = depth before job`.
- Pre-warm workers/images before contest `starts_at` (cron scales to 2x).
- Idempotent judge + dedup cache squashes identical spam submissions.
- Language queues prevent Java compile storm from blocking Python.

## Deep dive — hidden tests and cheating

**Never return full hidden tests.** On `wrong_answer`, return `failedCase: 3/10` with **public sample** only, or truncated `input` preview, not full hidden input/output. Internal JSON for staff only includes `hiddenTests` with restricted IAM.

**Storage:** `test_cases` S3 bucket private, worker IAM role only. Problem public JSON (`samples`) is separate artifact in public S3/CDN. Don't mount hidden bucket into sandbox as world-readable.

**Flaky tests / retry:** Run once; if `TLE` borderline or `Mysterious SIGKILL`, retry once on different host (idempotent). Log host for debugging.

## Deep dive — fair scheduling and warm start

**Fairness:** Don't use single global queue — language-specific queues + weighted fair polling ensure Python jobs don't starve behind 1000 Java compiles. Contest jobs can have dedicated `contest` queue with higher worker allocation.

**Warm start:** Firecracker microVMs boot in 125ms vs Docker 500ms — matters at 5k/s. Keep warm pool of sandboxes (pre-booted, paused) per language; on job, `resume + inject source`. Shared libraries / `pip` caches baked into image, not fetched at runtime.

**Autoscale:** KEDA/HPA on `queue_depth` and `cpu`. Scale down after contest ends; keep min 10 workers for steady state.

## Handling failures and scale

- **Worker crash:** queue visibility timeout re-delivers job (at-least-once). Judge must be **idempotent** — `UPDATE submissions SET status='judging' WHERE status='queued'` conditional, and result write `WHERE status='judging'`.
- **Sandbox escape / OOM:** `memory.max` triggers OOM kill → return `MCE (memory limit exceeded)`; `SIGKILL` on timeout → `TLE`.
- **Sharding:** `submissions` by `userId` hash or `problemId`; Postgres partitioned by `created_at` (monthly). S3 source keys by `hash`.
- **Caching:** Redis for dedup `cache:{hash} → result` TTL 1h; submission result cache `sub:{id} → JSON` TTL 5m.
- **Replication:** Postgres primary + replicas for reads (history); queue (SQS/Kafka) replicated. Worker fleet across AZs.
- **Rate limiting:** [rate limiter](/system-design/rate-limiter) `POST /submissions` 20/min per user, burst 5; contest participants get higher burst via token.

## Extra probes / Interview follow-ups

1. **Custom checkers:** compile checker binary per problem, run outside sandbox with `actual` vs `expected` + `input`.
2. **Large sources:** if `source > 64KB`, store in S3 `sources/{hash}.txt`, DB holds `source_key`; worker fetches via pre-signed URL.
3. **Leaderboard:** [Redis](/system-design/redis) `ZADD contest:{id}:board score userId`; score = `solved*100 - time_penalty`; update on each `accepted`.
4. **Partial credit:** for problems with subtasks, return `passed=7/10 → score 70`.
5. **Security audit:** log all syscalls via gVisor trace, alert on `socket` attempts, quarantine user after 3 violations.

**Phrase:** API only enqueues. A sandboxed worker with no network grades against private tests. Contests are a queue + more workers, not a bigger web server.
