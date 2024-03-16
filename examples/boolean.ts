import { args, union } from "../src";

const Boolean = union("Boolean")({
  False: args(),
  True: args(),
});
const _false = Boolean.False();
const _true = Boolean.True();
