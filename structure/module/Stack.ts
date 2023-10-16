import { BaseClass } from "../common/BaseClass";

export class Stack<T> extends BaseClass {
  items: { [key: number]: T };
  count: number;

  constructor() {
    super();
    this.items = {};
    this.count = 0;
  }
  // push
  push(item: T) {
    this.items[this.count] = item;
    this.count++;
  }

  // pop
  pop(): T | undefined {
    if (this.isEmpty()) return undefined;
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  // peek
  peek(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items[this.count - 1];
  }

  // isEmpty
  isEmpty(): boolean {
    return this.count === 0;
  }

  // clear
  clear() {
    this.items = {};
    this.count = 0;
  }

  // size
  size() {
    return this.count;
  }

  // toString
  toString(): string {
    if (this.isEmpty()) return "";
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}
