export class LinkNode<T> {
  value: T;
  next: LinkNode<T> | null | undefined;
  constructor(val: T) {
    this.value = val;
    this.next = null;
  }
}
