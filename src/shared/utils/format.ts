export const formatAmount = (amount: number): string => {
  const amountInNaira = amount >= 100 ? amount / 100 : amount;

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountInNaira);
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
