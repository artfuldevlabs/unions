import { Fun, Replace } from "./helpers";
import { SimpleSpec } from "./simple";
import { Spec } from "./spec";
import { Union } from "./union.type";

export const A = Symbol("A");

export type ASpec<S extends Spec> = [
  "generic",
  [Fun<[typeof A], SimpleSpec<S>>]
];

export type FixA<S extends Spec, A> = {
  [K in keyof S]: K extends string ? Replace<S[K], typeof A, A> : never;
};

export const generic = <S extends Spec>(
  spec: (a: typeof A) => SimpleSpec<S>
): ASpec<S> => ["generic", [spec]];

type Generic<N extends string, S extends Spec> = {
  [K in keyof S]: <A>(...args: FixA<S, A>[K]) => Union<N, FixA<S, A>>;
};

export interface GenericConstructors<N extends string> {
  <S extends Spec>(generic: ASpec<S>): Generic<N, S>;
}
