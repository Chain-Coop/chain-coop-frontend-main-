type FormatOptions = {
  showCents?: boolean;
  useGrouping?: boolean;
  roundToWhole?: boolean;
};

export const formatBalance = (
  amountInKobo: number | null | undefined,
  options: FormatOptions = {}
): string => {
  const {
    showCents = true,
    useGrouping = true,
    roundToWhole = false
  } = options;

  if (amountInKobo === null || amountInKobo === undefined) {
    return '₦0';
  }

  const amountInNaira = amountInKobo / 100;

  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
    useGrouping: useGrouping,
  });

  let formattedAmount = formatter.format(roundToWhole ? Math.round(amountInNaira) : amountInNaira);

  formattedAmount = formattedAmount.replace('NGN', '₦');

  formattedAmount = formattedAmount.replace('₦ ', '₦');

  return formattedAmount;
};

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

export const formatMonthAndYear = (dateString: any) => {
  const date = new Date(dateString);
  const options: any = { month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

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

export const formatPayStackAmount = (value: string) => {
  const cleanedValue = value.replace(/,/g, "");
  if (isNaN(Number(cleanedValue))) return value;

  const formattedValue = Number(cleanedValue).toLocaleString("en-NG");
  return formattedValue;
};
