import { Stack } from "../../structure";
import { describe, expect, it } from "vitest";

describe("Test Stack Basic Func", () => {
  const stack = new Stack<number>();
  it("Stack Push", () => {
    stack.push(30);
    stack.push(40);
    expect(stack).toEqual({ items: { 0: 30, 1: 40 }, count: 2 });
  });
  it("Stack Pop", () => {
    expect(stack.pop()).toBe(40);
  });
  it("Stack Peek", () => {
    expect(stack.peek()).toBe(30);
  });
  it("Stack clear", () => {
    stack.clear();
    expect(stack.count).toBe(0);
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).true;
  });
});
