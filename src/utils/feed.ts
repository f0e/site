import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import reactRenderer from "@astrojs/react/server.js";
import { getContainerRenderer as getSvelteRenderer } from "@astrojs/svelte";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import * as cheerio from "cheerio";
import { getPostLink } from "./post";

export function getPostArticle(html: string): string {
  const $ = cheerio.load(html);
  const article = $("article.post").first();
  return article.html() || "";
}

export async function getFeedItems(context: APIContext) {
  const renderers = await loadRenderers([
    getMDXRenderer(),
    getSvelteRenderer(),
  ]);
  const container = await AstroContainer.create({ renderers });
  // @ts-ignore idk why its erroring https://github.com/withastro/astro/issues/11697#issuecomment-2340358119
  container.addServerRenderer({ renderer: reactRenderer });
  // container.addClientRenderer({
  //   name: "@astrojs/react",
  //   entrypoint: "@astrojs/react/client.js",
  // });

  const posts = await getCollection("posts");

  const items = [];
  for (const post of posts) {
    const { Content } = await render(post);
    const rendered = await container.renderToString(Content);
    const content = getPostArticle(rendered);
    const link = getPostLink(post.id, context.url.origin);
    items.push({ ...post.data, link, content });
  }

  return items;
}
