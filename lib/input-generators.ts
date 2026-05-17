import { formatHumanInput } from "@/lib/io/human-input";

export function randomArray(len = 8, max = 20): string {
  const nums = Array.from({ length: len }, () =>
    Math.floor(Math.random() * max) + 1,
  );
  return formatHumanInput({
    nums,
    target: nums.reduce((a, b) => a + b, 0) >> 1,
  });
}

export function sortedArray(len = 8): string {
  const nums = Array.from({ length: len }, (_, i) => i + 1);
  return formatHumanInput({ nums, target: nums[len - 1] + nums[0] });
}

export function duplicatesArray(): string {
  return formatHumanInput({ nums: [1, 1, 2, 2, 3, 3, 4, 5, 5], target: 6 });
}

export function fibInput(): string {
  return formatHumanInput({ n: 4 });
}
