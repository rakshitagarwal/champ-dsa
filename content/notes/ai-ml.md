# AI & ML for engineers

> **What seniors are evaluated on:** Can you ship AI **features** responsibly — RAG, APIs, cost/latency trade-offs — without claiming you're an ML researcher? Product teams hire engineers who integrate models, not train them from scratch.

Deployment and observability → [Advanced topics](/notes/advanced-topics).

---

## 1. Mental model (no PhD required)

| Term | Plain English |
|------|----------------|
| **Training** | Model learns patterns from large datasets (expensive, offline, ML team or vendor) |
| **Inference** | Model answers a prompt with learned patterns (what your app calls at runtime) |
| **Token** | Chunk of text (~4 chars English); models read/write tokens, not words |
| **Context window** | Max tokens in one request (prompt + response) — e.g. 128k |
| **Hallucination** | Model states false things confidently — design for it |
| **Embedding** | Vector representation of text meaning — similar text → similar vectors |

**You typically:** Call inference APIs (OpenAI, Anthropic, Gemini) or hosted open models — not train foundation models.

---

## 2. Transformer intuition (interview-level)

**Core idea:** When generating the next token, the model **attends** to relevant parts of the input — not just the last word.

- **Self-attention:** Each token weighs importance of other tokens in the sequence
- **Layers:** Stack attention + feed-forward blocks — deeper = more abstract patterns
- **Pre-training:** Predict next token on internet-scale text → general language ability
- **Fine-tuning / RLHF:** Align behavior to instructions and safety

**Enough to say:** *"LLMs are next-token predictors trained on massive text; instruction tuning makes them follow prompts. I don't need to derive attention math to integrate them via API."*

---

## 3. Embeddings & vector search

**Embedding model** converts text → fixed-size float array (e.g. 1536 dimensions).

**Similarity:** Cosine similarity between vectors ≈ semantic similarity.

**Vector DB:** Pinecone, Weaviate, pgvector, Qdrant — stores embeddings + metadata; fast nearest-neighbor search.

**When vector search helps:**
- Semantic search ("payment failed" matches "transaction declined")
- RAG retrieval (find relevant doc chunks)
- Recommendations, deduplication

**When it doesn't:** Exact keyword match, structured filters only — use SQL + full-text search.

---

## 4. RAG pipeline (Retrieval-Augmented Generation)

```
Ingest docs → chunk → embed → store in vector DB
User query → embed query → retrieve top-k chunks → build prompt → LLM → answer
```

| Stage | Pitfalls |
|-------|----------|
| **Chunking** | Too large = noise; too small = lost context. ~500–1000 tokens with overlap common |
| **Retrieval** | Wrong chunks → wrong answer. Tune k, add metadata filters |
| **Prompt** | Must instruct: "Answer only from context; say I don't know if missing" |
| **Freshness** | Stale docs → stale answers. Re-index on content change |

**Failure modes:** Hallucination when context insufficient; leaking private data if wrong tenant filter; high latency if retrieval + LLM serial and slow.

---

## 5. Integrating AI in apps

### API basics

- **API keys** — server-side only; never expose in frontend bundle
- **Streaming** — SSE/chunked responses for chat UX (tokens appear incrementally)
- **Structured output** — JSON mode / function calling for predictable downstream code
- **Tool calling** — Model requests function execution (search DB, call API); your server runs tools and returns results

### Architecture sketch

```
Client → Your API (auth, rate limit) → LLM provider API
              ↓
         Vector DB / your DB
              ↓
         Logging, cost tracking
```

### Guardrails

| Risk | Mitigation |
|------|------------|
| Prompt injection | Separate system vs user content; validate tool inputs |
| PII in prompts | Redact before send; retention policies |
| Cost blow-up | Token limits, rate limits per user, cache frequent queries |
| Latency | Stream UI; smaller model for draft, larger for final |
| Bad outputs | Human review for high-stakes; confidence thresholds |

---

## 6. Fine-tuning vs prompting

| Approach | When |
|----------|------|
| **Prompt engineering** | Default — fastest iteration, no training infra |
| **RAG** | Answers must cite your private docs/data |
| **Fine-tuning** | Consistent tone/format, domain jargon, classification at scale — **after** prompt+RAG plateau |
| **Train from scratch** | Almost never for product teams — foundation models exist |

**Senior phrase:** *"I'd start with RAG + strong prompts; fine-tune only if we need consistent output shape or domain vocabulary cheaper than long prompts."*

---

## 7. Interview angle — "Add AI search to this product"

Structured answer:

1. **User problem** — What should search do better? (semantic vs keyword)
2. **Data** — What corpus? Update frequency? Access control per user?
3. **Architecture** — Ingest pipeline, vector DB, query API, optional reranker
4. **UX** — Streaming, citations to source chunks, "no results" state
5. **Evaluation** — Golden questions, human review, click-through, latency p95
6. **Cost** — Embeddings one-time + per-query LLM tokens; budget per MAU
7. **Risks** — Hallucination, stale data, injection — mitigations above

---

## 8. What to skip (unless ML role)

- Backpropagation derivations
- Training distributed GPU clusters
- Paper-level architecture comparisons (BERT vs GPT internals)
- Building your own embedding model

**Go deeper externally:** [OpenAI docs](https://platform.openai.com/docs), [Anthropic docs](https://docs.anthropic.com), [Hugging Face course](https://huggingface.co/learn) — linked from [Resources](/resources).

---

## 9. Quick glossary for interviews

| Term | One line |
|------|----------|
| **LLM** | Large language model — general text generation/completion |
| **RAG** | Retrieve relevant docs, then generate answer grounded in them |
| **Agent** | LLM loop that plans and calls tools until task done |
| **Temperature** | Randomness (0 = deterministic, higher = creative) |
| **Top-p / top-k** | Sampling limits for output diversity |
| **Grounding** | Tying answers to verified sources |
