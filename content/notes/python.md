# Python & FastAPI (for JavaScript developers)

> You already know how to code and write JavaScript/Node. This page is a **translation guide**: how Python thinks, the syntax you'll type daily, must-know concepts, then **FastAPI** as the Express-like way to build APIs. Related: [Node](/notes/node), [TypeScript](/notes/typescript), [Databases](/notes/databases).

---

## 1. Mental model: Python vs JavaScript

| Topic | JavaScript / Node | Python |
|---|---|---|
| Typing | Dynamic (+ TS optional) | Dynamic (+ type hints optional, very common) |
| Blocks | `{}` braces | **Indentation** (spaces) — required |
| Null | `null` / `undefined` | **`None`** |
| Booleans | `true` / `false` | **`True` / `False`** (capitalized) |
| Arrays | `[]` | **`list`** `[]` |
| Objects / maps | `{}` object / `Map` | **`dict`** `{}` |
| Const / let | `const` / `let` | No keywords — just assign (`x = 1`) |
| Equality | `===` | **`==`** value, **`is`** identity |
| Async | `async/await`, event loop | `async/await` + **asyncio** (similar idea) |
| Packages | `npm` / `package.json` | **`pip`** / `requirements.txt` or **Poetry** / **uv** |
| Virtual env | (less formal) | **`venv`** — isolate deps per project |
| Entry | `node app.js` | `python app.py` or `uvicorn` for APIs |
| "this" | `this` | **`self`** (explicit first arg on methods) |
| Truthiness | lots of falsy | `None`, `0`, `""`, `[]`, `{}`, `False` are falsy |

**Big cultural differences:**
1. **Indentation is syntax** — wrong indent = `IndentationError`
2. **Batteries included** — rich standard library
3. **One obvious way** (Zen of Python) — readable > clever
4. **GIL** — one thread runs Python bytecode at a time; use async I/O or multiprocessing for CPU

---

## 2. Run it locally (5 minutes)

```bash
python --version          # or python3
python -m venv .venv      # create virtual env (like a local node_modules isolation)

# Windows PowerShell
.\.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate

pip install fastapi uvicorn[standard]
```

`requirements.txt` example:
```text
fastapi==0.115.0
uvicorn[standard]==0.30.0
pydantic==2.9.0
httpx==0.27.0
```

```bash
pip install -r requirements.txt
pip freeze > requirements.txt   # lock what you actually installed
```

---

## 3. Syntax cheat sheet (JS → Python)

### Variables & types

```python
name = "Ada"           # str  (like JS string)
age = 36               # int
price = 19.99          # float
active = True          # bool
nothing = None         # like null

# Type hints (optional at runtime, great for editors + FastAPI/Pydantic)
name: str = "Ada"
age: int = 36
tags: list[str] = ["admin", "beta"]
user: dict[str, str] = {"id": "1", "name": "Ada"}
```

JS `typeof` → Python `type(x)` or `isinstance(x, int)`.

### Strings

```python
name = "Ada"
msg = f"Hello, {name}!"          # like JS `Hello, ${name}!`
multi = """line1
line2"""
"ada".upper()                    # "ADA"
"  x  ".strip()
"a,b,c".split(",")               # ['a','b','c']
",".join(["a", "b"])             # "a,b"  — note: join is on the separator
```

### Lists (arrays)

```python
nums = [1, 2, 3]
nums.append(4)                   # push
nums.pop()                       # pop last
nums[0]                          # first
nums[-1]                         # last (nice!)
nums[1:3]                        # slice → [2, 3]  (like slice)
len(nums)                        # length — not nums.length
2 in nums                        # true/false membership

# Comprehension = map/filter in one line
squares = [n * n for n in nums if n % 2 == 0]
```

### Dicts (objects / maps)

```python
user = {"id": "1", "name": "Ada"}
user["name"]                     # Ada — KeyError if missing
user.get("email")                # None if missing (safe)
user.get("email", "n/a")         # default
user["email"] = "a@b.com"        # set
del user["email"]                # delete key
user.keys() / .values() / .items()

# Prefer .get in uncertain data (API JSON)
```

### Tuples & sets

```python
point = (10, 20)                 # immutable sequence
y, x = point                     # unpacking

ids = {1, 2, 2, 3}               # set → {1, 2, 3} unique
```

### Conditionals & loops

