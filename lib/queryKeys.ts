import { QUERY_KEYS } from '@/lib/constants';
import type { CarFilters } from '@/types/car';

export const queryKeys = {
  cars: (filters: CarFilters) =>
    [
      QUERY_KEYS.cars,
      {
        brand: filters.brand ?? null,
        price: filters.price ?? null,
        minMileage: filters.minMileage ?? null,
        maxMileage: filters.maxMileage ?? null,
      },
    ] as const,
  carFilters: [QUERY_KEYS.carFilters] as const,
};
