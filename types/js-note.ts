export type JsNoteExample = {
  title: string;
  code: string;
  explanation: string;
};

export type JsNotePracticeLink = {
  title: string;
  url: string;
};

/** Structured section (javascript.info-style lesson blocks). */
export type JsNoteSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type JsNoteTopic = {
  slug: string;
  order: number;
  title: string;
  summary: string;
  category: string;
  content: {
    /** Long-form intro before the quick summary. */
    overview?: string;
    simple: string;
    /** Named sections with multiple paragraphs each. */
    sections?: JsNoteSection[];
    deepDive: string[];
    teachBack: string[];
    examples: JsNoteExample[];
    practiceLinks?: JsNotePracticeLink[];
    /** Optional link to javascript.info or MDN for further reading. */
    furtherReading?: { title: string; url: string }[];
  };
};
