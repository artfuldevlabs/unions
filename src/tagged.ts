export type Tagged<Tag extends string, Args extends any[] = []> = {
  tag: Tag;
  args: Args;
};
