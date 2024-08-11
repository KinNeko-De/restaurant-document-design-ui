const oneSecond = 1000;
const twoSeconds = 2000;
const oneMinute = 60000;
const twoMinutes = 120000;
const oneHour = 3600000;
const twoHours = 7200000;
const oneDay = 86400000;
const twoDays = 172800000;
const oneYear = 31536000000;

export const formatlastModified = (lastModifiedAt: Date): string => {
  const nowTime = new Date().getTime()
  const modifiedTime = lastModifiedAt.getTime()
  const diffInMs = nowTime - modifiedTime;

  if (diffInMs < oneSecond) { return 'less than a second ago'; }
  if (diffInMs < twoSeconds) { return '1 second ago'; }
  if (diffInMs < oneMinute) { return `${Math.floor(diffInMs / oneSecond)} seconds ago`; }
  if (diffInMs < twoMinutes) { return `1 minute ago`; }
  if (diffInMs < oneHour) { return `${Math.floor(diffInMs / oneMinute)} minutes ago`; }
  if (diffInMs < twoHours) { return `1 hour ago`; }
  if (diffInMs < oneDay) { return `${Math.floor(diffInMs / oneHour)} hours ago`; }
  if (diffInMs < twoDays) { return `1 day ago`; }
  if (diffInMs < oneYear) { return `${Math.floor(diffInMs / oneDay)} days ago`; }
  return "Modified is not implemented yet";
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