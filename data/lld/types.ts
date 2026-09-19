export type LldGroupId = "intro" | "fundamentals" | "principles" | "creational" | "structural" | "behavioral" | "design" | "questions";

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
