/**
 * Format price with spaces between thousands and add "zł" suffix
 * Example: 100999 -> "100 999 zł"
 */
export const formatPrice = (price: number): string => {
  if (isNaN(price)) return ''
  return `${price.toLocaleString('pl-PL', { useGrouping: true }).replace(/\u00A0/g, ' ')} zł`
}
