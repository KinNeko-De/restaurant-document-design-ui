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
export const formatTimeDifference = (lastModifiedAt: Date): string => {
  const now = new Date();
  const nowTime = now.getTime();
  const modifiedTime = lastModifiedAt.getTime();
  const diffInMs = nowTime - modifiedTime;

  if (diffInMs < oneSecond) { return 'less than a second ago'; }
  if (diffInMs < twoSeconds) { return '1 second ago'; }
  if (diffInMs < oneMinute) { return `${Math.floor(diffInMs / oneSecond)} seconds ago`; }
  if (diffInMs < twoMinutes) { return '1 minute ago'; }
  if (diffInMs < oneHour) { return `${Math.floor(diffInMs / oneMinute)} minutes ago`; }
  if (diffInMs < twoHours) { return '1 hour ago'; }
  if (diffInMs < oneDay) { return `${Math.floor(diffInMs / oneHour)} hours ago`; }
  if (diffInMs < twoDays) { return 'yesterday'; }

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();
  const lastModifiedYear = lastModifiedAt.getFullYear();
  const lastModifiedMonth = lastModifiedAt.getMonth();
  const lastModifiedDate = lastModifiedAt.getDate();

  const diffInYears = nowYear - lastModifiedYear;
  const diffInMonths = diffInYears * 12 + (nowMonth - lastModifiedMonth);

  if (diffInMonths < 1) { return `${Math.floor(diffInMs / oneDay)} days ago`; }
  if (diffInMonths === 1) {
    const daysInNowMonth = new Date(nowYear, nowMonth + 1, 0).getDate();
    if ((daysInNowMonth - lastModifiedDate + nowDate) < daysInNowMonth) {
      return `${Math.floor(diffInMs / oneDay)} days ago`;
    }
  }
  if (diffInMonths < 2) { return 'last month'; }
  if (diffInMonths < 12) { return `${diffInMonths} months ago`; }
  if (diffInYears < 2) { return 'last year'; }
  return `${diffInYears} years ago`;
};

export const formatLastModified = (lastModifiedAt: Date): string => {
    /*
    if (diffInHours < 24) {
      return `Updated ${Math.floor(diffInHours)} hours ago`;
    } else if (diffInYears >= 1) {
      return `Updated on ${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
      return `Updated on ${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}`;
    }
      */
  return "Will be modified the timediference only for more than 1 day and more than 1 year. showing the day respectively the day and year then";
}