export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const formatTimeAgo = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const secondsAgo = now - timestamp;
  
  if (secondsAgo < 60) {
    return 'just now';
  }
  
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
  }
  
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
  }
  
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) {
    return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
  }
  
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) {
    return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
  }
  
  const yearsAgo = Math.floor(monthsAgo / 12);
  return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
};

export const formatDetailedTimeAgo = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const secondsAgo = now - timestamp;
  
  const years = Math.floor(secondsAgo / (60 * 60 * 24 * 365));
  const months = Math.floor((secondsAgo % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30));
  const days = Math.floor((secondsAgo % (60 * 60 * 24 * 30)) / (60 * 60 * 24));
  
  let result = '';
  
  if (years > 0) {
    result += `${years} year${years !== 1 ? 's' : ''}, `;
  }
  
  if (months > 0 || years > 0) {
    result += `${months} month${months !== 1 ? 's' : ''}, `;
  }
  
  result += `${days} day${days !== 1 ? 's' : ''}`;
  
  return result;
};

export const formatEth = (value: string): string => {
  const num = parseFloat(value);
  return num.toFixed(4);
};