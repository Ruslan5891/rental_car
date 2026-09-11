import { cache } from 'react';
import axios from 'axios';
import { CARS_PER_PAGE } from '@/lib/constants';
import type {
  BookingRequest,
  BookingResponse,
  Car,
  CarFiltersMeta,
  CarsResponse,
  FetchCarsOptions,
  FetchCarsQuery,
} from '@/types/car';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function fetchCars({
  page = 1,
  perPage = CARS_PER_PAGE,
  brand,
  price,
  minMileage,
  maxMileage,
}: FetchCarsOptions = {}): Promise<CarsResponse> {
  const params: FetchCarsQuery = { page, perPage };

  if (brand) params.brand = brand;
  if (price !== undefined) params.price = price;
  if (minMileage !== undefined) params.minMileage = minMileage;
  if (maxMileage !== undefined) params.maxMileage = maxMileage;

  // ТИМЧАСОВО: штучна затримка, щоб перевірити лоадер. Видалити перед комітом.
  await new Promise(resolve => setTimeout(resolve, 3000));

  const response = await api.get<CarsResponse>('/cars', { params });

  return response.data;
}

export async function fetchCarFilters(): Promise<CarFiltersMeta> {
  const response = await api.get<CarFiltersMeta>('/cars/filters');

  return response.data;
}

export async function fetchCarById(id: string): Promise<Car> {
  const response = await api.get<Car>(`/cars/${id}`);

  return response.data;
}

export const getCarById = cache(fetchCarById);

export function isNotFoundError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

export async function createBookingRequest(
  carId: string,
  booking: BookingRequest,
): Promise<BookingResponse> {
  const response = await api.post<BookingResponse>(`/cars/${carId}/booking-requests`, booking);

  return response.data;
}
