import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import objectSupport from "dayjs/plugin/objectSupport";
import duration from "dayjs/plugin/duration";
import dayOfYear from "dayjs/plugin/dayOfYear";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isBetween from "dayjs/plugin/isBetween";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dayjs/locale/en");

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

dayjs.tz.setDefault("UTC");
dayjs.locale("en");

export const simplifyDate = (date: string | Date) => {
  const now = dayjs();
  const then = dayjs(date);
  
  const diff = now.diff(then, "minute");
  if (diff < 60) return `${diff}m`;

  const diffHour = now.diff(then, "hour");
  if (diffHour < 24) return `${diffHour}h`;

  const diffDay = now.diff(then, "day");
  if (diffDay < 7) return `${diffDay}d`;

  const diffWeek = now.diff(then, "week");
  if (diffWeek < 4) return `${diffWeek}w`;

  const diffMonth = now.diff(then, "month");
  if (diffMonth < 12) return `${diffMonth}m`;

  const diffYear = now.diff(then, "year");
  return `${diffYear}y`;
}

export const dayJS = dayjs;
export { Dayjs } from "dayjs";