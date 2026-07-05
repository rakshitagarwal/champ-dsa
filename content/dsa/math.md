# Math

Number theory and discrete math fundamentals — prime sieves, greatest common divisor via Euclid's algorithm, fast exponentiation by squaring, base conversion, and digit manipulation — are recurring building blocks in algorithmic problems. These techniques rarely appear as the primary challenge in a LeetCode hard, but they frequently serve as subroutines inside larger array, string, or graph problems. Mastering them lets you implement the "glue" logic quickly and correctly.

Beyond the basics, patterns like cycle detection in digit-square sums (Happy Number), geometric primitives (area, line reflection, convex hull), and combinatorics (nCr, factorial with modulo) appear across a wide range of mediums. The key insight is that many problems that look different on the surface — "count primes," "perfect squares," "ugly numbers" — are all solved by the same small set of mathematical algorithms.

## When to use

- Primality testing or counting primes in a range up to 10^7
- Computing the greatest common divisor or least common multiple of two integers
- Modular exponentiation (`pow(x, n) % m`) for cryptographic or large-number problems
- Base conversion (decimal ↔ binary, hex, Excel column letters, base-26)
- Detecting cycles in number sequences (Happy Number, fraction-to-decimal)
- Computing nCr, nPr, or Catalan numbers with modulo arithmetic
- Geometric problems involving line slopes, polygon area, or collinearity

## How it works

### Core concept

**Sieve of Eratosthenes** marks non-prime numbers by iterating from 2 to √n. For each unmarked `i`, every multiple `i * i, i * i + i, i * i + 2i, ...` is marked as composite. After the sieve, all unmarked numbers are prime. This runs in O(n log log n) — the fastest known algorithm for generating all primes up to `n`.

**Euclid's algorithm** computes GCD in O(log min(a,b)) by repeatedly applying `gcd(a, b) = gcd(b, a % b)` until the remainder is 0. The last non-zero remainder is the GCD. LCM follows from `lcm(a, b) = a * b / gcd(a, b)`.

**Binary exponentiation** computes `x^n` in O(log n) by squaring: if `n` is even, `x^n = (x^(n/2))^2`; if odd, `x^n = x * x^(n-1)`. The recursive or iterative approach reduces the exponent by half at each step.

### Step-by-step approach

1. **Sieve of Eratosthenes:** Create a boolean array of size `n+1`, all true. Start from `i = 2`. If `isPrime[i]` is true, for `j = i*i; j <= n; j += i`, set `isPrime[j] = false`. After loop, indices with true are prime. Always start `j` from `i*i` to avoid redundant marking.
2. **Euclidean GCD:** If `b === 0`, return `a`. Otherwise return `gcd(b, a % b)`. Use iteration or tail recursion — both are O(log min(a,b)). Negative inputs are handled by taking absolute values first.
3. **Binary exponentiation:** Halve the exponent repeatedly. Maintain a `result = 1`. While `n > 0`: if `n` is odd, multiply `result` by `x`; square `x`; integer-divide `n` by 2. To include modulo, apply `% mod` after every multiplication.
4. **Base conversion:** Repeatedly divide the number by the target base (`radix`), collecting remainders in reverse order. For letters (Excel columns), use `(n - 1) % 26` to get the zero-indexed letter, then `n = Math.floor((n - 1) / 26)`.

### Complexity

- **Sieve of Eratosthenes:** Time O(n log log n), Space O(n)
- **Euclidean GCD:** Time O(log min(a,b)), Space O(1)
- **Binary exponentiation:** Time O(log n), Space O(1)

```js
// Count primes less than n (Sieve of Eratosthenes)
function countPrimes(n) {
  if (n < 2) return 0;
  const isPrime = Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }
  return isPrime.filter(Boolean).length;
}

// GCD using Euclid's algorithm
function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

// Binary exponentiation with modulo
function powMod(x, n, mod) {
  let result = 1;
  x = x % mod;
  while (n > 0) {
    if (n & 1) result = (result * x) % mod;
    x = (x * x) % mod;
    n = Math.floor(n / 2);
  }
  return result;
}

// Excel sheet column title (base-26)
function convertToTitle(columnNumber) {
  let result = '';
  while (columnNumber > 0) {
    columnNumber--;
    result = String.fromCharCode(65 + (columnNumber % 26)) + result;
    columnNumber = Math.floor(columnNumber / 26);
  }
  return result;
}
```

## Variations

- **Segmented Sieve:** When `n` is too large for memory (e.g., 10^12), sieve only the range `[L, R]` by using primes up to √R to mark composites in that segment. Space becomes O(√R + (R-L)).
- **Extended Euclidean Algorithm:** Find integers `x, y` such that `ax + by = gcd(a,b)`. Useful for modular inverses and solving linear Diophantine equations.
- **Fast Fibonacci (matrix exponentiation):** Use the matrix `[[1,1],[1,0]]^n` to compute the nth Fibonacci number in O(log n). This is binary exponentiation applied to matrices.
- **Sieve for smallest prime factor (SPF):** Modify the sieve to store the smallest prime factor of each number. Then you can factor any number up to n in O(log n) by repeatedly dividing by SPF.
- **Cycle detection (Happy Number):** Use Floyd's tortoise-and-hare to detect the cycle in digit-square sums. If the cycle reaches 1, it's a happy number; otherwise it loops indefinitely.

## Edge cases

- **n < 2 in sieve:** Return 0. There are no primes below 2. The array of size n would be empty or all false.
- **Negative numbers in GCD:** Take absolute values before applying Euclid's algorithm. GCD is always non-negative by convention.
- **Zero exponent in powMod:** `x^0 = 1` (including `0^0` which conventionally returns 1 in most programming contests).
- **Very large modulus or base:** JavaScript's `Number` is 64-bit float with 53-bit integer precision. For modulo operations above 2^53, use `BigInt`.
- **Fraction to recurring decimal:** Use a hash map to store remainders and their positions. When a remainder repeats, the corresponding digits form the recurring part.
- **Base conversion with 0:** If `columnNumber === 0`, the loop body never runs — return an empty string or handle as a special case. LeetCode's Excel column is 1-indexed, so 0 never appears.

## Practice problems

- [Count Primes](https://leetcode.com/problems/count-primes/) — Sieve of Eratosthenes
- [Happy Number](https://leetcode.com/problems/happy-number/) — Cycle detection with digit-square sums
- [Pow(x, n)](https://leetcode.com/problems/powx-n/) — Binary exponentiation (fast power)
- [Excel Sheet Column Title](https://leetcode.com/problems/excel-sheet-column-title/) — Base-26 conversion (1-indexed)
- [Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/) — Base-26 to decimal
- [Fraction to Recurring Decimal](https://leetcode.com/problems/fraction-to-recurring-decimal/) — Hash map for cycle detection in long division
