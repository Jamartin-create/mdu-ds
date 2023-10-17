import { Deque, Queue } from "../../structure";
import { expect, describe, it } from "vitest";

describe("Test Queue Basic Func", () => {
  const queue = new Queue<number>();
  it("Queue enqueue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue).toEqual({ items: { 0: 1, 1: 2 }, count: 2, lowestCount: 0 });
  });
  it("Queue dequeue", () => {
    expect(queue.dequeue()).toBe(1);
    expect(queue.size()).toBe(1);
    expect(queue.isEmpty()).false;
  });
  it("Queue peek", () => {
    expect(queue.peek()).toBe(2);
  });
  it("Queue Clear", () => {
    queue.clear();
    expect(queue.peek()).undefined;
    expect(queue.dequeue()).undefined;
    expect(queue.size()).toBe(0);
  });
});

// 双端队列测试用例
describe("Test Deque Basic Func", () => {
  const deque = new Deque<number>();
  it("Deque add new One", () => {
    deque.addFront(2);
    expect(deque).toEqual({ items: { 0: 2 }, count: 1, lowestCount: 0 });
    deque.addFront(3);
    expect(deque).toEqual({ items: { 0: 3, 1: 2 }, count: 2, lowestCount: 0 });
    deque.addBack(4);
    expect(deque).toEqual({
      items: { 0: 3, 1: 2, 2: 4 },
      count: 3,
      lowestCount: 0,
    });
  });
  it("Deque delete One", () => {
    expect(deque.removeFront()).toBe(3);
    expect(deque.lowestCount).toBe(1);
    expect(deque.removeBack()).toBe(4);
    expect(deque.peekBack()).toBe(2);
  });
  it("Deque clear", () => {
    deque.clear();
    expect(deque.size()).toBe(0);
    expect(deque.count).toBe(0);
    expect(deque.removeFront()).undefined;
  });
});
