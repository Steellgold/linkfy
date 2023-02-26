export function minimize(text: string, maxLength: number) : string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3) + "[...]";
}