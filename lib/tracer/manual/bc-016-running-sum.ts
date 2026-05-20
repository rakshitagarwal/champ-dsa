import type { DataStructureSnapshot, TraceStep } from "@/lib/tracer/types";

/** Matches sheet solutionCode line numbers (in-place running sum). */
export const BC016_TRACE_CODE = `var runningSum = function (nums) {

  for (let i = 1; i < nums.length; i++) nums[i] += nums[i - 1];
  return nums;

};`;

export function traceRunningSumOf1DArray(nums: number[]): TraceStep[] {
  const steps: TraceStep[] = [];
  const working = [...nums];

  function push(
    line: number,
    desc: string,
    vars: Record<string, unknown>,
    ds?: Partial<DataStructureSnapshot>,
  ) {
    steps.push({
      line,
      description: desc,
      vars: { ...vars },
      ds: {
        arrays: ds?.arrays ?? [
          {
            id: "nums",
            label: "nums",
            values: [...working],
            highlights: {},
          },
        ],
        pointers: ds?.pointers ?? [],
        stacks: ds?.stacks ?? [],
        hashmaps: ds?.hashmaps ?? [],
      },
    });
  }

  push(1, "Enter runningSum(nums)", { nums: [...working] });

  for (let i = 1; i < working.length; i++) {
    push(
      3,
      `Loop: i = ${i}, nums[i] = ${working[i]}, nums[i-1] = ${working[i - 1]}`,
      { i, "nums[i]": working[i], "nums[i-1]": working[i - 1] },
      {
        arrays: [
          {
            id: "nums",
            label: "nums",
            values: [...working],
            highlights: { [i]: "active", [i - 1]: "comparing" },
          },
        ],
        pointers: [{ arrayId: "nums", name: "i", index: i, color: "#60a5fa" }],
      },
    );

    const prev = working[i - 1]!;
    working[i] = prev + working[i]!;

    const addend = working[i]! - prev;
    push(
      3,
      `nums[${i}] = ${prev} + ${addend} = ${working[i]}`,
      { i, prev, "nums[i]": working[i] },
      {
        arrays: [
          {
            id: "nums",
            label: "nums",
            values: [...working],
            highlights: { [i]: "result" },
          },
        ],
        pointers: [{ arrayId: "nums", name: "i", index: i, color: "#60a5fa" }],
      },
    );
  }

  push(4, `Return nums = [${working.join(", ")}]`, { result: [...working] }, {
    arrays: [
      {
        id: "nums",
        label: "nums",
        values: [...working],
        highlights: Object.fromEntries(
          working.map((_, idx) => [idx, "result" as const]),
        ),
      },
    ],
  });

  return steps;
}
