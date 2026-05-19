import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      { source: "/bank", destination: "/patterns", permanent: false },
      { source: "/learn", destination: "/patterns", permanent: false },
      { source: "/learn/roadmap", destination: "/roadmap", permanent: false },
      {
        source: "/learn/patterns/:slug",
        destination: "/patterns/:slug",
        permanent: false,
      },
      { source: "/bank/bosscoder", destination: "/practice", permanent: false },
      {
        source: "/bank/patterns/:slug/concept",
        destination: "/patterns/:slug",
        permanent: false,
      },
      {
        source: "/bank/patterns/:slug/practice",
        destination: "/practice",
        permanent: false,
      },
      {
        source: "/bank/:patternSlug/:questionId",
        destination: "/practice/:questionId/notes",
        permanent: false,
      },
      {
        source: "/notes/:section/:page",
        destination: "/notes/javascript",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
