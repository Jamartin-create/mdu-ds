import { describe, it, expect } from "vitest";
import { BinarySearchTree } from "../../structure";

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
});
