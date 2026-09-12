import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchCars } from '@/lib/api';
import { noop } from '@/lib/noop';
import { queryKeys } from '@/lib/queryKeys';
import CatalogCarsClient from './CatalogCars.client';
import type { CatalogCarsProps } from './types';

export default async function CatalogCars({ filters }: CatalogCarsProps) {
  const queryClient = new QueryClient();

  await queryClient
    .infiniteQuery({
      queryKey: queryKeys.cars(filters),
      queryFn: () => fetchCars({ ...filters, page: 1 }),
      initialPageParam: 1,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogCarsClient filters={filters} />
    </HydrationBoundary>
  );
}
