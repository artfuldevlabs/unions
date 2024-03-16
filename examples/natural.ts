import { $Self, recursive, of, union } from "../src";

const Natural = recursive(union("Natural", {
  One: of<[]>(),
  Incr: of<[n: $Self]>(),
}));
const _one = Natural.One();
const _three = Natural.Incr(Natural.Incr(Natural.One()));
