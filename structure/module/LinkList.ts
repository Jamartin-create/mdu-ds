import { BaseClass } from "../common/BaseClass";
import { LinkNode } from "../common/BaseNode";
import { COMPARE, NOT_EXIT, defaultCompare } from "../utils/compare";

type NodeType<T> = LinkNode<T> | null | undefined;
type CompareFn<T> = (a: T, b: T) => number;

export class LinkList<T> extends BaseClass {
  head: NodeType<T>;
  size: number;

  compareFn: CompareFn<T>;

  constructor(compareFn: CompareFn<T> = defaultCompare<T>) {
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
      if (this.compareFn(dummy.value, el) === COMPARE.EQUAL) return idx;
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
