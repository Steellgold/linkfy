export const checkIfUrl = (url: string): boolean => {
  // if the link have "http://" or "https://" at the beginning
  // if the link is valid (text after the "http://" or "https://" and before the first "/" is a valid domain)
  // if have a dot with a text after it (extension)
  const regex = /^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
  return regex.test(url);
};