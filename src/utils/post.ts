export const getPostLink = (
  postId: string,
  siteOrigin: string, // @note: id pass in post rather than postId but idk how to get the type lol
) => new URL(`/posts/${postId}`, siteOrigin).toString();
