import { Stack } from "../../structure";
import { describe, expect, it } from "vitest";

describe("Test Stack Basic Func", () => {
  it("Stack Push", () => {
    expect(
      (() => {
        const stack = new Stack<number>();
        stack.push(30);
        return stack;
      })()
    ).toEqual({ items: { 0: 30 }, count: 1 });
  });
});
