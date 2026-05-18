## Database Design & SQL

---

### 1. SQL vs NoSQL - When to use each?

**Use SQL when:**

- Complex queries with JOINs
- ACID transactions required
- Data relationships are critical
- Examples: Banking, E-commerce orders

**Use NoSQL when:**

- Rapid development with changing schema
- Horizontal scalability needed
- Massive data volume
- Examples: Social feeds, Real-time analytics

### 2. What are Database Indexes?

Indexes speed up queries but slow down writes.

```jsx
// MongoDB
db.users.createIndex({ email: 1 }); // Single field
db.products.createIndex({ category: 1, price: -1 }); // Compound
```

---

## System Design Fundamentals

### 3. Design a URL Shortener

**Requirements:** Shorten URLs, redirect, track analytics

**Key Components:**

- Generate unique short codes
- Store URL mappings
- Handle redirects
- Cache popular URLs
- Track analytics

### 4. Design a Social Media Feed

**Approaches:**

- **Pull Model:** Fetch on-demand (slower, always fresh)
- **Push Model:** Pre-compute feeds (faster, stale possible)
- **Hybrid:** Push for most, pull for celebrities

---

## API Design & Architecture

### 5. RESTful API Best Practices

```
✅ Use nouns:     GET /api/users
❌ Avoid verbs:   GET /api/getUsers

✅ Use plural:    GET /api/products
✅ Nested:        GET /api/users/123/orders
✅ Query params:  GET /api/products?category=electronics
✅ Versioning:    GET /api/v1/users
```

### 6. PUT vs PATCH

- **PUT:** Replace entire resource
- **PATCH:** Update specific fields

---

## Authentication & Authorization

### 7. Authentication Methods

**Session-Based:**

- Store session ID on server
- Works with cookies
- Good for traditional web apps

**JWT (Token-Based):**

- Stateless
- Perfect for APIs and mobile
- Use refresh tokens

**OAuth 2.0:**

- Third-party authentication
- Google, Facebook, GitHub

### 8. Authentication vs Authorization

- **Authentication:** Who are you? (Login)
- **Authorization:** What can you do? (Permissions)

---

## Microservices & Distributed Systems

### 9. Monolith vs Microservices

**Monolith:** Single application, easier to start
**Microservices:** Separate services, better scalability

### 10. How Microservices Communicate

- **Synchronous:** HTTP/REST (tight coupling)
- **Asynchronous:** Message queues (loose coupling)
- **Service Mesh:** Advanced routing and monitoring

---

## Real-time Applications

### 11. WebSockets vs HTTP

**HTTP:** Request-response, new connection each time
**WebSocket:** Persistent bidirectional connection

**Use WebSockets for:** Chat, live updates, real-time games

---

## Cloud & DevOps

### 12. What is Docker?

Containerization platform - packages app with dependencies.

```docker
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### 13. CI/CD Pipeline

Automates build, test, and deployment:

1. Code push triggers pipeline
2. Run tests
3. Build Docker image
4. Deploy to production

---

## Web Security

### 14. Common Vulnerabilities

**SQL Injection:** Use parameterized queries
**XSS:** Escape user input
**CSRF:** Use CSRF tokens
**Authentication:** Strong passwords, rate limiting

### 15. Prevent Brute Force

- Rate limiting
- Account lockout
- CAPTCHA
- Progressive delays

---

## Optimization & Performance

### 16. Database Query Optimization

- Use indexes
- Select only needed fields
- Pagination
- Avoid N+1 queries
- Use lean() for MongoDB

### 17. Caching Strategies

- **Redis:** In-memory caching
- **HTTP Cache:** Browser caching
- **CDN:** Static asset caching

---

## Git & Version Control

### 18. Git Branching Strategy

**Git Flow:**

- `main`: Production
- `develop`: Staging
- `feature/*`: New features
- `hotfix/*`: Critical fixes

---

## Coding Challenges

### 19. Implement Debounce

```jsx
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

### 20. Implement Throttle

```jsx
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

---

## Behavioral Questions

### Common Questions:

1. Tell me about yourself
2. Describe a challenging project
3. How do you handle tight deadlines?
4. Disagreement with team member
5. How do you stay updated?
6. Greatest weakness
7. Why work here?

**STAR Method:**

- **S**ituation
- **T**ask
- **A**ction
- **R**esult

---

## Interview Tips

### Preparation (6 weeks):

**Weeks 1-2:** Fundamentals
**Weeks 3-4:** Advanced topics
**Weeks 5-6:** Practice and projects

### During Interview:

✅ Ask clarifying questions
✅ Think aloud
✅ Start simple, then optimize
✅ Consider edge cases
✅ Test your solution
✅ Be honest if you don’t know

### Questions to Ask:

- Typical day in the role?
- Team structure?
- Technologies used?
- Deployment process?
- Growth opportunities?

---

## Resources

**Documentation:**

- nodejs.org
- react.dev
- docs.mongodb.com
- expressjs.com

**Books:**

- “You Don’t Know JS”
- “Node.js Design Patterns”
- “System Design Interview” by Alex Xu

**Practice:**

- LeetCode
- HackerRank
- Frontend Mentor

---

## Good Luck! 🚀

Remember:

- **Understand concepts**, don’t just memorize
- **Build projects** to apply knowledge
- **Practice coding** every day
- **Stay calm** during interviews
- **Be honest** about what you don’t know
- **Ask questions** to show engagement

**You’ve got this!** 💪

---
