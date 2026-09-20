/**
 * Theory-topic HLD diagrams (dark boxed style). Only topics that need a flow visual.
 * Run: node scripts/generate-hld-topic-diagrams.mjs
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

function render(spec) {
  const W = spec.w ?? 960;
  const H = spec.h ?? 280;
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

/** Only topics where an entity/flow diagram teaches something a table cannot. */
const diagrams = [
  {
    file: "api-paradigms-overview.svg",
    title: "API paradigms — pick by surface, not fashion",
    w: 920,
    h: 260,
    caption: "Public REST (cacheable), mobile GraphQL BFF (one call), internal gRPC (binary + streams).",
    boxes: [
      { id: "c", x: 16, y: 100, w: 90, label: "Client" },
      { id: "rest", x: 200, y: 30, w: 160, label: "REST", note: "resource + CDN", hot: true },
      { id: "gql", x: 200, y: 100, w: 160, label: "GraphQL", note: "BFF / mobile", hot: true },
      { id: "grpc", x: 200, y: 170, w: 160, label: "gRPC", note: "HTTP/2 stream", hot: true },
      { id: "pub", x: 450, y: 30, w: 160, label: "Public API", note: "partners" },
      { id: "bff", x: 450, y: 100, w: 160, label: "Mobile BFF", note: "shaped payload" },
      { id: "int", x: 450, y: 170, w: 160, label: "Internal svc", note: "mesh / RPC" },
      { id: "gw", x: 700, y: 100, w: 160, label: "Hybrid edge", note: "REST out, gRPC in" },
    ],
    arrows: [
      { from: "c", to: "rest" },
      { from: "c", to: "gql" },
      { from: "c", to: "grpc" },
      { from: "rest", to: "pub" },
      { from: "gql", to: "bff" },
      { from: "grpc", to: "int" },
      { from: "pub", to: "gw" },
      { from: "bff", to: "gw" },
      { from: "int", to: "gw" },
    ],
  },
  {
    file: "microservices-overview.svg",
    title: "Microservices — gateway, DB per service, async events",
    w: 960,
    h: 300,
    caption: "One DB per service; sync for request/response; Kafka + outbox for cross-service consistency.",
    boxes: [
      { id: "c", x: 16, y: 120, w: 80, label: "Client" },
      { id: "gw", x: 120, y: 120, w: 110, label: "API Gateway", note: "auth + route", hot: true },
      { id: "user", x: 270, y: 40, w: 120, label: "User svc", note: "own Postgres", hot: true },
      { id: "order", x: 270, y: 120, w: 120, label: "Order svc", note: "own Postgres", hot: true },
      { id: "pay", x: 270, y: 200, w: 120, label: "Payment svc", note: "own Postgres", hot: true },
      { id: "k", x: 430, y: 120, w: 120, label: "Kafka", note: "events", hot: true },
      { id: "disc", x: 580, y: 50, w: 130, label: "Discovery", note: "K8s/Consul" },
      { id: "trace", x: 580, y: 160, w: 130, label: "Tracing", note: "OTel" },
      { id: "saga", x: 740, y: 120, w: 140, label: "Saga/outbox", note: "compensations" },
    ],
    groups: [{ x: 255, y: 25, w: 150, h: 240, label: "Bounded contexts" }],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "user" },
      { from: "gw", to: "order" },
      { from: "gw", to: "pay" },
      { from: "order", to: "k" },
      { from: "pay", to: "k" },
      { from: "gw", to: "disc" },
      { from: "order", to: "saga" },
      { from: "k", to: "trace" },
    ],
  },
  {
    file: "rate-limiting-overview.svg",
    title: "Distributed rate limiting — edge check on Redis",
    w: 900,
    h: 240,
    caption: "Count at the gateway with atomic Redis (Lua); return 429 + Retry-After; audit off the hot path.",
    boxes: [
      { id: "c", x: 16, y: 90, w: 90, label: "Client" },
      { id: "gw", x: 140, y: 90, w: 130, label: "API Gateway", note: "key=user/IP", hot: true },
      { id: "redis", x: 310, y: 90, w: 140, label: "Redis", note: "token/sliding", hot: true },
      { id: "cfg", x: 490, y: 40, w: 130, label: "Rules", note: "tier limits" },
      { id: "up", x: 490, y: 130, w: 130, label: "Upstream", note: "if allow" },
      { id: "k", x: 660, y: 90, w: 130, label: "Audit", note: "async 429s" },
    ],
    arrows: [
      { from: "c", to: "gw" },
      { from: "gw", to: "redis" },
      { from: "gw", to: "cfg" },
      { from: "gw", to: "up" },
      { from: "gw", to: "k" },
    ],
  },
  {
    file: "reliability-overview.svg",
    title: "Reliability layers — timeout, retry, circuit, bulkhead",
    w: 960,
    h: 260,
    caption: "Fail fast with timeouts; retry only idempotent calls; open circuit on error rate; isolate pools per dependency.",
    boxes: [
      { id: "c", x: 16, y: 100, w: 80, label: "Caller" },
      { id: "to", x: 130, y: 100, w: 110, label: "Timeout", note: "deadline", hot: true },
      { id: "retry", x: 270, y: 100, w: 120, label: "Retry", note: "backoff+jitter", hot: true },
      { id: "cb", x: 420, y: 100, w: 130, label: "Circuit", note: "open/half-open", hot: true },
      { id: "bh", x: 580, y: 100, w: 130, label: "Bulkhead", note: "pool per dep", hot: true },
      { id: "dep", x: 740, y: 40, w: 140, label: "Dependency A" },
      { id: "dep2", x: 740, y: 140, w: 140, label: "Dependency B" },
    ],
    arrows: [
      { from: "c", to: "to" },
      { from: "to", to: "retry" },
      { from: "retry", to: "cb" },
      { from: "cb", to: "bh" },
      { from: "bh", to: "dep" },
      { from: "bh", to: "dep2" },
    ],
  },
  {
    file: "security-overview.svg",
    title: "Security path — TLS, authenticate edge, authorize resource",
    w: 960,
    h: 260,
    caption: "HTTPS everywhere; gateway authenticates; each service authorizes; secrets never in images or git.",
    boxes: [
      { id: "c", x: 16, y: 100, w: 90, label: "Client" },
      { id: "tls", x: 130, y: 100, w: 110, label: "TLS term", note: "edge/proxy", hot: true },
      { id: "gw", x: 270, y: 100, w: 130, label: "API Gateway", note: "JWT/OAuth", hot: true },
      { id: "authz", x: 430, y: 100, w: 130, label: "Service", note: "RBAC check", hot: true },
      { id: "db", x: 590, y: 40, w: 130, label: "Data store", note: "encrypt at rest" },
      { id: "sec", x: 590, y: 140, w: 130, label: "Secrets", note: "KMS/Vault" },
      { id: "waf", x: 750, y: 100, w: 130, label: "WAF/input", note: "SQLi/XSS" },
    ],
    arrows: [
      { from: "c", to: "tls" },
      { from: "tls", to: "gw" },
      { from: "gw", to: "authz" },
      { from: "authz", to: "db" },
      { from: "authz", to: "sec" },
      { from: "c", to: "waf" },
    ],
  },
  {
    file: "observability-overview.svg",
    title: "Observability — logs, metrics, traces, alerts",
    w: 960,
    h: 260,
    caption: "One correlation/trace ID across hops; RED metrics for SLOs; alert on symptoms, debug with traces.",
    boxes: [
      { id: "app", x: 16, y: 100, w: 100, label: "Services", note: "OTel SDK", hot: true },
      { id: "col", x: 150, y: 100, w: 120, label: "Collector", note: "OTLP", hot: true },
      { id: "logs", x: 310, y: 30, w: 130, label: "Logs", note: "Loki/ELK" },
      { id: "met", x: 310, y: 100, w: 130, label: "Metrics", note: "Prom/Mimir", hot: true },
      { id: "tr", x: 310, y: 170, w: 130, label: "Traces", note: "Tempo/Jaeger" },
      { id: "ui", x: 480, y: 100, w: 130, label: "Grafana", note: "dashboards" },
      { id: "alert", x: 650, y: 100, w: 140, label: "Alertmanager", note: "burn rate", hot: true },
      { id: "page", x: 820, y: 100, w: 110, label: "Pager", note: "on-call" },
    ],
    arrows: [
      { from: "app", to: "col" },
      { from: "col", to: "logs" },
      { from: "col", to: "met" },
      { from: "col", to: "tr" },
      { from: "met", to: "ui" },
      { from: "met", to: "alert" },
      { from: "alert", to: "page" },
    ],
  },
  {
    file: "cloud-architecture-overview.svg",
    title: "Cloud path — DNS, CDN, LB, compute, data, queue",
    w: 980,
    h: 280,
    caption: "Route 53 → CloudFront → ALB/API GW → ECS/Lambda → RDS/Dynamo/Redis/SQS — map workload to primitive.",
    boxes: [
      { id: "dns", x: 16, y: 110, w: 90, label: "Route 53" },
      { id: "cdn", x: 130, y: 110, w: 110, label: "CloudFront", note: "edge cache" },
      { id: "lb", x: 270, y: 110, w: 120, label: "ALB / APIGW", note: "L7 + auth", hot: true },
      { id: "ecs", x: 420, y: 40, w: 130, label: "ECS/EKS", note: "steady APIs", hot: true },
      { id: "lam", x: 420, y: 160, w: 130, label: "Lambda", note: "spiky glue" },
      { id: "rds", x: 580, y: 30, w: 120, label: "RDS", note: "ACID" },
      { id: "ddb", x: 580, y: 100, w: 120, label: "DynamoDB", note: "keyed scale" },
      { id: "redis", x: 580, y: 170, w: 120, label: "ElastiCache", note: "hot path" },
      { id: "sqs", x: 730, y: 110, w: 120, label: "SQS/SNS", note: "async" },
      { id: "cw", x: 880, y: 110, w: 80, label: "CW", note: "ops" },
    ],
    arrows: [
      { from: "dns", to: "cdn" },
      { from: "cdn", to: "lb" },
      { from: "lb", to: "ecs" },
      { from: "lb", to: "lam" },
      { from: "ecs", to: "rds" },
      { from: "ecs", to: "ddb" },
      { from: "ecs", to: "redis" },
      { from: "ecs", to: "sqs" },
      { from: "sqs", to: "cw" },
    ],
  },
  {
    file: "architecture-concepts-overview.svg",
    title: "Edge building blocks — proxy, gateway, discovery",
    w: 920,
    h: 260,
    caption: "Reverse proxy for TLS/LB; API gateway for auth/throttle/route; discovery keeps instance lists fresh.",
    boxes: [
      { id: "c", x: 16, y: 100, w: 80, label: "Client" },
      { id: "proxy", x: 130, y: 100, w: 130, label: "Rev. proxy", note: "TLS + LB", hot: true },
      { id: "gw", x: 290, y: 100, w: 130, label: "API Gateway", note: "auth/RL", hot: true },
      { id: "disc", x: 450, y: 40, w: 140, label: "Discovery", note: "registry/DNS" },
      { id: "svc", x: 450, y: 140, w: 140, label: "Services", note: "N instances", hot: true },
      { id: "mesh", x: 620, y: 100, w: 140, label: "Mesh sidecar", note: "mTLS optional" },
      { id: "q", x: 790, y: 100, w: 110, label: "Queue", note: "async jobs" },
    ],
    arrows: [
      { from: "c", to: "proxy" },
      { from: "proxy", to: "gw" },
      { from: "gw", to: "disc" },
      { from: "gw", to: "svc" },
      { from: "svc", to: "mesh" },
      { from: "gw", to: "q" },
    ],
  },
  {
    file: "nosql-databases-overview.svg",
    title: "NoSQL pick by access pattern",
    w: 940,
    h: 260,
    caption: "Known key → KV/wide-column; flexible docs → document DB; full-text → search engine; money joins stay SQL.",
    boxes: [
      { id: "app", x: 16, y: 100, w: 100, label: "Access path", note: "how you read", hot: true },
      { id: "kv", x: 200, y: 30, w: 150, label: "Key-value", note: "Redis/Dynamo", hot: true },
      { id: "doc", x: 200, y: 100, w: 150, label: "Document", note: "Mongo", hot: true },
      { id: "wc", x: 200, y: 170, w: 150, label: "Wide-column", note: "Cassandra", hot: true },
      { id: "es", x: 420, y: 60, w: 150, label: "Search", note: "Elasticsearch" },
      { id: "sql", x: 420, y: 150, w: 150, label: "Keep SQL", note: "joins/ACID" },
      { id: "poly", x: 640, y: 100, w: 180, label: "Polyglot", note: "right store per domain" },
    ],
    arrows: [
      { from: "app", to: "kv" },
      { from: "app", to: "doc" },
      { from: "app", to: "wc" },
      { from: "app", to: "es" },
      { from: "app", to: "sql" },
      { from: "kv", to: "poly" },
      { from: "doc", to: "poly" },
      { from: "sql", to: "poly" },
    ],
  },
];

fs.mkdirSync(OUT, { recursive: true });
for (const spec of diagrams) {
  const { file, ...rest } = spec;
  fs.writeFileSync(path.join(OUT, file), render({ ...rest, slug: file }), "utf8");
  console.log("wrote", file);
}
console.log(`Done: ${diagrams.length} topic diagrams`);
