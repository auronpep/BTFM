import { getCollection } from "astro:content";
import type { TopicSlug } from "../data/topic-pages";
import { getToolHref } from "./tool-routes";

export type TopicResource = {
  title: string;
  description: string;
  href: string;
  label: string;
};

const hasTopic = (topics: readonly string[] | undefined, topic: TopicSlug) =>
  Boolean(topics?.includes(topic));

const byTitle = (a: TopicResource, b: TopicResource) => a.title.localeCompare(b.title);

export async function getTopicResources(topic: TopicSlug) {
  const [articles, scenarios, tools, californiaRules] = await Promise.all([
    getCollection("articles", ({ data }) => !data.draft),
    getCollection("scenarios", ({ data }) => !data.draft),
    getCollection("tools", ({ data }) => !data.draft),
    getCollection("californiaRules", ({ data }) => !data.draft),
  ]);

  return {
    articles: articles
      .filter((entry) => entry.data.category === topic || hasTopic(entry.data.topics, topic))
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.description,
        href: `/articles/${entry.id}/`,
        label: "Article",
      }))
      .sort(byTitle),
    scenarios: scenarios
      .filter((entry) => entry.data.category === topic || hasTopic(entry.data.topics, topic))
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.boardroomProblem,
        href: `/scenarios/${entry.id}/`,
        label: "Scenario",
      }))
      .sort(byTitle),
    tools: tools
      .filter((entry) => hasTopic(entry.data.topics, topic))
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.description,
        href: getToolHref(entry.id),
        label: "Tool",
      }))
      .sort(byTitle),
    rules: californiaRules
      .filter((entry) => hasTopic(entry.data.topics, topic))
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.description,
        href: `/california-board-rules/${entry.id}/`,
        label: "California rule",
      }))
      .sort(byTitle),
  };
}
