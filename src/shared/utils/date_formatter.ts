import {
    differenceInCalendarDays,
    differenceInCalendarWeeks,
    differenceInCalendarMonths,
    isThisWeek,
    isThisMonth,
    isToday,
  } from "date-fns";
  
  const formatRelativeTime = (targetDate: Date) => {
    const now = new Date();
  
    // Days
    const dayDiff = differenceInCalendarDays(targetDate, now);
    if (isToday(targetDate)) return "today";
    if (Math.abs(dayDiff) < 7) {
      return dayDiff > 0
        ? `in ${dayDiff} day${dayDiff > 1 ? "s" : ""}`
        : `${Math.abs(dayDiff)} day${Math.abs(dayDiff) > 1 ? "s" : ""} ago`;
    }
  
    // Weeks
    const weekDiff = differenceInCalendarWeeks(targetDate, now);
    if (isThisWeek(targetDate)) return "this week";
    if (Math.abs(weekDiff) < 4) {
      return weekDiff > 0
        ? `in ${weekDiff} week${weekDiff > 1 ? "s" : ""}`
        : `${Math.abs(weekDiff)} week${Math.abs(weekDiff) > 1 ? "s" : ""} ago`;
    }
  
    // Months
    const monthDiff = differenceInCalendarMonths(targetDate, now);
    if (isThisMonth(targetDate)) return "this month";
    return monthDiff > 0
      ? `in ${monthDiff} month${monthDiff > 1 ? "s" : ""}`
      : `${Math.abs(monthDiff)} month${Math.abs(monthDiff) > 1 ? "s" : ""} ago`;
  }

  export default formatRelativeTime