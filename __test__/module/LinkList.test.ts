import { DoubleLinkList, LinkList } from "../../structure";
import { describe, it, expect } from "vitest";

describe("LinkList basic func test", () => {
  const linkList = new LinkList<number>();
  it("Test add", () => {
    linkList.push(2);
    linkList.push(3);
    expect(linkList.toString()).toBe("3,2");
    linkList.append(1);
    expect(linkList.toString()).toBe("3,2,1");
  });
  it("Test search", () => {
    expect(linkList.getElementAt(2)).toEqual({ value: 1, next: null });
    expect(linkList.indexOf(2)).toBe(1);
  });
  it("Test insert", () => {
    linkList.insert(5, 0);
    expect(linkList.toString()).toBe("5,3,2,1");
    linkList.insert(7, 1);
    expect(linkList.toString()).toBe("5,7,3,2,1");
  });
  it("Test remove", () => {
    linkList.remove(3);
    expect(linkList.toString()).toBe("5,7,3,1");
  });
});

describe("DoubleLinkList basic func test", () => {
  const doubleLinkList = new DoubleLinkList<number>();
  it("Test add", () => {
    doubleLinkList.push(2);
    doubleLinkList.push(3);
    expect(doubleLinkList.toString()).toBe("3,2");
    doubleLinkList.append(4);
    expect(doubleLinkList.toString()).toBe("3,2,4");
    expect(doubleLinkList.tail!.value).toBe(4);
  });
  it("Test search", () => {
    expect(doubleLinkList.getElementAt(2)?.value).toBe(4);
    expect(doubleLinkList.getElementAt(1)?.value).toBe(2);
    expect(doubleLinkList.getElementAt(-1)?.value).undefined;
    expect(doubleLinkList.getElementAt(4)?.value).undefined;
    expect(doubleLinkList.indexOf(2)).toBe(1);
    expect(doubleLinkList.indexOf(-1)).toBe(-1);
    expect(doubleLinkList.indexOf(4)).toBe(2);
  });
  it("Test insert", () => {
    doubleLinkList.insert(6, 1);
    expect(doubleLinkList.toString()).toBe("3,6,2,4");
    doubleLinkList.insert(7, 4);
    expect(doubleLinkList.toString()).toBe("3,6,2,4,7");
    doubleLinkList.remove(3);
    expect(doubleLinkList.toString()).toBe("3,6,2,7");
  });
  it("Test remove", () => {});
});
