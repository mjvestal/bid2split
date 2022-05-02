export default function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat(
    'en-US', 
    {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
}
