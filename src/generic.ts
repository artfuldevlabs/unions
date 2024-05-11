import { A } from "./a";
import { B } from "./b";
import { Fun, Replace } from "./helpers";
import { SimpleSpec } from "./simple";
import { Spec } from "./spec";
import { Union } from "./union.type";

export type ASpec<S extends Spec> = [
  "generic",
  [Fun<[typeof A], SimpleSpec<S>>]
];

export type BASpec<S extends Spec> = [
  "generic",
  [Fun<[typeof B, typeof A], SimpleSpec<S>>]
];

export const generic = <S extends Spec>(
  spec: (a: typeof A) => SimpleSpec<S>
): ASpec<S> => undefined as any;

export const generic2 = <S extends Spec>(
  spec: (b: typeof B, a: typeof A) => SimpleSpec<S>
): BASpec<S> => undefined as any;

type GenericA<N extends string, S extends Spec> = {
  [K in keyof S]: <A>(...args: Replace<S[K], typeof A, A>) => Union<N, {
    [K in keyof S]: K extends string ? Replace<S[K], typeof A, A> : never;
  }>;
};

type GenericBA<N extends string, S extends Spec> = {
  [K in keyof S]: <B, A>(
    ...args: Replace<Replace<S[K], typeof A, A>, typeof B, B>
  ) => Union<N, {
    [K in keyof S]: K extends string
      ? Replace<Replace<S[K], typeof A, A>, typeof B, B>
      : never;
  }>;
};

export interface GenericConstructors<N extends string> {
  <S extends Spec>(generic: ASpec<S>): GenericA<N, S>;
  <S extends Spec>(generic: BASpec<S>): GenericBA<N, S>;
}
