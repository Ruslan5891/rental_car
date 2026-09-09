import type { CarFilters } from '@/types/car';

export const queryKeys = {
  cars: (filters: CarFilters) =>
    [
      'cars',
      {
        brand: filters.brand ?? null,
        price: filters.price ?? null,
        minMileage: filters.minMileage ?? null,
        maxMileage: filters.maxMileage ?? null,
      },
    ] as const,
  carFilters: ['carFilters'] as const,
  car: (id: string) => ['car', id] as const,
};
