const oneSecond = 1000;
const twoSeconds = 2000;
const oneMinute = 60000;
const twoMinutes = 120000;
const oneHour = 3600000;
const twoHours = 7200000;
const oneDay = 86400000;
const twoDays = 172800000;

export const formatTimeDifference = (lastModifiedAt: Date): string => {
  const now = new Date();
  const nowTime = now.getTime()
  const modifiedTime = lastModifiedAt.getTime()
  const diffInMs = nowTime - modifiedTime;
  const diffInYears = now.getFullYear() - lastModifiedAt.getFullYear();
  if(diffInYears >= 1 && diffInYears < 2) { return `1 year ago`; }
  if(diffInYears > 0) { return `${Math.floor(diffInYears)} years ago`; }
  const diffInMonths = now.getMonth() - lastModifiedAt.getMonth();
  if(diffInMonths >= 2) { return `${Math.floor(diffInMonths)} months ago`; }
  if(diffInMonths >= 1 && diffInMonths < 2) {
    const diffInDays = now.getDate() - lastModifiedAt.getDate();
    if(diffInDays >= 1) { return `1 month ago`; }
    return `${Math.floor(diffInMs / oneDay)} days ago`;
  }
  if (diffInMs < oneSecond) { return 'less than a second ago'; }
  if (diffInMs < twoSeconds) { return '1 second ago'; }
  if (diffInMs < oneMinute) { return `${Math.floor(diffInMs / oneSecond)} seconds ago`; }
  if (diffInMs < twoMinutes) { return `1 minute ago`; }
  if (diffInMs < oneHour) { return `${Math.floor(diffInMs / oneMinute)} minutes ago`; }
  if (diffInMs < twoHours) { return `1 hour ago`; }
  if (diffInMs < oneDay) { return `${Math.floor(diffInMs / oneHour)} hours ago`; }
  if (diffInMs < twoDays) { return `1 day ago`; }
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