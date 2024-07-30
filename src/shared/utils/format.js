export const formatAmount = (amount) => {
    return (amount / 100).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  export const formatDayAndDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  
  export const formatMonthAndYear = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  