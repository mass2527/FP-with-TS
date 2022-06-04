interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinate(coordinate: string): Coordinate;
function parseCoordinate(coordinate: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coordinate = { x: 0, y: 0 };
  if (typeof arg1 === "string") {
    arg1
      .replace(/\s/g, "")
      .split(",")
      .forEach((str) => {
        const [key, value] = str.split(":");
        coordinate[key as "x" | "y"] = Number(value);
      });
  } else if (typeof arg1 === "object") {
    coordinate = { ...(arg1 as Coordinate) };
  } else {
    coordinate = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coordinate;
}

console.log(parseCoordinate("x:1,     y:2"));
