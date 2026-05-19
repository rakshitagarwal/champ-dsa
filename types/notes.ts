export type NoteDocumentMeta = {
  slug: string;
  title: string;
  description?: string;
};

export type NoteDocument = NoteDocumentMeta & {
  markdown: string;
};
