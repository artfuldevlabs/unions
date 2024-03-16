import { Self } from "./self";

export const of =
  <Args extends any[]>() =>
  (...args: Args): typeof Self => Self;
