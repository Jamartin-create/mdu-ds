import { BaseClass } from "../common/BaseClass";
import { TreeNode } from "../common/BaseNode";
import { defaultCompare, COMPARE, CompareFn } from "../utils/compare";

type Nullable<T> = T | null | undefined;

type DFSType = "IN" | "PRE" | "POST";

// 二叉搜索树
export class BinarySearchTree<T> extends BaseClass {
  root: Nullable<TreeNode<T>>;
  compareFn: CompareFn<T>;

  constructor(compareFn: CompareFn<T> = defaultCompare<T>) {
    super();
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(value: T) {
    if (!this.root) {
      this.root = new TreeNode<T>(value);
    } else {
      this.insertNode(this.root, value);
    }
  }

  search(value: T) {
    return this.searchNode(this.root, value) ? true : false;
  }

  inOrderTraverse() {
    const map: T[] = [];
    this.dfs("IN", this.root, map);
    return map.join(",");
  }

  preOrderTraverse() {
    const map: T[] = [];
    this.dfs("PRE", this.root, map);
    return map.join(",");
  }

  postOrderTraverse() {
    const map: T[] = [];
    this.dfs("POST", this.root, map);
    return map.join(",");
  }

  min() {
    if (!this.root) return null;
    return this.minNode(this.root);
  }

  max() {
    if (!this.root) return null;
    return this.maxNode(this.root);
  }

  remove(value: T) {
    return this.removeNode(this.root, value) ? true : false;
  }

  private removeNode(node: Nullable<TreeNode<T>>, value: T) {
    if (!node) return null;
    if (this.compareFn(value, node.value) === COMPARE.LESS_THAN) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (this.compareFn(value, node.value) === COMPARE.BIGR_THAN) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // 1
      if (!node.left && !node.right) {
        node = null;
        return node;
      }
      // 2
      if (!node.left) {
        node = node.right;
        return node;
      } else if (!node.right) {
        node = node.left;
        return node;
      }
      // 3
      const aux = this.minNode(node.right);
      node.key = aux.key;
      node.value = aux.value;
      node.right = this.removeNode(node.right, aux.value);
      return node;
    }
  }

  private searchNode(
    node: Nullable<TreeNode<T>>,
    value: T
  ): Nullable<TreeNode<T>> {
    if (!node) return null;
    if (this.compareFn(value, node.value) === COMPARE.LESS_THAN) {
      // 目标值比当前节点小，向左查
      return this.searchNode(node.left, value);
    } else if (this.compareFn(value, node.value) === COMPARE.BIGR_THAN) {
      // 大，右
      return this.searchNode(node.right, value);
    } else {
      return node;
    }
  }

  // 搜索最小值
  private minNode(cur: TreeNode<T>) {
    while (cur && cur.left) cur = cur.left;
    return cur;
  }

  // 搜索最大值
  private maxNode(cur: TreeNode<T>) {
    while (cur && cur.right) cur = cur.right;
    return cur;
  }

  // 深度优先搜索算法
  private dfs(type: DFSType, node: Nullable<TreeNode<T>>, map: T[]) {
    if (!node) return;
    if (type === "PRE") map.push(node.value);
    this.dfs(type, node.left, map);
    if (type === "IN") map.push(node.value);
    this.dfs(type, node.right, map);
    if (type === "POST") map.push(node.value);
  }

  // 插入节点
  private insertNode(parent: TreeNode<T>, newNodeValue: T) {
    if (this.compareFn(newNodeValue, parent.value) === COMPARE.LESS_THAN) {
      // 小于节点，插入左侧节点
      if (parent.left == null) {
        parent.left = new TreeNode<T>(newNodeValue);
        return;
      }
      this.insertNode(parent.left, newNodeValue);
    } else {
      // 大于节点，插入右侧节点
      if (parent.right == null) {
        parent.right = new TreeNode<T>(newNodeValue);
        return;
      }
      this.insertNode(parent.right, newNodeValue);
    }
  }
}

const BalanceType = {
  UNBALANCE_RIGHT: 1,
  SLIGHT_UNBALANCE_RIGHT: 2,
  BALANCE: 3,
  SLIGHT_UNBALANCE_LEFT: 4,
  UNBALANCE_LEFT: 5,
};

// 平衡二叉树
export class AVLTree<T> extends BinarySearchTree<T> {
  constructor(compareFn: CompareFn<T> = defaultCompare<T>) {
    super(compareFn);
  }

  // 复写二叉树的 insert 方法
  insert(value: T): void {
    this.root = this.insertAVLNode(this.root, value);
  }

  // 新实现“插入”核心算法
  private insertAVLNode(node: Nullable<TreeNode<T>>, value: T): TreeNode<T> {
    if (!node) {
      return new TreeNode<T>(value);
    } else if (this.compareFn(value, node.value) === COMPARE.LESS_THAN) {
      node.left = this.insertAVLNode(node.left, value);
    } else if (this.compareFn(value, node.value) === COMPARE.BIGR_THAN) {
      node.right = this.insertAVLNode(node.right, value);
    } else {
      return node;
    }

    const balance = this.checkBalanced(node);
    if (balance === BalanceType.UNBALANCE_LEFT) {
      if (this.compareFn(value, node.left!.value) === COMPARE.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        return this.rotationLR(node);
      }
    }

    if (balance === BalanceType.UNBALANCE_RIGHT) {
      if (this.compareFn(value, node.right!.value) === COMPARE.BIGR_THAN) {
        node = this.rotationRR(node);
      } else {
        return this.rotationRL(node);
      }
    }
    return node;
  }

  // RL
  private rotationRL(node: TreeNode<T>) {
    node.right = this.rotationLL(node.right!);
    return this.rotationRR(node);
  }

  // LR
  private rotationLR(node: TreeNode<T>) {
    node.left = this.rotationRR(node.left!);
    return this.rotationLL(node);
  }

  // 节点右旋转（针对 LL 情况）
  private rotationLL(node: TreeNode<T>) {
    const temp = node.right!;
    node.right = temp.left;
    temp.left = node;
    return node;
  }

  // 节点左旋转（针对 RR 情况）
  private rotationRR(node: TreeNode<T>) {
    const temp = node.left!; // 这个方法只有在负方法验证了 left 存在后才会调用
    node.left = temp.right;
    temp.right = node;
    return node;
  }

  // 检查树是否平衡
  private checkBalanced(node: TreeNode<T>): number {
    const balanceType =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (balanceType) {
      case -2:
        return BalanceType.UNBALANCE_RIGHT;
      case -1:
        return BalanceType.SLIGHT_UNBALANCE_RIGHT;
      case 1:
        return BalanceType.SLIGHT_UNBALANCE_LEFT;
      case 2:
        return BalanceType.UNBALANCE_LEFT;
      default:
        return BalanceType.BALANCE;
    }
  }

  // 获取节点高度
  private getNodeHeight(node: Nullable<TreeNode<T>>): number {
    if (!node) return -1;
    const ret = Math.max(
      this.getNodeHeight(node.left),
      this.getNodeHeight(node.right)
    );
    return ret + 1;
  }
}
