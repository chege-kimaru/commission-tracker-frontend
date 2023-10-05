export const formatNum = (num = 0, maximumFractionDigits = 2) => {
    return num.toLocaleString('en', { maximumFractionDigits });
};