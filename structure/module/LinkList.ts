import { BaseClass } from "../common/BaseClass";
import { DoubleLinkNode, LinkNode } from "../common/BaseNode";
import { NOT_EXIT, defaultIsEqual } from "../utils/compare";

type NodeType<T> = LinkNode<T> | null | undefined;
type DoubleNodeType<T> = DoubleLinkNode<T> | null | undefined;
type CompareFn<T> = (a: T, b: T) => boolean;

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
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = null;
      newNode.prev = null;
      return true;
    }
    newNode.next = this.head;
    this.head = newNode;
    return true;
  }

  append(el: T): boolean {
    if (!this.head) return this.push(el);
    this.size++;
    const newNode = new DoubleLinkNode<T>(el);
    this.tail!.next = newNode;
    this.tail = newNode;
    return true;
  }

  getElementAt(idx: number): DoubleNodeType<T> | undefined {
    if (!this.head || idx < 0) return undefined;
    let pos = 0;
    let dummy = this.head;
    while (dummy && dummy.next && pos < idx) {
      dummy = dummy.next;
      pos++;
    }
    if (pos < idx) return undefined;
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
    const beforeNode = this.getElementAt(idx - 1);
    const newNode = new DoubleLinkNode<T>(el);
    newNode.next = beforeNode!.next;
    beforeNode!.next = newNode;
    return true;
  }

  remove(idx: number): boolean {
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
