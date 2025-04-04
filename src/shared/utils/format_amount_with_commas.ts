const formatAmountWithCommas = (amount: string | number): string => {
    return Number(amount).toLocaleString();
};

export default formatAmountWithCommas;