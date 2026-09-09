import type { CarsResponse } from '@/types/car';

export function getNextCarsPage(lastPage: CarsResponse): number | undefined {
  const page = Number(lastPage.page);

  return page < lastPage.totalPages ? page + 1 : undefined;
}
