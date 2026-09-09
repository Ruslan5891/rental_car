export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  car: (id: string) => `/catalog/${id}`,
} as const;

export const NAV_LINKS = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.catalog, label: 'Catalog' },
] as const;

export const CARS_PER_PAGE = 12;

export const PRIORITY_CARDS_COUNT = 4;

export const PRICE_STEP = 10;
