const characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateShortUrl(): string {
  let url = "";
  for (let i = 0; i < 6; i++) url += characters.charAt(Math.floor(Math.random() * characters.length));
  return url;
}