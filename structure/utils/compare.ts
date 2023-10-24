export const COMPARE = {
  EQUAL: 0,
  LESS_THAN: -1,
  BIGR_THAN: 1,
};

export const NOT_EXIT = -1;

export type CompareFn<T> = (a: T, b: T) => number;

export function defaultCompare<T>(a: T, b: T) {
  if (a === b) return 0;
  if (a < b) return -1;
  return 1;
}

export function defaultIsEqual<T>(a: T, b: T) {
  return a === b;
}
