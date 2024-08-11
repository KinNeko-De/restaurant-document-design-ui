const oneSecond = 1000;
const twoSeconds = 2000;
const oneMinute = 60000;
const twoMinutes = 120000;
const oneHour = 3600000;
const twoHours = 7200000;
const oneDay = 86400000;
const twoDays = 172800000;

  /**
   * This function will return a string that represents the time difference between the last modified date and the current date.
   * The string will be in the format of:
   * - "less than a second ago" if the difference is less than 1 second
   * - "1 second ago" if the difference is greater or equal 1 second but less than 2 seconds
   * - "X seconds ago" if the difference is greater or equal 2 seconds but less than 1 minute
   * - "1 minute ago" if the difference is greater or equal 1 minute but less than 2 minutes
   * - "X minutes ago" if the difference is greater or equal 2 minutes but less than 1 hour
   * - "1 hour ago" if the difference is greater or equal 1 hour but less than 2 hours
   * - "X hours ago" if the difference is greater or equal 2 hours but less than 1 day
   * - "yesterday" if the difference is greater or equal 1 day but less than 2 days
   * - "X days ago" if the difference is more greater or equal 2 day but less than 1 month
   * - "last month" if the difference is greater or equal 1 month but less than 2 months
   * - "X months ago" if the difference is greater or equal 2 months but less than 1 year
   * - "last year" if the difference is greater or equal 1 year but less than 2 years
   * - "X years ago" if the difference is greater or equal 2 years
   */
export const formatTimeDifference = (lastModifiedAt: Date): string => {
  const now = new Date();
  const nowTime = now.getTime()
  const modifiedTime = lastModifiedAt.getTime()
  const diffInMs = nowTime - modifiedTime;
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();
  const lastModifiedYear = lastModifiedAt.getFullYear();
  const lastModifiedMonth = lastModifiedAt.getMonth();
  const lastModifiedDate = lastModifiedAt.getDate();
  const diffInYears = nowYear - lastModifiedYear;
  if(diffInYears >= 1 && diffInYears < 2) { return `last year`; }
  if(diffInYears >= 2) { return `${Math.floor(diffInYears)} years ago`; }
  const diffInMonths = nowMonth - lastModifiedMonth;
  if(diffInMonths >= 2) { return `${Math.floor(diffInMonths)} months ago`; }
  if(diffInMonths >= 1 && diffInMonths < 2) {
    const daysInLastMonth = new Date(nowYear, nowMonth, 0).getDate();
    if ((nowDate + daysInLastMonth - lastModifiedDate) < daysInLastMonth) {
      return `${Math.floor(diffInMs / oneDay)} days ago`;
    }
    return `last month`;
  }
  if (diffInMs < oneSecond) { return 'less than a second ago'; }
  if (diffInMs < twoSeconds) { return '1 second ago'; }
  if (diffInMs < oneMinute) { return `${Math.floor(diffInMs / oneSecond)} seconds ago`; }
  if (diffInMs < twoMinutes) { return `1 minute ago`; }
  if (diffInMs < oneHour) { return `${Math.floor(diffInMs / oneMinute)} minutes ago`; }
  if (diffInMs < twoHours) { return `1 hour ago`; }
  if (diffInMs < oneDay) { return `${Math.floor(diffInMs / oneHour)} hours ago`; }
  if (diffInMs < twoDays) { return `yesterday`; }
  return `${Math.floor(diffInMs / oneDay)} days ago`;
  /*
    if (diffInHours < 24) {
      return `Updated ${Math.floor(diffInHours)} hours ago`;
    } else if (diffInYears >= 1) {
      return `Updated on ${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
      return `Updated on ${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}`;
    }
      */
};


export const formatLastModified = (lastModifiedAt: Date): string => {
  return "Will be modified the timediference only for more than 1 day and more than 1 year. showing the day respectively the day and year then";
}