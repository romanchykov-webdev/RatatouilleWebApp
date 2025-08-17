export const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    if (chunk.length === size) {
      result.push(chunk); // добавляем только полные чанки
    }
  }
  console.log('chunkArray', result);
  return result;
};
