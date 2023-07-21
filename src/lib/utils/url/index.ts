export const checkIfUrl = (url: string, urls?: string[]): boolean => {
  if (urls && urls.includes(url)) return false;
  const regex = /^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}([/?].*)?$/i;
  return regex.test(url);
};

export const generateSlug = (length: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < ((length < 4 ? 4 : length) || (length > 100 ? 100 : length)); i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};