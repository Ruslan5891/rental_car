import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchCarFilters, fetchCars } from '@/lib/api';
import { parseCarFilters } from '@/lib/filters';
import { queryKeys } from '@/lib/queryKeys';
import CatalogClient from './Catalog.client';

export const metadata: Metadata = {
  title: 'Catalog | RentalCar',
  description:
    'Browse the RentalCar catalog: filter cars by brand, hourly price and mileage, and find the perfect car for your trip.',
};

export default async function CatalogPage({ searchParams }: PageProps<'/catalog'>) {
  const filters = parseCarFilters(await searchParams);
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.infiniteQuery({
      queryKey: queryKeys.cars(filters),
      queryFn: () => fetchCars({ ...filters, page: 1 }),
      initialPageParam: 1,
    }),
    queryClient.query({
      queryKey: queryKeys.carFilters,
      queryFn: fetchCarFilters,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient filters={filters} />
    </HydrationBoundary>
  );
}
