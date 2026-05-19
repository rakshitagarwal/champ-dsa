# SQL Interview Notes

---

## 1. What is SQL?

**SQL (Structured Query Language)** is a standard language for managing and manipulating **relational databases**. It is used to create, read, update, and delete data stored in tables.

**Types of SQL commands:**
| Type | Full Form | Commands |
|---|---|---|
| **DDL** | Data Definition Language | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| **DML** | Data Manipulation Language | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **DCL** | Data Control Language | `GRANT`, `REVOKE` |
| **TCL** | Transaction Control Language | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

---

## 2. Database & Table Basics

```sql
-- Create a database
CREATE DATABASE company;
USE company;

-- Create a table
CREATE TABLE employees (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  department  VARCHAR(50),
  salary      DECIMAL(10, 2) DEFAULT 0.00,
  hire_date   DATE,
  manager_id  INT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modify table
ALTER TABLE employees ADD COLUMN phone VARCHAR(15);
ALTER TABLE employees DROP COLUMN phone;
ALTER TABLE employees MODIFY COLUMN name VARCHAR(200);
ALTER TABLE employees RENAME COLUMN hire_date TO joined_date;

-- Delete table
DROP TABLE employees;       -- removes table and all data permanently
TRUNCATE TABLE employees;   -- removes all rows, keeps table structure, resets auto-increment
```

---

## 3. Data Types

| Category | Types |
|---|---|
| **Integer** | `INT`, `TINYINT`, `SMALLINT`, `BIGINT` |
| **Decimal** | `DECIMAL(p, s)`, `FLOAT`, `DOUBLE` |
| **String** | `VARCHAR(n)`, `CHAR(n)`, `TEXT`, `LONGTEXT` |
| **Date/Time** | `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`, `YEAR` |
| **Boolean** | `BOOLEAN` / `TINYINT(1)` |
| **Binary** | `BLOB`, `LONGBLOB` |

- `CHAR(n)` — fixed length, pads with spaces. Use for fixed-length data like country codes.
- `VARCHAR(n)` — variable length. Use for names, emails, etc.
- `DECIMAL(10, 2)` — 10 total digits, 2 after decimal. Use for money — never use `FLOAT` for currency.
- `TIMESTAMP` — stores in UTC, converts to server timezone. `DATETIME` stores as-is.

---

## 4. Constraints

```sql
CREATE TABLE orders (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  product_id  INT NOT NULL,
  quantity    INT CHECK (quantity > 0),
  status      VARCHAR(20) DEFAULT 'pending',
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id)  REFERENCES products(id)  ON DELETE RESTRICT,
  UNIQUE (customer_id, product_id)   -- composite unique constraint
);
```

| Constraint | Purpose |
|---|---|
| `PRIMARY KEY` | Uniquely identifies each row. Cannot be NULL. One per table. |
| `FOREIGN KEY` | Enforces referential integrity between tables |
| `UNIQUE` | All values in column must be distinct (NULLs allowed, unlike PK) |
| `NOT NULL` | Column cannot have NULL value |
| `CHECK` | Validates values against a condition |
| `DEFAULT` | Sets default value when none is provided |

**ON DELETE actions:**
- `CASCADE` — delete child rows when parent is deleted
- `RESTRICT` / `NO ACTION` — prevent deletion if child rows exist
- `SET NULL` — set FK to NULL when parent is deleted

---

## 5. INSERT

```sql
-- Single row
INSERT INTO employees (name, email, department, salary)
VALUES ('Alice', 'alice@co.com', 'Engineering', 95000);

-- Multiple rows
INSERT INTO employees (name, email, department, salary) VALUES
  ('Bob',   'bob@co.com',   'Marketing',   70000),
  ('Carol', 'carol@co.com', 'Engineering', 105000),
  ('Dave',  'dave@co.com',  'HR',           60000);

-- Insert from another table
INSERT INTO archived_employees (id, name, email)
SELECT id, name, email FROM employees WHERE hire_date < '2020-01-01';
```

---

## 6. SELECT

