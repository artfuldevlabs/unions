import { $A, $B, generic2, of, union } from "../src";

const Either = generic2(union("Boolean", {
  Left: of<[a: $A]>(),
  Right: of<[b: $B]>(),
}));
const left = Either.Left<any, string>("1");
const right = Either.Right(42);
