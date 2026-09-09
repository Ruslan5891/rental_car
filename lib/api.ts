import axios from 'axios';
import { CARS_PER_PAGE } from '@/lib/constants';
import type {
  BookingRequest,
  BookingResponse,
  Car,
  CarFilters,
  CarFiltersMeta,
  CarsResponse,
} from '@/types/car';

const api = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
});

export interface FetchCarsOptions extends CarFilters {
  page?: number;
  perPage?: number;
}

interface FetchCarsQuery extends CarFilters {
  page: number;
  perPage: number;
}

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

export async function createBookingRequest(
  carId: string,
  booking: BookingRequest,
): Promise<BookingResponse> {
  const response = await api.post<BookingResponse>(`/cars/${carId}/booking-requests`, booking);

  return response.data;
}
