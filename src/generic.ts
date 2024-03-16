import { Replace } from "./helpers";
import { Constructors, Union } from "./union";
import { Recursive } from "./recursive";

export const A = Symbol("A");
type $A = typeof A;

type Fix<U extends Union<any, any>, A> = {
  [K in keyof U]: K extends string
    ? {
        [L in keyof U[K]]: Replace<U[K][L], $A, A>;
      }
    : never;
}[keyof U];

export type Generic<C extends Constructors<any, any>> = {
  [K in keyof C]: <A = any>(
    ...args: Replace<
      Replace<Parameters<C[K]>, $A, A>,
      ReturnType<C[K]>,
      Fix<ReturnType<C[K]>, A>
    >
  ) => Fix<ReturnType<C[K]>, A>;
};

export const generic = <C extends Constructors<any, any> | Recursive<any>>(
  union: C,
): Generic<C> => union as any;

export const B = Symbol("B");
type $B = typeof B;

type Fix2<U extends Union<any, any>, B, A> = {
  [K in keyof U]: K extends string
    ? {
        [L in keyof U[K]]: Replace<Replace<U[K][L], $B, B>, $A, A>;
      }
    : never;
}[keyof U];

export type Generic2<C extends Constructors<any, any> | Recursive<any>> = {
  [K in keyof C]: <B = any, A = any>(
    ...args: Replace<
      Replace<Replace<Parameters<C[K]>, $A, A>, $B, B>,
      ReturnType<C[K]>,
      Fix2<ReturnType<C[K]>, B, A>
    >
  ) => Fix2<ReturnType<C[K]>, B, A>;
};

export const generic2 = <C extends Constructors<any, any>>(
  union: C,
): Generic2<C> => union as any;
