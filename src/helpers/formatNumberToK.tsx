export const formatNumberToK = (num: number | string): string => {
  try {
    // Попытка привести входное значение к числу, если оно не является числом
    if (typeof num !== 'number') {
      num = Number.parseInt(num);
      if (isNaN(num)) {
        throw new Error('Invalid number');
      }
    }

    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return num.toString();
  } catch (e) {
    console.log(e);
    return '0';
  }
};
