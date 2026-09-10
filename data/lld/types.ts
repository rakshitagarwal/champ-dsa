export type LldGroupId = "intro" | "patterns" | "questions";

export type LldGroup = {
  id: LldGroupId;
  title: string;
};

export type LldTopic = {
  slug: string;
  title: string;
  tag: string;
  body: string;
  short?: string;
  group?: LldGroupId;
};
