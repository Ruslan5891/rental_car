'use client';

import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Button, CarFilters, CarList, Container, EmptyState, Loader } from '@/components';
import { fetchCarFilters, fetchCars } from '@/lib/api';
import { PRICE_STEP, ROUTES } from '@/lib/constants';
import { buildCatalogHref, buildPriceOptions, serializeCarFilters } from '@/lib/filters';
import { getNextCarsPage } from '@/lib/pagination';
import { queryKeys } from '@/lib/queryKeys';
import type { CarFilters as CarFiltersValue } from '@/types/car';
import type { CatalogClientProps } from './types';
import css from './Catalog.module.css';

export default function CatalogClient({ filters }: CatalogClientProps) {
  const router = useRouter();

  const { data: meta } = useQuery({
    queryKey: queryKeys.carFilters,
    queryFn: fetchCarFilters,
  });

  const { data, isPending, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.cars(filters),
      queryFn: ({ pageParam }) => fetchCars({ ...filters, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: getNextCarsPage,
    });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];
  const brands = meta?.brands ?? [];
  const prices = meta ? buildPriceOptions(meta.price.min, meta.price.max, PRICE_STEP) : [];

  const handleApply = (next: CarFiltersValue) => {
    router.push(buildCatalogHref(next));
  };

  const handleReset = () => {
    router.push(ROUTES.catalog);
  };

  return (
    <main className={css.main}>
      <Container>
        <h1 className="visually-hidden">Car catalog</h1>
        <CarFilters
          key={serializeCarFilters(filters)}
          brands={brands}
          prices={prices}
          filters={filters}
          onApply={handleApply}
          onReset={handleReset}
        />
        <section className={css.results} aria-label="Search results">
          {isPending && <Loader />}
          {isError && (
            <div className={css.message} role="alert">
              <p className={css.messageTitle}>Could not load the cars. Please try again.</p>
              <Button variant="outline" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          )}
          {!isPending && !isError && cars.length === 0 && <EmptyState onAction={handleReset} />}
          {cars.length > 0 && (
            <>
              <CarList cars={cars} />
              {isFetchingNextPage && <Loader className={css.loader} />}
              {hasNextPage && !isFetchingNextPage && (
                <div className={css.more}>
                  <Button variant="outline" onClick={() => fetchNextPage()}>
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </Container>
    </main>
  );
}
