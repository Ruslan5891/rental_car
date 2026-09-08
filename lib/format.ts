export function formatMileage(mileage: number): string {
  return `${new Intl.NumberFormat('uk-UA').format(mileage)} km`;
}

export function formatPrice(price: string | number): string {
  return `$${price}`;
}
