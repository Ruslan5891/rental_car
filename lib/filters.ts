import { DIGITS_PATTERN, FILTER_PARAMS, ROUTES } from '@/lib/constants';
import type { CarFilters, CarFiltersDraft } from '@/types/car';
import type { SearchParamsInput } from '@/types/common';

function readParam(params: SearchParamsInput, key: string): string | undefined {
  if (params instanceof URLSearchParams) {
    return params.get(key) ?? undefined;
  }

  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function parseNonNegativeInteger(value: string | undefined): number | undefined {
  const digits = value?.trim();

  if (!digits || !DIGITS_PATTERN.test(digits)) return undefined;

  const number = Number(digits);

  return Number.isSafeInteger(number) ? number : undefined;
}

export function parseCarFilters(params: SearchParamsInput): CarFilters {
  const brand = readParam(params, FILTER_PARAMS.brand)?.trim();
  const filters: CarFilters = {};

  if (brand) filters.brand = brand;

  const price = parseNonNegativeInteger(readParam(params, FILTER_PARAMS.price));
  if (price !== undefined) filters.price = price;

  const minMileage = parseNonNegativeInteger(readParam(params, FILTER_PARAMS.minMileage));
  if (minMileage !== undefined) filters.minMileage = minMileage;

  const maxMileage = parseNonNegativeInteger(readParam(params, FILTER_PARAMS.maxMileage));
  if (maxMileage !== undefined) filters.maxMileage = maxMileage;

  return filters;
}

export function serializeCarFilters(filters: CarFilters): string {
  const params = new URLSearchParams();

  if (filters.brand) params.set(FILTER_PARAMS.brand, filters.brand);
  if (filters.price !== undefined) params.set(FILTER_PARAMS.price, String(filters.price));
  if (filters.minMileage !== undefined)
    params.set(FILTER_PARAMS.minMileage, String(filters.minMileage));
  if (filters.maxMileage !== undefined)
    params.set(FILTER_PARAMS.maxMileage, String(filters.maxMileage));

  return params.toString();
}

export function buildCatalogHref(filters: CarFilters): string {
  const query = serializeCarFilters(filters);

  return query ? `${ROUTES.catalog}?${query}` : ROUTES.catalog;
}

export function buildCarFilters(draft: CarFiltersDraft): CarFilters {
  const filters: CarFilters = {};

  if (draft.brand) filters.brand = draft.brand;
  if (draft.price) filters.price = Number(draft.price);
  if (draft.minMileage) filters.minMileage = Number(draft.minMileage);
  if (draft.maxMileage) filters.maxMileage = Number(draft.maxMileage);

  return filters;
}

export function isMileageRangeValid(filters: CarFilters): boolean {
  if (filters.minMileage === undefined || filters.maxMileage === undefined) return true;

  return filters.minMileage <= filters.maxMileage;
}

export function hasActiveFilters(filters: CarFilters): boolean {
  return serializeCarFilters(filters) !== '';
}

export function buildPriceOptions(min: number, max: number, step: number): number[] {
  const first = Math.ceil(min / step) * step;
  const last = Math.floor(max / step) * step;
  const options: number[] = [];

  for (let price = first; price <= last; price += step) {
    options.push(price);
  }

  return options;
}
