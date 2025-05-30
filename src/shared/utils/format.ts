import { differenceInDays, differenceInMonths, parseISO } from "date-fns";

export interface FormatOptions {
  showCents?: boolean;
  useGrouping?: boolean;
  roundToWhole?: boolean;
}

export const formatBalance = (
  amountInNaira: number | null | undefined,
  options: FormatOptions = {},
): string => {
  const {
    showCents = true,
    useGrouping = true,
    roundToWhole = false,
  } = options;

  if (amountInNaira === null || amountInNaira === undefined) {
    return "₦0";
  }

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
    useGrouping: useGrouping,
  });

  let formattedAmount = formatter.format(
    roundToWhole ? Math.round(amountInNaira) : amountInNaira,
  );
  formattedAmount = formattedAmount.replace("NGN", "₦");
  formattedAmount = formattedAmount.replace("₦ ", "₦");

  return formattedAmount;
};

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

export const formatRelativeTime = (dateString: any) => {
  const now: any = new Date();
  const date: any = new Date(dateString);
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "today";
  } else if (diffDays === 1) {
    return "1 day ago";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  } else {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }
};

export const formatMonthAndYear = (dateString: any) => {
  const date = new Date(dateString);
  const options: any = { month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  const targetMonth = newDate.getMonth() + months;
  const year = newDate.getFullYear() + Math.floor(targetMonth / 12);
  const month = targetMonth % 12;

  newDate.setDate(1);
  newDate.setFullYear(year);
  newDate.setMonth(month);

  const originalDay = date.getDate();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  newDate.setDate(Math.min(originalDay, lastDayOfMonth));

  return newDate;
}

export function getDateDifference(
  start: string,
  end: string,
  type: "daily" | "monthly" = "daily",
): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (type === "daily") {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays === 1 ? "1 day" : `${diffDays} days`;
  } else {
    const diffMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    return `${diffMonths} ${diffMonths === 1 ? "month" : "months"}`;
  }
}

export function calculateAvailableEndDates(
  startDateStr: string,
  type: "daily" | "monthly",
  config?: {
    dailyIntervals?: number[];
    monthlyIntervals?: number[];
  },
): string[] {
  if (!startDateStr) return [];

  const dates: string[] = [];
  const startDate = new Date(startDateStr);

  const PRESET_DAILY_INTERVALS = config?.dailyIntervals || [
    7, 14, 30, 60, 90, 180, 365, 730,
  ];
  const PRESET_MONTHLY_INTERVALS =
    config?.monthlyIntervals || Array.from({ length: 24 }, (_, i) => i + 1);

  if (type === "daily") {
    PRESET_DAILY_INTERVALS.forEach((days) => {
      dates.push(formatDate(addDays(startDate, days - 1)));
    });
  } else if (type === "monthly") {
    PRESET_MONTHLY_INTERVALS.forEach((months) => {
      const endDate = addMonths(startDate, months);
      dates.push(formatDate(endDate));
    });
  }

  return dates;
}

export function validateCustomEndDate(
  startDate: string,
  customDate: string,
  config?: {
    minDays?: number;
    maxYears?: number;
    type?: "daily" | "monthly";
  },
): { isValid: boolean; error?: string } {
  const MAX_YEARS = config?.maxYears || 2;
  const type = config?.type || "daily";

  if (!customDate) return { isValid: false, error: "End date is required" };

  const start = new Date(startDate);
  const end = new Date(customDate);

  if (end <= start) {
    return { isValid: false, error: "End date must be after start date" };
  }

  const maxDate = addMonths(start, MAX_YEARS * 12);
  if (end > maxDate) {
    return {
      isValid: false,
      error: `Maximum duration is ${MAX_YEARS} years`,
    };
  }

  return { isValid: true };
}
export const formatDayAndDate = (dateString: any) => {
  const date = new Date(dateString);
  const options: any = {
    weekday: "short",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [weekday, day] = formattedDate.split(" ");
  return `${day}, ${weekday}`;
};

export const isDateValid = (dateString?: string) => {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    const currentDate = new Date();
    return date > currentDate;
  } catch {
    return false;
  }
};

export const calculateSavingsDuration = (
  startDate?: string,
  endDate?: string,
): string => {
  if (!startDate || !endDate) return "Duration not available";

  try {
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const days = differenceInDays(end, start);

    const months = differenceInMonths(end, start);

    if (months >= 1) {
      return `${months} month${months > 1 ? "s" : ""} (${days} Days)`;
    } else {
      return `${days} Days`;
    }
  } catch (error) {
    console.error("Error calculating duration:", error);
    return "Invalid dates";
  }
};

export const formatFullDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
