export const getDateFromNow = (options?: {
  months?: number;
  days?: number;
  minutes?: number;
  seconds?: number;
}) => {
  const date = new Date();
  if (options?.months) {
    date.setMonth(date.getMonth() + options.months);
  }
  if (options?.days) {
    date.setDate(date.getDate() + options.days);
  }
  if (options?.minutes) {
    date.setMinutes(date.getMinutes() + options.minutes);
  }
  if (options?.seconds) {
    date.setSeconds(date.getSeconds() + options.seconds);
  }
  return date;
};
