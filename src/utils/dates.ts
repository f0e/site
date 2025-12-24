export const dateToNiceString = (date: Date) =>
  date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
