import { Tagged } from "./tagged";
import { Named } from "./named";
import { Spec } from "./spec";

type Blueprint<S extends Spec> = {
  [K in keyof S]: K extends string ? Tagged<K, S[K]> : never;
};

type NamedBlueprint<N extends string, S extends Spec> = {
  [K in keyof S]: K extends string ? Named<N, Blueprint<S>[K]> : never;
};

export type Union<N extends string, S extends Spec> = NamedBlueprint<
  N,
  S
>[keyof S];
