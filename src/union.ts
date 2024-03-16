import { SimpleConstructors } from "./simple";
import { GenericConstructors } from "./generic";
import { RecursiveConstructors } from "./recursive";

interface UnionConstructors<N extends string>
  extends SimpleConstructors<N>,
    GenericConstructors<N>,
    RecursiveConstructors<N> {}

export const union =
  <N extends string>(name: N): UnionConstructors<N> =>
  (s) =>
    undefined as any;
