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
    return this.searchNode(this.root, value);
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
    const target = this.search(value);
    if (!target) return false;
    // 没有子节点，直接删
    // 有左节点，左节点替换自己
    // 有左右节点，移除右侧节点里最小的数
    return true;
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
      return this.searchNode(node.right, node.value);
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
