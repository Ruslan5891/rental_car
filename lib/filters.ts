import { ROUTES } from '@/lib/constants';
import type { CarFilters } from '@/types/car';

export type SearchParamsInput = URLSearchParams | Record<string, string | string[] | undefined>;

export interface CarFiltersDraft {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}

function readParam(params: SearchParamsInput, key: string): string | undefined {
  if (params instanceof URLSearchParams) {
    return params.get(key) ?? undefined;
  }

  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function parseNonNegativeInteger(value: string | undefined): number | undefined {
  if (!value) return undefined;

  const number = Number(value);

  return Number.isInteger(number) && number >= 0 ? number : undefined;
}

export function parseCarFilters(params: SearchParamsInput): CarFilters {
  const brand = readParam(params, 'brand')?.trim();
  const filters: CarFilters = {};

  if (brand) filters.brand = brand;

  const price = parseNonNegativeInteger(readParam(params, 'price'));
  if (price !== undefined) filters.price = price;

  const minMileage = parseNonNegativeInteger(readParam(params, 'minMileage'));
  if (minMileage !== undefined) filters.minMileage = minMileage;

  const maxMileage = parseNonNegativeInteger(readParam(params, 'maxMileage'));
  if (maxMileage !== undefined) filters.maxMileage = maxMileage;

  return filters;
}

export function serializeCarFilters(filters: CarFilters): string {
  const params = new URLSearchParams();

  if (filters.brand) params.set('brand', filters.brand);
  if (filters.price !== undefined) params.set('price', String(filters.price));
  if (filters.minMileage !== undefined) params.set('minMileage', String(filters.minMileage));
  if (filters.maxMileage !== undefined) params.set('maxMileage', String(filters.maxMileage));

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
