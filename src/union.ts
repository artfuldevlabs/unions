import { Fun } from "./helpers";
import { $Self } from "./self";
import { Variant } from "./variant";

export type Union<
  Type extends string,
  Variants extends Record<string, Fun<any[], $Self>>,
> = {
  [Tag in keyof Variants]: Tag extends string ? Variant<
    Type,
    Tag,
    Parameters<Variants[Tag]>
  > : never;
}[keyof Variants];

export type Constructors<
  Type extends string,
  Variants extends Record<string, Fun<any[], $Self>>
> = {
  [Tag in keyof Variants]: (
    ...args: Parameters<Variants[Tag]>
  ) => Union<Type, Variants>;
};

export const union = <
  Type extends string,
  Variants extends Record<string, Fun<any[], $Self>>,
>(
  type: Type,
  variants: Variants,
): Constructors<Type, Variants> =>
  Object.keys(variants).reduce(
    (constructors, tag) => ({
      ...constructors,
      [tag]: (...args: any[]) => ({
        type,
        tag,
        args,
      }),
    }),
    {} as any,
  );
