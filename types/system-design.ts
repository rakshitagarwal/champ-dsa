export type SdGroupId = "intro" | "tech" | "questions";

export type SdDocumentMeta = {
  slug: string;
  title: string;
  description: string;
  group: SdGroupId;
};

export type SdDocument = SdDocumentMeta & {
  markdown: string;
};

export type SdGroup = {
  id: SdGroupId;
  title: string;
};