```python
if age >= 18:
    status = "adult"
elif age > 0:
    status = "minor"
else:
    status = "unknown"

# Ternary
status = "adult" if age >= 18 else "minor"

for i in range(3):               # 0, 1, 2
    print(i)

for item in ["a", "b"]:
    print(item)

for i, item in enumerate(["a", "b"]):
    print(i, item)

for key, value in user.items():
    print(key, value)

while True:
    break
```

**No `++`.** Use `i += 1`.

### Functions

```python
def add(a: int, b: int = 0) -> int:
    """Docstring — like a comment that tools can read."""
    return a + b

add(1, 2)
add(a=1, b=2)                    # keyword args

# *args / **kwargs ≈ JS rest + options object
def log(*args, **kwargs):
    print(args, kwargs)

log(1, 2, level="info")

# Lambdas are expression-only (short)
double = lambda n: n * 2
```

### Classes (`self` instead of `this`)

```python
class User:
    def __init__(self, name: str):      # constructor
        self.name = name

    def greet(self) -> str:
        return f"Hi, {self.name}"

u = User("Ada")
u.greet()
```

### Modules & imports

```python
# math_utils.py
def clamp(n, lo, hi):
    return max(lo, min(hi, n))

# main.py
from math_utils import clamp
import math_utils as mu
from datetime import datetime, timezone
```

Like ESM, but path/package rules use folders + `__init__.py` (less critical in modern namespace packages).

### Errors

```python
try:
    x = int("nope")
except ValueError as e:
    print("bad int", e)
finally:
    print("always")

# Raise
raise ValueError("email already used")
```

| JS | Python |
|---|---|
| `try/catch/finally` | `try/except/finally` |
| `throw` | `raise` |
| `Error` | `Exception` hierarchy |

### Truthiness & equality

```python
if items:                        # empty list is falsy
    ...

a = [1]
b = [1]
a == b                           # True  (same values)
a is b                           # False (different objects)
x is None                        # preferred None check
x is not None
```

### List / dict patterns you'll use constantly

```python
# map
names = [u["name"] for u in users]

# filter
active = [u for u in users if u.get("active")]

# dict from pairs
by_id = {u["id"]: u for u in users}

# unpack
first, *rest = [1, 2, 3, 4]
```

---

## 4. Must-know Python concepts

### 4.1 Everything is an object; names are references

Like JS objects — assignment binds a **name** to an object. Mutating a list in a function mutates the caller's list.

```python
def append_one(items: list[int]) -> None:
    items.append(1)              # mutates caller

xs = [0]
append_one(xs)                   # xs == [0, 1]
```

Default mutable args are a classic footgun:

```python
# BAD
def add_tag(tag: str, tags: list = []):
    tags.append(tag)
    return tags

# GOOD
def add_tag(tag: str, tags: list | None = None):
    if tags is None:
        tags = []
    tags.append(tag)
    return tags
```

### 4.2 Indentation & `pass`

```python
def todo():
    pass                         # empty body placeholder (like { })
```

### 4.3 Comprehensions > manual loops (when readable)

```python
{n: n * n for n in range(5)}     # dict comprehension
{c.lower() for c in "AbA"}       # set → {'a', 'b'}
```

### 4.4 Context managers (`with`) — like try/finally for resources

```python
with open("data.txt", "r", encoding="utf-8") as f:
    text = f.read()
# file auto-closed — similar idea to careful finally, or JS using patterns
```

### 4.5 Iterables & generators

```python
def countdown(n: int):
    while n > 0:
        yield n                  # lazy — like a generator function in JS
        n -= 1

for x in countdown(3):
    print(x)
```

### 4.6 Type hints (you'll see these everywhere with FastAPI)

```python
from typing import Optional

def find_user(id: str) -> dict | None:
    ...

email: Optional[str] = None      # older style; prefer str | None (3.10+)
```

Hints are **not enforced at runtime** by Python itself (Pydantic/FastAPI do enforce on the boundary).

### 4.7 Virtual environments

Always use a venv per project so `pip install` doesn't pollute global Python — same spirit as per-project `node_modules`.

### 4.8 Async in Python

```python
import asyncio

async def fetch():
    await asyncio.sleep(0.1)
    return {"ok": True}

asyncio.run(fetch())
```

