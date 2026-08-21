# Online Chess

> Realtime game. **Authoritative server**, clocks, matchmaking. Cheating and disconnects matter more than drawing a board in React.

## What they ask

Pair two players, validate moves, run a clock, handle refresh mid-game. Rating optional.

## Requirements

**Functional:** matchmaking, play moves, resign/draw, game history, maybe puzzles (out of scope).

**Non-functional:** fair clocks, no illegal moves, reconnect with the same position, anti-cheat light.

## API

1. `POST /seek` `{ timeControl, ratingRange }`
2. `WS /games/{id}` moves + clock
3. `GET /games/{id}` snapshot for reconnect
4. `POST /games/{id}/resign`

## Design

**Matchmaking:** queue in Redis (sorted by rating + wait time). Pair when `|r1-r2|` small enough or wait exceeded. Create game row.

**Game server:** sticky `gameId` in memory + persist every move to Postgres. Server runs **chess rules** (or a library). Clients send `e2e4`; server accepts/rejects.

**Clocks:** server timestamps. Don't trust client `now`. On move, subtract elapsed on that player's clock. Flag when `remaining <= 0`.

**Broadcast:** both sockets get the official position + clocks. Spectators are a fan-out list (cap them).

**Disconnect:** pause is a product choice (casual vs rated). Rated: clock still runs or a short disconnect grace. State is on the server — refresh is `GET snapshot` + resubscribe.

## Deep dive — authority and cheat

If the client could say "I captured your king," the game is junk. **Server is source of truth.**

**Engine abuse:** rate of moves vs time, server-side eval suspicion — mention, don't build Stockfish-as-a-service unless asked.

**Illegal packet spam:** [rate limiter](/system-design/rate-limiter) per game socket.

**Fair pairing:** don't match a 400 against a 2200 unless they queued into that.

**Persistence:** move list is the log; position can be replayed. Snapshot every N ply to speed reconnect.

## Extra probes

1. Tournaments — [job scheduler](/system-design/job-scheduler) for round times
2. Chat — filter, separate from moves
3. Analogous presence tricks from [WhatsApp](/system-design/whatsapp)

**Phrase:** "Matchmaking is a rating queue. The game process validates moves and owns the clock. Clients are dumb renderers. Disconnects reload from the server snapshot."
