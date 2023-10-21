import { BaseClass } from "../common/BaseClass";
import { DoubleLinkNode, LinkNode } from "../common/BaseNode";
import { NOT_EXIT, defaultIsEqual } from "../utils/compare";

type NodeType<T> = LinkNode<T> | null | undefined;
type DoubleNodeType<T> = DoubleLinkNode<T> | null | undefined;
type CompareFn<T> = (a: T, b: T) => boolean;

// 单链表
export class LinkList<T> extends BaseClass {
  head: NodeType<T>;
  size: number;

  compareFn: CompareFn<T>;

  constructor(compareFn: CompareFn<T> = defaultIsEqual<T>) {
    super();
    this.head = null;
    this.size = 0;
    this.compareFn = compareFn;
  }

  // push
  push(el: T) {
    this.size++;
    const newNode = new LinkNode<T>(el);
    if (this.head != null && this.head != undefined) {
      newNode.next = this.head;
    }
    this.head = newNode;
  }

  // append
  append(el: T) {
    if (this.head == null) {
      this.push(el);
      return;
    }
    this.size++;
    const newNode = new LinkNode<T>(el);
    let dummy = this.head;
    while (dummy?.next) {
      dummy = dummy.next;
    }
    dummy.next = newNode;
  }

  // getElementAt
  getElementAt(idx: number): NodeType<T> {
    if (idx > this.size || idx < 0) return undefined;
    let dummy = this.head;
    let pos = 0;
    while (pos < idx) {
      pos++;
      dummy = dummy?.next;
    }
    return dummy;
  }

  // remove
  remove(idx: number) {
    if (!this.head) return;
    if (idx > this.size || idx < 0) return;
    if (idx === 0) {
      const dummy = this.head;
      this.head = dummy.next;
      dummy.next = null;
      return;
    }
    const dummy = this.getElementAt(idx - 1) as LinkNode<T>;
    dummy.next = dummy.next?.next;
  }

  // insert
  insert(el: T, idx: number) {
    if (idx > this.size || idx < 0) return;
    if (idx === this.size) return this.append(el);
    if (idx === 0) return this.push(el);
    const dummy = this.getElementAt(idx - 1) as LinkNode<T>;
    const newNode = new LinkNode(el);
    newNode.next = dummy?.next;
    dummy.next = newNode;
  }

  // indexOf
  indexOf(el: T): number {
    let dummy = this.head;
    let idx = 0;
    while (dummy) {
      if (this.compareFn(dummy.value, el)) return idx;
      idx++;
      dummy = dummy.next;
    }
    return NOT_EXIT;
  }

  toString(): string {
    let dummy = this.head;
    let ret = dummy?.value + "";
    dummy = dummy?.next;
    while (dummy) {
      ret = `${ret},${dummy.value}`;
      dummy = dummy.next;
    }
    return ret;
  }
}

// 双链表
export class DoubleLinkList<T> extends BaseClass {
  head: DoubleNodeType<T>;
  tail: DoubleNodeType<T>;
  size: number;

  compareFn: CompareFn<T>;

  constructor(compareFn: CompareFn<T> = defaultIsEqual<T>) {
    super();
    this.compareFn = compareFn;
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(el: T): boolean {
    const newNode = new DoubleLinkNode<T>(el);
    this.size++;
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return true;
    }
    const head = this.head;
    head.prev = newNode; // 原 head prev 指针移动
    newNode.next = head; // 新 head next 指针移动
    this.head = newNode; // 赋值新 head
    return true;
  }

  append(el: T): boolean {
    // head 为空，即链表为空
    if (!this.head || !this.tail) return this.push(el);
    this.size++;
    const newNode = new DoubleLinkNode<T>(el);
    newNode.prev = this.tail;
    this.tail.next = newNode;
    this.tail = newNode;
    return true;
  }

  /** 优化：根据位置判断是从前往后遍历还是从后往前遍历 */
  getElementAt(idx: number): DoubleNodeType<T> | undefined {
    if (!this.head || !this.tail || idx < 0 || idx >= this.size)
      return undefined;
    const flag = idx > Math.floor(this.size / 2);
    let dummy = flag ? this.tail : this.head;
    if (flag) {
      let pos = this.size - 1;
      while (dummy && dummy.prev && pos > idx) {
        dummy = dummy.prev;
        pos--;
      }
      if (pos > idx) return undefined;
    } else {
      let pos = 0;
      while (dummy && dummy.next && pos < idx) {
        dummy = dummy.next;
        pos++;
      }
      if (pos < idx) return undefined;
    }
    return dummy;
  }

  indexOf(el: T): number {
    if (!this.head) return -1;
    let idx = 0;
    let dummy = this.head;
    while (dummy) {
      if (this.compareFn(dummy.value, el)) return idx;
      dummy = dummy.next as DoubleLinkNode<T>;
      idx++;
    }
    return -1;
  }

  insert(el: T, idx: number): boolean {
    if (idx === 0) return this.push(el);
    if (idx === this.size) return this.append(el);
    if (idx < 0 || idx > this.size) return false;
    this.size++;
    const beforeNode = this.getElementAt(idx - 1) as DoubleLinkNode<T>;
    const newNode = new DoubleLinkNode<T>(el);
    newNode.next = beforeNode.next;
    newNode.prev = beforeNode;
    beforeNode.next = newNode;
    return true;
  }

  remove(idx: number): boolean {
    if (!this.head || !this.tail) return false;
    if (this.size === 1 && idx === 0) {
      this.head = null;
      this.tail = null;
      return true;
    }
    if (idx === 0) {
      // 删除第一个
      this.head.next!.prev = null;
      this.head = this.head.next;
    } else if (idx === this.size - 1) {
      // 删除最后一个
      this.tail.prev!.next = null;
      this.tail = this.tail.prev;
    } else {
      // 删除中间的
      const beforeNode = this.getElementAt(idx) as DoubleLinkNode<T>;
      beforeNode.next!.prev = beforeNode.prev;
      beforeNode.prev!.next = beforeNode.next;
    }
    return true;
  }

  toString(): string {
    let dummy = this.head;
    let ret = dummy?.value + "";
    dummy = dummy?.next;
    while (dummy) {
      ret = `${ret},${dummy.value}`;
      dummy = dummy.next;
    }
    return ret;
  }
}
