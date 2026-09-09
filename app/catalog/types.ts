import type { CarFilters } from '@/types/car';

export interface CatalogFiltersProps {
  filters: CarFilters;
}

export interface CatalogCarsProps {
  filters: CarFilters;
}

export interface CatalogErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}
