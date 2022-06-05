const users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 },
];

function filter<T>(
  iterable: Iterable<T>,
  predicator: (value: T) => unknown
): T[] {
  const result: T[] = [];
  each(iterable, (value) => {
    if (predicator(value)) {
      result.push(value);
    }
  });
  return result;
}

function map<T, U>(iterable: Iterable<T>, modifier: (value: T) => U): U[] {
  const result: U[] = [];
  each(iterable, (value) => {
    result.push(modifier(value));
  });
  return result;
}

export function each<T>(
  iterable: Iterable<T>,
  iteratee: (value: T) => unknown
) {
  for (const value of iterable) {
    iteratee(value);
  }
}

function reduce<T>(
  iterable: Iterable<T>,
  reducer: (previousValue: T, currentValue: T) => T
): T;
function reduce<T>(
  iterable: Iterable<T>,
  reducer: (previousValue: T, currentValue: T) => T,
  initialValue: T
): T;
function reduce<T, U>(
  iterable: Iterable<T>,
  reducer: (previousValue: U, currentValue: T) => U,
  initialValue: U
): U;

function reduce<T, U>(
  iterable: Iterable<T>,
  reducer: (previousValue: T | U, currentValue: T) => T | U,
  initialValue?: unknown
) {
  let result = initialValue;

  each(iterable, (currentValue) => {
    if (!initialValue) {
      result = currentValue;
    } else {
      result = reducer(result as T | U, currentValue);
    }
  });
  return result;
}

function rest<T>(iterable: Iterable<T>, start?: number, end?: number) {
  return Array.prototype.slice.call(iterable, start, end);
}

function pipe<T>(...fns: Function[]) {
  return function (...arg: T[]) {
    return reduce(
      fns,
      (args, fn) => (args instanceof Array ? fn(...args) : fn(args)),
      arg
    );
  };
}

function pluck<T extends Record<string, unknown>, K extends keyof T>(
  iterable: Iterable<T>,
  key: K
) {
  return map(iterable, (item) => item[key]);
}

function negate<T>(func: Function) {
  return function (value: T) {
    return !func(value);
  };
}

function identity<T>(value: T) {
  return value;
}

function reject<T>(iterable: Iterable<T>, predicator: (item: T) => unknown) {
  return filter(iterable, negate(predicator));
}

function compact<T>(iterable: Iterable<T>) {
  return filter(iterable, identity);
}

function find<T>(iterable: Iterable<T>, predicator: (value: T) => unknown) {
  for (const item of iterable) {
    if (predicator(item)) {
      return item;
    }
  }
  return undefined;
}

function findIndex<T>(
  iterable: Iterable<T>,
  predicator: (value: T) => unknown
) {
  let index = 0;
  for (const item of iterable) {
    if (predicator(item)) {
      return index;
    }
    index++;
  }
  return -1;
}

function some<T>(iterable: Iterable<T>, predicator: (value: T) => unknown) {
  // 만족시키는게 존재하면 true
  return findIndex(iterable, predicator) !== -1;
}

function every<T>(iterable: Iterable<T>, predicator: (value: T) => unknown) {
  // 만족시키지 않는게 존재하지 않으면 true
  return findIndex(iterable, negate(predicator)) === -1;
}
