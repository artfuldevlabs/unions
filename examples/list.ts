import { generic, recursive, union, of } from "../src";

const List = union("List")(
  recursive((ListA) =>
    generic((A) => ({
      Empty: of<[]>(),
      Cons: of<[head: typeof A, tail: typeof ListA]>(),
    }))
  )
);
const empty = List.Empty<number>();
const singleton = List.Cons(42, empty);
