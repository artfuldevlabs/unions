import { generic2, has, recursive, union } from "../src";

const Tree = union("Tree")(
  recursive((Tree) =>
    generic2((B, A) => ({
      Empty: has(),
      Both: has(Tree, Tree),
      Left: has(Tree, B),
      Right: has(A, Tree),
    }))
  )
);
const empty = Tree.Empty<string, number>();
const left = Tree.Left(empty, "42");
const right = Tree.Right(42, empty);
const both = Tree.Both(left, right);
