'use client';

import { useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button, CarList, EmptyState, ErrorView, Loader } from '@/components';
import { fetchCars } from '@/lib/api';
import { ROUTES } from '@/lib/constants';
import { getNextCarsPage } from '@/lib/pagination';
import { queryKeys } from '@/lib/queryKeys';
import type { CatalogCarsProps } from './types';
import css from './Catalog.module.css';

export default function CatalogCarsClient({ filters }: CatalogCarsProps) {
  const router = useRouter();

  const { data, isPending, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKeys.cars(filters),
      queryFn: ({ pageParam }) => fetchCars({ ...filters, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: getNextCarsPage,
    });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  const handleReset = () => {
    router.push(ROUTES.catalog);
  };

  if (isPending) {
    return (
      <Loader title="Loading cars..." text="Please wait while we fetch the best cars for you" />
    );
  }

  if (isError) {
    return (
      <ErrorView
        heading="h3"
        title="Could not load the cars"
        text="Something went wrong while loading the cars. Please check your connection and try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (cars.length === 0) {
    return <EmptyState onAction={handleReset} />;
  }

  return (
    <div className={css.cars} aria-busy={isFetchingNextPage}>
      <div className={css.list}>
        <CarList cars={cars} />
        {isFetchingNextPage && (
          <Loader
            overlay
            title="Loading cars..."
            text="Please wait while we fetch the best cars for you"
          />
        )}
      </div>
      {hasNextPage && (
        <div className={css.more}>
          <Button variant="outline" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
