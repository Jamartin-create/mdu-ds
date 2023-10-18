import { BaseClass } from "../common/BaseClass";
import { LinkNode } from "../common/BaseNode";

type NodeType<T> = LinkNode<T> | null | undefined;

export class LinkList<T> extends BaseClass {
  head: NodeType<T>;
  next: NodeType<T>;

  constructor() {
    super();
    this.head = null;
    this.next = null;
  }

  // insert(idx)
  // remove(idx)
  // size
  // find(idx)
  // append
  // isEmpty
}
