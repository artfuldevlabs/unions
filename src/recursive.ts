import { Replace } from "./helpers";
import { Self } from "./self";
import { Constructors } from "./union";

export type Recursive<C extends Constructors<any, any>> = {
  [K in keyof C]: K extends string
    ? (
        ...args: Replace<Parameters<C[K]>, typeof Self, ReturnType<C[K]>>
      ) => ReturnType<C[K]>
    : never;
};

export const recursive = <C extends Constructors<any, any>>(
  constructors: C,
): Recursive<C> => constructors as any;
