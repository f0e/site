// pinned so the output doesn't depend on the build machine's locale/timezone
export const dateToNiceString = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
