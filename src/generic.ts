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

export const B = Symbol("B");

export type BASpec<S extends Spec> = [
  "generic",
  [Fun<[typeof B, typeof A], SimpleSpec<S>>]
];

export type FixBA<S extends Spec, B, A> = {
  [K in keyof S]: K extends string
    ? Replace<FixA<S, A>[K], typeof B, B>
    : never;
};

export const generic = <S extends Spec>(
  spec: (a: typeof A) => SimpleSpec<S>
): ASpec<S> => undefined as any;

export const generic2 = <S extends Spec>(
  spec: (b: typeof B, a: typeof A) => SimpleSpec<S>
): BASpec<S> => undefined as any;

type GenericA<N extends string, S extends Spec> = {
  [K in keyof S]: <A>(...args: FixA<S, A>[K]) => Union<N, FixA<S, A>>;
};

type GenericBA<N extends string, S extends Spec> = {
  [K in keyof S]: <B, A>(
    ...args: FixBA<S, B, A>[K]
  ) => Union<N, FixBA<S, B, A>>;
};

export interface GenericConstructors<N extends string> {
  <S extends Spec>(generic: ASpec<S>): GenericA<N, S>;
  <S extends Spec>(generic: BASpec<S>): GenericBA<N, S>;
}
