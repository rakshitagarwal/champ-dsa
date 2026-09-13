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
      body: `Peeche se digit jodo — overflow check har step pe karo, 32-bit limit cross ho to 0.

[Reverse Integer](https://leetcode.com/problems/reverse-integer/)

\`\`\`js
// Hinglish: ulta jodo limit dekho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/reverse-integer/
function reverse(x) {
  // Hinglish: step 1 — sign bachao
  const neg = x < 0;
  let n = Math.abs(x), ans = 0;
  const LIM = 2147483648;
  while (n > 0) {
    const d = n % 10; // Hinglish: aakhri digit
    if (ans > Math.floor((LIM - 1 - d) / 10) && !neg) return 0; // Hinglish: limit cross
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
      body: `Naive me n multiplications. Fast power me aadha karo: \`x^n = (x^(n/2))^2\`, odd ho to ek \`x\` extra. Negative \`n\` me \`1/pow(x, -n)\`.

[Pow(x, n)](https://leetcode.com/problems/powx-n/)

\`\`\`js
// Hinglish: recursion — ek-ek step comment dekho
// LC: https://leetcode.com/problems/powx-n/
function myPow(x, n) {
  // Hinglish: step 1 — base case check karo
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n); // Hinglish: negative to ulta
  const half = myPow(x, Math.floor(n / 2)); // Hinglish: aadha recursion kare
  return n % 2 === 0 ? half * half : half * half * x; // Hinglish: jodo
}
\`\`\``,
    },
    {
      id: 172,
      lcSlug: "factorial-trailing-zeroes",
      title: "Factorial Trailing Zeroes",
      diff: "Medium",
      body: `Zero 5 ke gunaj se aate hain — 5, 25, 125 se divide karke jod do.

[Factorial Trailing Zeroes](https://leetcode.com/problems/factorial-trailing-zeroes/)

\`\`\`js
// Hinglish: 5 gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/factorial-trailing-zeroes/
function trailingZeroes(n) {
  // Hinglish: step 1 — count lo
  let ans = 0;
  while (n >= 5) {
    n = Math.floor(n / 5); // Hinglish: kitne 5 hain
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
      body: `Sieve lagao — 2 se shuru karke multiples kaato, bache prime hain.

[Count Primes](https://leetcode.com/problems/count-primes/)

\`\`\`js
// Hinglish: kaat-te jao — ek-ek step comment dekho
// LC: https://leetcode.com/problems/count-primes/
function countPrimes(n) {
  // Hinglish: step 1 — sab prime maano
  if (n <= 2) return 0;
  const prime = Array(n).fill(true);
  prime[0] = false; prime[1] = false;
  for (let i = 2; i * i < n; i++) {
    if (!prime[i]) continue;
    for (let j = i * i; j < n; j += i) prime[j] = false; // Hinglish: multiples kaato
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
      body: `Divide karte jao, remainder dobara dikhe to bracket lagao — map me position yaad rakho.

[Fraction to Recurring Decimal](https://leetcode.com/problems/fraction-to-recurring-decimal/)

\`\`\`js
// Hinglish: remainder yaad rakho — ek-ek step comment dekho
// LC: https://leetcode.com/problems/fraction-to-recurring-decimal/
function fractionToDecimal(numerator, denominator) {
  // Hinglish: step 1 — zero check karo
  if (numerator === 0) return "0";
  let out = "";
  if ((numerator < 0) !== (denominator < 0)) out += "-"; // Hinglish: sign lagao
  let n = Math.abs(numerator), d = Math.abs(denominator);
  out += Math.floor(n / d);
  let rem = n % d;
  if (rem === 0) return out;
  out += ".";
  const seen = new Map();
  while (rem !== 0) {
    if (seen.has(rem)) {
      const i = seen.get(rem);
      return out.slice(0, i) + "(" + out.slice(i) + ")"; // Hinglish: repeat mila
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
      body: `Har point se slopes gino — same slope wale ek line pe hain, max rakho. Duplicate alag gino.

[Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/)

\`\`\`js
// Hinglish: slope gino — ek-ek step comment dekho
// LC: https://leetcode.com/problems/max-points-on-a-line/
function maxPoints(points) {
  // Hinglish: step 1 — har point se chalao
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
      if (dx === 0 && dy === 0) { dup++; continue; } // Hinglish: same point
      const g = gcd(Math.abs(dx), Math.abs(dy)) || 1;
      const key = (dx / g) + "," + (dy / g); // Hinglish: slope normalize karo
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
      body: `GCD nikalo — target GCD ka multiple aur total se chhota hona chahiye. Bezout ka niyam hai.

[Water and Jug Problem](https://leetcode.com/problems/water-and-jug-problem/)

\`\`\`js
// Hinglish: GCD check karo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/water-and-jug-problem/
function canMeasureWater(x, y, target) {
  // Hinglish: step 1 — total check karo
  if (x + y < target) return false;
  if (target === 0) return true;
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  return target % gcd(x, y) === 0; // Hinglish: GCD ka multiple hona chahiye
}
\`\`\``,
    },
    {
      id: 858,
      lcSlug: "mirror-reflection",
      title: "Mirror Reflection",
      diff: "Medium",
      body: `Extension nikalo — lcm/gcd se pata chalega kaunsi deewar pe takrayega, receptor 0/1/2 nikalo.

[Mirror Reflection](https://leetcode.com/problems/mirror-reflection/)

\`\`\`js
// Hinglish: lcm se deewar nikalo — ek-ek step comment dekho
// LC: https://leetcode.com/problems/mirror-reflection/
function mirrorReflection(p, q) {
  // Hinglish: step 1 — gcd nikalo
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(p, q);
  const m = p / g, n = q / g; // Hinglish: extension
  if (m % 2 === 0) return 2; // Hinglish: left deewar
  if (n % 2 === 0) return 0; // Hinglish: neeche wala
  return 1; // Hinglish: upar right wala
}
\`\`\``,
    },
      ],
    },
  ],
};
