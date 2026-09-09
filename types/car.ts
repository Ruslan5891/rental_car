import type { CAR_SPEC_KEYS } from '@/lib/constants';

export interface CarLocation {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  rentalPrice: string;
  rentalCompany: string;
  rentalConditions: string[];
  mileage: number;
  stockNumber: number;
  features: string[];
  location: CarLocation;
  createdAt: string;
  updatedAt: string;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface CarFilters {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface CarFiltersDraft {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}

export interface FetchCarsOptions extends CarFilters {
  page?: number;
  perPage?: number;
}

export interface FetchCarsQuery extends CarFilters {
  page: number;
  perPage: number;
}

export interface CarFiltersMeta {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export type CarSpecKey = (typeof CAR_SPEC_KEYS)[keyof typeof CAR_SPEC_KEYS];

export interface CarSpec {
  key: CarSpecKey;
  label: string;
  value: string;
}

export interface BookingRequest {
  name: string;
  email: string;
  comment?: string;
}

export interface BookingResponse {
  message: string;
}

export type BookingErrors = Partial<Record<keyof BookingRequest, string>>;
