import { describe, expect, it } from "vitest";
import {
  getFirstTwoRunExamples,
  parseExamplesFromDescription,
} from "./run-examples";

const LONGEST_CONSEC_DESC = `<p><strong class="example">Example 1:</strong></p>
<pre>
<strong>Input:</strong> nums = [100,4,200,1,3,2]
<strong>Output:</strong> 4
</pre>
<p><strong class="example">Example 2:</strong></p>
<pre>
<strong>Input:</strong> nums = [0,3,7,2,5,8,4,6,0,1]
<strong>Output:</strong> 9
</pre>`;

describe("parseExamplesFromDescription", () => {
  it("parses example 1 and 2 from LeetCode HTML", () => {
    const ex = parseExamplesFromDescription(LONGEST_CONSEC_DESC);
    expect(ex).toHaveLength(2);
    expect(ex[0].input).toContain("100,4,200");
    expect(ex[0].output).toBe("4");
    expect(ex[1].output).toBe("9");
  });
});

describe("getFirstTwoRunExamples", () => {
  it("fills second example from description when only one in array", () => {
    const two = getFirstTwoRunExamples(
      [{ input: "nums = [100,4,200,1,3,2]", output: "4" }],
      LONGEST_CONSEC_DESC,
      "nums = [100,4,200,1,3,2]",
      "4",
    );
    expect(two).toHaveLength(2);
    expect(two[1].output).toBe("9");
  });
});
