import { LinkList } from "../../structure";
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
