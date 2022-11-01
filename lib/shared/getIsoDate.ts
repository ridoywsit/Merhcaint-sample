export const getIsoDate = (date: string) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const finalDate = new Date(`${date} ${hour}:${minute}`).toISOString();
  return finalDate;
};

export function setTimeZone(date: string) {
  return `${date}+00:00`;
}