FastAPI runs async routes on an event loop (think Node). Use `async def` for I/O; plain `def` for sync/blocking work (FastAPI runs those in a threadpool).

### 4.9 GIL (interview one-liner)

CPU-bound threads don't give true parallel Python bytecode execution. For heavy CPU: `multiprocessing` or a task queue. For I/O: **async** or threads are fine.

### 4.10 Packaging mental model

| JS | Python |
|---|---|
| `package.json` | `requirements.txt` / `pyproject.toml` |
| `npm install` | `pip install -r requirements.txt` |
| `node_modules` | `.venv` |
| `import x from 'y'` | `from y import x` |

---

## 5. Tiny script → API mindset

```python
# greet.py
def greet(name: str) -> str:
    return f"Hello, {name}"

if __name__ == "__main__":       # runs only when executed directly (not on import)
    print(greet("Ada"))
```

`if __name__ == "__main__":` ≈ "only run this when I'm the entry file" (like checking `require.main === module` in CJS).

---

## 6. FastAPI — Express for someone who likes types

**FastAPI** = modern Python web framework for APIs:
- Automatic OpenAPI docs (`/docs`)
- Request validation via **Pydantic** models (think Zod + TS types, enforced at runtime)
- Native `async`
- Path/query/body parsed from type hints

### Install & hello world

```python
# main.py
from fastapi import FastAPI

app = FastAPI(title="Demo API")

@app.get("/")
def root():
    return {"message": "hello"}

@app.get("/health")
async def health():
    return {"ok": True}
```

```bash
uvicorn main:app --reload --port 8000
# open http://127.0.0.1:8000/docs
```

| Express | FastAPI |
|---|---|
| `app.get('/' , fn)` | `@app.get("/")` |
| `req.params.id` | path arg `id: str` |
| `req.query.limit` | `limit: int = 10` |
| `req.body` | Pydantic model |
| `res.status(404).json()` | `raise HTTPException(...)` |
| `middleware` | `@app.middleware` / dependencies |
| `express.json()` | built-in |

### Path & query params

```python
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: str, include_posts: bool = False):
    return {"id": user_id, "include_posts": include_posts}

@app.get("/search")
def search(
    q: str = Query(min_length=1, max_length=100),
    limit: int = Query(10, ge=1, le=100),
):
    return {"q": q, "limit": limit}
```

### Request body with Pydantic (like Zod schemas)

```python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    age: int | None = None

class UserOut(BaseModel):
    id: str
    email: EmailStr
    name: str

@app.post("/users", response_model=UserOut, status_code=201)
def create_user(payload: UserCreate):
    # payload is already validated
    return {"id": "u_123", "email": payload.email, "name": payload.name}
```

Invalid body → automatic **422** with error details (very handy vs hand-rolled Express validation).

### Response status & errors

```python
from fastapi import HTTPException

@app.get("/users/{user_id}")
def get_user(user_id: str):
    user = db_find(user_id)              # pretend
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

### Dependencies (DI — middleware + hooks feel)

```python
from fastapi import Depends, Header, HTTPException

def get_token(authorization: str | None = Header(default=None)) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return authorization.removeprefix("Bearer ").strip()

@app.get("/me")
def me(token: str = Depends(get_token)):
    return {"token_prefix": token[:4]}
```

Think: Express middleware that attaches `req.user`, but typed and composable per-route.

### Async route + httpx (call another API)

```python
import httpx
from fastapi import FastAPI

app = FastAPI()

@app.get("/proxy-ip")
async def proxy_ip():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://api.ipify.org?format=json", timeout=5.0)
        r.raise_for_status()
        return r.json()
```

### CORS (talking to a React/Next frontend)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Routers (like Express Routers)

```python
# routes/users.py
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
def list_users():
    return []

# main.py
from routes.users import router as users_router
app.include_router(users_router)
```

### Settings from env

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    debug: bool = False

    class Config:
        env_file = ".env"

settings = Settings()
```

Like reading `process.env`, but validated once at startup.

---

## 7. Minimal full example (in-memory CRUD)

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Todos")

class TodoCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    done: bool = False

class Todo(TodoCreate):
    id: int

db: dict[int, Todo] = {}
_next_id = 1

@app.get("/todos", response_model=list[Todo])
def list_todos():
    return list(db.values())

