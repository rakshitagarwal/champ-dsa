export type JsNoteExample = {
  title: string;
  code: string;
  explanation: string;
};

export type JsNotePracticeLink = {
  title: string;
  url: string;
};

export type JsNoteTopic = {
  slug: string;
  order: number;
  title: string;
  summary: string;
  category: string;
  content: {
    simple: string;
    deepDive: string[];
    teachBack: string[];
    examples: JsNoteExample[];
    practiceLinks?: JsNotePracticeLink[];
  };
};
