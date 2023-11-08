import { BaseClass } from "../common/BaseClass";
import chalk from "chalk";
import {
  RBTreeNode,
  RBTreeNodeColor,
  TreeNode,
  Nullable,
} from "../common/BaseNode";
import { defaultCompare, COMPARE, CompareFn } from "../utils/compare";

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

  removeNode(node: Nullable<TreeNode<T>>, value: T) {
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

  toString(): string {
    return this.getNodeString(this.root, "");
  }

  private getNodeString(node: Nullable<TreeNode<T>>, space: string): string {
    if (!node) return "";
    let ret = node.value + "\n";
    ret += this.getNodeString(node.left, space + " ");
    ret += this.getNodeString(node.right, space + " ");
    return space + "->" + ret;
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

  remove(value: T): boolean {
    const ret = this.removeAVLNode(this.root, value);
    this.root = ret;
    return ret ? true : false;
  }

  // 是否平衡
  isBalance(): boolean {
    if (!this.root) return true;
    return this.checkBalanced(this.root) === BalanceType.BALANCE;
  }

  // 新实现“删除”核心算法
  removeAVLNode(node: Nullable<TreeNode<T>>, value: T): Nullable<TreeNode<T>> {
    super.removeNode(node, value);
    if (!node) return node;
    // 判断树的哪一侧不平衡
    const balanceType = this.checkBalanced(node);
    // 如果是左侧不平衡
    if (balanceType === BalanceType.UNBALANCE_LEFT) {
      // 判断左子树的哪一侧不平衡（从而决定是 LL 还是 LR）
      const leftBalance = this.checkBalanced(node.left!);
      if (
        leftBalance === BalanceType.BALANCE ||
        leftBalance === BalanceType.SLIGHT_UNBALANCE_LEFT
      ) {
        return this.rotationLL(node);
      }
      if (leftBalance === BalanceType.SLIGHT_UNBALANCE_RIGHT) {
        return this.rotationLR(node.left!);
      }
    }
    if (balanceType === BalanceType.UNBALANCE_RIGHT) {
      // 判断右子树的哪一侧不平衡（同上）
      const rightBalance = this.checkBalanced(node.right!);
      if (
        rightBalance === BalanceType.BALANCE ||
        rightBalance === BalanceType.SLIGHT_UNBALANCE_RIGHT
      ) {
        return this.rotationRR(node);
      }
      if (rightBalance === BalanceType.SLIGHT_UNBALANCE_LEFT) {
        return this.rotationRL(node.right!);
      }
    }
    return node;
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
    const temp = node.left!; // 这个方法只有在负方法验证了 left 存在后才会调用
    node.left = temp.right;
    temp.right = node;
    return temp;
  }

  // 节点左旋转（针对 RR 情况）
  private rotationRR(node: TreeNode<T>) {
    const temp = node.right!;
    node.right = temp.left;
    temp.left = node;
    return temp;
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

/**
 * @description 红黑树特点
 * 1. 树节点只有红、黑两种颜色
 * 2. 树的根节点为黑色
 * 3. 所有叶子节点都为黑色
 * 4. 如果一个节点是红色，那么他的子节点都是黑的
 * 5. 不能有两个相邻的红节点（一个红节点不能有红的父节点或子节点）
 * 6. 从给定的节点到它的后代节点的所有路径包含相同数量的黑色节点
 */
export class RBTree<T> extends BinarySearchTree<T> {
  root: Nullable<RBTreeNode<T>>;

  constructor(compareFn: CompareFn<T> = defaultCompare) {
    super(compareFn);
    this.root = null;
  }

  insert(value: T) {
    if (this.root == null) {
      this.root = new RBTreeNode<T>(value);
      this.root.color = RBTreeNodeColor.BLACK;
    } else {
      const newNode = this.insertRBNode(this.root, value);
      // 验证红黑树结构
      this.fixTreeProperties(newNode);
    }
  }

  private insertRBNode(node: RBTreeNode<T>, value: T): RBTreeNode<T> {
    if (this.compareFn(value, node.value) === COMPARE.LESS_THAN) {
      if (node.left == null) {
        node.left = new RBTreeNode<T>(value);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertRBNode(node.left, value);
      }
    } else if (node.right == null) {
      node.right = new RBTreeNode<T>(value);
      node.right.parent = node;
      return node.right;
    } else {
      return this.insertRBNode(node.right, value);
    }
  }

  private fixTreeProperties(node: RBTreeNode<T>) {
    // 节点存在的情况下，如果有以下情况，则需要重新改变树结构：节点存在 并且 节点的父节点为红色
    while (node && node.parent && node.parent.isRed()) {
      let parent = node.parent;
      const grandParent = parent.parent;
      // 情况1：父节点是左侧节点
      if (grandParent && grandParent.left == parent) {
        const uncle = grandParent.right; // 爹是左节点，叔叔就是右节点了
        // 情况1.1：叔也是红色 —— 重新填色即可
        if (uncle && uncle.isRed()) {
          grandParent.color = RBTreeNodeColor.RED;
          parent.color = RBTreeNodeColor.BLACK;
          uncle.color = RBTreeNodeColor.BLACK;
        } else {
          // 情况1.2.1：节点是父节点的右侧节点（树结构右侧偏重：RR 结构，进行 rotationRR 旋转算法）
          if (node === parent.right) {
            this.rotationRR(node);
            // 交换父子关系
            node = parent;
            (parent as Nullable<RBTreeNode<T>>) = node.parent;
          }
          // 情况1.2.2：节点是父节点的左侧节点 —— 右旋转
          this.rotationLL(grandParent);
          parent.color = RBTreeNodeColor.BLACK;
          grandParent.color = RBTreeNodeColor.RED;
          node = parent;
        }
      } else if (grandParent) {
        // 情况2：父节点是右侧子节点
        const uncle = grandParent.left;
        if (uncle && uncle.isRed()) {
          // 情况2.1：叔节点还是红色
          grandParent.color = RBTreeNodeColor.RED;
          parent.color = RBTreeNodeColor.BLACK;
          uncle.color = RBTreeNodeColor.BLACK;
        } else {
          // 情况2.2.1：节点在父节点的左侧，先进行 rotationLL 算法
          if (node === parent.left) {
            this.rotationLL(node);
            // 交换父子关系（指针）
            node = parent;
            (parent as Nullable<RBTreeNode<T>>) = node.parent;
          }
          //情况2.2.2：节点在父节点右侧，直接进行 rotationRR 算法(左旋转)
          this.rotationRR(node);
          parent.color = RBTreeNodeColor.BLACK;
          grandParent.color = RBTreeNodeColor.RED;
          node = parent;
        }
      }
      if (!this.root) return;
      this.root.color = RBTreeNodeColor.BLACK;
    }
  }

  // 节点右旋转（针对 LL 情况）
  private rotationLL(node: RBTreeNode<T>) {
    const temp = node.left!; // 这个方法只有在负方法验证了 left 存在后才会调用
    node.left = temp.right;
    if (temp.right && temp.right.value) {
      temp.right.parent = node;
    }
    temp.parent = node.parent;
    if (!node.parent) {
      this.root = temp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp;
      } else {
        node.parent.right = temp;
      }
    }
    temp.right = node;
    node.parent = temp;
    return temp;
  }

  // 节点左旋转（针对 RR 情况）
  private rotationRR(node: RBTreeNode<T>) {
    const temp = node.right!;
    node.right = temp.left;
    if (temp.left && temp.left.value) {
      temp.left.parent = node;
    }
    temp.parent = node.parent;
    if (!node.parent) {
      this.root = temp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp;
      } else {
        node.parent.right = temp;
      }
    }
    temp.left = node;
    node.parent = temp;
    return temp;
  }

  toString(): string {
    return this.getRBTreeNodeString(this.root, "");
  }

  private getRBTreeNodeString(
    node: Nullable<RBTreeNode<T>>,
    space: string
  ): string {
    if (!node) return "";
    let ret = "";
    if (node.color === RBTreeNodeColor.RED) {
      ret = chalk.bgRed(node.value) + "\n";
    } else {
      ret = chalk.bgGreen(node.value) + "\n";
    }
    ret += this.getRBTreeNodeString(node.left, space + "-");
    ret += this.getRBTreeNodeString(node.right, space + "-");
    return space + "->" + ret;
  }
}
