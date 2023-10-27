import { describe, it, expect } from "vitest";
import { AVLTree, BinarySearchTree } from "../../structure";

describe("BinarySerachTree Basic Func Test", () => {
  const tree = new BinarySearchTree<number>();
  it("Test insert", () => {
    tree.insert(5);
    tree.insert(2);
    tree.insert(7);
    expect(tree.inOrderTraverse()).toBe("2,5,7");
    expect(tree.preOrderTraverse()).toBe("5,2,7");
    expect(tree.postOrderTraverse()).toBe("2,7,5");
  });

  it("Test search", () => {
    expect(tree.min()?.value).toBe(2);
    expect(tree.max()?.value).toBe(7);
    expect(tree.search(7)).true;
  });

  it("Test remove", () => {
    tree.insert(9);
    tree.insert(12);
    tree.insert(8);
    expect(tree.inOrderTraverse()).toBe("2,5,7,8,9,12");
    expect(tree.preOrderTraverse()).toBe("5,2,7,9,8,12");
    expect(tree.postOrderTraverse()).toBe("2,8,12,9,7,5");

    tree.remove(7);
    expect(tree.inOrderTraverse()).toBe("2,5,8,9,12");
    tree.remove(2);
    expect(tree.inOrderTraverse()).toBe("5,8,9,12");
    tree.remove(9);
    expect(tree.inOrderTraverse()).toBe("5,8,12");
  });
});

describe("AVLTree Basic Func Test", () => {
  const tree = new AVLTree<number>();
  it("Test insert", () => {
    tree.insert(5);
    tree.insert(3);
    tree.insert(2);
    expect(tree.inOrderTraverse()).toBe("2,3,5");
    tree.insert(9);
    expect(tree.inOrderTraverse()).toBe("2,3,5,9");
    tree.insert(11);
    expect(tree.inOrderTraverse()).toBe("2,3,5,9,11");
    tree.insert(6);
    expect(tree.inOrderTraverse()).toBe("2,3,5,6,9,11");
    expect(tree.isBalance()).true;
    console.log(tree.toString());
  });
  it("Test remove", () => {
    tree.remove(6);
    tree.remove(11);
    tree.remove(9);
    console.log(tree.toString());
    expect(tree.isBalance()).true;
    expect(tree.root?.value).toBe(3);
    expect(tree.inOrderTraverse()).toBe("2,3,5");
  });
});
