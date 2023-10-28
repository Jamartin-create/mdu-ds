import { BaseClass } from "../common/BaseClass";

type KeyValue<T> = {
  [key: string]: T;
};

/**
 * 愿景：想实现 ES6 的产物 Set（但是这个 Set 已经不单单是一个集合了，里面包含了各种高阶数据结构，后续补充）
 */

// 低配版 Set（只能存储 string 和 number）
export class BasicSet<T extends string | number> extends BaseClass {
  item: KeyValue<T>;

  constructor() {
    super();
    this.item = {};
  }

  // add
  add(val: T) {
    if (this.has(val)) return false;
    this.item[val] = val;
    return true;
  }

  // delete
  delete(val: T) {
    if (!this.has(val)) return false;
    delete this.item[val];
    return true;
  }

  // has
  has(val: T) {
    return val in this.item;
  }

  // clear
  clear() {
    this.item = {};
  }

  // values
  values() {
    return Object.values(this.item);
  }

  // size
  size(): number {
    return Object.keys(this.item).length;
  }

  // 并集
  union(otherSet: BasicSet<T>) {
    const newSet = new BasicSet<T>();
    this.values().forEach((val: T) => newSet.add(val));
    otherSet.values().forEach((val: T) => newSet.add(val));
    return newSet;
  }

  // 交集
  intersection(otherSet: BasicSet<T>) {
    const newSet = new BasicSet<T>();
    this.values().forEach((val) => {
      if (otherSet.has(val)) newSet.add(val);
    });
    return newSet;
  }

  // 差集
  difference(otherSet: BasicSet<T>) {
    const newSet = new BasicSet<T>();
    this.values().forEach((val) => {
      if (!otherSet.has(val)) newSet.add(val);
    });
    return newSet;
  }

  // 子集
  isSubsetOf(otherSet: BasicSet<T>) {
    const values = this.values();
    if (this.size() > otherSet.size()) return false;
    return values.every((val) => otherSet.has(val));
  }
}
