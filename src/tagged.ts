export type Tagged<Tag extends string, Args extends any[] = []> = {
  tag: Tag;
  args: Args;
};

export const tagged =
  <Args extends any[] = []>(...args: Args) =>
  <Tag extends string>(tag: Tag): Tagged<Tag, Args> => ({
    tag,
    args,
  });

export type TagConstructor<Args extends any[], Tag extends string> = (
  ...args: Args
) => Tagged<Tag, Args>;

export const tag =
  <Args extends any[] = []>() =>
  <Tag extends string>(tag: Tag): TagConstructor<Args, Tag> =>
  (...args) =>
    tagged(...args)(tag);
