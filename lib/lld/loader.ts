import { LLD_GROUPS, LLD_TOPICS } from "@/data/lld/topics";
import type { LldTopicWithNum } from "@/data/lld/topics";

export function getAvailableLldDocs(): LldTopicWithNum[] {
  return LLD_TOPICS;
}

export function getAllLldSlugs(): string[] {
  return LLD_TOPICS.map((d) => d.slug);
}

export function getLldBySlug(slug: string): LldTopicWithNum | undefined {
  return LLD_TOPICS.find((d) => d.slug === slug);
}

export function getFirstLld(): LldTopicWithNum | undefined {
  return LLD_TOPICS[0];
}

export { LLD_GROUPS };
