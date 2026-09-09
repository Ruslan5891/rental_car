import { Suspense } from 'react';
import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Container, Loader } from '@/components';
import { fetchCarFilters } from '@/lib/api';
import { serializeCarFilters, parseCarFilters } from '@/lib/filters';
import { queryKeys } from '@/lib/queryKeys';
import CatalogCars from './CatalogCars';
import CatalogFilters from './CatalogFilters.client';
import css from './Catalog.module.css';

export const metadata: Metadata = {
  title: 'Catalog | RentalCar',
  description:
    'Browse the RentalCar catalog: filter cars by brand, hourly price and mileage, and find the perfect car for your trip.',
};

export default async function CatalogPage({ searchParams }: PageProps<'/catalog'>) {
  const filters = parseCarFilters(await searchParams);
  const filtersKey = serializeCarFilters(filters);
  const queryClient = new QueryClient();

  await queryClient.query({
    queryKey: queryKeys.carFilters,
    queryFn: fetchCarFilters,
  });

  return (
    <main className={css.main}>
      <Container>
        <h1 className="visually-hidden">Car catalog</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CatalogFilters key={filtersKey} filters={filters} />
        </HydrationBoundary>
        <section className={css.results} aria-label="Search results">
          <Suspense
            key={filtersKey}
            fallback={
              <Loader
                title="Loading cars..."
                text="Please wait while we fetch the best cars for you"
              />
            }
          >
            <CatalogCars filters={filters} />
          </Suspense>
        </section>
      </Container>
    </main>
  );
}
