import { Fun } from "./helpers";
import { Of, Spec } from "./spec";
import { Union } from "./union.type";

export type SimpleSpec<S extends Spec> = {
  [K in keyof S]: K extends string ? Of<S[K]> : never;
};

type Simple<N extends string, S extends Spec> = {
  [K in keyof S]: Fun<S[K], Union<N, S>>;
};

export interface SimpleConstructors<N extends string> {
  <S extends Spec>(spec: SimpleSpec<S>): Simple<N, S>;
}
