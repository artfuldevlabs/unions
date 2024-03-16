import { $A, generic, of, union } from "../src";

const Option = generic(union("Boolean", {
  None: of<[]>(),
  Some: of<[a: $A]>(),
}));
const none = Option.None();
const some = Option.Some(42);
