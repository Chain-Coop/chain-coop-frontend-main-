const removeCommas = (amount: string): string => {
    return amount.replace(/,/g, "");
};

export default removeCommas;