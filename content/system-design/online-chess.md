# Online Chess

> Realtime game. **Authoritative server**, clocks, matchmaking. Cheating and disconnects matter more than drawing a board in React.

> Rating queue in Redis, game server owns FEN + clocks, validate with chess lib, move log for reconnect — client is a dumb renderer.

## What they ask

**Scenario:** Pair by rating, validate moves, run Fischer clocks, handle disconnects and spectators (Lichess/Chess.com scale).

**What the interviewer really tests:**
- Server owns rules/clocks — reject illegal moves; never trust client time
- Fair clocks: server elapsed, lag compensation without gifting time
- Matchmaking: widen rating band with wait
- Reconnect restores exact position + clock

**Example scale:** 100k concurrent games, ~2k moves/s peak (latency-sensitive); 10k spectators on featured games.

## Requirements

**Functional:** Seek with time control + rating range. Move/resign/draw/claim. Clocks with increment. Lifecycle seeking → playing → finished. PGN history. Spectators. Glicko/Elo async on finish.

**Non-functional:** Move validation <50ms; clock drift <100ms; no illegal position; reconnect snapshot; light anti-cheat flags.

**Clarify:** Fischer only? Rated disconnect policy (clock runs)? Tournament/puzzles out?

**Out of scope (v1):** Live Stockfish per game, variants, deep engine anti-cheat.

## Scale estimation

| Metric | Result |
|--------|--------|
| Concurrent games | 100k × 2 players + spectators |
| Moves | ~93/s avg, **~2k/s peak** — tiny bandwidth |
| Matchmaking | 20k seekers in Redis ZSET ~2 MB |
| Storage | ~400 MB/day PGN — Postgres + S3 archive |

Throughput low; **correctness + latency** king — state in memory, durable move log.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/seeks` | Enter matchmaking |
| `DELETE` | `/v1/seeks/{id}` | Cancel seek |
| `GET` | `/v1/games/{id}` | Snapshot (FEN, clocks, PGN) |
| `WS` | `/v1/games/{id}/ws` | Moves + clock sync |
| `POST` | `/v1/games/{id}/abort` | Before 2 moves |

**WS move:** client `{ type:"move", uci:"e2e4", clientSeq }` → server `{ moveAccepted, fen, clocks, serverTime }` or `{ illegal }` to sender only.

## High-Level Design (HLD)

![Online chess: matchmaking, game rooms, clocks, store](/images/hld/online-chess-architecture.svg)

- **Seek Service:** Redis `ZSET seeks:{timeControl}` by rating; ticker pairs when `|r1-r2| ≤ 50 + wait×15`; create game + route host.
- **Game Router:** consistent hash `gameId → host` in Redis; gateway proxies WS.
- **Game Server (authoritative):** in-memory `Game`: fen, clocks, `lastMoveAt`, subscribers. Validate via chess.js; deduct **server** elapsed; add increment; flag on ≤0.
- **Persistence:** append `moves` ply log; snapshot every N ply; [Kafka](/hld/message-queue) optional for async persist — broadcast immediate from memory.
- **Rating worker:** consumes `gameEnd` → update ratings async.
- **Spectators:** fan-out on same channel; cap hot games → polling/CDN overflow.

**Move path:** WS → legal + toMove + clock OK → apply → broadcast → async persist.

**Clocks:** client animates from last `clocks+serverTime`; server flags on move + 1s ticker — no 10Hz WS ticks.

## Deep dive — authority and disconnects

Illegal/spam moves: rate limit socket; `clientSeq` dedup on retry. Engine cheat: flag sub-100ms + high engine correlation — review queue, not live block.

**Rated disconnect:** clock runs; 30s reconnect grace; refresh = `GET snapshot` + WS resubscribe. Move log = truth; replay on host crash.

## Deep dive — matchmaking fairness

Don't match 400 vs 2200 unless long wait widens threshold. Separate pools per time control. Featured 10k spectators: Redis pub/sub per game, not DB per move.

## Failures and scale

- Game host crash: replay Kafka/Postgres tail; reassign `game_host`; correct clocks via `now - lastMoveAt`.
- Seek ticker down: Redis queue survives; delayed pairs only.
- NTP: monotonic elapsed per host; single writer per `gameId` (actor).
- Illegal spam: disconnect after N rejects.
- Shard game servers by hash; Kafka partition by `gameId`.

**Phrase:** Matchmaking is a rating queue. The game process validates moves and owns the clock. Clients are dumb renderers. Disconnects reload from the server snapshot.

**Remember:** Redis seek ZSET → sticky game host → server clock deduct → move log replay → never trust client timestamp.
