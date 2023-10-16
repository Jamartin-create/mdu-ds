export class BaseClass {
  toString(): string {
    let ret = "{";
    for (const [key, value] of Object.entries(this)) {
      ret += `${key}: ${value}`;
    }
    ret += "}";
    return ret;
  }
}
