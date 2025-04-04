const getDateDifferenceInDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 0; // Return 0 if dates are invalid
    }

    const diffInMs = end.getTime() - start.getTime(); 
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};

export default getDateDifferenceInDays;