export const getPostLink = (post: any, siteOrigin: string) =>
  new URL(`/posts/${post.id}`, siteOrigin).toString();
