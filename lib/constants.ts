import type { IconType } from 'react-icons';
import { LuCalendar, LuCar, LuFuel, LuGauge, LuSettings } from 'react-icons/lu';
import type { BookingRequest, CarSpecKey } from '@/types/car';

export const SITE_URL = 'https://rental-car-sepia-five.vercel.app';

export const SITE_NAME = 'RentalCar';

export const OG_IMAGE = {
  url: '/images/hero.jpg',
  width: 1440,
  height: 700,
  alt: 'RentalCar — find your perfect rental car',
};

export const ROUTES = {
  home: '/',
  catalog: '/catalog',
  car: (id: string) => `/catalog/${id}`,
} as const;

export const NAV_LINKS = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.catalog, label: 'Catalog' },
] as const;

export const FILTER_PARAMS = {
  brand: 'brand',
  price: 'price',
  minMileage: 'minMileage',
  maxMileage: 'maxMileage',
} as const;

export const BOOKING_FIELDS = {
  name: 'name',
  email: 'email',
  comment: 'comment',
} as const;

export const CARS_PER_PAGE = 12;

export const PRIORITY_CARDS_COUNT = 4;

export const TOAST_DURATION = 4000;

export const PRICE_STEP = 10;

export const BOOKING_INITIAL_VALUES: BookingRequest = { name: '', email: '', comment: '' };

export const NAME_PATTERN = /^[\p{L}][\p{L}\s'-]*$/u;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NON_DIGITS_PATTERN = /\D/g;

export const DIGITS_PATTERN = /^\d+$/;

export const MILEAGE_MAX_DIGITS = 7;

export const BOOKING_ERRORS = {
  name: 'Please enter your name.',
  email: 'Please enter your email.',
  comment: 'Comment is required',
} as const;

export const BOOKING_ERROR_TOAST = 'Could not send your booking request. Please try again.';

export const CAR_SPEC_KEYS = {
  year: 'year',
  type: 'type',
  fuelConsumption: 'fuelConsumption',
  engine: 'engine',
  mileage: 'mileage',
} as const;

export const CAR_SPEC_ICONS: Record<CarSpecKey, IconType> = {
  year: LuCalendar,
  type: LuCar,
  fuelConsumption: LuFuel,
  engine: LuSettings,
  mileage: LuGauge,
};

export const CAR_SPEC_LABELS: Record<CarSpecKey, string> = {
  year: 'Year',
  type: 'Type',
  fuelConsumption: 'Fuel Consumption',
  engine: 'Engine',
  mileage: 'Mileage',
};

export const QUERY_KEYS = {
  cars: 'cars',
  carFilters: 'carFilters',
} as const;
