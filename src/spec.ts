export const Self = Symbol("Self");

export type Of<Args extends any[]> = (...args: Args) => typeof Self;

export const of =
  <Args extends any[]>(): Of<Args> =>
  () =>
    Self;

export const has =
  <Args extends any[]>(...args: Args): Of<Args> =>
  () =>
    Self;

export const args =
  <Args extends any[] = []>(f: (...args: Args) => void = () => {}): Of<Args> =>
  () =>
    Self;

export type Spec = Record<string, any[]>;
