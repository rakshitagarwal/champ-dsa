# API Gateway

> The **front door**. Clients hit one hostname. The gateway terminates TLS, checks auth, applies rate limits, and routes to services. It is not where you put business logic.

In interviews, "API Gateway" means AWS API Gateway, Kong, Envoy/edge, or Nginx plus a thin layer. Draw it once, between the load balancer and your services.

## What it should do

1. **TLS termination** and HTTP/2 or HTTP/3 at the edge
2. **AuthN** — validate JWT / session cookie; reject 401
3. **Rate limiting** — per API key / IP / user; 429. Details → [rate limiter](/system-design/rate-limiter)
4. **Routing** — `/chat` → chat service, `/media` → upload service
5. **Protocol** — REST outside, gRPC inside; or WebSocket upgrade for chat
6. **Request IDs** — propagate a trace id

## What it should not do

Do not implement "create tweet" inside the gateway. Do not store the feed. Do not run ML ranking. Gateways that grow a brain become undeployable.

WAF / bot checks can live here or in a CDN (CloudFront, Cloudflare) in front of the gateway.

## How it shows up

**WhatsApp / docs:** one gateway fans out to user-service (HTTP) and realtime-service (WebSocket). Sticky sessions or a connection registry in [Redis](/system-design/redis) for WS.

**Public APIs (Bitly, Stripe-like):** API keys issued per customer; gateway enforces quotas before the write path.

**BFF (backend for frontend):** mobile and web sometimes get different gateways with different aggregations. Mention if the interviewer cares about mobile chattiness.

## Load balancer vs gateway

**L4 LB** — TCP, very fast, good for raw connections.

**L7 LB / gateway** — sees HTTP path and headers. Health checks, canary, path routing.

You can have both: DNS → CDN → L4 → gateway → services.

## Failure modes

1. **Gateway is an SPOF** — run N instances, multi-AZ
2. **Timeouts** — gateway timeout < service timeout, or users hang
3. **Auth cache** — don't call the user service on every request; cache JWKS / sessions
4. **WebSockets** — draining a gateway instance drops connections; rolling deploys need care

**Phrase:** "Clients talk to an API gateway for TLS, auth, and rate limits. Each capability is its own service behind it. The gateway stays boring on purpose."
