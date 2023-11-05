import { guid } from "../utils/tools";

export type Nullable<T> = T | null | undefined;

export class LinkNode<T> {
  value: T;
  next: Nullable<LinkNode<T>>;
  constructor(val: T) {
    this.value = val;
    this.next = null;
  }
}

export class DoubleLinkNode<T> {
  value: T;
  next: Nullable<DoubleLinkNode<T>>;
  prev: Nullable<DoubleLinkNode<T>>;
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
  left: Nullable<TreeNode<T>>;
  right: Nullable<TreeNode<T>>;

  constructor(val: T) {
    this.value = val;
    this.key = guid();
    this.left = null;
    this.right = null;
  }
}

export type RBTreeNodeColorType = { [key in "RED" | "BLACK"]: 0 | 1 };
export const RBTreeNodeColor: RBTreeNodeColorType = {
  RED: 0,
  BLACK: 1,
};

// 红黑树节点
export class RBTreeNode<T> extends TreeNode<T> {
  left: Nullable<RBTreeNode<T>>;
  right: Nullable<RBTreeNode<T>>;
  parent: Nullable<RBTreeNode<T>>;
  color: 0 | 1;

  constructor(value: T) {
    super(value);
    this.parent = null;
    this.left = null;
    this.right = null;
    this.color = RBTreeNodeColor.RED;
  }

  isRed() {
    return this.color === RBTreeNodeColor.RED;
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
