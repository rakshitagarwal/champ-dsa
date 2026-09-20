import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/bank", destination: "/patterns", permanent: false },
      { source: "/learn", destination: "/patterns", permanent: false },
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
        destination: "/practice",
        permanent: false,
      },
      {
        source: "/practice/:questionId/notes",
        destination: "/practice",
        permanent: false,
      },
      {
        source: "/practice/:questionId",
        destination: "/practice",
        permanent: false,
      },
      { source: "/resources", destination: "/hld", permanent: false },
      { source: "/dsa-sheet", destination: "/practice", permanent: false },
      { source: "/dsa-sheet/:path*", destination: "/practice", permanent: false },
      { source: "/system-design", destination: "/hld", permanent: false },
      {
        source: "/system-design/:slug",
        destination: "/hld/:slug",
        permanent: false,
      },
      {
        source: "/notes/system-design",
        destination: "/hld/introduction",
        permanent: false,
      },
      {
        source: "/notes/system-design-hld",
        destination: "/hld/introduction",
        permanent: false,
      },
      {
        source: "/notes/system-design-lld",
        destination: "/lld/introduction",
        permanent: false,
      },
      {
        source: "/notes/message-brokers",
        destination: "/hld/message-queue",
        permanent: false,
      },
      {
        source: "/notes/data-stores",
        destination: "/hld/caching-strategies",
        permanent: false,
      },
      {
        source: "/notes/:section/:page",
        destination: "/notes/javascript",
        permanent: false,
      },
      { source: "/visualizer", destination: "/practice", permanent: false },
      { source: "/train", destination: "/tips", permanent: false },
      { source: "/cheatsheet", destination: "/tips", permanent: false },
      { source: "/js-compiler", destination: "/compiler", permanent: false },
      { source: "/js-notes", destination: "/notes", permanent: false },
      {
        source: "/js-notes/:slug",
        destination: "/notes/javascript",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
