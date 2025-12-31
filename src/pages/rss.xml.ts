import rss from "@astrojs/rss";
import { getFeedItems } from "@utils/feed";
import type { APIContext } from "astro";

// @TODO: atom feed. astro doesnt provide a library for creating them atm though

export async function GET(context: APIContext) {
  const items = await getFeedItems(context);

  return rss({
    title: "tekno world",
    description: "welcome",
    site: context.site!,
    trailingSlash: false,
    items,
  });
}
