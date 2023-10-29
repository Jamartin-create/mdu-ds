import { guid } from "../utils/tools";

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

// 二叉树 节点结构
export class TreeNode<T> {
  key: string; // Key 值，作为节点唯一标识
  value: T;
  left: TreeNode<T> | null | undefined;
  right: TreeNode<T> | null | undefined;

  constructor(val: T) {
    this.value = val;
    this.key = guid();
    this.left = null;
    this.right = null;
  }
}

// 键值对结构
export class ValuePair<T> {
  key: any;
  value: T;

  constructor(key: any, value: T) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
