# Google Maps

> Maps product design. Split the problem: **map tiles** (CDN + storage), **routing** (graph + algorithms), **traffic / ETA** (streaming updates), and **geocoding / places**.

> Tiles are a CDN problem. Routing is shortest-path on a road graph with hierarchical / CH or A* heuristics. ETA overlays live traffic from a stream — don't put GPS points in a single SQL table.

## What they ask

**Scenario:** "Design Google Maps — show the map, search places, route from A to B with ETA, update with traffic."

**What the interviewer really tests:**
- Whether you separate **static tiles** from **dynamic routing**.
- Geo indexing and road-network representation (nodes/edges, not lat-long scans).
- How traffic updates change edge weights without recomputing the world.
- Scale of tile serving vs compute-heavy route requests.

**Example scale:** billions of tile views/day (CDN), millions of route requests/day, continuous GPS/traffic probes.

## Requirements

**Functional:**
- Render map at zoom levels (tiles).
- Geocode / reverse geocode; place search.
- Route: driving/walking options, alternatives, ETA.
- Live traffic coloring / ETA refresh.
- (Optional) navigation turn-by-turn (v2).

**Non-functional:**
- **Tiles:** ultra-high availability, cacheable, global CDN.
- **Routing:** p95 < 200–500ms for city-scale; longer for cross-country with hierarchical methods.
- **ETA:** freshness minutes; eventual consistency OK.
- **Correctness:** avoid illegal roads; respect one-ways / turn restrictions.

**Clarify:** offline maps? multi-modal transit? which regions?

**Out of scope (v1):** full Street View pipeline, 3D buildings, ads.

## Scale estimation

| Piece | Insight |
|-------|---------|
| Tiles | 256×256 images × zoom pyramid — almost all CDN; origin is tile store |
| Routes | CPU-heavy; cache popular OD pairs; partition graph by region |
| Traffic | High write stream of speed samples → aggregate per edge segment |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/tiles/{z}/{x}/{y}.png` | Map tile |
| `GET` | `/v1/geocode` | Address → lat/lng |
| `GET` | `/v1/places` | Text search near location |
| `POST` | `/v1/route` | Compute route + ETA |
| `GET` | `/v1/traffic` | Traffic overlay for viewport |

```json
POST /v1/route
{
  "origin": {"lat": 37.77, "lng": -122.42},
  "destination": {"lat": 37.33, "lng": -121.89},
  "mode": "driving"
}
```

## High-Level Design (HLD)

![Google Maps architecture: tile CDN, maps API, tile store, routing graph, traffic, ETA, places](/images/hld/google-maps-architecture.svg)

```
Client
  ├─ Tile CDN ← Tile store / renderer (static + vector tiles)
  └─ Maps API / LB
        ├─ Geocode / Places (search index)
        ├─ Routing service ← Road graph (sharded by region)
        └─ ETA / Traffic service ← Traffic stream (Kafka) → edge speed store
```

**Tile path:** client requests `z/x/y` → CDN hit almost always → miss → tile server / pre-rendered store.

**Route path:** snap origin/dest to graph nodes → shortest path (Dijkstra / A* / Contraction Hierarchies) with weights = distance or time(traffic) → encode polyline → return ETA.

**Traffic path:** probe vehicles / apps report speeds → aggregate per segment → update weight cache → routing reads recent weights.

## Deep dive — routing at scale

- **Graph:** nodes = intersections, edges = road segments with length, speed limit, restrictions.
- **Algorithms:** Dijkstra OK for small; **A*** with landmarks or **Contraction Hierarchies** for continent-scale — say the name and why (preprocess shortcuts).
- **Partitioning:** shard graph by geo tiles / metro; long routes stitch corridors.
- **Cache:** popular routes and "home ↔ work" OD pairs.
- **ETA:** travel_time = Σ edge_length / current_speed; refresh on navigation client every N seconds.

## Failure and scale

- CDN outage region → clients use alternate PoP; tiles are immutable-ish by version.
- Routing overload → queue low priority; serve cached route without live traffic.
- Bad traffic data → fall back to static speed limits; mark ETA as approximate.

**Closing phrase:** *"Tiles on CDN, road graph for routing with hierarchical shortest path, traffic stream updates edge weights for ETA."*

**See also:** [Uber](/hld/uber), [CDN](/hld/cdn), [Architecture concepts](/hld/architecture-concepts) (geo indexing).
