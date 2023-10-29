import { BaseClass } from "../common/BaseClass";
import { ValuePair } from "../common/BaseNode";
import { ToStrFn, defaultToString } from "../utils/compare";

type KeyValue<T> = {
  [key: string]: T;
};

type ForEachCallback = (key: any, value: any) => void | boolean;

export class Dictionary<T> extends BaseClass {
  toStrFn: ToStrFn;
  map: KeyValue<ValuePair<T>>;

  constructor(toStrFn: ToStrFn = defaultToString) {
    super();
    this.toStrFn = toStrFn;
    this.map = {};
  }

  // set
  set(key: any, value: T) {
    if (!key || !value) return false;
    const nKey = this.toStrFn(key); // 和 set 不一样的是，set 遇到相同的值会返回 false，map 则是覆盖
    this.map[nKey] = new ValuePair<T>(key, value);
    return true;
  }

  // remove
  remove(key: any) {
    if (this.hasKey(key)) {
      delete this.map[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  // hasKey
  hasKey(key: any) {
    return this.map[this.toStrFn(key)] != null;
  }

  // get
  get(key: any) {
    const vp = this.map[this.toStrFn(key)];
    return vp == null ? undefined : vp.value; // 有值返回值，没值返回 undefined
  }

  // clear
  clear() {
    this.map = {};
  }

  // size
  size() {
    return Object.keys(this.map).length;
  }

  // isEmpty
  isEmpty() {
    return this.size() === 0;
  }

  // keys
  keys() {
    return this.keyValues().map((item) => item.key);
  }

  // values
  values() {
    return this.keyValues().map((item) => item.value);
  }

  // keyValues
  keyValues() {
    return Object.values(this.map);
  }

  // forEach
  forEach(cb: ForEachCallback) {
    const vps = this.keyValues();
    for (let i = 0; i < vps.length; i++) {
      const ret = cb(vps[i].key, vps[i].value);
      if (ret === false) break;
    }
  }
}
