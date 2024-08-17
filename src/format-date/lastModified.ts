const oneSecond = 1000;
const twoSeconds = 2000;
const oneMinute = 60000;
const twoMinutes = 120000;
const oneHour = 3600000;
const twoHours = 7200000;
const oneDay = 86400000;
const twoDays = 172800000;

/**
 * This function returns a string that represents the time difference between the last modified date and the current date.
 * The string will be in the format of:
 * - "less than a second ago" if the difference is less than 1 second
 * - "1 second ago" if the difference is greater or equal to 1 second but less than 2 seconds
 * - "X seconds ago" if the difference is greater or equal to 2 seconds but less than 1 minute
 * - "1 minute ago" if the difference is greater or equal to 1 minute but less than 2 minutes
 * - "X minutes ago" if the difference is greater or equal to 2 minutes but less than 1 hour
 * - "1 hour ago" if the difference is greater or equal to 1 hour but less than 2 hours
 * - "X hours ago" if the difference is greater or equal to 2 hours but less than 1 day
 * - "yesterday" if the difference is greater or equal to 1 day but less than 2 days
 * - "X days ago" if the difference is greater or equal to 2 days but less than 1 month
 * - "last month" if the difference is greater or equal to 1 month but less than 2 months
 * - "X months ago" if the difference is greater or equal to 2 months but less than 1 year
 * - "last year" if the difference is greater or equal to 1 year but less than 2 years
 * - "X years ago" if the difference is greater or equal to 2 years
 */
export const formattimeSinceLastModified = (lastModifiedAt: Date): string => {
  const { diffInMs, diffInMonths, diffInYears, wasModifiedLessThanAMonthAgo, daysInNowMonth } = calculateTimeDifference(lastModifiedAt);

  if (recentlyModified(diffInMs, diffInMonths, wasModifiedLessThanAMonthAgo, daysInNowMonth)) {
    return formatSmallTimeDifference(diffInMs);
  }

  if (diffInMonths === 1 || (diffInMonths === 2 && wasModifiedLessThanAMonthAgo)) { return 'last month' }
  if (diffInMonths < 12) { return `${diffInMonths} months ago`; }
  if (diffInYears < 2) { return 'last year'; }
  return `${diffInYears} years ago`;
};

export const formatLastModified = (lastModifiedAt: Date, locales: string | string[] | undefined = undefined): string => {
  const { diffInMs, diffInMonths, diffInYears, wasModifiedLessThanAMonthAgo, daysInNowMonth } = calculateTimeDifference(lastModifiedAt);

  if (recentlyModified(diffInMs, diffInMonths, wasModifiedLessThanAMonthAgo, daysInNowMonth)) {
    return formatSmallTimeDifference(diffInMs);
  }

  let options: Intl.DateTimeFormatOptions;
  switch (true) {
    case diffInYears < 1:
      options = { day: "2-digit", month: "short" };
      break;
    default:
      options = { day: "2-digit", month: "short", year: "numeric" };
      break;
  }

  return new Intl.DateTimeFormat(locales, options).format(lastModifiedAt);
}

const calculateTimeDifference = (lastModifiedAt: Date) => {
  const now = new Date();
  const diffInMs = calculateDiffInMs(now, lastModifiedAt);
  const lastModifiedYear = lastModifiedAt.getFullYear();
  const lastModifiedMonth = lastModifiedAt.getMonth();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const diffInYears = nowYear - lastModifiedYear;
  const diffInMonths = diffInYears * 12 + (nowMonth - lastModifiedMonth);

  const nowDate = now.getDate();
  const daysInNowMonth = new Date(nowYear, nowMonth + 1, 0).getDate();
  const wasModifiedLessThanAMonthAgo = ((daysInNowMonth - lastModifiedAt.getDate() + nowDate) < daysInNowMonth);

  return {
    diffInMs,
    diffInMonths,
    diffInYears,
    wasModifiedLessThanAMonthAgo,
    daysInNowMonth
  };
};

function calculateDiffInMs(now: Date, lastModifiedAt: Date) {
  const nowTime = now.getTime();
  const modifiedTime = lastModifiedAt.getTime();
  const diffInMs = nowTime - modifiedTime;
  return diffInMs;
}

function recentlyModified(diffInMs: number, diffInMonths: number, wasModifiedLessThanAMonthAgo: boolean, daysInNowMonth: number): boolean {
  const lastMonth = oneDay * daysInNowMonth;
  return diffInMs < lastMonth || (diffInMonths === 1 && wasModifiedLessThanAMonthAgo);
}

function formatSmallTimeDifference(diffInMs: number): string {
  if (diffInMs < oneSecond) { return 'less than a second ago'; }
  if (diffInMs < twoSeconds) { return '1 second ago'; }
  if (diffInMs < oneMinute) { return `${diffInUnit(oneSecond)} seconds ago`; }
  if (diffInMs < twoMinutes) { return '1 minute ago'; }
  if (diffInMs < oneHour) { return `${diffInUnit(oneMinute)} minutes ago`; }
  if (diffInMs < twoHours) { return '1 hour ago'; }
  if (diffInMs < oneDay) { return `${diffInUnit(oneHour)} hours ago`; }
  if (diffInMs < twoDays) { return 'yesterday'; }
  return `${diffInUnit(oneDay)} days ago`;

  function diffInUnit(unit: number): number {
    return Math.floor(diffInMs / unit);
  }
}