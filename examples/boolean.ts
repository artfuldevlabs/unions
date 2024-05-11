import { has, union } from "../src";

const Boolean = union("Boolean")({
  False: has(),
  True: has(),
});
const _false = Boolean.False();
const _true = Boolean.True();