@app.post("/todos", response_model=Todo, status_code=201)
def create_todo(payload: TodoCreate):
    global _next_id
    todo = Todo(id=_next_id, **payload.model_dump())
    db[_next_id] = todo
    _next_id += 1
    return todo

@app.get("/todos/{todo_id}", response_model=Todo)
def get_todo(todo_id: int):
    todo = db.get(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Not found")
    return todo

@app.patch("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, payload: TodoCreate):
    if todo_id not in db:
        raise HTTPException(status_code=404, detail="Not found")
    todo = Todo(id=todo_id, **payload.model_dump())
    db[todo_id] = todo
    return todo

@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int):
    if todo_id not in db:
        raise HTTPException(status_code=404, detail="Not found")
    del db[todo_id]
    return None
```

---

## 8. Talking to databases (orientation only)

Same ideas as Node:

| Stack | Python common choice |
|---|---|
| Postgres / MySQL | **SQLAlchemy** + driver, or **SQLModel** (built on SQLAlchemy, nice with FastAPI) |
| Postgres async | `asyncpg` + SQLAlchemy async |
| MongoDB | **Motor** (async) or `pymongo` |
| Migrations | Alembic |

Pattern: Pydantic schemas for API ⟷ ORM models for DB (don't expose ORM objects raw without control).

---

## 9. Project layout that feels familiar

```text
app/
  main.py           # FastAPI app + middleware
  config.py         # settings
  deps.py           # shared Depends()
  routers/
    users.py
    auth.py
  schemas/          # Pydantic models (DTOs)
  services/         # business logic
  db.py
requirements.txt
.gitignore          # include .venv/, __pycache__/, .env
```

---

## 10. Pythonic gotchas for JS devs

1. **No `===`** — use `==` for values, `is` for `None`/singletons  
2. **`list.append` returns `None`** — not a chained new array  
3. **`dict` key missing → KeyError** — use `.get`  
4. **Integers are unlimited precision** — no JS `Number` float quirks for ints (floats still exist)  
5. **Truthy empty structures** — `if []:` is False  
6. **`for` else** exists (runs if no `break`) — rare but surprising  
7. **Multiple inheritance / mixins** — possible; keep it simple  
8. **`__init__.py` / packages** — folders as modules  
9. **Don't name files `list.py`, `json.py`, `fastapi.py`** — shadowing pain  
10. **Blocking calls inside `async def`** (e.g. heavy CPU or sync `requests`) stall the event loop — use async clients or `def` routes

---

## 11. Interview / self-check Q&A

**Q: How is Python typed vs TypeScript?**  
A: Hints are optional and not enforced by the interpreter. FastAPI/Pydantic enforce schemas at the HTTP boundary — similar goal to Zod + TS.

**Q: Why FastAPI over Flask?**  
A: Native async, automatic validation/docs from type hints, great editor support. Flask is minimal/flexible; FastAPI is API-first and faster to make correct.

**Q: `def` vs `async def` in FastAPI?**  
A: `async def` for non-blocking I/O. Plain `def` for sync/blocking libraries — FastAPI runs it in a threadpool so the event loop keeps moving.

**Q: What is Pydantic?**  
A: Data validation library using Python type annotations. FastAPI uses it for body/query parsing.

**Q: How do you run the app in prod?**  
A: `uvicorn app.main:app --host 0.0.0.0 --port 8000` (often behind Nginx or on [AWS](/notes/aws) ECS/EC2). Multiple workers: `uvicorn ... --workers 4` or Gunicorn + Uvicorn worker class.

**Q: GIL — does FastAPI scale?**  
A: I/O-bound APIs scale well with async + multiple processes. CPU-heavy work → separate workers/processes.

---

## 12. One-hour practice plan

1. Install venv + FastAPI + uvicorn  
2. Build the todo CRUD above  
3. Add a Pydantic email field + see `/docs` validation errors  
4. Add `Depends` bearer token guard on `DELETE`  
5. Add CORS and call it from a small React/Next page  
6. Replace dict DB with SQLite via SQLModel (optional stretch)

---

## 13. One-minute closing pitch

"Python uses indentation, `None`/`True`/`False`, lists and dicts, and explicit `self`. I isolate deps in a **venv**, type important APIs with **hints**, and build HTTP services with **FastAPI** — Pydantic validates requests like Zod, `/docs` is free OpenAPI, and async routes map cleanly to the Node-style I/O model I already know."
