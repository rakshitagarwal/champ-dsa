# Tinder

> Swipe app. The product is **geo + recs + a cheap deck**, not a full social graph. Don't design Facebook.

## What they ask

Show a stack of nearby people. Swipe right/left. Mutual right = match + chat.

## Requirements

**Functional:** profile, swipe, match, 1:1 chat, location for "nearby."

**Non-functional:** deck load under 200ms, don't recommend people you already swiped, geo privacy.

**Clarify:** paid boosts / passport (travel location) if they want extra.

## API

1. `PUT /me/location` `{ lat, lng }`
2. `GET /recs?limit=20`
3. `POST /swipes` `{ targetId, dir: left|right }`
4. `GET /matches`
5. Chat can reuse [WhatsApp](/system-design/whatsapp) lite (WS + history)

## Design

**Profiles** in Postgres. Photos in S3/CDN.

**Geo index:** [Redis](/system-design/redis) GEO or ES geo / S2 cells. On recs: members in radius ∩ filters (age, gender) − already swiped.

**Swipe store:** Dynamo/Cassandra `PK=userId SK=targetId` so "have I swiped" is O(1). On right swipe, check reverse key. If both right → create match row + notify both.

**Recs service:** precompute a deck per user (batch job) **or** query geo live. Precompute is smoother; location changes a lot so mix: geo query + filter + cache the next 50 ids in Redis.

**Chat:** only if `match` exists. Authorization on every message.

## Deep dive — making recs cheap

A naive "all users in 50km" is huge in a city. Narrow: last-active, same city geohash, already-swiped bloom filter in Redis, then fetch 20 profiles.

**Don't** run ML in the request if you can score offline (attractiveness / activity) and only geo-filter online.

**Fairness / abuse:** rate limit swipes; don't leak exact lat/long — show distance buckets.

**Hot user:** lots of incoming rights — matching still a double-key check, not a queue of 1M likes on one row without a plan (sharded counters).

## Extra probes

1. GDPR delete — recs cache + swipe history
2. Boost: inject into other people's decks via a priority queue
3. Safety: block, photo moderation async

**Phrase:** "GEO for candidates, a swipe ledger keyed by pair, match when the reverse swipe is right. Precompute a small deck so the swipe UI never waits on a city-wide query."
