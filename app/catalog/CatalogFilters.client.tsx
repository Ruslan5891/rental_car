'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { CarFilters } from '@/components';
import { fetchCarFilters } from '@/lib/api';
import { PRICE_STEP, ROUTES } from '@/lib/constants';
import { buildCatalogHref, buildPriceOptions } from '@/lib/filters';
import { queryKeys } from '@/lib/queryKeys';
import type { CarFilters as CarFiltersValue } from '@/types/car';
import type { CatalogFiltersProps } from './types';

export default function CatalogFilters({ filters }: CatalogFiltersProps) {
  const router = useRouter();

  const { data: meta } = useQuery({
    queryKey: queryKeys.carFilters,
    queryFn: fetchCarFilters,
  });

  const brands = meta?.brands ?? [];
  const prices = meta ? buildPriceOptions(meta.price.min, meta.price.max, PRICE_STEP) : [];

  const handleApply = (next: CarFiltersValue) => {
    router.push(buildCatalogHref(next));
  };

  const handleReset = () => {
    router.push(ROUTES.catalog);
  };

  return (
    <CarFilters
      brands={brands}
      prices={prices}
      filters={filters}
      onApply={handleApply}
      onReset={handleReset}
    />
  );
}
