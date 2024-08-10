export const formatlastModified = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;
  const diffInYears = diffInDays / 365;

  if (diffInHours < 24) {
    return `Updated ${Math.floor(diffInHours)} hours ago`;
  } else if (diffInYears >= 1) {
    return `Updated on ${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
  } else {
    return `Updated on ${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}`;
  }
};