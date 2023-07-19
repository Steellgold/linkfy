export const checkIfUrl = (url: string, urls?: string[]): boolean => {
  if (urls && urls.includes(url)) return false;
  const regex = /^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
  return regex.test(url);
};