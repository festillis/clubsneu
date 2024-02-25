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

export const toLocaleTimeString = (date: Date) => {
  // I want the format 9:30AM
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export const toLocaleDateString = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric'
  });
};
