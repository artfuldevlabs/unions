import { generic, recursive, union, has } from "../src";

const List = union("List")(
  recursive((ListA) =>
    generic((A) => ({
      Empty: has(),
      Cons: has(A, ListA),
    }))
  )
);
const empty = List.Empty<number>();
const singleton = List.Cons(42, List.Empty());
