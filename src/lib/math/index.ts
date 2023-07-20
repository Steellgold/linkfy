export const percentage = (total: number, clicks: number): number => {
  return Math.round((clicks / total) * 100);
};

export const percentageToWidth = (percentage: number): number => {
  return Math.round((percentage / 100) * 300);
};

export const uuid = (): string => {
  let dt = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
};