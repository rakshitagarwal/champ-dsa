/**
 * Generates annotated HLD architecture SVGs (dark boxed-entity style).
 * Run: node scripts/generate-hld-diagrams.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "images", "hld");

const C = {
  bg: "#0f172a",
  boxFill: "#111c30",
  boxStroke: "#e6edf7",
  hotFill: "#10332f",
  hotStroke: "#38d0b8",
  text: "#e6edf7",
  muted: "#8fa1bd",
  group: "rgba(230,237,247,0.28)",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * @param {{
 *   slug: string,
 *   title: string,
 *   w?: number,
 *   h?: number,
 *   caption: string,
 *   boxes: Array<{id:string,x:number,y:number,w:number,h?:number,label:string,note?:string,hot?:boolean}>,
 *   groups?: Array<{x:number,y:number,w:number,h:number,label:string}>,
 *   arrows: Array<{from:string,to:string,via?:string}>,
 * }} spec
 */
function render(spec) {
  const W = spec.w ?? 980;
  const H = spec.h ?? 320;
  const boxMap = Object.fromEntries(spec.boxes.map((b) => [b.id, b]));

  const boxSvg = spec.boxes
    .map((b) => {
      const bh = b.h ?? (b.note ? 52 : 40);
      const fill = b.hot ? C.hotFill : C.boxFill;
      const stroke = b.hot ? C.hotStroke : C.boxStroke;
      const sw = b.hot ? 1.6 : 1.4;
      const cy = b.note ? b.y + 20 : b.y + bh / 2 + 4;
      let s = `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${bh}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
      s += `<text x="${b.x + b.w / 2}" y="${cy}" text-anchor="middle" fill="${C.text}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11">${esc(b.label)}</text>`;
      if (b.note) {
        s += `<text x="${b.x + b.w / 2}" y="${b.y + 40}" text-anchor="middle" fill="${C.muted}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9">${esc(b.note)}</text>`;
      }
      return s;
    })
    .join("\n  ");

  const groupSvg = (spec.groups ?? [])
    .map(
      (g) =>
        `<rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="10" fill="none" stroke="${C.group}" stroke-width="1.2" stroke-dasharray="5 4"/>` +
        `<text x="${g.x + 10}" y="${g.y + 14}" fill="${C.muted}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10">${esc(g.label)}</text>`,
    )
    .join("\n  ");

  const arrowSvg = spec.arrows
    .map((a) => {
      const f = boxMap[a.from];
      const t = boxMap[a.to];
      if (!f || !t) return "";
      const fh = f.h ?? (f.note ? 52 : 40);
      const th = t.h ?? (t.note ? 52 : 40);
      const x1 = f.x + f.w;
      const y1 = f.y + fh / 2;
      const x2 = t.x;
      const y2 = t.y + th / 2;
      // slight vertical adjust if stacked targets
      return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${C.muted}" stroke-width="1.4" fill="none" marker-end="url(#ah)"/>`;
    })
    .join("\n  ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.title)}">
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <defs>
    <pattern id="g" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M28 0H0V28" fill="none" stroke="rgba(230,237,247,0.06)" stroke-width="1"/>
    </pattern>
    <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="${C.muted}"/>
    </marker>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="16" y="24" fill="${C.muted}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12">${esc(spec.title)}</text>
  ${groupSvg}
  ${boxSvg}
  ${arrowSvg}
  <text x="16" y="${H - 14}" fill="${C.muted}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11">${esc(spec.caption)}</text>
</svg>
`;
}

/** @type {Array<Parameters<typeof render>[0]>} */
const diagrams = [
  {
    slug: "google-docs",
    title: "Google Docs — sticky doc servers, OT/CRDT ops, presence",
    w: 1000,
    h: 360,
    caption: "One primary per docId serializes ops; Kafka/oplog durable; Redis presence TTL; S3 snapshots for joiners.",
    boxes: [
      { id: "client", x: 16, y: 140, w: 100, label: "Browser", note: "HTTPS + WS", hot: false },
      { id: "cdn", x: 140, y: 140, w: 90, label: "CDN/Edge", note: "static assets" },
      { id: "gw", x: 255, y: 140, w: 110, label: "API Gateway", note: "auth + ACL", hot: true },
      { id: "meta", x: 255, y: 50, w: 130, label: "Metadata svc", note: "Postgres docs/acl" },
      { id: "s3", x: 255, y: 250, w: 130, label: "S3 snapshots", note: "docs/{id}/rev{n}" },
      { id: "router", x: 420, y: 140, w: 120, label: "Doc Router", note: "docId→host Redis", hot: true },
      { id: "fleet", x: 570, y: 120, w: 150, label: "Doc Server", note: "in-mem + seq + fanout", hot: true },
      { id: "kafka", x: 750, y: 50, w: 130, label: "Kafka oplog", note: "partition docId" },
      { id: "presence", x: 750, y: 140, w: 130, label: "Presence", note: "Redis TTL 30s" },
      { id: "comments", x: 750, y: 250, w: 130, label: "Comments", note: "OT anchors" },
    ],
    groups: [{ x: 555, y: 95, w: 180, h: 95, label: "Fleet · sticky docId" }],
    arrows: [
      { from: "client", to: "cdn" },
      { from: "cdn", to: "gw" },
      { from: "gw", to: "meta" },
      { from: "gw", to: "s3" },
      { from: "gw", to: "router" },
      { from: "router", to: "fleet" },
      { from: "fleet", to: "kafka" },
      { from: "fleet", to: "presence" },
      { from: "fleet", to: "comments" },
    ],
  },
  {
    slug: "bitly",
    title: "Bitly — unique codes, read-heavy redirect",
    w: 980,
    h: 300,
    caption: "Range allocator for codes; Redis on redirect hot path; Kafka analytics off the hot path.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "cdn", x: 120, y: 120, w: 90, label: "CDN", note: "301 cache" },
      { id: "lb", x: 235, y: 120, w: 100, label: "LB + GW", note: "rate limit", hot: true },
      { id: "link", x: 360, y: 120, w: 120, label: "Link service", note: "create+redirect", hot: true },
      { id: "id", x: 510, y: 40, w: 120, label: "ID / ranges", note: "Snowflake/ticket" },
      { id: "redis", x: 510, y: 120, w: 120, label: "Redis", note: "code→URL", hot: true },
      { id: "db", x: 510, y: 200, w: 120, label: "Postgres", note: "source of truth" },
      { id: "k", x: 670, y: 120, w: 120, label: "Kafka", note: "click events" },
      { id: "olap", x: 820, y: 120, w: 130, label: "ClickHouse", note: "analytics" },
    ],
    arrows: [
      { from: "c", to: "cdn" },
      { from: "cdn", to: "lb" },
      { from: "lb", to: "link" },
      { from: "link", to: "id" },
      { from: "link", to: "redis" },
      { from: "link", to: "db" },
      { from: "link", to: "k" },
      { from: "k", to: "olap" },
    ],
  },
  {
    slug: "dropbox",
    title: "Dropbox — chunked upload, metadata, sync notify",
    w: 980,
    h: 310,
    caption: "Content-addressed chunks in S3; metadata in sharded Postgres; WS notify for delta sync.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 100, label: "Clients", note: "desktop/mobile" },
      { id: "gw", x: 140, y: 120, w: 110, label: "API Gateway", note: "auth + RL", hot: true },
      { id: "block", x: 280, y: 40, w: 120, label: "Block svc", note: "chunk upload", hot: true },
      { id: "meta", x: 280, y: 120, w: 120, label: "Metadata", note: "files/revs", hot: true },
      { id: "share", x: 280, y: 200, w: 120, label: "Share svc", note: "ACL links" },
      { id: "s3", x: 440, y: 120, w: 130, label: "S3 chunks", note: "hash→chunkId" },
      { id: "pg", x: 600, y: 120, w: 130, label: "Postgres", note: "sharded meta" },
      { id: "redis", x: 760, y: 60, w: 120, label: "Redis", note: "cursor cache" },
      { id: "notif", x: 760, y: 160, w: 120, label: "Notify WS", note: "delta push" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "block" },
      { from: "gw", to: "meta" },
      { from: "gw", to: "share" },
      { from: "block", to: "s3" },
      { from: "meta", to: "pg" },
      { from: "meta", to: "redis" },
      { from: "meta", to: "notif" },
    ],
  },
  {
    slug: "local-delivery",
    title: "Local delivery — match couriers, live geo, ETA",
    w: 980,
    h: 310,
    caption: "Redis GEO for nearby couriers; dispatch locks prevent double-assign; WS for live track.",
    boxes: [
      { id: "apps", x: 16, y: 120, w: 110, label: "Apps", note: "cust/courier" },
      { id: "gw", x: 150, y: 120, w: 100, label: "Gateway", note: "auth + RL", hot: true },
      { id: "order", x: 280, y: 40, w: 120, label: "Order svc", note: "Postgres SM" },
      { id: "disp", x: 280, y: 120, w: 120, label: "Dispatch", note: "GEO + locks", hot: true },
      { id: "loc", x: 280, y: 200, w: 120, label: "Location", note: "GEO + WS" },
      { id: "redis", x: 440, y: 120, w: 130, label: "Redis GEO", note: "offers/locks", hot: true },
      { id: "pg", x: 600, y: 120, w: 120, label: "Postgres", note: "orders" },
      { id: "k", x: 750, y: 60, w: 120, label: "Kafka", note: "ETA events" },
      { id: "ws", x: 750, y: 160, w: 120, label: "WS gateway", note: "live ETA" },
    ],
    arrows: [
      { from: "apps", to: "gw" },
      { from: "gw", to: "order" },
      { from: "gw", to: "disp" },
      { from: "gw", to: "loc" },
      { from: "disp", to: "redis" },
      { from: "order", to: "pg" },
      { from: "disp", to: "k" },
      { from: "loc", to: "ws" },
    ],
  },
  {
    slug: "rate-limiter",
    title: "Rate limiter — distributed counters on Redis",
    w: 960,
    h: 280,
    caption: "Atomic Lua on Redis per key; config cached; audit async — never block allow() on Kafka.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Client" },
      { id: "lb", x: 120, y: 110, w: 90, label: "CDN/LB" },
      { id: "gw", x: 235, y: 110, w: 120, label: "API Gateway", note: "limiter client", hot: true },
      { id: "lim", x: 380, y: 110, w: 130, label: "Limiter fleet", note: "token/sliding", hot: true },
      { id: "redis", x: 540, y: 40, w: 130, label: "Redis", note: "Lua atomic", hot: true },
      { id: "cfg", x: 540, y: 120, w: 130, label: "Config", note: "tiers/rules" },
      { id: "k", x: 540, y: 200, w: 130, label: "Kafka audit", note: "async" },
      { id: "up", x: 700, y: 110, w: 120, label: "Upstream", note: "if allow" },
    ],
    groups: [{ x: 365, y: 85, w: 160, h: 90, label: "Stateless fleet" }],
    arrows: [
      { from: "c", to: "lb" },
      { from: "lb", to: "gw" },
      { from: "gw", to: "lim" },
      { from: "lim", to: "redis" },
      { from: "lim", to: "cfg" },
      { from: "lim", to: "k" },
      { from: "lim", to: "up" },
    ],
  },
  {
    slug: "fb-news-feed",
    title: "FB News Feed — hybrid fan-out + ranked home",
    w: 980,
    h: 300,
    caption: "Fan-out on write for normal users; pull for celebrities; Redis timeline cache; ranker offline+online.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "cdn", x: 120, y: 120, w: 90, label: "CDN/LB" },
      { id: "feed", x: 235, y: 120, w: 120, label: "Feed svc", note: "home timeline", hot: true },
      { id: "post", x: 385, y: 40, w: 130, label: "Post/graph", note: "Postgres/Cass" },
      { id: "fan", x: 385, y: 120, w: 130, label: "Fan-out wkrs", note: "hybrid FO", hot: true },
      { id: "k", x: 385, y: 200, w: 130, label: "Kafka", note: "PostCreated" },
      { id: "tl", x: 545, y: 120, w: 140, label: "Timeline cache", note: "Redis lists", hot: true },
      { id: "rank", x: 715, y: 120, w: 130, label: "Ranker", note: "ML + rules" },
    ],
    arrows: [
      { from: "c", to: "cdn" },
      { from: "cdn", to: "feed" },
      { from: "feed", to: "post" },
      { from: "feed", to: "fan" },
      { from: "feed", to: "k" },
      { from: "fan", to: "tl" },
      { from: "feed", to: "rank" },
    ],
  },
  {
    slug: "whatsapp",
    title: "WhatsApp — WS chat, receipts, media, push",
    w: 980,
    h: 300,
    caption: "Connection-sticky WS gateways; message store durable; media via S3+CDN; push when offline.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "ws", x: 120, y: 120, w: 120, label: "WS gateway", note: "sticky user", hot: true },
      { id: "chat", x: 270, y: 120, w: 120, label: "Chat svc", note: "1:1 + groups", hot: true },
      { id: "store", x: 420, y: 40, w: 130, label: "Msg store", note: "Cassandra" },
      { id: "pres", x: 420, y: 120, w: 130, label: "Presence", note: "Redis" },
      { id: "k", x: 420, y: 200, w: 130, label: "Kafka", note: "group fan-out" },
      { id: "s3", x: 580, y: 120, w: 120, label: "Media S3", note: "CDN serve" },
      { id: "push", x: 730, y: 120, w: 120, label: "Push", note: "APNs/FCM" },
    ],
    arrows: [
      { from: "c", to: "ws" },
      { from: "ws", to: "chat" },
      { from: "chat", to: "store" },
      { from: "chat", to: "pres" },
      { from: "chat", to: "k" },
      { from: "chat", to: "s3" },
      { from: "chat", to: "push" },
    ],
  },
  {
    slug: "notification-system",
    title: "Notifications — preferences, per-channel workers",
    w: 980,
    h: 300,
    caption: "202 ingest; Kafka fan-out; idempotency keys; channel workers with DLQ and provider backoff.",
    boxes: [
      { id: "prod", x: 16, y: 120, w: 100, label: "Producers" },
      { id: "api", x: 140, y: 120, w: 110, label: "Notif API", note: "202 + idemp", hot: true },
      { id: "k", x: 280, y: 120, w: 110, label: "Kafka", note: "per channel", hot: true },
      { id: "prefs", x: 420, y: 40, w: 130, label: "Prefs DB", note: "templates" },
      { id: "email", x: 420, y: 120, w: 100, label: "Email wkrs" },
      { id: "push", x: 540, y: 120, w: 100, label: "Push wkrs" },
      { id: "sms", x: 660, y: 120, w: 100, label: "SMS wkrs" },
      { id: "prov", x: 800, y: 120, w: 130, label: "Providers", note: "SES/FCM/Twilio" },
    ],
    groups: [{ x: 405, y: 95, w: 370, h: 90, label: "Channel workers + DLQ" }],
    arrows: [
      { from: "prod", to: "api" },
      { from: "api", to: "k" },
      { from: "api", to: "prefs" },
      { from: "k", to: "email" },
      { from: "k", to: "push" },
      { from: "k", to: "sms" },
      { from: "email", to: "prov" },
    ],
  },
  {
    slug: "uber",
    title: "Uber — geo match, trip state, ETA",
    w: 980,
    h: 300,
    caption: "Redis GEO for nearby drivers; matching claims trip; location stream updates ETA — not SQL radius scans.",
    boxes: [
      { id: "apps", x: 16, y: 120, w: 110, label: "Rider/Driver", note: "HTTPS/WS" },
      { id: "gw", x: 150, y: 120, w: 100, label: "Gateway", hot: true },
      { id: "trip", x: 280, y: 120, w: 110, label: "Trip API", note: "state machine", hot: true },
      { id: "match", x: 420, y: 40, w: 130, label: "Matching", note: "claim driver", hot: true },
      { id: "geo", x: 420, y: 120, w: 130, label: "Redis GEO", note: "live drivers" },
      { id: "loc", x: 420, y: 200, w: 130, label: "Loc Kafka", note: "GPS stream" },
      { id: "db", x: 580, y: 120, w: 120, label: "Trip DB", note: "durable" },
      { id: "maps", x: 730, y: 120, w: 130, label: "Maps/ETA", note: "OSRM/cache" },
    ],
    arrows: [
      { from: "apps", to: "gw" },
      { from: "gw", to: "trip" },
      { from: "trip", to: "match" },
      { from: "trip", to: "geo" },
      { from: "trip", to: "loc" },
      { from: "trip", to: "db" },
      { from: "trip", to: "maps" },
    ],
  },
  {
    slug: "youtube",
    title: "YouTube — upload, async transcode, CDN play",
    w: 980,
    h: 300,
    caption: "Never block upload on transcode; metadata in DB; HLS variants on object store + edge CDN.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "cdn", x: 120, y: 120, w: 90, label: "CDN/LB" },
      { id: "up", x: 235, y: 120, w: 120, label: "Upload API", note: "presign S3", hot: true },
      { id: "meta", x: 385, y: 40, w: 130, label: "Metadata DB", note: "video rows" },
      { id: "raw", x: 385, y: 120, w: 130, label: "Raw store", note: "S3 orig" },
      { id: "q", x: 385, y: 200, w: 130, label: "Transcode Q", note: "Kafka/SQS", hot: true },
      { id: "hls", x: 545, y: 120, w: 130, label: "HLS variants", note: "480–1080p" },
      { id: "edge", x: 705, y: 120, w: 140, label: "Edge CDN", note: "playback", hot: true },
    ],
    arrows: [
      { from: "c", to: "cdn" },
      { from: "cdn", to: "up" },
      { from: "up", to: "meta" },
      { from: "up", to: "raw" },
      { from: "up", to: "q" },
      { from: "q", to: "hls" },
      { from: "hls", to: "edge" },
    ],
  },
  {
    slug: "ticketmaster",
    title: "Ticketmaster — waiting room, holds, no oversell",
    w: 980,
    h: 300,
    caption: "Waiting room absorbs spike; seat hold TTL; inventory primary is source of truth — zero oversell.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "wait", x: 120, y: 120, w: 120, label: "Waiting room", note: "admit tokens", hot: true },
      { id: "api", x: 270, y: 120, w: 110, label: "Ticket API", hot: true },
      { id: "inv", x: 410, y: 40, w: 140, label: "Inventory DB", note: "FOR UPDATE", hot: true },
      { id: "hold", x: 410, y: 120, w: 140, label: "Hold Redis", note: "TTL 10m" },
      { id: "pay", x: 410, y: 200, w: 140, label: "Payment", note: "idempotent" },
      { id: "ord", x: 580, y: 120, w: 130, label: "Orders", note: "tickets/QR" },
      { id: "n", x: 740, y: 120, w: 120, label: "Notify Q", note: "email/SMS" },
    ],
    arrows: [
      { from: "c", to: "wait" },
      { from: "wait", to: "api" },
      { from: "api", to: "inv" },
      { from: "api", to: "hold" },
      { from: "api", to: "pay" },
      { from: "api", to: "ord" },
      { from: "ord", to: "n" },
    ],
  },
  {
    slug: "pastebin",
    title: "Pastebin — Snowflake IDs, S3 body, CDN reads",
    w: 960,
    h: 280,
    caption: "Mint IDs without DB sequence hotspot; body in object store; Redis+CDN on read path.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Client" },
      { id: "cdn", x: 120, y: 110, w: 90, label: "CDN/LB" },
      { id: "api", x: 235, y: 110, w: 110, label: "Paste API", hot: true },
      { id: "id", x: 375, y: 40, w: 120, label: "ID svc", note: "Snowflake", hot: true },
      { id: "meta", x: 375, y: 110, w: 120, label: "Metadata", note: "Postgres" },
      { id: "s3", x: 375, y: 180, w: 120, label: "Object store", note: "paste body" },
      { id: "redis", x: 530, y: 110, w: 120, label: "Redis", note: "hot pastes" },
      { id: "exp", x: 680, y: 110, w: 130, label: "Expiry wkrs", note: "TTL delete" },
    ],
    arrows: [
      { from: "c", to: "cdn" },
      { from: "cdn", to: "api" },
      { from: "api", to: "id" },
      { from: "api", to: "meta" },
      { from: "api", to: "s3" },
      { from: "api", to: "redis" },
      { from: "meta", to: "exp" },
    ],
  },
  {
    slug: "search-autocomplete",
    title: "Search autocomplete — prefix top-K",
    w: 960,
    h: 280,
    caption: "Hot prefixes in Redis; trie/ES completion for miss; offline logs refresh top-K scores.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Client" },
      { id: "cdn", x: 120, y: 110, w: 90, label: "CDN/LB" },
      { id: "api", x: 235, y: 110, w: 120, label: "Suggest API", note: "p99 <100ms", hot: true },
      { id: "redis", x: 385, y: 40, w: 130, label: "Prefix Redis", note: "hot top-K", hot: true },
      { id: "trie", x: 385, y: 110, w: 130, label: "Trie / ES", note: "completion" },
      { id: "logs", x: 385, y: 180, w: 130, label: "Query logs", note: "Kafka" },
      { id: "agg", x: 545, y: 110, w: 130, label: "Top-K agg", note: "offline" },
      { id: "pers", x: 705, y: 110, w: 130, label: "Personalize", note: "optional" },
    ],
    arrows: [
      { from: "c", to: "cdn" },
      { from: "cdn", to: "api" },
      { from: "api", to: "redis" },
      { from: "api", to: "trie" },
      { from: "logs", to: "agg" },
      { from: "api", to: "pers" },
    ],
  },
  {
    slug: "google-maps",
    title: "Google Maps — tiles, routing graph, traffic ETA",
    w: 960,
    h: 280,
    caption: "Tiles are CDN; routing is hierarchical shortest path on a road graph; traffic updates edge weights.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Client" },
      { id: "tile", x: 120, y: 110, w: 100, label: "Tile CDN", note: "z/x/y", hot: true },
      { id: "api", x: 250, y: 110, w: 110, label: "Maps API", hot: true },
      { id: "store", x: 390, y: 40, w: 130, label: "Tile store", note: "vector/raster" },
      { id: "graph", x: 390, y: 110, w: 130, label: "Routing graph", note: "CH / A*", hot: true },
      { id: "traf", x: 390, y: 180, w: 130, label: "Traffic stream", note: "Kafka" },
      { id: "eta", x: 550, y: 110, w: 120, label: "ETA svc", note: "edge speeds" },
      { id: "places", x: 700, y: 110, w: 130, label: "Places", note: "geocode/search" },
    ],
    arrows: [
      { from: "c", to: "tile" },
      { from: "c", to: "api" },
      { from: "api", to: "store" },
      { from: "api", to: "graph" },
      { from: "traf", to: "eta" },
      { from: "api", to: "places" },
    ],
  },
];

// Remaining 20 — defined below and concatenated
const more = [
  {
    slug: "tinder",
    title: "Tinder — geo recs, swipe ledger, matches",
    w: 980,
    h: 300,
    caption: "GEO ∩ filters − swiped Bloom → ranked deck cache; swipe ledger is source of match truth.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Mobile" },
      { id: "cdn", x: 120, y: 120, w: 90, label: "CDN", note: "photos" },
      { id: "gw", x: 235, y: 120, w: 100, label: "Gateway", note: "swipe RL", hot: true },
      { id: "prof", x: 360, y: 40, w: 120, label: "Profile", note: "PG + S3" },
      { id: "loc", x: 360, y: 120, w: 120, label: "Location", note: "Redis GEO", hot: true },
      { id: "recs", x: 360, y: 200, w: 120, label: "Recs", note: "deck cache", hot: true },
      { id: "swipe", x: 520, y: 120, w: 130, label: "Swipe svc", note: "Cassandra", hot: true },
      { id: "match", x: 680, y: 80, w: 120, label: "Matches", note: "Postgres" },
      { id: "chat", x: 680, y: 160, w: 120, label: "Chat WS", note: "if match" },
    ],
    arrows: [
      { from: "c", to: "cdn" },
      { from: "cdn", to: "gw" },
      { from: "gw", to: "prof" },
      { from: "gw", to: "loc" },
      { from: "gw", to: "recs" },
      { from: "gw", to: "swipe" },
      { from: "swipe", to: "match" },
      { from: "match", to: "chat" },
    ],
  },
  {
    slug: "leetcode",
    title: "LeetCode — isolate untrusted code, grade tests",
    w: 960,
    h: 280,
    caption: "Queue submissions; warm sandboxes; never trust client results; contest fair scheduling.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Client" },
      { id: "gw", x: 120, y: 110, w: 100, label: "Gateway", hot: true },
      { id: "api", x: 250, y: 110, w: 120, label: "Judge API", note: "enqueue", hot: true },
      { id: "q", x: 400, y: 110, w: 120, label: "Job queue", note: "Kafka/SQS", hot: true },
      { id: "worker", x: 550, y: 50, w: 140, label: "Sandbox fleet", note: "cgroup/VM", hot: true },
      { id: "tests", x: 550, y: 150, w: 140, label: "Hidden tests", note: "S3/DB" },
      { id: "db", x: 720, y: 110, w: 120, label: "Results DB", note: "submissions" },
    ],
    groups: [{ x: 535, y: 30, w: 170, h: 180, label: "Isolated workers" }],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "api" },
      { from: "api", to: "q" },
      { from: "q", to: "worker" },
      { from: "worker", to: "tests" },
      { from: "worker", to: "db" },
    ],
  },
  {
    slug: "fb-live-comments",
    title: "FB Live Comments — realtime fan-out without melt",
    w: 980,
    h: 300,
    caption: "Write to Cassandra; pub/sub by videoId hash; SSE/WS gateways fan-out; sample under extreme load.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "gw", x: 120, y: 120, w: 110, label: "GW + SSE", note: "long-lived", hot: true },
      { id: "svc", x: 260, y: 120, w: 130, label: "Comment svc", note: "cache + write", hot: true },
      { id: "db", x: 420, y: 50, w: 140, label: "Comments DB", note: "videoId shard" },
      { id: "pub", x: 420, y: 140, w: 140, label: "Pub/Sub", note: "Redis/Kafka", hot: true },
      { id: "rt", x: 600, y: 120, w: 150, label: "Realtime fleet", note: "hash(videoId)%N", hot: true },
      { id: "mod", x: 780, y: 120, w: 120, label: "Moderation", note: "async" },
    ],
    groups: [{ x: 585, y: 95, w: 180, h: 90, label: "~1000 shards" }],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "svc" },
      { from: "svc", to: "db" },
      { from: "svc", to: "pub" },
      { from: "pub", to: "rt" },
      { from: "rt", to: "gw" },
      { from: "svc", to: "mod" },
    ],
  },
  {
    slug: "youtube-top-k",
    title: "YouTube Top-K — trending with late events",
    w: 960,
    h: 280,
    caption: "Stream counts → windowed aggregates; Count-Min / heaps for approx Top-K; exact path for money dashboards.",
    boxes: [
      { id: "ev", x: 16, y: 110, w: 100, label: "View events" },
      { id: "k", x: 140, y: 110, w: 110, label: "Kafka", note: "views topic", hot: true },
      { id: "agg", x: 280, y: 110, w: 140, label: "Flink/agg", note: "windows", hot: true },
      { id: "cms", x: 450, y: 50, w: 140, label: "CMS / heaps", note: "approx Top-K" },
      { id: "store", x: 450, y: 150, w: 140, label: "Hot store", note: "Redis ZSET", hot: true },
      { id: "api", x: 620, y: 110, w: 120, label: "Trending API", note: "read cache" },
      { id: "olap", x: 770, y: 110, w: 120, label: "OLAP", note: "exact late" },
    ],
    arrows: [
      { from: "ev", to: "k" },
      { from: "k", to: "agg" },
      { from: "agg", to: "cms" },
      { from: "agg", to: "store" },
      { from: "store", to: "api" },
      { from: "agg", to: "olap" },
    ],
  },
  {
    slug: "web-crawler",
    title: "Web crawler — frontier, robots, dedup, store",
    w: 960,
    h: 280,
    caption: "URL frontier queue; Bloom/seen store; politeness per host; HTML to object store + index.",
    boxes: [
      { id: "seed", x: 16, y: 110, w: 90, label: "Seeds" },
      { id: "front", x: 130, y: 110, w: 130, label: "URL frontier", note: "prio queue", hot: true },
      { id: "fetch", x: 290, y: 110, w: 120, label: "Fetchers", note: "polite/host", hot: true },
      { id: "robots", x: 440, y: 40, w: 120, label: "robots.txt", note: "cache" },
      { id: "dedup", x: 440, y: 110, w: 120, label: "Seen Bloom", note: "URL/content" },
      { id: "parse", x: 440, y: 180, w: 120, label: "Parsers", note: "extract links" },
      { id: "s3", x: 600, y: 110, w: 120, label: "Raw store", note: "S3/HDFS" },
      { id: "idx", x: 750, y: 110, w: 120, label: "Index", note: "optional ES" },
    ],
    arrows: [
      { from: "seed", to: "front" },
      { from: "front", to: "fetch" },
      { from: "fetch", to: "robots" },
      { from: "fetch", to: "dedup" },
      { from: "fetch", to: "parse" },
      { from: "parse", to: "front" },
      { from: "fetch", to: "s3" },
      { from: "s3", to: "idx" },
    ],
  },
  {
    slug: "ad-click-aggregator",
    title: "Ad click aggregator — money vs dashboards",
    w: 960,
    h: 280,
    caption: "At-least-once ingest; exact billing path separate from approximate dashboards; fraud filters early.",
    boxes: [
      { id: "clk", x: 16, y: 110, w: 90, label: "Clicks" },
      { id: "edge", x: 130, y: 110, w: 110, label: "Edge ingest", note: "dedup id", hot: true },
      { id: "k", x: 270, y: 110, w: 110, label: "Kafka", hot: true },
      { id: "fraud", x: 410, y: 50, w: 130, label: "Fraud filter", note: "rules/ML" },
      { id: "bill", x: 410, y: 140, w: 130, label: "Billing path", note: "exact ledger", hot: true },
      { id: "dash", x: 570, y: 110, w: 130, label: "Dash agg", note: "approx OK" },
      { id: "olap", x: 730, y: 110, w: 130, label: "OLAP/ledger", note: "money truth" },
    ],
    arrows: [
      { from: "clk", to: "edge" },
      { from: "edge", to: "k" },
      { from: "k", to: "fraud" },
      { from: "k", to: "bill" },
      { from: "k", to: "dash" },
      { from: "bill", to: "olap" },
    ],
  },
  {
    slug: "fb-post-search",
    title: "FB Post Search — privacy-aware friend search",
    w: 960,
    h: 280,
    caption: "Index is not enough — filter by ACL/graph at query time; unfriend/block invalidate visibility.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Client" },
      { id: "gw", x: 120, y: 110, w: 100, label: "Gateway", hot: true },
      { id: "search", x: 250, y: 110, w: 130, label: "Search svc", note: "query+ACL", hot: true },
      { id: "idx", x: 410, y: 50, w: 140, label: "ES / inverted", note: "posts text" },
      { id: "graph", x: 410, y: 140, w: 140, label: "Graph/ACL", note: "friends/block", hot: true },
      { id: "rank", x: 580, y: 110, w: 120, label: "Ranker", note: "recency" },
      { id: "cdc", x: 730, y: 110, w: 130, label: "CDC index", note: "edits/deletes" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "search" },
      { from: "search", to: "idx" },
      { from: "search", to: "graph" },
      { from: "search", to: "rank" },
      { from: "cdc", to: "idx" },
    ],
  },
  {
    slug: "yelp",
    title: "Yelp — geo + text local search",
    w: 960,
    h: 280,
    caption: "Geo index ∩ text index; hot city tiles cached; open-now from hours tables.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Client" },
      { id: "cdn", x: 120, y: 110, w: 90, label: "CDN/LB" },
      { id: "api", x: 235, y: 110, w: 120, label: "Search API", hot: true },
      { id: "geo", x: 385, y: 40, w: 130, label: "Geo index", note: "geohash/S2", hot: true },
      { id: "text", x: 385, y: 110, w: 130, label: "Text index", note: "ES" },
      { id: "biz", x: 385, y: 180, w: 130, label: "Biz DB", note: "hours/ratings" },
      { id: "cache", x: 545, y: 110, w: 130, label: "Hot tiles", note: "city cache" },
      { id: "ac", x: 705, y: 110, w: 130, label: "Autocomplete", note: "prefix" },
    ],
    arrows: [
      { from: "c", to: "cdn" },
      { from: "cdn", to: "api" },
      { from: "api", to: "geo" },
      { from: "api", to: "text" },
      { from: "api", to: "biz" },
      { from: "api", to: "cache" },
      { from: "api", to: "ac" },
    ],
  },
  {
    slug: "instagram",
    title: "Instagram — media + fan-out feed",
    w: 980,
    h: 300,
    caption: "Media async to S3/CDN; feed IDs fan-out like news feed; ranking without building a full ML lab in v1.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "cdn", x: 120, y: 120, w: 90, label: "CDN", note: "media" },
      { id: "gw", x: 235, y: 120, w: 100, label: "Gateway", hot: true },
      { id: "post", x: 360, y: 40, w: 110, label: "Post svc" },
      { id: "graph", x: 360, y: 120, w: 110, label: "Graph", note: "follows" },
      { id: "feed", x: 360, y: 200, w: 110, label: "Feed svc", note: "fan-out", hot: true },
      { id: "media", x: 500, y: 120, w: 130, label: "Media proc", note: "async variants", hot: true },
      { id: "s3", x: 660, y: 60, w: 120, label: "S3", note: "orig+thumbs" },
      { id: "pg", x: 660, y: 160, w: 120, label: "Postgres", note: "sharded" },
      { id: "k", x: 810, y: 120, w: 110, label: "Kafka", note: "events" },
    ],
    arrows: [
      { from: "c", to: "cdn" },
      { from: "cdn", to: "gw" },
      { from: "gw", to: "post" },
      { from: "gw", to: "graph" },
      { from: "gw", to: "feed" },
      { from: "post", to: "media" },
      { from: "media", to: "s3" },
      { from: "post", to: "pg" },
      { from: "post", to: "k" },
    ],
  },
  {
    slug: "strava",
    title: "Strava — GPS activities, segments, leaderboards",
    w: 960,
    h: 280,
    caption: "GPS pipeline to activity store; segment match from candidates; leaderboards as sorted sets with hot-key care.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 90, label: "App/GPS" },
      { id: "gw", x: 130, y: 110, w: 100, label: "Gateway", hot: true },
      { id: "act", x: 260, y: 110, w: 120, label: "Activity svc", note: "ingest", hot: true },
      { id: "gps", x: 410, y: 40, w: 130, label: "GPS pipeline", note: "simplify" },
      { id: "seg", x: 410, y: 110, w: 130, label: "Segments", note: "candidate→hit", hot: true },
      { id: "lb", x: 410, y: 180, w: 130, label: "Leaderboards", note: "Redis ZSET" },
      { id: "feed", x: 570, y: 110, w: 120, label: "Social feed", note: "FO" },
      { id: "store", x: 720, y: 110, w: 130, label: "Store", note: "PG + S3 traces" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "act" },
      { from: "act", to: "gps" },
      { from: "act", to: "seg" },
      { from: "seg", to: "lb" },
      { from: "act", to: "feed" },
      { from: "act", to: "store" },
    ],
  },
  {
    slug: "distributed-cache",
    title: "Distributed cache — consistent hash, stampede",
    w: 960,
    h: 280,
    caption: "Cache-aside; consistent hashing ring; singleflight on miss; hot keys split or L1; Redis is not truth.",
    boxes: [
      { id: "app", x: 16, y: 110, w: 100, label: "App fleet", hot: true },
      { id: "ring", x: 150, y: 110, w: 140, label: "Hash ring", note: "virtual nodes", hot: true },
      { id: "r1", x: 320, y: 40, w: 110, label: "Redis A" },
      { id: "r2", x: 320, y: 110, w: 110, label: "Redis B" },
      { id: "r3", x: 320, y: 180, w: 110, label: "Redis C" },
      { id: "db", x: 470, y: 110, w: 120, label: "DB truth", note: "on miss", hot: true },
      { id: "sf", x: 620, y: 110, w: 140, label: "Singleflight", note: "stampede guard" },
      { id: "inv", x: 790, y: 110, w: 120, label: "Invalidate", note: "TTL/DEL" },
    ],
    groups: [{ x: 305, y: 25, w: 140, h: 220, label: "Shard nodes" }],
    arrows: [
      { from: "app", to: "ring" },
      { from: "ring", to: "r1" },
      { from: "ring", to: "r2" },
      { from: "ring", to: "r3" },
      { from: "app", to: "db" },
      { from: "app", to: "sf" },
      { from: "app", to: "inv" },
    ],
  },
  {
    slug: "online-auction",
    title: "Online auction — last-second bids",
    w: 960,
    h: 280,
    caption: "Winning bid needs strong consistency on hot item; proxy bidding; close + settle async.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Bidder" },
      { id: "gw", x: 120, y: 110, w: 100, label: "Gateway", note: "WS/HTTP", hot: true },
      { id: "auc", x: 250, y: 110, w: 130, label: "Auction svc", note: "per item shard", hot: true },
      { id: "bid", x: 410, y: 50, w: 140, label: "Bid store", note: "CAS / leader", hot: true },
      { id: "proxy", x: 410, y: 140, w: 140, label: "Proxy bids", note: "max+auto" },
      { id: "close", x: 580, y: 110, w: 130, label: "Closer", note: "settle" },
      { id: "pay", x: 740, y: 110, w: 120, label: "Payment", note: "notify" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "auc" },
      { from: "auc", to: "bid" },
      { from: "auc", to: "proxy" },
      { from: "auc", to: "close" },
      { from: "close", to: "pay" },
    ],
  },
  {
    slug: "job-scheduler",
    title: "Job scheduler — durable cron at scale",
    w: 960,
    h: 280,
    caption: "Durable job rows; workers claim with SKIP LOCKED / lease; retries + DLQ; no double-run via fencing.",
    boxes: [
      { id: "api", x: 16, y: 110, w: 110, label: "Scheduler API", note: "CRUD jobs", hot: true },
      { id: "db", x: 150, y: 110, w: 130, label: "Job store", note: "Postgres", hot: true },
      { id: "tick", x: 310, y: 110, w: 130, label: "Ticker", note: "due scan", hot: true },
      { id: "q", x: 470, y: 110, w: 120, label: "Work queue", note: "Kafka/SQS" },
      { id: "w", x: 620, y: 110, w: 130, label: "Workers", note: "lease+fence", hot: true },
      { id: "dlq", x: 780, y: 110, w: 110, label: "DLQ", note: "poison" },
    ],
    arrows: [
      { from: "api", to: "db" },
      { from: "db", to: "tick" },
      { from: "tick", to: "q" },
      { from: "q", to: "w" },
      { from: "w", to: "dlq" },
    ],
  },
  {
    slug: "news-aggregator",
    title: "News aggregator — ingest, cluster, rank",
    w: 960,
    h: 280,
    caption: "Polite crawl/ingest; story clustering/dedupe; personalized rank with freshness vs load trade-off.",
    boxes: [
      { id: "pub", x: 16, y: 110, w: 100, label: "Publishers" },
      { id: "ing", x: 140, y: 110, w: 120, label: "Ingest", note: "RSS/crawl", hot: true },
      { id: "dedupe", x: 290, y: 110, w: 130, label: "Cluster/dedupe", note: "simhash", hot: true },
      { id: "store", x: 450, y: 50, w: 130, label: "Story store", note: "DB" },
      { id: "rank", x: 450, y: 140, w: 130, label: "Ranker", note: "personalize", hot: true },
      { id: "api", x: 610, y: 110, w: 120, label: "Feed API", note: "home" },
      { id: "cdn", x: 760, y: 110, w: 110, label: "CDN", note: "images" },
    ],
    arrows: [
      { from: "pub", to: "ing" },
      { from: "ing", to: "dedupe" },
      { from: "dedupe", to: "store" },
      { from: "dedupe", to: "rank" },
      { from: "rank", to: "api" },
      { from: "api", to: "cdn" },
    ],
  },
  {
    slug: "price-tracking",
    title: "Price tracking — watch, scrape, alert",
    w: 960,
    h: 280,
    caption: "Shared watches reduce scrape load; parsers versioned; alerts idempotent to avoid spam.",
    boxes: [
      { id: "u", x: 16, y: 110, w: 90, label: "Users" },
      { id: "api", x: 130, y: 110, w: 110, label: "Watch API", hot: true },
      { id: "db", x: 270, y: 110, w: 120, label: "Watches DB", note: "URL→users" },
      { id: "sched", x: 420, y: 110, w: 130, label: "Scrape sched", note: "polite", hot: true },
      { id: "parse", x: 580, y: 50, w: 130, label: "Parsers", note: "versioned" },
      { id: "price", x: 580, y: 140, w: 130, label: "Price hist", note: "TSDB" },
      { id: "alert", x: 740, y: 110, w: 120, label: "Alerts", note: "idemp", hot: true },
    ],
    arrows: [
      { from: "u", to: "api" },
      { from: "api", to: "db" },
      { from: "db", to: "sched" },
      { from: "sched", to: "parse" },
      { from: "parse", to: "price" },
      { from: "price", to: "alert" },
    ],
  },
  {
    slug: "robinhood",
    title: "Robinhood — orders, matching, market hours",
    w: 960,
    h: 280,
    caption: "Cache is not truth for money; idempotent orders; venue adapter with partial fills and reconciler.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "App" },
      { id: "gw", x: 120, y: 110, w: 100, label: "Gateway", hot: true },
      { id: "ord", x: 250, y: 110, w: 130, label: "Order svc", note: "idemp keys", hot: true },
      { id: "ledger", x: 410, y: 50, w: 130, label: "Ledger", note: "append-only", hot: true },
      { id: "risk", x: 410, y: 140, w: 130, label: "Risk/check", note: "buying power" },
      { id: "venue", x: 570, y: 110, w: 140, label: "Venue adapter", note: "retries", hot: true },
      { id: "recon", x: 740, y: 110, w: 120, label: "Reconciler", note: "fills" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "ord" },
      { from: "ord", to: "ledger" },
      { from: "ord", to: "risk" },
      { from: "ord", to: "venue" },
      { from: "venue", to: "recon" },
    ],
  },
  {
    slug: "payment-system",
    title: "Payment system — ledger + processor webhooks",
    w: 980,
    h: 300,
    caption: "Tokenize PAN client-side; idempotent charge; append-only ledger; webhook handler dedupes event.id.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 90, label: "App", note: "tokenize" },
      { id: "gw", x: 130, y: 120, w: 100, label: "Gateway", hot: true },
      { id: "pay", x: 260, y: 120, w: 130, label: "Payment svc", note: "idemp", hot: true },
      { id: "pg", x: 420, y: 50, w: 140, label: "Postgres", note: "ledger+idemp", hot: true },
      { id: "k", x: 420, y: 150, w: 140, label: "Kafka outbox", note: "events" },
      { id: "proc", x: 590, y: 120, w: 140, label: "Stripe/Adyen", note: "processor", hot: true },
      { id: "wh", x: 760, y: 120, w: 130, label: "Webhooks", note: "event.id dedup" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "pay" },
      { from: "pay", to: "pg" },
      { from: "pay", to: "k" },
      { from: "pay", to: "proc" },
      { from: "proc", to: "wh" },
      { from: "wh", to: "pay" },
    ],
  },
  {
    slug: "metrics-monitoring",
    title: "Metrics monitoring — TSDB, cardinality, alerts",
    w: 960,
    h: 280,
    caption: "Cardinality kills TSDB; downsample; alert on burn rate / SLO — Prometheus-shaped thinking.",
    boxes: [
      { id: "apps", x: 16, y: 110, w: 100, label: "Apps", note: "exporters" },
      { id: "agent", x: 140, y: 110, w: 120, label: "Collectors", note: "OTLP/Prom", hot: true },
      { id: "tsdb", x: 290, y: 110, w: 130, label: "TSDB", note: "Prom/Mimir", hot: true },
      { id: "rules", x: 450, y: 50, w: 130, label: "Recording", note: "downsample" },
      { id: "alert", x: 450, y: 140, w: 130, label: "Alertmanager", note: "burn rate", hot: true },
      { id: "ui", x: 610, y: 110, w: 120, label: "Grafana", note: "dashboards" },
      { id: "page", x: 760, y: 110, w: 120, label: "Pager", note: "SNS/PD" },
    ],
    arrows: [
      { from: "apps", to: "agent" },
      { from: "agent", to: "tsdb" },
      { from: "tsdb", to: "rules" },
      { from: "tsdb", to: "alert" },
      { from: "tsdb", to: "ui" },
      { from: "alert", to: "page" },
    ],
  },
  {
    slug: "online-chess",
    title: "Online chess — matchmaking, rooms, clocks",
    w: 960,
    h: 280,
    caption: "Server is authority for moves; WS game rooms; clocks server-side; disconnect resume from persisted state.",
    boxes: [
      { id: "c", x: 16, y: 110, w: 80, label: "Clients" },
      { id: "gw", x: 120, y: 110, w: 110, label: "WS gateway", hot: true },
      { id: "mm", x: 260, y: 50, w: 130, label: "Matchmaking", note: "rating queues", hot: true },
      { id: "game", x: 260, y: 140, w: 130, label: "Game rooms", note: "authority", hot: true },
      { id: "engine", x: 420, y: 110, w: 130, label: "Rules/clock", note: "validate" },
      { id: "store", x: 580, y: 110, w: 130, label: "Game store", note: "PG/Redis" },
      { id: "anti", x: 740, y: 110, w: 120, label: "Anti-cheat", note: "async" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "mm" },
      { from: "gw", to: "game" },
      { from: "game", to: "engine" },
      { from: "game", to: "store" },
      { from: "game", to: "anti" },
    ],
  },
  {
    slug: "chatgpt",
    title: "ChatGPT — sessions, stream tokens, RAG",
    w: 980,
    h: 300,
    caption: "Stream tokens over SSE; rate limit + queue; context window budget; RAG retrieves then generates.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "gw", x: 120, y: 120, w: 110, label: "Gateway", note: "SSE/WS", hot: true },
      { id: "orch", x: 260, y: 120, w: 130, label: "Orchestrator", note: "session", hot: true },
      { id: "rl", x: 420, y: 40, w: 120, label: "Rate/quota", note: "tiers" },
      { id: "q", x: 420, y: 120, w: 120, label: "Infer queue", note: "backpressure", hot: true },
      { id: "rag", x: 420, y: 200, w: 120, label: "RAG", note: "vector DB" },
      { id: "model", x: 570, y: 120, w: 140, label: "Model fleet", note: "GPU infer", hot: true },
      { id: "hist", x: 740, y: 120, w: 130, label: "Chat store", note: "history" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "orch" },
      { from: "orch", to: "rl" },
      { from: "orch", to: "q" },
      { from: "orch", to: "rag" },
      { from: "q", to: "model" },
      { from: "orch", to: "hist" },
    ],
  },
];

const all = [...diagrams, ...more];

fs.mkdirSync(OUT, { recursive: true });
for (const spec of all) {
  const svg = render(spec);
  const file = path.join(OUT, `${spec.slug}-architecture.svg`);
  fs.writeFileSync(file, svg, "utf8");
  console.log("wrote", path.basename(file));
}
console.log(`Done: ${all.length} diagrams`);
