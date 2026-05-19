# Streams & backpressure

## Types

Readable → Writable; Transform sits in pipe chain. Object mode for JS objects vs Buffers.

## Pipe and backpressure

```js
readable.pipe(writable);
```

When `writable.write()` returns false, pause readable until `drain`. Manual mode needs `readable.pause()` / `resume()`.

## Memory

Buffering entire file into string scales poorly. Stream to S3, gzip, CSV parse line-by-line.

## Async iteration

`for await (const chunk of readable)` — remember error handling and `destroy()` on early exit.

## Common pitfalls

- Listening to `data` switches flowing mode — prefer `pipeline` from `stream/promises`.
- `pipeline(a, b, cb)` forwards errors and destroys streams — use over raw `.pipe()`.

## HTTP

`res` is writable; proxy responses by piping `fetch` body when API supports streams.
