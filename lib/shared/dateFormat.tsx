export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const offset = new Date().getTimezoneOffset() / 60;
export const formateDateToString = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date);

  return formattedDate;
};
