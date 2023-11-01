import { LinkList } from "..";
import { BaseClass } from "../common/BaseClass";
import { ValuePair } from "../common/BaseNode";
import { ToStrFn, defaultToString } from "../utils/compare";

type HashTableType<T> = {
  [key: string]: LinkList<ValuePair<T>>;
};

/**
 * @todo 利用 LinkList 的 compareFn 优化 remove 方法
 */
export class HashTable<T> extends BaseClass {
  table: HashTableType<T>;
  toStrFn: (key: any) => string;

  constructor(toStrFn: ToStrFn = defaultToString) {
    super();
    this.toStrFn = toStrFn;
    this.table = {};
  }

  // put
  put(key: any, value: T) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] === null) {
        this.table[position] = new LinkList<ValuePair<T>>();
      }
      this.table[position].push(new ValuePair<T>(key, value));
      return true;
    }
    return false;
  }

  // remove
  remove(key: any) {
    const pos = this.hashCode(key);
    const link = this.table[pos];
    if (link != null && link.size > 0) {
      let cur = link.head;
      let idx = 0;
      while (cur != null) {
        if (cur.value.key === key) {
          link.remove(idx);
          if (link.size === 0) delete this.table[pos];
          return true;
        }
        idx++;
        cur = cur.next;
      }
    }
    return false;
  }

  // get
  get(key: any) {
    const pos = this.hashCode(key);
    const link = this.table[pos];
    if (link != null && link.size != 0) {
      let cur = link.head;
      while (cur != null) {
        if (cur.value.key === key) return cur.value.value;
        cur = cur.next;
      }
    }
    return false;
  }

  hashCode(key: any): number {
    return this.loseloseHashCode(key);
  }

  private loseloseHashCode(key: any): number {
    if (typeof key === "number") return key;
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37; // 防止超出最大值
  }
}