```sql
-- Basic select
SELECT * FROM employees;
SELECT name, salary, department FROM employees;

-- Aliases
SELECT name AS employee_name, salary * 12 AS annual_salary FROM employees;

-- Distinct values
SELECT DISTINCT department FROM employees;

-- Filtering
SELECT * FROM employees WHERE department = 'Engineering' AND salary > 90000;
SELECT * FROM employees WHERE salary BETWEEN 60000 AND 100000;
SELECT * FROM employees WHERE department IN ('Engineering', 'Marketing');
SELECT * FROM employees WHERE name LIKE 'A%';     -- starts with A
SELECT * FROM employees WHERE name LIKE '%son';   -- ends with son
SELECT * FROM employees WHERE name LIKE '%li%';   -- contains li
SELECT * FROM employees WHERE manager_id IS NULL;
SELECT * FROM employees WHERE manager_id IS NOT NULL;

-- Sorting
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY department ASC, salary DESC;

-- Limiting
SELECT * FROM employees ORDER BY salary DESC LIMIT 5;
SELECT * FROM employees ORDER BY salary DESC LIMIT 5 OFFSET 10; -- page 3
```

---

## 7. UPDATE & DELETE

```sql
-- Update
UPDATE employees SET salary = salary * 1.10 WHERE department = 'Engineering';
UPDATE employees SET department = 'Tech', salary = 95000 WHERE id = 3;

-- Delete
DELETE FROM employees WHERE id = 5;
DELETE FROM employees WHERE department = 'HR' AND salary < 50000;

-- ⚠️ Always use WHERE with UPDATE and DELETE
-- UPDATE/DELETE without WHERE affects ALL rows
```

---

## 8. Aggregate Functions

Aggregate functions perform calculations on a set of rows and return a single value.

```sql
SELECT COUNT(*)           FROM employees;               -- total rows
SELECT COUNT(manager_id)  FROM employees;               -- non-NULL manager_id values
SELECT SUM(salary)        FROM employees;
SELECT AVG(salary)        FROM employees;
SELECT MAX(salary)        FROM employees;
SELECT MIN(salary)        FROM employees;
SELECT ROUND(AVG(salary), 2) FROM employees;
```

---

## 9. GROUP BY & HAVING

```sql
-- GROUP BY groups rows with same values into summary rows
SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- HAVING filters groups (like WHERE but for aggregated data)
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 80000;

-- WHERE vs HAVING:
-- WHERE filters rows BEFORE grouping
-- HAVING filters groups AFTER grouping

SELECT department, COUNT(*) AS headcount
FROM employees
WHERE hire_date >= '2020-01-01'   -- filter rows first
GROUP BY department
HAVING COUNT(*) > 2;              -- then filter groups
```

---

## 10. SQL Execution Order

The logical order SQL processes a query (different from written order):

```
1. FROM          -- identify tables
2. JOIN          -- combine tables
3. WHERE         -- filter rows
4. GROUP BY      -- group rows
5. HAVING        -- filter groups
6. SELECT        -- select columns / compute expressions
7. DISTINCT      -- remove duplicates
8. ORDER BY      -- sort results
9. LIMIT/OFFSET  -- paginate
```

> This is why you **cannot** use a column alias defined in `SELECT` inside `WHERE` or `HAVING` — those clauses execute before `SELECT`.

---

## 11. JOINs

A **JOIN** combines rows from two or more tables based on a related column.

**Sample tables:**

```
employees: id, name, department_id, salary
departments: id, name, location
```

---

### INNER JOIN

Returns only rows that have **matching values in both tables**.

```sql
SELECT e.name, e.salary, d.name AS department, d.location
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

Employees without a department and departments without employees are excluded.

---

### LEFT JOIN (LEFT OUTER JOIN)

Returns **all rows from the left table** and matching rows from the right. Non-matching right rows return NULL.

```sql
SELECT e.name, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
-- All employees included; department is NULL if no match
```

---

### RIGHT JOIN (RIGHT OUTER JOIN)

Returns **all rows from the right table** and matching rows from the left. Non-matching left rows return NULL.

```sql
SELECT e.name, d.name AS department
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
-- All departments included; employee name is NULL if no match
```

---

### FULL OUTER JOIN

Returns **all rows from both tables**. NULL on either side where there's no match.
*(Not supported in MySQL — use UNION of LEFT and RIGHT JOIN)*

```sql
SELECT e.name, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
UNION
SELECT e.name, d.name AS department
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

