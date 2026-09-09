import type { CarFilters } from '@/types/car';

export interface CatalogClientProps {
  filters: CarFilters;
}

export interface CatalogErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}
