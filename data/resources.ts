export type Resource = {
  id: string;
  topic: string;
  description: string;
  url: string;
  category: string;
};

export const RESOURCES: Resource[] = [
  {
    id: "javascript",
    topic: "JavaScript",
    description: "The Modern JavaScript Tutorial — from basics to advanced topics.",
    url: "https://javascript.info/",
    category: "Language",
  },
  {
    id: "typescript",
    topic: "TypeScript",
    description: "Official TypeScript handbook and documentation.",
    url: "https://www.typescriptlang.org/docs/",
    category: "Language",
  },
  {
    id: "python",
    topic: "Python",
    description: "Official Python tutorial for beginners and experienced devs.",
    url: "https://docs.python.org/3/tutorial/",
    category: "Language",
  },
  {
    id: "html",
    topic: "HTML",
    description: "MDN Web Docs — comprehensive HTML reference and guides.",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    category: "Frontend",
  },
  {
    id: "css",
    topic: "CSS",
    description: "MDN Web Docs — complete CSS reference and tutorials.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    category: "Frontend",
  },
  {
    id: "react",
    topic: "React",
    description: "Official React documentation with interactive tutorials.",
    url: "https://react.dev/",
    category: "Frontend",
  },
  {
    id: "frontend",
    topic: "Frontend (general)",
    description: "Frontend roadmap — structured learning path for frontend development.",
    url: "https://roadmap.sh/frontend",
    category: "Frontend",
  },
  {
    id: "node",
    topic: "Node.js",
    description: "Official Node.js guides and learning resources.",
    url: "https://nodejs.org/en/learn",
    category: "Backend",
  },
  {
    id: "backend",
    topic: "Backend (general)",
    description: "Backend roadmap — structured learning path for backend development.",
    url: "https://roadmap.sh/backend",
    category: "Backend",
  },
  {
    id: "sql",
    topic: "SQL",
    description: "PostgreSQL tutorial — practical SQL from basics to advanced queries.",
    url: "https://www.postgresqltutorial.com/",
    category: "Backend",
  },
  {
    id: "microservices",
    topic: "Microservices",
    description: "Microservices.io — patterns, examples, and architecture guides.",
    url: "https://microservices.io/",
    category: "Backend",
  },
  {
    id: "dsa",
    topic: "DSA",
    description: "Hello Interview — visual explanations of algorithms and data structures.",
    url: "https://www.hellointerview.com/learn/code/algorithms",
    category: "Computer Science",
  },
  {
    id: "system-design-hld",
    topic: "System Design (HLD)",
    description: "Hello Interview — high-level system design fundamentals and case studies.",
    url: "https://www.hellointerview.com/learn/system-design",
    category: "Computer Science",
  },
  {
    id: "ai-engineering",
    topic: "AI for developers",
    description: "OpenAI documentation — APIs, embeddings, and integration patterns.",
    url: "https://platform.openai.com/docs",
    category: "Computer Science",
  },
  {
    id: "huggingface",
    topic: "ML foundations",
    description: "Hugging Face course — transformers and NLP basics for engineers.",
    url: "https://huggingface.co/learn",
    category: "Computer Science",
  },
  {
    id: "docker",
    topic: "Docker / DevOps",
    description: "Official Docker documentation — containers, images, and deployments.",
    url: "https://docs.docker.com/",
    category: "DevOps",
  },
  {
    id: "git",
    topic: "Git",
    description: "Official Git documentation — reference, tutorials, and workflows.",
    url: "https://git-scm.com/doc",
    category: "DevOps",
  },
];