---

### SELF JOIN

A table joined **with itself**. Useful for hierarchical data.

```sql
-- Find employees and their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

---

### CROSS JOIN

Returns the **Cartesian product** — every combination of rows from both tables.

```sql
SELECT colors.name, sizes.name
FROM colors CROSS JOIN sizes;
-- 3 colors × 4 sizes = 12 rows
```

---

### JOIN with multiple conditions

```sql
SELECT o.id, o.total, p.name AS product
FROM orders o
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p     ON oi.product_id = p.id
WHERE o.status = 'completed'
ORDER BY o.total DESC;
```

---

## 12. Subqueries

A **subquery** (inner query / nested query) is a query inside another query.

```sql
-- Subquery in WHERE
SELECT name, salary FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Subquery in FROM (derived table / inline view)
SELECT dept, avg_sal
FROM (
  SELECT department AS dept, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department
) AS dept_avg
WHERE avg_sal > 80000;

-- Subquery in SELECT (correlated subquery)
SELECT name, salary,
  (SELECT AVG(salary) FROM employees e2
   WHERE e2.department = e1.department) AS dept_avg
FROM employees e1;

-- EXISTS
SELECT name FROM employees e
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.employee_id = e.id
);

-- IN vs EXISTS:
-- IN: evaluates subquery once, compares list — good for small result sets
-- EXISTS: stops at first match — better for large result sets
```

---

## 13. UNION & UNION ALL

```sql
-- Combine results of two queries (same number and type of columns)
SELECT name, email FROM employees
UNION
SELECT name, email FROM contractors;
-- UNION removes duplicates

SELECT name, email FROM employees
UNION ALL
SELECT name, email FROM contractors;
-- UNION ALL keeps all rows including duplicates (faster)
```

---

## 14. String Functions

```sql
SELECT UPPER(name)           FROM employees;   -- ALICE
SELECT LOWER(name)           FROM employees;   -- alice
SELECT LENGTH(name)          FROM employees;   -- 5
SELECT CHAR_LENGTH(name)     FROM employees;   -- character count
SELECT CONCAT(first, ' ', last) AS full_name FROM employees;
SELECT CONCAT_WS('-', year, month, day)      -- with separator
SELECT SUBSTRING(name, 1, 3) FROM employees;  -- Ali (1-indexed)
SELECT TRIM(name)            FROM employees;   -- removes leading/trailing spaces
SELECT LTRIM(name), RTRIM(name)              FROM employees;
SELECT REPLACE(email, '@old.com', '@new.com') FROM employees;
SELECT LOCATE('li', name)    FROM employees;   -- position of substring
SELECT LEFT(name, 3)         FROM employees;   -- Ali
SELECT RIGHT(name, 3)        FROM employees;   -- ice
SELECT LPAD(id, 5, '0')      FROM employees;   -- 00001
SELECT FORMAT(salary, 2)     FROM employees;   -- 95,000.00
```

---

## 15. Date & Time Functions

```sql
SELECT NOW();                          -- current datetime
SELECT CURDATE();                      -- current date
SELECT CURTIME();                      -- current time
SELECT YEAR(hire_date)   FROM employees;
SELECT MONTH(hire_date)  FROM employees;
SELECT DAY(hire_date)    FROM employees;
SELECT DAYNAME(hire_date) FROM employees;   -- Monday
SELECT DATE_FORMAT(hire_date, '%d %M %Y')  -- 15 March 2022
SELECT DATEDIFF('2024-01-01', hire_date)   -- days between
SELECT DATE_ADD(hire_date, INTERVAL 30 DAY)
SELECT DATE_SUB(hire_date, INTERVAL 1 YEAR)
SELECT TIMESTAMPDIFF(YEAR, hire_date, NOW()) AS years_employed
FROM employees;
```

---

## 16. Conditional Expressions

```sql
-- CASE expression
SELECT name, salary,
  CASE
    WHEN salary >= 100000 THEN 'Senior'
    WHEN salary >= 70000  THEN 'Mid-level'
    ELSE 'Junior'
  END AS level
FROM employees;

