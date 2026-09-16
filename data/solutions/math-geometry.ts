import type { SolutionGroup } from "./types";

export const MATH_GEOMETRY_SOLUTIONS: SolutionGroup = {
  id: "math-geometry",
  title: "Math & Geometry",
  subs: [
    {
      title: "Math Patterns",
      topics: [
    {
      id: 7,
      lcSlug: "reverse-integer",
      title: "Reverse Integer",
      diff: "Medium",
      body: `Build reversed digits from the end; check 32-bit overflow each step and return 0 if it would overflow.

[Reverse Integer](https://leetcode.com/problems/reverse-integer/)

\`\`\`js
// LC: https://leetcode.com/problems/reverse-integer/
function reverse(x) {
  const neg = x < 0;
  let n = Math.abs(x), ans = 0;
  const LIM = 2147483648;
  while (n > 0) {
    const d = n % 10;
    // Check overflow before appending next digit
    if (ans > Math.floor((LIM - 1 - d) / 10) && !neg) return 0;
    if (ans > Math.floor((LIM - d) / 10) && neg) return 0;
    ans = ans * 10 + d;
    n = Math.floor(n / 10);
  }
  return neg ? -ans : ans;
}
\`\`\``,
    },
    {
      id: 50,
      lcSlug: "powx-n",
      title: "Pow(x, n)",
      diff: "Medium",
      body: `Binary exponentiation: \`x^n = (x^(n/2))^2\`, multiply once more if n is odd. For negative n return \`1/pow(x, -n)\`.

[Pow(x, n)](https://leetcode.com/problems/powx-n/)

\`\`\`js
// LC: https://leetcode.com/problems/powx-n/
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}
\`\`\``,
    },
    {
      id: 172,
      lcSlug: "factorial-trailing-zeroes",
      title: "Factorial Trailing Zeroes",
      diff: "Medium",
      body: `Trailing zeros come from factors of 5 — count divisions by 5, 25, 125, … and sum.

[Factorial Trailing Zeroes](https://leetcode.com/problems/factorial-trailing-zeroes/)

\`\`\`js
// LC: https://leetcode.com/problems/factorial-trailing-zeroes/
function trailingZeroes(n) {
  let ans = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    ans += n;
  }
  return ans;
}
\`\`\``,
    },
    {
      id: 204,
      lcSlug: "count-primes",
      title: "Count Primes",
      diff: "Medium",
      body: `Sieve of Eratosthenes — mark multiples of each prime starting at 2; unmarked indices are prime.

[Count Primes](https://leetcode.com/problems/count-primes/)

\`\`\`js
// LC: https://leetcode.com/problems/count-primes/
function countPrimes(n) {
  if (n <= 2) return 0;
  const prime = Array(n).fill(true);
  prime[0] = false; prime[1] = false;
  for (let i = 2; i * i < n; i++) {
    if (!prime[i]) continue;
    // Cross out multiples starting at i*i
    for (let j = i * i; j < n; j += i) prime[j] = false;
  }
  let ans = 0;
  for (let i = 2; i < n; i++) if (prime[i]) ans++;
  return ans;
}
\`\`\``,
    },
    {
      id: 166,
      lcSlug: "fraction-to-recurring-decimal",
      title: "Fraction to Recurring Decimal",
      diff: "Medium",
      body: `Long division digit by digit; when a remainder repeats, open a repeating bracket — store first index in a map.

[Fraction to Recurring Decimal](https://leetcode.com/problems/fraction-to-recurring-decimal/)

\`\`\`js
// LC: https://leetcode.com/problems/fraction-to-recurring-decimal/
function fractionToDecimal(numerator, denominator) {
  if (numerator === 0) return "0";
  let out = "";
  if ((numerator < 0) !== (denominator < 0)) out += "-";
  let n = Math.abs(numerator), d = Math.abs(denominator);
  out += Math.floor(n / d);
  let rem = n % d;
  if (rem === 0) return out;
  out += ".";
  const seen = new Map();
  while (rem !== 0) {
    if (seen.has(rem)) {
      const i = seen.get(rem);
      return out.slice(0, i) + "(" + out.slice(i) + ")";
    }
    seen.set(rem, out.length);
    rem *= 10;
    out += Math.floor(rem / d);
    rem %= d;
  }
  return out;
}
\`\`\``,
    },
    {
      id: 149,
      lcSlug: "max-points-on-a-line",
      title: "Max Points on a Line",
      diff: "Hard",
      body: `For each point, count slopes to others (handle duplicates separately). Track the largest collinear set.

[Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/)

\`\`\`js
// LC: https://leetcode.com/problems/max-points-on-a-line/
function maxPoints(points) {
  const n = points.length;
  if (n <= 2) return n;
  let best = 0;
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  for (let i = 0; i < n; i++) {
    const slopes = new Map();
    let dup = 1, mx = 0;
    for (let j = i + 1; j < n; j++) {
      const dx = points[j][0] - points[i][0];
      const dy = points[j][1] - points[i][1];
      if (dx === 0 && dy === 0) { dup++; continue; }
      const g = gcd(Math.abs(dx), Math.abs(dy)) || 1;
      const key = (dx / g) + "," + (dy / g);
      const c = (slopes.get(key) || 0) + 1;
      slopes.set(key, c);
      if (c > mx) mx = c;
    }
    if (mx + dup > best) best = mx + dup;
  }
  return best;
}
\`\`\``,
    },
    {
      id: 365,
      lcSlug: "water-and-jug-problem",
      title: "Water and Jug Problem",
      diff: "Medium",
      body: `Compute gcd — target must be a multiple of gcd and not exceed the sum (Bezout / linear combination).

[Water and Jug Problem](https://leetcode.com/problems/water-and-jug-problem/)

\`\`\`js
// LC: https://leetcode.com/problems/water-and-jug-problem/
function canMeasureWater(x, y, target) {
  if (x + y < target) return false;
  if (target === 0) return true;
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  return target % gcd(x, y) === 0;
}
\`\`\``,
    },
    {
      id: 858,
      lcSlug: "mirror-reflection",
      title: "Mirror Reflection",
      diff: "Medium",
      body: `Extend the ray with lcm/gcd math to see which wall is hit first; map that to receptor 0, 1, or 2.

[Mirror Reflection](https://leetcode.com/problems/mirror-reflection/)

\`\`\`js
// LC: https://leetcode.com/problems/mirror-reflection/
function mirrorReflection(p, q) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(p, q);
  const m = p / g, n = q / g;
  if (m % 2 === 0) return 2;
  if (n % 2 === 0) return 0;
  return 1;
}
\`\`\``,
    },
      ],
    },
  ],
};
