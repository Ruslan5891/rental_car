import { notFound } from 'next/navigation';
import { getCarById, isNotFoundError } from '@/lib/api';
import { CAR_SPEC_KEYS, CAR_SPEC_LABELS } from '@/lib/constants';
import type { Car, CarSpec } from '@/types/car';

export async function getCarOrNotFound(id: string): Promise<Car> {
  try {
    return await getCarById(id);
  } catch (error) {
    if (isNotFoundError(error)) notFound();
    throw error;
  }
}

export function buildCarSpecs(car: Car): CarSpec[] {
  return [
    { key: CAR_SPEC_KEYS.year, label: CAR_SPEC_LABELS.year, value: String(car.year) },
    { key: CAR_SPEC_KEYS.type, label: CAR_SPEC_LABELS.type, value: car.type },
    {
      key: CAR_SPEC_KEYS.fuelConsumption,
      label: CAR_SPEC_LABELS.fuelConsumption,
      value: String(car.fuelConsumption),
    },
    { key: CAR_SPEC_KEYS.engine, label: CAR_SPEC_LABELS.engine, value: car.engine },
    { key: CAR_SPEC_KEYS.mileage, label: CAR_SPEC_LABELS.mileage, value: `${car.mileage} km` },
  ];
}
