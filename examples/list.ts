import { generic, recursive, union, of, has } from "../src";

const List = union("List")(
  recursive((La) =>
    generic((a) => ({
      Empty: has(),
      Cons: has(a, La),
    }))
  )
);
const empty = List.Empty<number>();
const singleton = List.Cons(42, empty);
