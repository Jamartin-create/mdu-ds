export class LinkNode<T> {
  value: T;
  next: LinkNode<T> | null | undefined;
  constructor(val: T) {
    this.value = val;
    this.next = null;
  }
}

export class DoubleLinkNode<T> {
  value: T;
  next: DoubleLinkNode<T> | null | undefined;
  prev: DoubleLinkNode<T> | null | undefined;
  constructor(val: T) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}
