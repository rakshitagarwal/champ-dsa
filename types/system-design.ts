export type SdGroupId =
  | "intro"
  | "foundations"
  | "network"
  | "traffic"
  | "data"
  | "caching"
  | "messaging"
  | "distributed"
  | "resilience"
  | "storage"
  | "architecture"
  | "security"
  | "observability"
  | "cloud"
  | "questions";

export type SdDocumentMeta = {
  slug: string;
  title: string;
  description: string;
  group: SdGroupId;
  /** Classic interview set: Bitly, rate limiter, news feed, chat, notifications, Uber, YouTube, Ticketmaster */
  core8?: boolean;
};

export type SdDocument = SdDocumentMeta & {
  markdown: string;
};

export type SdGroup = {
  id: SdGroupId;
  title: string;
};