-- Simple CASE
SELECT name,
  CASE department
    WHEN 'Engineering' THEN 'Tech'
    WHEN 'Marketing'   THEN 'Business'
    ELSE 'Other'
  END AS dept_group
FROM employees;

-- IF (MySQL)
SELECT name, IF(salary > 80000, 'High', 'Low') AS salary_band FROM employees;

-- IFNULL / COALESCE
SELECT IFNULL(manager_id, 0) FROM employees;          -- replace NULL with 0
SELECT COALESCE(phone, email, 'No contact') FROM employees; -- first non-NULL
```

---

## 17. Window Functions

Window functions perform calculations **across a set of rows related to the current row** without collapsing them into one row (unlike GROUP BY).

```sql
-- Syntax
function_name() OVER (
  PARTITION BY column   -- optional: divide into groups
  ORDER BY column       -- optional: order within group
  ROWS/RANGE BETWEEN ...-- optional: frame specification
)
```

```sql
-- ROW_NUMBER: unique sequential number per partition
SELECT name, department, salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num
FROM employees;

-- RANK: same value gets same rank, next rank skips (1,1,3)
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;

-- DENSE_RANK: same value gets same rank, no skip (1,1,2)
SELECT name, salary,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- LAG: access previous row value
SELECT name, salary,
  LAG(salary) OVER (ORDER BY hire_date) AS prev_salary
FROM employees;

-- LEAD: access next row value
SELECT name, salary,
  LEAD(salary) OVER (ORDER BY hire_date) AS next_salary
FROM employees;

-- SUM / AVG running total
SELECT name, salary,
  SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM employees;

-- NTILE: divide rows into N buckets
SELECT name, salary,
  NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees;
```

---

## 18. CTEs (Common Table Expressions)

A **CTE** defines a named temporary result set that exists only within the scope of a single query. Makes complex queries more readable.

```sql
-- Basic CTE
WITH high_earners AS (
  SELECT name, salary, department
  FROM employees
  WHERE salary > 90000
)
SELECT * FROM high_earners ORDER BY salary DESC;

-- Multiple CTEs
WITH
  dept_avg AS (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
  ),
  dept_count AS (
    SELECT department, COUNT(*) AS headcount
    FROM employees
    GROUP BY department
  )
SELECT a.department, a.avg_salary, c.headcount
FROM dept_avg a
JOIN dept_count c ON a.department = c.department;

-- Recursive CTE (hierarchical data — org chart)
WITH RECURSIVE org_chart AS (
  -- anchor: top-level employees (no manager)
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- recursive: employees whose manager is in the previous result
  SELECT e.id, e.name, e.manager_id, o.level + 1
  FROM employees e
  INNER JOIN org_chart o ON e.manager_id = o.id
)
SELECT * FROM org_chart ORDER BY level;
```

**CTE vs Subquery:**
- CTE is more readable, can be referenced multiple times
- Subquery is inline, harder to read for complex logic
- CTE is not necessarily faster — depends on the query optimizer

---

## 19. Indexes

An **index** is a data structure (typically a B-Tree) that speeds up data retrieval on a table column. Like a book index — instead of scanning all pages, jump directly to the relevant page.

**Without index:** Full table scan → O(n)
**With index:** B-Tree lookup → O(log n)

```sql
-- Create index
CREATE INDEX idx_department ON employees(department);
CREATE INDEX idx_dept_salary ON employees(department, salary); -- composite index

-- Unique index
CREATE UNIQUE INDEX idx_email ON employees(email);

-- Full-text index (for text search)
CREATE FULLTEXT INDEX idx_name ON employees(name);

-- Drop index
DROP INDEX idx_department ON employees;

