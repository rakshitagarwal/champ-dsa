# Google Maps

> Maps product design. Split the problem: **map tiles** (CDN + storage), **routing** (graph + algorithms), **traffic / ETA** (streaming updates), and **geocoding / places**.

> Tiles are a CDN problem. Routing is shortest-path on a road graph with hierarchical / CH or A* heuristics. ETA overlays live traffic from a stream — don't put GPS points in a single SQL table.

## What they ask

**Scenario:** Show map, search places, route A→B with ETA, reflect live traffic.

**Tests:** Static tiles vs dynamic routing separated? Road graph (not lat/lng table scan)? Traffic updates edge weights? Tile CDN vs route CPU scale?

**Scale:** Billions of tile views/day (CDN); millions of routes/day; continuous probe stream for traffic.

## Requirements

**Functional (≤6):** Tile render at zoom levels; geocode + place search; driving/walking routes + alternatives; live traffic on map/ETA.

**Non-functional:** Tiles: global CDN, cacheable; routing p95 ~200–500ms city-scale; ETA freshness ~minutes; respect one-ways/restrictions.

**Clarify (≤4):** Offline maps? Transit multi-modal? Which regions first?

**Out of scope (v1):** Street View pipeline, 3D buildings, ads.

## Scale estimation

| Piece | Insight |
|-------|---------|
| Tiles | 256×256 pyramid — almost all CDN hits |
| Routes | CPU-heavy; cache popular OD pairs; regional graph shards |
| Traffic | High-write speed samples → aggregate per edge segment |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/tiles/{z}/{x}/{y}.png` | Map tile |
| `GET` | `/v1/geocode` | Address ↔ lat/lng |
| `GET` | `/v1/places` | Text search |
| `POST` | `/v1/route` | Route + ETA |
| `GET` | `/v1/traffic` | Viewport overlay |

`POST /v1/route` with `origin`, `destination`, `mode` → polyline + ETA.

## High-Level Design (HLD)

![Google Maps architecture: tile CDN, maps API, tile store, routing graph, traffic, ETA, places](/images/hld/google-maps-architecture.svg)

```
Client
  ├─ Tile CDN ← tile store / renderer
  └─ Maps API
        ├─ Geocode / Places (search index)
        ├─ Routing ← road graph (regional shards)
        └─ Traffic ← Kafka stream → edge speed store → routing weights
```

**Tiles:** `z/x/y` → CDN. **Route:** snap to graph → Dijkstra / A* / **Contraction Hierarchies** for long distance → polyline. **Traffic:** probes aggregate to segment speeds → refresh weights.

## Deep dive

**Routing at scale:** Nodes = intersections, edges = segments with length, limits, restrictions. CH preprocesses shortcuts for continent queries. Partition graph by metro; stitch long routes. Navigation refreshes ETA every N seconds from live weights.

## Failures and scale

- CDN miss → origin tile store; versioned tiles for cache immutability.
- Routing overload → queue low priority; cached route without live traffic.
- Bad probe data → static speed limits; label ETA approximate.
- Related: [Uber](/hld/uber), [CDN](/hld/cdn), [Architecture concepts](/hld/architecture-concepts).

**Phrase:** Tiles on CDN, road graph for routing with hierarchical shortest path, traffic stream updates edge weights for ETA.

**Remember:** Never store raw GPS firehose in SQL; separate immutable tiles from mutable edge weights; name CH/A* even if you don't implement them.
