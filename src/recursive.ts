import { A } from "./a";
import { B } from "./b";
import { ASpec, BASpec } from "./generic";
import { Fun, Replace } from "./helpers";
import { SimpleSpec } from "./simple";
import { Self, Spec } from "./spec";
import { Union } from "./union.type";

type RecursiveSpec<S extends Spec> = [
  "recursive",
  [Fun<[typeof Self], SimpleSpec<S>>]
];

type RecursiveASpec<S extends Spec> = [
  "recursive",
  [Fun<[typeof Self], ASpec<S>>]
];

type RecursiveBASpec<S extends Spec> = [
  "recursive",
  [Fun<[typeof Self], BASpec<S>>]
];

export const recursive: {
  <S extends Spec>(f: Fun<[typeof Self], ASpec<S>>): RecursiveASpec<S>;
  <S extends Spec>(f: Fun<[typeof Self], BASpec<S>>): RecursiveBASpec<S>;
  <S extends Spec>(f: Fun<[typeof Self], SimpleSpec<S>>): RecursiveSpec<S>;
} = (f) => undefined as any;

type RSpec<S extends Spec, N extends string> = {
  [K in keyof S]: K extends string
    ? Replace<S[K], typeof Self, Union<N, S>>
    : never;
};

type Recursive<N extends string, S extends Spec> = {
  [K in keyof S]: Fun<RSpec<S, N>[K], Union<N, S>>;
};

type RecursiveA<N extends string, S extends Spec> = {
  [K in keyof S]: <A>(...args: Replace<Replace<S[K], typeof A, A>, typeof Self, Union<N, {
    [K in keyof S]: K extends string ? Replace<S[K], typeof A, A> : never;
  }>>) => Union<N, {
    [K in keyof S]: K extends string ? Replace<S[K], typeof A, A> : never;
  }>;
};

type RecursiveBA<N extends string, S extends Spec> = {
  [K in keyof S]: <B, A>(
    ...args: Replace<Replace<Replace<S[K], typeof A, A>, typeof B, B>, typeof Self, Union<N, {
      [K in keyof S]: K extends string
        ? Replace<Replace<S[K], typeof A, A>, typeof B, B>
        : never;
    }>>
  ) => Union<N, {
    [K in keyof S]: K extends string
      ? Replace<Replace<S[K], typeof A, A>, typeof B, B>
      : never;
  }>;
};

export interface RecursiveConstructors<N extends string> {
  <S extends Spec>(recursive: RecursiveSpec<S>): Recursive<N, S>;
  <S extends Spec>(recursiveA: RecursiveASpec<S>): RecursiveA<N, S>;
  <S extends Spec>(recursiveBA: RecursiveBASpec<S>): RecursiveBA<N, S>;
}
