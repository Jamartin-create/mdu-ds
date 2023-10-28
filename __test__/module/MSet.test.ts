import { describe, it, expect } from "vitest";
import { BasicSet } from "../../structure";

describe("Test Basic MSet Func", () => {
  const set = new BasicSet<number>();
  it("Test add", () => {
    expect(set.add(2)).true;
    expect(set.add(2)).false;
    expect(set.size()).toBe(1);
    expect(set.has(2)).true;
  });
  it("Test delete", () => {
    expect(set.delete(2)).true;
    expect(set.size()).toBe(0);
    expect(set.has(2)).false;
    set.add(2);
    set.add(4);
    set.clear();
    expect(set.size()).toBe(0);
  });
  it("Test catch", () => {
    set.add(2);
    set.add(3);
    expect(set.values()).toEqual([2, 3]);
  });
});
