import type { DataStructureSnapshot, TraceStep } from "@/lib/tracer/types";

/** Matches sheet solutionCode line numbers for bc-019. */
export const BC019_TRACE_CODE = `var maxSubarraySumCircular = function (nums) {


  let maxK = nums[0], minK = nums[0], curMax = nums[0], curMin = nums[0], sum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    sum += nums[i];
    curMax = Math.max(nums[i], curMax + nums[i]);
    curMin = Math.min(nums[i], curMin + nums[i]);
    maxK = Math.max(maxK, curMax); minK = Math.min(minK, curMin);
  }
  return maxK > 0 ? Math.max(maxK, sum - minK) : maxK;


};`;

export function traceMaxSumCircularSubarray(nums: number[]): TraceStep[] {
  const steps: TraceStep[] = [];

  let maxK = nums[0]!,
    minK = nums[0]!,
    curMax = nums[0]!,
    curMin = nums[0]!,
    sum = nums[0]!;

  function push(
    line: number,
    desc: string,
    vars: Record<string, unknown>,
    highlights: Partial<Record<number, "active" | "comparing" | "result">> = {},
  ) {
    steps.push({
      line,
      description: desc,
      vars: { ...vars },
      ds: {
        arrays: [
          {
            id: "nums",
            label: "nums",
            values: [...nums],
            highlights,
          },
        ],
        hashmaps: [
          {
            id: "vars",
            label: "Variables",
            entries: [
              { key: "sum", value: sum },
              { key: "curMax", value: curMax },
              { key: "curMin", value: curMin },
              { key: "maxK", value: maxK },
              { key: "minK", value: minK },
            ],
          },
        ],
      },
    });
  }

  push(
    5,
    `Init: maxK=minK=curMax=curMin=sum=${nums[0]}`,
    { maxK, minK, curMax, curMin, sum },
    { 0: "active" },
  );

  for (let i = 1; i < nums.length; i++) {
    push(6, `Loop: i=${i}, nums[i]=${nums[i]}`, { i, "nums[i]": nums[i] }, { [i]: "active" });

    sum += nums[i]!;
    push(7, `sum += nums[${i}] → sum = ${sum}`, { i, sum }, { [i]: "active" });

    curMax = Math.max(nums[i]!, curMax + nums[i]!);
    push(
      8,
      `curMax = max(${nums[i]}, prev+${nums[i]}) = ${curMax}`,
      { i, curMax },
      { [i]: "comparing" },
    );

    curMin = Math.min(nums[i]!, curMin + nums[i]!);
    push(
      9,
      `curMin = min(${nums[i]}, prev+${nums[i]}) = ${curMin}`,
      { i, curMin },
      { [i]: "comparing" },
    );

    maxK = Math.max(maxK, curMax);
    minK = Math.min(minK, curMin);
    push(10, `maxK = ${maxK}, minK = ${minK}`, { maxK, minK }, { [i]: "result" });
  }

  const answer = maxK > 0 ? Math.max(maxK, sum - minK) : maxK;
  push(12, `Return max(${maxK}, ${sum}-${minK}) = ${answer}`, { answer }, {});

  return steps;
}
