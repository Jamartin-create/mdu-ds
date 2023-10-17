import { BaseClass } from "../common/BaseClass";

export class Queue<T> extends BaseClass {
  count: number;
  lowestCount: number;
  items: { [key: number]: T };

  constructor() {
    super();
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  // enqueue：向队列尾部加入一项
  enqueue(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  // dequeue：移除队列第一项
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const ret = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    this.count--;
    return ret;
  }

  // peek：返回队列第一个元素（先添加的项）
  peek(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items[this.lowestCount];
  }

  // isEmpty：队列是否为空
  isEmpty(): boolean {
    return this.count === 0;
  }

  // size：队列大小
  size(): number {
    return this.count;
  }

  // clear：清空队列
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString(): string {
    if (this.isEmpty()) return "";
    let ret = `${this.items[this.lowestCount]}`;
    for (let i = 1; i < this.count; i++) {
      ret = `${ret},${this.items[i]}`;
    }
    return ret;
  }
}

// 双端队列
export class Deque<T> extends Queue<T> {
  constructor() {
    super();
  }

  // addFront 在前端添加新元素
  addFront(element: T) {
    if (this.isEmpty()) {
      // 空的时候从前端还是后端添加元素都一样
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      // 直接往前插
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      // 整体向后移
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  // addBack
  addBack(element: T) {
    super.enqueue(element);
  }

  // removeFront
  removeFront(): T | undefined {
    return super.dequeue();
  }

  // removeBack
  removeBack(): T | undefined {
    if (this.isEmpty()) return undefined;
    const idx = this.lowestCount + --this.count;
    console.log(idx);
    const ret = this.items[idx];
    delete this.items[idx];
    return ret;
  }

  // peekFront
  peekFront(): T | undefined {
    return super.peek();
  }

  // peekBack
  peekBack(): T | undefined {
    if (this.isEmpty()) return undefined;
    const idx = this.lowestCount + --this.count;
    return this.items[idx];
  }
}
