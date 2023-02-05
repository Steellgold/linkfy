export function minimize(url: string, lengthMax = 21, end = "[...]") {
  if (url.length > lengthMax) return url.substring(0, lengthMax) + end;
  return url;
}

export function formatNumbers(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return number.toString();
}