-- View indexes on a table
SHOW INDEX FROM employees;
```

**Types of indexes:**
- **Primary index** — created automatically on `PRIMARY KEY`
- **Unique index** — enforces uniqueness, allows fast lookup
- **Composite index** — index on multiple columns; order matters
- **Full-text index** — for text search (`MATCH ... AGAINST ...`)
- **Clustered index** — rows stored in order of the index (InnoDB primary key is clustered)
- **Non-clustered index** — separate structure pointing to actual rows

---

### When to use indexes

**Use indexes on:**
- `WHERE` clause columns
- `JOIN` condition columns (foreign keys)
- `ORDER BY` columns
- `GROUP BY` columns
- Columns with high cardinality (many distinct values)

**Avoid indexes on:**
- Small tables (full scan is faster)
- Columns rarely used in queries
- Columns with very low cardinality (e.g., boolean, gender)
- Heavily updated columns (index must be updated on every write)

---

### Composite Index & Column Order

A composite index on `(department, salary)` works for:
- `WHERE department = 'Engineering'` ✅
- `WHERE department = 'Engineering' AND salary > 80000` ✅
- `WHERE salary > 80000` ❌ (leftmost prefix rule — must include leading columns)

The **leftmost prefix rule**: queries must use columns from left to right in the index; skipping the first column makes the index unusable.

---

### Index Internals (B-Tree)

Most indexes use a **B-Tree (Balanced Tree)** structure:
- Keeps data sorted
- Allows searches, insertions, deletions in O(log n)
- Supports range queries (`BETWEEN`, `>`, `<`)

**Hash indexes** (MEMORY engine):
- O(1) exact lookups
- Do NOT support range queries or sorting

---

## 20. EXPLAIN — Query Analysis

`EXPLAIN` shows how MySQL executes a query — useful for optimizing slow queries.

```sql
EXPLAIN SELECT * FROM employees WHERE department = 'Engineering';
EXPLAIN SELECT e.name, d.location FROM employees e JOIN departments d ON e.department_id = d.id;
```

**Key columns in EXPLAIN output:**

| Column | What to look for |
|---|---|
| `type` | Access method — `const` > `eq_ref` > `ref` > `range` > `index` > `ALL` (ALL = full scan, bad) |
| `key` | Index being used (NULL = no index used) |
| `rows` | Estimated rows examined — lower is better |
| `Extra` | `Using index` (good), `Using filesort` (bad), `Using temporary` (bad) |

---

## 21. Transactions

A **transaction** is a sequence of SQL operations treated as a single unit. Either all succeed or all fail — ensures data consistency.

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 5000 WHERE id = 1;  -- debit
UPDATE accounts SET balance = balance + 5000 WHERE id = 2;  -- credit

-- If both succeed:
COMMIT;

-- If anything fails:
ROLLBACK;
```

**SAVEPOINT:**
```sql
START TRANSACTION;
INSERT INTO orders (customer_id, total) VALUES (1, 500);
SAVEPOINT after_order;

INSERT INTO order_items (order_id, product_id) VALUES (LAST_INSERT_ID(), 99);
-- If this fails, rollback to savepoint only
ROLLBACK TO SAVEPOINT after_order;

COMMIT;
```

---

## 22. ACID Properties

**ACID** defines the properties that guarantee reliable database transactions.

**A — Atomicity:** Transaction is all-or-nothing. If any statement fails, the entire transaction is rolled back.

**C — Consistency:** A transaction brings the database from one valid state to another. All constraints, rules, and cascades are respected.

**I — Isolation:** Concurrent transactions don't interfere with each other. Each transaction appears to run in isolation.

**D — Durability:** Once a transaction is committed, it persists even if the system crashes. Data is written to disk.

---

## 23. Normalization

**Normalization** is the process of organizing database tables to reduce data redundancy and improve data integrity.

**1NF (First Normal Form):**
- Each column has atomic (indivisible) values
- No repeating groups or arrays
- Each row is unique (has a primary key)

**2NF (Second Normal Form):**
- Must be in 1NF
- Every non-key column must depend on the **entire** primary key (no partial dependency)
- Applies to tables with composite primary keys

**3NF (Third Normal Form):**
- Must be in 2NF
- No transitive dependencies — non-key columns must depend **only** on the primary key, not on other non-key columns

**BCNF (Boyce-Codd Normal Form):**
- Stricter version of 3NF — every determinant must be a candidate key

**Denormalization:** Intentionally introducing redundancy for read performance (common in reporting/analytics databases).

---

## 24. Views

A **view** is a virtual table defined by a stored SQL query. Doesn't store data itself — queries the underlying tables each time.

