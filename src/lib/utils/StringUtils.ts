export function minimize(text: string, maxLength: number) : string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3) + "[...]";
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRgbInstring(rgb: string, includeRgb: boolean = true) {
  const rgbValues = hexToRgb(rgb);
  return includeRgb ? `rgb(${rgbValues?.r}, ${rgbValues?.g}, ${rgbValues?.b})` : `${rgbValues?.r}, ${rgbValues?.g}, ${rgbValues?.b}`;
}

export function rgbToHexInstring(rgb: string, includeHash: boolean = true) {
  const rgbValues = rgb.replace(/[^\d,]/g, '').split(',');
  return includeHash ? rgbToHex(parseInt(rgbValues[0]), parseInt(rgbValues[1]), parseInt(rgbValues[2])) : rgbToHex(parseInt(rgbValues[0]), parseInt(rgbValues[1]), parseInt(rgbValues[2])).replace('#', '');
}