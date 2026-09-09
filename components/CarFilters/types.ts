import type { CarFilters } from '@/types/car';

export interface CarFiltersProps {
  brands: string[];
  prices: number[];
  filters: CarFilters;
  onApply: (filters: CarFilters) => void;
  onReset: () => void;
}
