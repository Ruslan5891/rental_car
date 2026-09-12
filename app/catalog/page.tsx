import { Suspense } from 'react';
import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Container, Loader } from '@/components';
import { fetchCarFilters } from '@/lib/api';
import { OG_IMAGE, ROUTES, SITE_NAME, SITE_URL } from '@/lib/constants';
import { serializeCarFilters, parseCarFilters } from '@/lib/filters';
import { noop } from '@/lib/noop';
import { queryKeys } from '@/lib/queryKeys';
import CatalogCars from './CatalogCars';
import CatalogFilters from './CatalogFilters.client';
import css from './Catalog.module.css';

const title = 'Catalog | RentalCar';
const description =
  'Browse the RentalCar catalog: filter cars by brand, hourly price and mileage, and find the perfect car for your trip.';
const url = `${SITE_URL}${ROUTES.catalog}`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: SITE_NAME,
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default async function CatalogPage({ searchParams }: PageProps<'/catalog'>) {
  const filters = parseCarFilters(await searchParams);
  const filtersKey = serializeCarFilters(filters);
  const queryClient = new QueryClient();

  await queryClient
    .query({
      queryKey: queryKeys.carFilters,
      queryFn: fetchCarFilters,
    })
    .catch(noop);

  return (
    <main className={css.main}>
      <Container>
        <h1 className="visually-hidden">Car catalog</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CatalogFilters key={filtersKey} filters={filters} />
        </HydrationBoundary>
        <section className={css.results} aria-labelledby="results-title">
          <h2 className="visually-hidden" id="results-title">
            Search results
          </h2>
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
