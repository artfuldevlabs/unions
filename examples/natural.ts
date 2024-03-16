import { has, recursive, union } from "../src";

const Natural = union("Natural")(
  recursive((N) => ({
    One: has(),
    Incr: has(N),
  }))
);
const _one = Natural.One();
const _three = Natural.Incr(Natural.Incr(Natural.One()));
