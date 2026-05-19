# Express & APIs

## Middleware order

```js
app.use(json());
app.use(auth);
app.use("/api", router);
app.use(errorHandler); // 4-arg last
```

Order matters: body parser before routes; error handler after routes.

## Async errors

Wrap async handlers or use `express-async-errors` — unhandled rejections won't hit error middleware otherwise.

## Validation at boundary

Validate `req.body` / query with zod; return 400 with structured errors. Business rules inside services.

## Security revision

- Helmet headers, rate limit auth routes.
- Parameterized SQL — never string concat.
- Don't leak stack traces in production.

## Idempotency

`POST` create → support `Idempotency-Key` header for retries (payments, webhooks).

## Versioning

`/v1` prefix or Accept header — pick one per org and stick to it.
