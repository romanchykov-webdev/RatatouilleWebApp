export function truncateText(
  text: string,
  maxLength: number,
  addEllipsis: boolean = false,
): string {
  if (text.length <= maxLength) return text;
  return addEllipsis ? text.slice(0, maxLength) + '…' : text.slice(0, maxLength);
}
