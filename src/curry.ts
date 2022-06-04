function curry<T, U>(fn: (a: T, b: U) => unknown) {
  return function (a: T) {
    return function (b: U) {
      return fn(a, b);
    };
  };
}

function curryRight<T, U>(fn: (a: U, b: T) => unknown) {
  return function (a: T) {
    return function (b: U) {
      return fn(b, a);
    };
  };
}

function add(a: number, b: number) {
  return a + b;
}

console.log(curry(add)(2)(8)); // 10

const add10 = curry(add)(10);
console.log(add10(5)); // 15

function minus(a: number, b: number) {
  return a - b;
}

const minus10 = curryRight(minus)(10);
console.log(minus10(5));

function getValue<U extends Record<string, unknown>, K extends keyof U>(
  object: U,
  key: K
) {
  return object ? object[key] : undefined;
}

const user = { name: "lynn", age: 20 };

console.log(getValue(user, "name"));
console.log(getValue(user, "age"));

const getName = curryRight(getValue)("name");
console.log(getName(user));

const getFromUser = curry(getValue)(user);
console.log(getFromUser("age"));
