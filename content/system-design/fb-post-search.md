# FB Post Search

> Search **posts you are allowed to see**. Privacy is the product. A naked Elasticsearch cluster of all of Facebook would fail the interview.

## What they ask

Type a query, get posts from friends (and maybe groups/pages you can see), ranked, fast.

## Requirements

**Functional:** keyword search, filters (people, date), respect audience (public / friends / custom).

**Non-functional:** search lag of seconds OK; leaking a private post is not OK; typeahead optional.

## API

1. `GET /search/posts?q=&cursor=`
2. `GET /search/people?q=` (optional second type)

## Design

**Index is derived.** On publish, the post service writes the DB, then an indexer builds an ES document: `{ postId, authorId, text, createdAt, audience, visibleTo? }`.

**Query:** ES returns ids. **Hydrate** from post service and **re-check ACL** (source of truth). Never show a hit you couldn't fetch.

**Audience:**

1. Public posts — searchable widely
2. Friends-only — filter `authorId IN friendList` (friends list can be huge)
3. Custom / blocked — extra deny list

**Friends-only at scale:** you cannot put 4000 friend ids in every query forever. Tricks: (a) search only authors you interact with (smaller set), (b) **term filter** on `authorId` with a precomputed "searchable friends" list cached, (c) per-user index of friends' posts (expensive writes). Hybrid is the senior answer: constrain candidate authors first, then text search.

## Deep dive — privacy vs recall

Wrong: index everything, filter in the UI. Right: **index-time** fields for audience + **query-time** filter + **read-time** ACL.

Unfriend / block: update documents or a deny list with near-realtime refresh. Accept brief leak window and say how small.

**Ranking:** BM25 + recency + author affinity. Don't promise Google quality.

## Extra probes

1. Comments search — separate index or nested docs
2. Media OCR / alt text — async
3. Typeahead — prefix index, different SLA

**Phrase:** "ES is a hint, not the ACL. I constrain authors you can see, search that subset, then re-fetch posts and drop anything the viewer shouldn't see."
