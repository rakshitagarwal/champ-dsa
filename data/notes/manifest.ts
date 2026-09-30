import type { NoteDocumentMeta } from "@/types/notes";

/**
 * Flat catalog — one sidebar item per markdown file in `content/notes/{slug}.md`.
 * Add a row here and drop the `.md` file to publish a new notes page.
 */
export const NOTE_CATALOG: NoteDocumentMeta[] = [
  {
    slug: "javascript",
    title: "JavaScript",
    description: "Interview revision — types, closures, event loop, promises, and more.",
  },
  {
    slug: "typescript",
    title: "TypeScript",
    description:
      "Types, narrowing, generics, utilities, strict tsconfig, and runtime validation at the edges.",
  },
  {
    slug: "react",
    title: "React js",
    description:
      "Interview revision — Virtual DOM, hooks, state, reconciliation, and patterns.",
  },
  {
    slug: "next",
    title: "Next js",
    description:
      "Interview revision — App Router, RSC, data fetching, caching, SSR/SSG, and deployment.",
  },
  {
    slug: "node",
    title: "Node js",
    description:
      "Interview revision — event loop, streams, modules, Express, and the Node runtime.",
  },
  {
    slug: "python",
    title: "Python & FastAPI",
    description:
      "Python for JS developers — syntax mapping, must-know concepts, and FastAPI APIs with examples.",
  },
  {
    slug: "sql",
    title: "SQL & DBMS",
    description:
      "Interview revision — SQL queries, joins, indexes, transactions, normalization, and DBMS FAQs.",
  },
  {
    slug: "databases",
    title: "Databases",
    description:
      "MongoDB, MySQL, and PostgreSQL — frequently asked interview questions in one place.",
  },
  {
    slug: "angular",
    title: "Angular JS",
    description:
      "Interview revision — components, DI, RxJS, forms, change detection, routing, and Angular vs React.",
  },
  {
    slug: "html-css",
    title: "HTML & CSS",
    description:
      "Interview revision — HTML5 semantics, layout, Flexbox, Grid, and responsive CSS.",
  },
  {
    slug: "performance",
    title: "Performance optimization",
    description:
      "Senior revision — Core Web Vitals, profiling, Node/DB bottlenecks, and production checklists.",
  },
  {
    slug: "web-optimisation",
    title: "Web Optimisation",
    description:
      "Web-focused revision — CRP, Core Web Vitals, bundling, images, fonts, caching, CDN, and RUM.",
  },
  {
    slug: "devops",
    title: "DevOps",
    description:
      "Interview revision — CI/CD, Docker, Kubernetes, IaC, cloud, observability, and DORA metrics.",
  },
  {
    slug: "aws",
    title: "AWS",
    description:
      "Full-stack interview revision — EC2, S3, RDS, IAM, VPC, Lambda, ALB, CloudWatch, and deploy stories.",
  },
  {
    slug: "advanced-topics",
    title: "Docker, CI/CD & production",
    description:
      "Containers, pipelines, Kubernetes vocabulary, deploys, auth, observability, and how seniors ship.",
  },
  {
    slug: "ai-ml",
    title: "AI & ML for engineers",
    description:
      "Product-engineer depth — LLMs, embeddings, RAG, integrations, and interview talking points.",
  },
];
