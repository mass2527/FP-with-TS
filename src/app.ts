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

function filter<T>(iterable: T[], predicator: (value: T) => unknown): T[] {
  const result = [];
  for (let i = 0; i < iterable.length; i++) {
    if (predicator(iterable[i])) {
      result.push(iterable[i]);
    }
  }
  return result;
}

function map<T, U>(iterable: T[], modifier: (value: T) => U): U[] {
  const result = [];
  for (let i = 0; i < iterable.length; i++) {
    result.push(modifier(iterable[i]));
  }
  return result;
}

// a. 30세 이상인 users를 거른다.
// b. 30세 이상인 users의 names를 수집한다.
console.log(
  map(
    filter(users, (user) => user.age >= 30),
    (user) => user.name
  )
);
// c. 30세 미만인 users를 거른다.
// d. 30세 미만인 users의 ages를 수집한다.
console.log(
  map(
    filter(users, (user) => user.age < 30),
    (user) => user.age
  )
);
