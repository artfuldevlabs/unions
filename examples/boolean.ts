import { UnionOf, of, union } from "../src";

const Boolean = union("Boolean", {
  False: of<[]>(),
  True: of<[]>(),
});
type Boolean = UnionOf<typeof Boolean>;
const _false = Boolean.False();
const _true = Boolean.True();

