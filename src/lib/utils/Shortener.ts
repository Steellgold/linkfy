const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateShortUrl(min = 3, max = 15) : string {
  if (min < 3) min = 3;
  if (max > 15) max = 15;

  let url = "";
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  for (let i = 0; i < length; i++) {
    url += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return url;
}