import articleBodies from "@/data/js-notes/article-bodies.json";

export type JsArticleBody = {
  html: string;
  sourceUrls: string[];
  fetchedAt: string;
};

const bodies = articleBodies as Record<string, JsArticleBody>;

export function getJsArticleBody(slug: string): JsArticleBody | undefined {
  return bodies[slug];
}
