import { generic2, has, union } from "../src";

const Either = union("Either")(
  generic2((B, A) => ({
    Left: has(A),
    Right: has(B),
  }))
);
const left = Either.Left<number, string>("1");
const right = Either.Right<number, string>(42);
