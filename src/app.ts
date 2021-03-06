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
    if (!result) {
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
  // ?????????????????? ???????????? true
  return findIndex(iterable, predicator) !== -1;
}

function every<T>(iterable: Iterable<T>, predicator: (value: T) => unknown) {
  // ??????????????? ????????? ???????????? ????????? true
  return findIndex(iterable, negate(predicator)) === -1;
}

function min(numbers: number[]) {
  return reduce(numbers, (previousValue, currentValue) =>
    previousValue < currentValue ? previousValue : currentValue
  );
}

function max(numbers: number[]) {
  return reduce(numbers, (previousValue, currentValue) =>
    previousValue < currentValue ? currentValue : previousValue
  );
}

function minBy(numbers: number[], manipulator: (value: number) => number) {
  return reduce(numbers, (previousValue, currentValue) =>
    manipulator(previousValue) < manipulator(currentValue)
      ? previousValue
      : currentValue
  );
}

function maxBy(numbers: number[], manipulator: (value: number) => number) {
  return reduce(numbers, (previousValue, currentValue) =>
    manipulator(previousValue) < manipulator(currentValue)
      ? currentValue
      : previousValue
  );
}

function groupBy<T extends Record<string, unknown>, K extends keyof T>(
  iterable: Iterable<T>,
  groupingKeyGenerator: (value: T) => string
) {
  return reduce(
    iterable,
    (previousValue, currentValue) => {
      const groupingKey = groupingKeyGenerator(currentValue) as string;
      if (previousValue[groupingKey]) {
        previousValue[groupingKey].push(currentValue);
      } else {
        previousValue[groupingKey] = [currentValue];
      }
      return previousValue;
    },
    {} as Record<string, T[]>
  );
}

function countBy<T extends Record<string, unknown>, K extends keyof T>(
  iterable: Iterable<T>,
  countingKeyGenerator: (value: T) => string
) {
  return reduce(
    iterable,
    (previousValue, currentValue) => {
      const countingKey = countingKeyGenerator(currentValue) as string;
      if (previousValue[countingKey]) {
        previousValue[countingKey]++;
      } else {
        previousValue[countingKey] = 1;
      }

      return previousValue;
    },
    {} as Record<string, number>
  );
}
