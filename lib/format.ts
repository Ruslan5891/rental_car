import { NON_DIGITS_PATTERN } from '@/lib/constants';

export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatMileage(mileage: number): string {
  return `${formatNumber(mileage, 'uk-UA')} km`;
}

export function formatCarTitle(brand: string, model: string, year: number): string {
  return `${brand} ${model}, ${year}`;
}

export function formatPrice(price: string | number): string {
  return `$${price}`;
}

export function stripNonDigits(value: string): string {
  return value.replace(NON_DIGITS_PATTERN, '');
}

export function limitDigits(value: string, maxDigits?: number): string {
  return maxDigits === undefined ? value : value.slice(0, maxDigits);
}

export function formatDigits(value: string): string {
  return value === '' ? '' : formatNumber(Number(value));
}

export function numberToInputValue(value: number | undefined): string {
  return value === undefined ? '' : String(value);
}
