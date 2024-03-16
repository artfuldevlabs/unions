import { of, union } from "../src";

const Boolean = union("Boolean", {
  False: of<[]>(),
  True: of<[]>(),
});
const _false = Boolean.False();
const _true = Boolean.True();
