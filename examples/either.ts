import { A, B, generic2, of, union } from "../src";

const Either = generic2(union("Either", {
  Left: of<[a: typeof A]>(),
  Right: of<[b: typeof B]>(),
}));
const left = Either.Left<any, string>("1");
const right = Either.Right(42);
