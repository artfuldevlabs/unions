import { generic2, has, union } from "../src";

const Either = union("Either")(
  generic2((B, A) => ({
    Left: has(A),
    Right: has(B),
  }))
);
const left = Either.Left("1");
const right = Either.Right(42);
