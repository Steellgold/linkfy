export function formatNumber(number: number): string {
  const tier = Math.log10(number) / 3 | 0;
  if (tier === 0) return number.toString();
  const suffix = 'kmbtq'[tier - 1];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  return scaled.toFixed(1) + suffix;
}