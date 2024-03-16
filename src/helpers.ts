export type Fun<A extends any[], B> = (...args: A) => B;

export type Extends<A, B> = A extends B ? true : false;

export type If<P extends boolean, T, F = never> = P extends true ? T : F;

export type And<A extends boolean, B extends boolean> = If<A, B, false>;

export type Equals<A, B> = And<Extends<A, B>, Extends<B, A>>;

export type Replace<O, A, B> = {
  [K in keyof O]: If<Equals<O[K], A>, B, O[K]>;
};
