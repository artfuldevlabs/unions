import { Tagged } from "./tagged";

export type Named<Name extends string, Data extends Tagged<any, any>> = {
  name: Name;
} & Data;
