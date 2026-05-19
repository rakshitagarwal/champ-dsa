export type NotePageMeta = {
  slug: string;
  title: string;
  description?: string;
};

export type NoteSection = {
  id: string;
  title: string;
  pages: NotePageMeta[];
};

export type NotePage = NotePageMeta & {
  sectionId: string;
  sectionTitle: string;
  markdown: string;
};
