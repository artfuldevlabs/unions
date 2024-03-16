import { Tagged } from "./tagged";

export type Variant<
  Type extends string,
  Tag extends string,
  Args extends any[],
> = {
  type: Type;
} & Tagged<Tag, Args>;
