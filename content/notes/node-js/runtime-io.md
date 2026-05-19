# Runtime & I/O

## Single thread + libuv

JS runs on one thread; libuv handles thread pool for **some** fs/crypto/dns and OS async I/O.

**Don't block the event loop**: sync `fs.readFileSync`, heavy JSON parse on huge payloads, tight CPU loops.

## Thread pool size

`UV_THREADPOOL_SIZE` (default 4) — saturated pool queues work; tune for CPU-heavy native ops.

## `worker_threads`

Offload CPU (image resize, bcrypt rounds) — not for every request; process spawn cost matters.

## Cluster / PM2

Multiple processes bind same port — use for CPU scaling on multi-core. Shared state needs Redis/DB, not in-memory singleton.

## Environment

`NODE_ENV=production` enables optimizations. Read config once at boot; validate with schema.

## File descriptors

Leaked sockets/handlers → `EMFILE`. Always `server.close()` on shutdown; limit concurrent outbound connections.
