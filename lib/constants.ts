export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  car: (id: string) => `/catalog/${id}`,
} as const;

export const PRICE_STEP = 10;
