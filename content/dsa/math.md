# Math

Number theory fundamentals — prime sieves, GCD via Euclid, fast exponentiation, and base conversion — are frequent building blocks in algorithmic problems.

## When to use
- Primality testing or counting primes in a range
- Computing greatest common divisor or least common multiple
- Modular exponentiation or base conversion

## How it works

Use the Sieve of Eratosthenes for prime counting, Euclid's algorithm for GCD (`gcd(a,b) = gcd(b, a % b)`), and binary exponentiation (`pow(x, n)`) by squaring for O(log n) power computation.

```js
function countPrimes(n) {
  const isPrime = Array(n).fill(true);
  for (let i = 2; i * i < n; i++)
    if (isPrime[i]) for (let j = i * i; j < n; j += i) isPrime[j] = false;
  return isPrime.filter((v, i) => v && i >= 2).length;
}
```

## Practice problems
- [Count Primes](https://leetcode.com/problems/count-primes/) — Sieve of Eratosthenes
- [Happy Number](https://leetcode.com/problems/happy-number/) — Cycle detection with digit-square sums
- [Pow(x, n)](https://leetcode.com/problems/powx-n/) — Binary exponentiation
- [Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/) — Base-26 conversion
