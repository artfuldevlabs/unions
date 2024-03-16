import { FixA, ASpec } from "./generic";
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

export const recursive: {
  <S extends Spec>(f: Fun<[typeof Self], ASpec<S>>): RecursiveASpec<S>;
  <S extends Spec>(f: Fun<[typeof Self], SimpleSpec<S>>): RecursiveSpec<S>;
} = (f) => undefined as any;

type RSpec<S extends Spec, N extends string> = {
  [K in keyof S]: K extends string
    ? Replace<S[K], typeof Self, Union<N, S>>
    : never;
};

type RFixA<S extends Spec, N extends string, A> = {
  [K in keyof S]: K extends string
    ? Replace<FixA<S, A>[K], typeof Self, Union<N, FixA<S, A>>>
    : never;
};

type Recursive<N extends string, S extends Spec> = {
  [K in keyof S]: Fun<RSpec<S, N>[K], Union<N, S>>;
};

type RecursiveA<N extends string, S extends Spec> = {
  [K in keyof S]: <A>(...args: RFixA<S, N, A>[K]) => Union<N, FixA<S, A>>;
};

export interface RecursiveConstructors<N extends string> {
  <S extends Spec>(recursive: RecursiveSpec<S>): Recursive<N, S>;
  <S extends Spec>(recursiveA: RecursiveASpec<S>): RecursiveA<N, S>;
}
