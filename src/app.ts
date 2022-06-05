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
