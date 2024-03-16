import { Fun } from "./helpers";
import { Self } from "./self";
import { Variant } from "./variant";

type $Self = typeof Self;

export type Union<
  Type extends string,
  Variants extends Record<string, Fun<any[], $Self>>
> = {
  [Tag in keyof Variants]: Tag extends string
    ? Variant<Type, Tag, Parameters<Variants[Tag]>>
    : never;
}[keyof Variants];

export type UnionOf<C extends Constructors<any, any>> = C extends Constructors<
  infer Type,
  infer Variants
>
  ? Union<Type, Variants>
  : never;

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
  Variants extends Record<string, Fun<any[], $Self>>
>(
  type: Type,
  variants: Variants
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
    {} as any
  );
