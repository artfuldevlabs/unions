import { A, generic, recursive, Self, of, union } from "../src";

const List = generic(recursive(union("List", {
  Empty: of<[]>(),
  Cons: of<[a: typeof A, as: typeof Self]>(),
})));
const empty = List.Empty<number>();
const singleton = List.Cons(42, empty);