```sql
-- Create view
CREATE VIEW engineering_team AS
SELECT id, name, salary, hire_date
FROM employees
WHERE department = 'Engineering';

-- Use view like a table
SELECT * FROM engineering_team WHERE salary > 90000;

-- Update view
CREATE OR REPLACE VIEW engineering_team AS
SELECT id, name, salary FROM employees WHERE department = 'Engineering';

-- Drop view
DROP VIEW engineering_team;
```

**Benefits:** Simplify complex queries, restrict column access, reusable query logic.
**Limitation:** Can't always be updated (if it uses JOIN, DISTINCT, GROUP BY, aggregates).

---

## 25. Stored Procedures & Functions

**Stored Procedure:** Precompiled SQL block stored in the database, called by name.

```sql
DELIMITER //
CREATE PROCEDURE give_raise(IN dept VARCHAR(50), IN percent DECIMAL(5,2))
BEGIN
  UPDATE employees
  SET salary = salary * (1 + percent / 100)
  WHERE department = dept;
END //
DELIMITER ;

-- Call
CALL give_raise('Engineering', 10);
```

**Function:** Returns a single value, used in SQL expressions.

```sql
DELIMITER //
CREATE FUNCTION get_annual_salary(monthly DECIMAL(10,2))
RETURNS DECIMAL(10,2) DETERMINISTIC
BEGIN
  RETURN monthly * 12;
END //
DELIMITER ;

SELECT name, get_annual_salary(salary) FROM employees;
```

---

## 26. Common Interview Queries

**Find the second highest salary:**
```sql
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Or using LIMIT/OFFSET
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Or using DENSE_RANK
SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) ranked
WHERE rnk = 2;
```

**Find duplicate emails:**
```sql
SELECT email, COUNT(*) AS count
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

**Employees earning more than their manager:**
```sql
SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;
```

**Department with highest average salary:**
```sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC
LIMIT 1;
```

**Employees not assigned to any department:**
```sql
SELECT * FROM employees WHERE department_id IS NULL;

-- Or using LEFT JOIN
SELECT e.* FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.id IS NULL;
```

**Running total of salaries by hire date:**
```sql
SELECT name, hire_date, salary,
  SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM employees;
```

**Top 3 earners per department:**
```sql
SELECT name, department, salary FROM (
  SELECT name, department, salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees
) ranked
WHERE rnk <= 3;
```

**Count employees per department including departments with 0 employees:**
```sql
SELECT d.name, COUNT(e.id) AS headcount
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
GROUP BY d.id, d.name;
```

**Delete duplicate rows keeping the one with lowest id:**
```sql
DELETE FROM employees
WHERE id NOT IN (
  SELECT MIN(id) FROM employees GROUP BY email
);
```

---

## 27. Performance Tips

- Use `SELECT col1, col2` instead of `SELECT *` — fetch only needed columns
- Always add indexes on foreign key columns — not added automatically
- Use `LIMIT` to paginate large results — don't fetch millions of rows
- Avoid functions on indexed columns in `WHERE` — breaks index usage
  ```sql
  -- Bad (can't use index on hire_date)
  WHERE YEAR(hire_date) = 2022
  -- Good
  WHERE hire_date BETWEEN '2022-01-01' AND '2022-12-31'
  ```
- Use `EXISTS` instead of `COUNT` to check for existence: `WHERE EXISTS (SELECT 1 ...)`
- Prefer `JOIN` over correlated subqueries for large datasets
- Analyze slow queries with `EXPLAIN` — look for `type = ALL` and `key = NULL`
- Use connection pooling — don't open a new DB connection per request
- Use `UNION ALL` instead of `UNION` when you don't need to remove duplicates

---

## 28. NoSQL vs SQL (Quick Reference)

| | SQL (Relational) | NoSQL |
|---|---|---|
| Structure | Tables with rows/columns | Documents, key-value, graph, column-family |
| Schema | Fixed schema | Flexible / schema-less |
| Relationships | Foreign keys, JOINs | Embedded documents or application-level |
| Scaling | Vertical (mostly) | Horizontal |
| Transactions | Full ACID | Varies (MongoDB has multi-doc ACID since v4) |
| Best for | Structured data, complex queries | Unstructured data, high write volume, flexibility |
| Examples | MySQL, PostgreSQL, SQLite | MongoDB, Redis, Cassandra, DynamoDB |

---
