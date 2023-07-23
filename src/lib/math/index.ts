export const percentage = (total: number, clicks: number): number => {
  return Math.round((clicks / total) * 100);
};

export const percentageToWidth = (percentage: number): number => {
  return Math.round((percentage / 100) * 300);
};