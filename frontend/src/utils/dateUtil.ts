// Month/Year
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  return date.toLocaleDateString(undefined, options);
};

// Month/Day
export const formatDatePost = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  };
  return date
    .toLocaleDateString(undefined, options)
    .replace(/(\d+)\s(\w+)/, "$2 $1");
};
