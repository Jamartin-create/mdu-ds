export class LinkNode<T> {
  value: T;
  next: T | null | undefined;
  constructor(val: T, next?: T) {
    this.value = val;
    this.next = next;
  }
}
