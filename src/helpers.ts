export type Fun<A extends any[], B> = (...args: A) => B;

export type Extends<A, B> = A extends B ? true : false;

export type If<P extends boolean, T, F = never> = P extends true ? T : F;

export type And<A extends boolean, B extends boolean> = If<A, B, false>;

export type Equals<A, B> = And<Extends<A, B>, Extends<B, A>>;

export type Coerce<T, A, B> = If<Equals<T, A>, B, T>;

export type CoerceAll<O, AB> = AB extends [[infer A, infer B], ...infer Tail]
  ? CoerceAll<Coerce<O, A, B>, Tail>
  : O;

export type Replace<O, A, B> = {
  [K in keyof O]: Coerce<O[K], A, B>;
};

export type ReplaceAll<O, AB> = {
  [K in keyof O]: CoerceAll<O[K], AB>;
};
