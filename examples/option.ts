import { generic, has, of, union } from "../src";

const Option = union("Option")(
  generic((A) => ({
    None: has(),
    Some: has(A),
  }))
);
const none = Option.None<number>();
const some = Option.Some(42);

const x = [Option.Some(1), Option.Some(42)]
